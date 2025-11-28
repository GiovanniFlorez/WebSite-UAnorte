from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Noticia, SliderImage

class UsuarioAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'rol', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('rol', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    fieldsets = UserAdmin.fieldsets + (
        ('Información extra', {'fields': ('rol',)}),
    )

admin.site.register(Usuario, UsuarioAdmin)

admin.site.register(Noticia)


@admin.register(SliderImage)
class SliderImageAdmin(admin.ModelAdmin):
    list_display = ("id", "image", "order")
    list_editable = ("order",)
