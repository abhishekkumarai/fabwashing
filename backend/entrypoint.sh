#!/usr/bin/env bash
set -e

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Seeding demo data (idempotent)..."
python manage.py seed || true

echo "Collecting static files..."
python manage.py collectstatic --noinput || true

echo "Starting gunicorn on 0.0.0.0:${PORT:-8000}..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3
