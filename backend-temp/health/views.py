from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["GET"])
def health_check(request):
    """
    Health check endpoint for Render.com
    Returns the status of the backend service
    """
    try:
        # Basic health check
        health_data = {
            'status': 'healthy',
            'service': 'fenix-academy-backend',
            'version': '2.0.0',
            'timestamp': None,
            'database': 'unknown',
            'redis': 'unknown'
        }
        
        # Check database connection
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            health_data['database'] = 'connected'
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            health_data['database'] = 'disconnected'
            health_data['status'] = 'degraded'
        
        # Check Redis connection
        try:
            from django.core.cache import cache
            cache.set('health_check', 'ok', 10)
            cache.get('health_check')
            health_data['redis'] = 'connected'
        except Exception as e:
            logger.error(f"Redis health check failed: {e}")
            health_data['redis'] = 'disconnected'
            health_data['status'] = 'degraded'
        
        # Add timestamp
        from django.utils import timezone
        health_data['timestamp'] = timezone.now().isoformat()
        
        return JsonResponse(health_data, status=200)
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JsonResponse({
            'status': 'unhealthy',
            'service': 'fenix-academy-backend',
            'version': '2.0.0',
            'error': str(e),
            'timestamp': None
        }, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def readiness_check(request):
    """
    Readiness check endpoint for Render.com
    Returns whether the service is ready to accept traffic
    """
    try:
        # Check if all critical services are available
        checks = {
            'database': False,
            'redis': False
        }
        
        # Check database
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            checks['database'] = True
        except Exception as e:
            logger.error(f"Database readiness check failed: {e}")
        
        # Check Redis
        try:
            from django.core.cache import cache
            cache.set('readiness_check', 'ok', 10)
            cache.get('readiness_check')
            checks['redis'] = True
        except Exception as e:
            logger.error(f"Redis readiness check failed: {e}")
        
        # Service is ready if all critical services are available
        is_ready = all(checks.values())
        
        return JsonResponse({
            'ready': is_ready,
            'checks': checks,
            'timestamp': None
        }, status=200 if is_ready else 503)
        
    except Exception as e:
        logger.error(f"Readiness check failed: {e}")
        return JsonResponse({
            'ready': False,
            'error': str(e),
            'timestamp': None
        }, status=500)
