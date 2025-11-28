from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Noticia, SliderImage  # <- usa el nombre correcto

@receiver(post_delete, sender=Noticia)
def borrar_imagen_noticia(sender, instance, **kwargs):
    if instance.imagen:
        instance.imagen.delete(save=False)

@receiver(post_delete, sender=SliderImage)
def borrar_imagen_slider(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)
