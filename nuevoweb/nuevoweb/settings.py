import os
from pathlib import Path

# RUTA BASE DEL PROYECTO
BASE_DIR = Path(__file__).resolve().parent.parent

# CLAVE SECRETA - Cambiar en producción
SECRET_KEY = 'django-insecure-y1qh#76^di&k70zz41h%chowi7k!1pd(u8hf%s2=+j3jb3p2#f'


#////////////////////////////////////////////////////////////////////////////////////
#Cuando se vaya a entregar la pagina cambiar True por False por si hay algun error
#solo muestre una pagina de error y no el erro en si

DEBUG = True

#////////////////////////////////////////////////////////////////////////////////////


# DOMAINOS PERMITIDOS   
ALLOWED_HOSTS = ['*']


# APPS INSTALADAS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'miapp',
]

# MIDDLEWARE
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'nuevoweb.urls'


# TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'miapp' / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.csrf',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'nuevoweb.wsgi.application'


# BASE DE DATOS
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / "db.sqlite3",
    }
}


# VALIDADORES DE CONTRASEÑAS
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]


# CONFIGURACIÓN INTERNACIONALIZACIÓN
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ARCHIVOS ESTÁTICOS (CSS, JS)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'   
STATICFILES_DIRS = [
    BASE_DIR / 'miapp' / 'static',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



# CONFIGURACIÓN DE MEDIOS (ARCHIVOS SUBIDOS POR USUARIOS)
MEDIA_URL = '/media/'
MEDIA_ROOT = '../imageUAnorte'



# ENVÍO DE CORREOS USANDO SENDGRID
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = "" #La API KEY de SendGrid
DEFAULT_FROM_EMAIL = "soporte.sistemas@uanorte.edu.co"  



# CONFIGURACIÓN DE MODELO DE USUARIO PERSONALIZADO
AUTH_USER_MODEL = 'miapp.Usuario'


# REDIRECCIONES DE LOGIN
LOGIN_REDIRECT_URL = '/login-redirigir/' 

LOGIN_URL = '/login/' 
