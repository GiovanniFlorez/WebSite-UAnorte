from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('enviar-contacto/', views.enviar_contacto, name='enviar_contacto'),
    path('enviar-pqrsf/', views.enviar_pqrsf, name='enviar_pqrsf'),
    path('logout/', views.cerrar_sesion, name='cerrar_sesion'),
    path('<str:pagina>/', views.pagina_estatica, name='pagina_estatica'),
]