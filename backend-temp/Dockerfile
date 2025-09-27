# Fenix Academy Backend Dockerfile
# Multi-stage build for optimal production image

FROM python:3.12-slim AS base

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd --create-home --shell /bin/bash fenix

# Set work directory
WORKDIR /app

# Copy requirements
COPY requirements-django.txt .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements-django.txt

# Development stage
FROM base AS development

# Install development dependencies
RUN pip install \
    pytest-django \
    pytest-cov \
    black \
    flake8 \
    mypy \
    django-debug-toolbar

# Copy source code
COPY --chown=fenix:fenix . .

# Switch to non-root user
USER fenix

# Expose port
EXPOSE 8000

# Development command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Production stage
FROM base AS production

# Copy source code
COPY --chown=fenix:fenix . .

# Create necessary directories
RUN mkdir -p /app/logs /app/media /app/staticfiles && \
    chown -R fenix:fenix /app

# Switch to non-root user
USER fenix

# Collect static files
RUN python manage.py collectstatic --noinput

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

# Expose port
EXPOSE 8000

# Production command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--worker-class", "gevent", "--worker-connections", "1000", "--max-requests", "1000", "--max-requests-jitter", "100", "--preload", "fenix_academy.wsgi:application"]