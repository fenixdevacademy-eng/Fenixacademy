from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.views.generic import TemplateView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


# Health check view
def health_check(request):
    return HttpResponse('{"status": "healthy", "version": "2.0.0"}', 
                       content_type='application/json')

urlpatterns = [
    # Admin interface
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/v1/', include('api.urls')),
    path('api/auth/', include('users.urls')),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # Health check
    path('health/', include('health.urls')),
    path('api/health/', include('health.urls')),
    
    # Django Allauth
    path('accounts/', include('allauth.urls')),
    
    # Frontend catch-all (for SPA routing)
    re_path(r'^(?!api|admin|health|accounts|static|media).*$', 
           TemplateView.as_view(template_name='index.html'), 
           name='frontend'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
    # Debug toolbar
    try:
        import debug_toolbar
        urlpatterns += [
            path('__debug__/', include(debug_toolbar.urls)),
        ]
    except ImportError:
        pass
    
    # Silk profiling
    try:
        urlpatterns += [
            path('silk/', include('silk.urls', namespace='silk')),
        ]
    except ImportError:
        pass 