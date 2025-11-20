from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings 

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


class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='noticias/')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    autor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.titulo