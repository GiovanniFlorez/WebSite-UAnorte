from django.db import models
from django.contrib.auth.models import AbstractUser

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
    

class Contenido(models.Model):
    titulo = models.CharField(max_length=200)
    texto = models.TextField()
    imagen = models.ImageField(upload_to='imagenes/', blank=True, null=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo