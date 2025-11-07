from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Contenido

class UsuarioAdmin(UserAdmin):
    list_display = ('username', 'email', 'rol', 'is_staff', 'is_active')
    
    list_filter = ('rol', 'is_staff', 'is_active')
    
    search_fields = ('username', 'email')
    
    fieldsets = UserAdmin.fieldsets + (
        ('Información extra', {'fields': ('rol',)}),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Contenido)
