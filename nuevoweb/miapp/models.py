from django.db import models
from django.contrib.auth.models import AbstractUser

# Crear un modelo de usuario personalizado
class Usuario(AbstractUser):
    ES_EDITOR = 'editor'
    ES_ADMIN = 'admin'

    ROLES = [
        (ES_EDITOR, 'Editor'),
        (ES_ADMIN, 'Administrador'),
    ]

    rol = models.CharField(max_length=10, choices=ROLES, default=ES_EDITOR)

    def es_admin(self):
        return self.rol == self.ES_ADMIN
    
    def es_editor(self):
        return self.rol == self.ES_EDITOR