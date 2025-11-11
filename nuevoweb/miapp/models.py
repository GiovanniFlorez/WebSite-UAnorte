from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

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
    

def validate_image(image):
    file_size = image.file.size
    limit_mb = 5
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError(f"El archivo debe pesar menos de {limit_mb} MB")
    return image
