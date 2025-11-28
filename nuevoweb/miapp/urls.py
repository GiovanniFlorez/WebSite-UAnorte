from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.inicio, name='inicio'),

    # Formularios
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

    # Restablecimiento de contraseña
    path('recuperar-enviar/', views.recuperar_enviar, name='recuperar_enviar'),
    path('reset/<uidb64>/<path:token>/', views.password_reset_custom_confirm, name='password_reset_custom_confirm'),

    # Noticias
    path('noticias/', views.noticias, name='noticias'),
    path('crear-noticias/', views.crear_noticias, name='crear_noticias'),
    path('editar-noticias/', views.editar_noticias, name='editar_noticias'),
    path('eliminar-noticias/', views.eliminar_noticias, name='eliminar_noticias'),


    path("slider-editor/", views.slider_editor, name="slider_editor"),
    path("slider-editor/add/", views.add_slider_image, name="add_slider_image"),
    path("slider-editor/delete/", views.delete_slider_image, name="delete_slider_image"),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('<str:pagina>/', views.pagina_estatica, name='pagina_estatica'),
]
