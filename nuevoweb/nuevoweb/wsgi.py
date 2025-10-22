import os
from pathlib import Path

from django.core.wsgi import get_wsgi_application

from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nuevoweb.settings')

application = get_wsgi_application()

BASE_DIR = Path(__file__).resolve().parent.parent
static_root = BASE_DIR / 'staticfiles'

application = WhiteNoise(application, root=str(static_root))