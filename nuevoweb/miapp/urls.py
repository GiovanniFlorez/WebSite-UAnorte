from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('enviar-contacto/', views.enviar_contacto, name='enviar_contacto'),
    path('enviar-pqrsf/', views.enviar_pqrsf, name='enviar_pqrsf'),

    # Cerrar Sesión
    path('logout/', auth_views.LogoutView.as_view(next_page='inicio'), name='cerrar_sesion'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('login-redirigir/', views.login_redirigir, name='login_redirigir'),

    # Vistas protegidas
    path('crud-usuarios/', views.crud_usuarios, name='crud_usuarios'),
    path('editar-contenido/', views.editar_contenido, name='editar_contenido'),
    path('registrar-usuarios/', views.registrar_usuario, name='registrar_usuario'),
    path('modificar-usuarios/', views.modificar_usuarios, name='modificar_usuarios'),
    path('eliminar-usuarios/', views.eliminar_usuarios, name='eliminar_usuarios'),


    # URL dinámica solo para páginas públicas
    path('<str:pagina>/', views.pagina_estatica, name='pagina_estatica'),
]
