"""
Integration tests for Fenix Academy API
"""

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from django.apps import apps
import json

# Get models safely
Course = apps.get_model('courses', 'Course')
Category = apps.get_model('courses', 'Category')
Payment = apps.get_model('payments', 'Payment')

User = get_user_model()

class FenixAcademyIntegrationTests(TestCase):
    """Integration tests for the complete Fenix Academy workflow"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        
        # Create test user
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        
        # Create test category
        self.category = Category.objects.create(
            name='Test Category',
            description='Test category description'
        )
        
        # Create test course
        self.course = Course.objects.create(
            title='Test Course',
            slug='test-course',
            description='Test course description',
            category=self.category,
            price_usd=2999,  # $29.99
            price_brl=14999,  # R$ 149,99
            total_lessons=20,
            total_exercises=40,
            estimated_hours=30,
            status='published'
        )
    
    def test_user_registration_workflow(self):
        """Test complete user registration workflow"""
        # 1. Register new user
        register_data = {
            'email': 'newuser@example.com',
            'password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User'
        }
        
        response = self.client.post(
            reverse('api:register'),
            data=json.dumps(register_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        
        # 2. Verify user was created
        user = User.objects.get(email='newuser@example.com')
        self.assertEqual(user.first_name, 'New')
        self.assertEqual(user.last_name, 'User')
    
    def test_user_login_workflow(self):
        """Test user login workflow"""
        # 1. Login with valid credentials
        login_data = {
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        
        response = self.client.post(
            reverse('api:login'),
            data=json.dumps(login_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        
        # 2. Test with invalid credentials
        invalid_login_data = {
            'email': 'test@example.com',
            'password': 'wrongpassword'
        }
        
        response = self.client.post(
            reverse('api:login'),
            data=json.dumps(invalid_login_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_course_browsing_workflow(self):
        """Test course browsing workflow"""
        # 1. Get course list
        response = self.client.get(reverse('api:courses-list'))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Test Course')
        
        # 2. Get specific course details
        response = self.client.get(
            reverse('api:courses-detail', kwargs={'pk': self.course.pk})
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Course')
        self.assertEqual(response.data['price_brl'], '149.99')
        
        # 3. Search courses
        response = self.client.get(
            reverse('api:courses-list'),
            {'search': 'Test'}
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_payment_workflow(self):
        """Test payment workflow"""
        # 1. Login user
        self.client.force_authenticate(user=self.user)
        
        # 2. Create payment
        payment_data = {
            'course': self.course.pk,
            'amount': 14999,  # R$ 149,99
            'currency': 'brl',
            'payment_method': 'stripe'
        }
        
        response = self.client.post(
            reverse('api:payments-list'),
            data=json.dumps(payment_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['amount'], '149.99')
        self.assertEqual(response.data['status'], 'pending')
        
        # 3. Verify payment was created
        payment = Payment.objects.get(id=response.data['id'])
        self.assertEqual(payment.user, self.user)
        self.assertEqual(payment.course, self.course)
    
    def test_user_profile_workflow(self):
        """Test user profile workflow"""
        # 1. Login user
        self.client.force_authenticate(user=self.user)
        
        # 2. Get user profile
        response = self.client.get(reverse('api:user-profile'))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['first_name'], 'Test')
        
        # 3. Update user profile
        update_data = {
            'first_name': 'Updated',
            'last_name': 'Name'
        }
        
        response = self.client.patch(
            reverse('api:user-profile'),
            data=json.dumps(update_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Updated')
        
        # 4. Verify user was updated
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Updated')
    
    def test_course_enrollment_workflow(self):
        """Test course enrollment workflow"""
        # 1. Login user
        self.client.force_authenticate(user=self.user)
        
        # 2. Enroll in course
        enrollment_data = {
            'course': self.course.pk
        }
        
        response = self.client.post(
            reverse('api:enrollments-list'),
            data=json.dumps(enrollment_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['course'], self.course.pk)
        self.assertEqual(response.data['status'], 'active')
        
        # 3. Get user enrollments
        response = self.client.get(reverse('api:user-enrollments'))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['course'], self.course.pk)
    
    def test_authentication_required_endpoints(self):
        """Test that protected endpoints require authentication"""
        protected_endpoints = [
            reverse('api:user-profile'),
            reverse('api:user-enrollments'),
            reverse('api:payments-list'),
            reverse('api:enrollments-list'),
        ]
        
        for endpoint in protected_endpoints:
            response = self.client.get(endpoint)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_course_pricing_display(self):
        """Test course pricing display in different currencies"""
        # 1. Get course with USD pricing
        response = self.client.get(
            reverse('api:courses-detail', kwargs={'pk': self.course.pk}),
            {'currency': 'usd'}
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['current_price_usd'], '29.99')
        
        # 2. Get course with BRL pricing
        response = self.client.get(
            reverse('api:courses-detail', kwargs={'pk': self.course.pk}),
            {'currency': 'brl'}
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['current_price_brl'], '149.99')
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        # 1. Test invalid course ID
        response = self.client.get(
            reverse('api:courses-detail', kwargs={'pk': 99999})
        )
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        # 2. Test invalid payment data
        self.client.force_authenticate(user=self.user)
        
        invalid_payment_data = {
            'course': 99999,  # Non-existent course
            'amount': -100,   # Invalid amount
            'currency': 'invalid'
        }
        
        response = self.client.post(
            reverse('api:payments-list'),
            data=json.dumps(invalid_payment_data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_performance_metrics(self):
        """Test that performance metrics are tracked"""
        # 1. Make multiple requests to test performance
        for _ in range(10):
            response = self.client.get(reverse('api:courses-list'))
            self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 2. Test response time
        import time
        start_time = time.time()
        response = self.client.get(reverse('api:courses-list'))
        end_time = time.time()
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertLess(end_time - start_time, 1.0)  # Should respond in less than 1 second 