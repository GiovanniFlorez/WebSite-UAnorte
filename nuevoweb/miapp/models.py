from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings 

# MODELO DE USUARIO PERSONALIZADO CON ROLES DE 'EDITOR' Y 'ADMIN'
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


# MODELO DE NOTICIA CON CAMPOS PARA TÍTULO, DESCRIPCIÓN, IMAGEN Y FECHAS DE CREACIÓN Y MODIFICACIÓN
class Noticia(models.Model):
    titulo = models.CharField(max_length=2000)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='noticias/')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    autor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.titulo
    


# MODELO PARA GESTIONAR IMÁGENES EN UN SLIDER CON ORDEN PERSONALIZABLE
class SliderImage(models.Model):
    image = models.ImageField(upload_to="slider/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Imagen {self.id}"
