from django.urls import path
from . import views


urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('<str:pagina>/', views.pagina_estatica, name='pagina_estatica'),
]
