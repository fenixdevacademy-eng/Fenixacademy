from django.core.management.base import BaseCommand
from django.apps import apps
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Test if the Django setup is working correctly'

    def handle(self, *args, **options):
        self.stdout.write('Testing Django setup...')
        
        try:
            # Test if we can get models
            Course = apps.get_model('courses', 'Course')
            Category = apps.get_model('courses', 'Category')
            User = get_user_model()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Models imported successfully')
            )
            
            # Test if we can create objects
            user = User.objects.create_user(
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User'
            )
            
            category = Category.objects.create(
                name='Test Category',
                description='Test category description'
            )
            
            course = Course.objects.create(
                title='Test Course',
                slug='test-course',
                description='Test course description',
                category=category,
                price_usd=2999,
                price_brl=14999,
                status='published'
            )
            
            self.stdout.write(
                self.style.SUCCESS('✅ Objects created successfully')
            )
            
            # Test properties
            self.stdout.write(f'Course title: {course.title}')
            self.stdout.write(f'Course price USD: ${course.price_usd/100:.2f}')
            self.stdout.write(f'Course price BRL: R$ {course.price_brl/100:.2f}')
            
            # Clean up
            user.delete()
            course.delete()
            category.delete()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Setup test completed successfully!')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Setup test failed: {str(e)}')
            )
            raise 