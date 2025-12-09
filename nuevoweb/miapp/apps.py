from django.apps import AppConfig

# CONFIGURACIÓN DE LA APLICACIÓN 'miapp'
class MiappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'miapp'

    def ready(self):
        import miapp.signals
