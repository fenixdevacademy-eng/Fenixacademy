import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up to 10 users
    { duration: '5m', target: 10 }, // Stay at 10 users
    { duration: '2m', target: 50 }, // Ramp up to 50 users
    { duration: '5m', target: 50 }, // Stay at 50 users
    { duration: '2m', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.1'],    // Error rate must be less than 10%
    errors: ['rate<0.1'],
  },
};

// Base URL
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Test data
const testUsers = [
  { email: 'test1@example.com', password: 'testpass123' },
  { email: 'test2@example.com', password: 'testpass123' },
  { email: 'test3@example.com', password: 'testpass123' },
];

// Helper function to get random user
function getRandomUser() {
  return testUsers[Math.floor(Math.random() * testUsers.length)];
}

// Main test scenario
export default function () {
  const user = getRandomUser();
  
  // Test 1: Homepage load
  const homeResponse = http.get(`${BASE_URL}/`);
  check(homeResponse, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads fast': (r) => r.timings.duration < 1000,
  });
  
  // Test 2: Course listing
  const coursesResponse = http.get(`${BASE_URL}/api/courses/`);
  check(coursesResponse, {
    'courses API status is 200': (r) => r.status === 200,
    'courses API returns data': (r) => r.json().length > 0,
  });
  
  // Test 3: User registration
  const registerData = {
    email: `test${Date.now()}@example.com`,
    password: 'testpass123',
    first_name: 'Test',
    last_name: 'User',
  };
  
  const registerResponse = http.post(`${BASE_URL}/api/auth/register/`, JSON.stringify(registerData), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(registerResponse, {
    'registration status is 201': (r) => r.status === 201,
  });
  
  // Test 4: User login
  const loginData = {
    email: user.email,
    password: user.password,
  };
  
  const loginResponse = http.post(`${BASE_URL}/api/auth/login/`, JSON.stringify(loginData), {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
    'login returns token': (r) => r.json().access !== undefined,
  });
  
  // Test 5: Authenticated requests (if login successful)
  if (loginResponse.status === 200) {
    const token = loginResponse.json().access;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    
    // Get user profile
    const profileResponse = http.get(`${BASE_URL}/api/users/profile/`, { headers });
    check(profileResponse, {
      'profile API status is 200': (r) => r.status === 200,
    });
    
    // Get user enrollments
    const enrollmentsResponse = http.get(`${BASE_URL}/api/users/enrollments/`, { headers });
    check(enrollmentsResponse, {
      'enrollments API status is 200': (r) => r.status === 200,
    });
  }
  
  // Test 6: Course details
  const courseId = 1; // Assuming course with ID 1 exists
  const courseResponse = http.get(`${BASE_URL}/api/courses/${courseId}/`);
  check(courseResponse, {
    'course details status is 200': (r) => r.status === 200,
    'course has required fields': (r) => {
      const course = r.json();
      return course.title && course.description && course.price_brl;
    },
  });
  
  // Test 7: Search functionality
  const searchResponse = http.get(`${BASE_URL}/api/courses/?search=programação`);
  check(searchResponse, {
    'search API status is 200': (r) => r.status === 200,
  });
  
  // Test 8: Payment simulation (without actual payment)
  if (loginResponse.status === 200) {
    const token = loginResponse.json().access;
    const paymentData = {
      course: courseId,
      amount: 14999, // R$ 149,99
      currency: 'brl',
      payment_method: 'stripe',
    };
    
    const paymentResponse = http.post(`${BASE_URL}/api/payments/`, JSON.stringify(paymentData), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    check(paymentResponse, {
      'payment creation status is 201': (r) => r.status === 201,
    });
  }
  
  // Record errors
  errorRate.add(
    homeResponse.status !== 200 ||
    coursesResponse.status !== 200 ||
    registerResponse.status !== 201 ||
    loginResponse.status !== 200 ||
    courseResponse.status !== 200 ||
    searchResponse.status !== 200
  );
  
  // Think time between requests
  sleep(1);
}

// Setup function (runs once before the test)
export function setup() {
  console.log('Starting performance test for Fenix Academy');
  console.log(`Base URL: ${BASE_URL}`);
  
  // Health check
  const healthResponse = http.get(`${BASE_URL}/api/health/`);
  if (healthResponse.status !== 200) {
    throw new Error(`Health check failed: ${healthResponse.status}`);
  }
  
  console.log('Health check passed, starting load test...');
}

// Teardown function (runs once after the test)
export function teardown(data) {
  console.log('Performance test completed');
  console.log('Results:', JSON.stringify(data, null, 2));
} 