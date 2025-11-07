from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('enviar-contacto/', views.enviar_contacto, name='enviar_contacto'),
    path('enviar-pqrsf/', views.enviar_pqrsf, name='enviar_pqrsf'),
    path('logout/', views.cerrar_sesion, name='cerrar_sesion'),
    
    path('login/', views.CustomLoginView.as_view(), name='login'),

    path('login-redirigir/', views.login_redirigir, name='login_redirigir'),

    path('crud-usuarios/', views.crud_usuarios, name='crud_usuarios'),  # Vista admin
    path('editar-contenido/', views.editar_contenido, name='editar_contenido'),  # Vista editor

    path('<str:pagina>/', views.pagina_estatica, name='pagina_estatica'),
]