"""
Custom middleware for Fenix Academy
Modern performance and security enhancements
"""

import time
import logging
from typing import Callable
from django.http import HttpRequest, HttpResponse
from django.utils.deprecation import MiddlewareMixin
from django.core.cache import cache
from django.conf import settings
import uuid

logger = logging.getLogger(__name__)

class PerformanceMiddleware(MiddlewareMixin):
    """
    Middleware to track performance metrics
    """
    
    def process_request(self, request: HttpRequest):
        request.start_time = time.time()
        request.request_id = str(uuid.uuid4())[:8]
        
    def process_response(self, request: HttpRequest, response: HttpResponse):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            
            # Add performance headers
            response['X-Response-Time'] = f"{duration:.2f}s"
            response['X-Request-ID'] = getattr(request, 'request_id', 'unknown')
            
            # Log slow requests
            if duration > 2.0:  # Log requests slower than 2 seconds
                logger.warning(
                    f"Slow request detected: {request.method} {request.path} "
                    f"took {duration:.2f}s [ID: {request.request_id}]"
                )
        
        return response

class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Add modern security headers
    """
    
    def process_response(self, request: HttpRequest, response: HttpResponse):
        # Content Security Policy
        if not response.get('Content-Security-Policy'):
            response['Content-Security-Policy'] = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' https://js.stripe.com; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "img-src 'self' data: https:; "
                "connect-src 'self' https://api.stripe.com;"
            )
        
        # Additional security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = (
            "geolocation=(), microphone=(), camera=(), "
            "fullscreen=(self), payment=(self)"
        )
        
        return response

class RateLimitMiddleware(MiddlewareMixin):
    """
    Simple rate limiting middleware
    """
    
    def process_request(self, request: HttpRequest):
        if not settings.DEBUG:  # Only apply in production
            client_ip = self.get_client_ip(request)
            cache_key = f"rate_limit:{client_ip}"
            
            # Get current request count
            current_requests = cache.get(cache_key, 0)
            
            # Check if limit exceeded (100 requests per minute)
            if current_requests >= 100:
                response = HttpResponse("Rate limit exceeded", status=429)
                response['Retry-After'] = '60'
                return response
            
            # Increment counter
            cache.set(cache_key, current_requests + 1, 60)
    
    def get_client_ip(self, request: HttpRequest) -> str:
        """Get real client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class APIVersionMiddleware(MiddlewareMixin):
    """
    Handle API versioning
    """
    
    def process_request(self, request: HttpRequest):
        if request.path.startswith('/api/'):
            # Set default API version if not specified
            if not any(f'/api/v{i}/' in request.path for i in range(1, 10)):
                # Redirect to v1 if no version specified
                if request.path == '/api/' or request.path.startswith('/api/'):
                    request.path_info = request.path_info.replace('/api/', '/api/v1/', 1)

class HealthCheckMiddleware(MiddlewareMixin):
    """
    Handle health checks efficiently
    """
    
    def process_request(self, request: HttpRequest):
        if request.path in ['/health/', '/api/health/']:
            # Skip unnecessary middleware for health checks
            response = HttpResponse(
                '{"status": "healthy", "timestamp": "%s"}' % time.time(),
                content_type='application/json'
            )
            response['Cache-Control'] = 'no-cache'
            return response

class CacheControlMiddleware(MiddlewareMixin):
    """
    Set appropriate cache headers
    """
    
    def process_response(self, request: HttpRequest, response: HttpResponse):
        # Set cache headers based on content type and path
        if request.path.startswith('/static/'):
            response['Cache-Control'] = 'public, max-age=31536000'  # 1 year
        elif request.path.startswith('/media/'):
            response['Cache-Control'] = 'public, max-age=86400'  # 1 day
        elif request.path.startswith('/api/'):
            if request.method == 'GET':
                response['Cache-Control'] = 'private, max-age=300'  # 5 minutes
            else:
                response['Cache-Control'] = 'no-cache'
        else:
            response['Cache-Control'] = 'private, max-age=3600'  # 1 hour
        
        return response



