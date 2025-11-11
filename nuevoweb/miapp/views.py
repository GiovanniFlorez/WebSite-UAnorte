from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.template.exceptions import TemplateDoesNotExist
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import logout
from .decorators import admin_required, editor_required
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from .models import Usuario

import logging

logger = logging.getLogger(__name__)

def inicio(request):
    return render(request, 'index.html')


def pagina_estatica(request, pagina):
    # Lista de páginas protegidas que no deben ir a la dinámica
    protected = [
        'crud-usuarios',
        'registrar-usuarios',
        'modificar-usuarios',
        'eliminar-usuarios',
        'login',
        'login-redirigir'
    ]

    if pagina in protected:
        # Puedes redirigir al inicio o mostrar 404
        raise Http404("Página no encontrada")  

    # Solo renderiza páginas públicas
    try:
        return render(request, f'{pagina}.html')
    except TemplateDoesNotExist:
        raise Http404("Página no encontrada")




def cerrar_sesion(request):
    logout(request)
    return redirect('inicio')


# FUNCIÓN PARA ENVIAR EL FORMULARIO DE CONTACTO
    
def enviar_contacto(request):
    if request.method == "POST":
        nombre = request.POST.get("nombre")
        email = request.POST.get("email")
        asunto_form = request.POST.get("asunto")
        carrera = request.POST.get("carrera")
        documento = request.POST.get("documento")
        telefono = request.POST.get("telefono")
        descripcion = request.POST.get("descripcion")
        acepto = request.POST.get("acepto")

        if not acepto:
            messages.error(request, "Debes aceptar la política de tratamiento de datos.")
            return redirect("inicio")

        asunto = f"Formulario de contacto: {asunto_form} - {nombre}"

        texto_plano = f"""
Has recibido un nuevo mensaje desde el formulario de contacto:

Nombre: {nombre}
Correo electrónico: {email}
Número de documento: {documento}
Teléfono: {telefono}

Mensaje:
{descripcion}

---
Este correo es automático, por favor no responder directamente.
"""

    
        descripcion_html = descripcion.replace('\n', '<br>')

        html = f"""
<html>
    <body>
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Correo electrónico:</strong> {email}</p>
        <p><strong>Carrera de interés:</strong> {carrera}</p>
        <p><strong>Número de documento:</strong> {documento}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Mensaje:</strong> {descripcion_html}</p>
        <hr>
        <p style="font-size: small; color: gray;">Este correo proviene de la página web, por favor no responder directamente.</p>
    </body>
</html>
"""

        try:
            email_msg = EmailMultiAlternatives(
                asunto,
                texto_plano,
                settings.DEFAULT_FROM_EMAIL,
                ["giovanniflorez22@gmail.com"],  # Correo Destinatario
                reply_to=[email]
            )
            email_msg.attach_alternative(html, "text/html")
            email_msg.send()
            messages.success(request, "Tu mensaje ha sido enviado con éxito")
        except Exception as e:
            logger.error(f"Error enviando correo: {e}")
            messages.error(request, "Hubo un error al enviar el mensaje. Intenta más tarde.")

    return render(request, "index.html")




# FUNCIÓN PARA ENVIAR EL FORMULARIO DE PQRSF
def enviar_pqrsf(request):
    if request.method == "POST":
        nombre = request.POST.get("nombre")
        apellido = request.POST.get("apellido")
        tipo_doc = request.POST.get("tipoDocumento")
        documento = request.POST.get("documento")
        telefono = request.POST.get("telefono")
        email = request.POST.get("email")
        cargo = request.POST.get("cargo")
        tipo_pqrsf = request.POST.get("selectCarreraInteres")
        descripcion = request.POST.get("descripcion")
        archivo = request.FILES.get("archivo")

        asunto = f"PQRSF de {nombre} {apellido} - {tipo_pqrsf}"

        texto = f"""
Nuevo PQRSF recibido:

Nombre: {nombre} {apellido}
Tipo de documento: {tipo_doc}
N° Documento: {documento}
Teléfono: {telefono}
Correo: {email}
Cargo: {cargo}
Tipo de PQRSF: {tipo_pqrsf}

Descripción:
{descripcion}

Este correo proviene de la página web, por favor no responder directamente.
"""

        email_msg = EmailMultiAlternatives(
            asunto, texto,
            settings.DEFAULT_FROM_EMAIL,
            ["giovanniflorez22@gmail.com"], #Correo Destinatario
            reply_to=[email]
        )

        if archivo:
            email_msg.attach(archivo.name, archivo.read(), archivo.content_type)

        try:
            email_msg.send()
            messages.success(request, "Tu PQRSF fue enviada con éxito.")
        except Exception as e:
            messages.error(request, f"Error al enviar: {e}")

        return redirect("enviar_pqrsf")

    return render(request, "PQRSF.html")


#Vistas para CRUD de usuarios (solo admins)|

@login_required
@admin_required
def crud_usuarios(request):
    return render(request, "crudUsuarios.html")

@login_required
@admin_required
def registrar_usuarios(request):
    return render(request, "registrarUsuarios.html")

@login_required
@admin_required
def modificar_usuarios(request):
    return render(request, "modificarUsuarios.html")

@login_required
@admin_required
def eliminar_usuarios(request):
    return render(request, "eliminarUsuarios.html")


#Vista para editar contenido (solo editores y admins)

@login_required
@editor_required
def editar_contenido(request):
    return render(request, "editarContenido.html")




@login_required
def login_redirigir(request):
    usuario = request.user
    if usuario.rol == 'admin':
        return redirect('crud_usuarios')
    elif usuario.rol == 'editor':
        return redirect('editar_contenido')
    else:
        return redirect('inicio')


class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True

    def form_invalid(self, form):
        messages.error(self.request, "Usuario o contraseña incorrectos.")
        return super().form_invalid(form)


#Registro de usuarios
@login_required
@admin_required
def registrar_usuario(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if Usuario.objects.filter(username=username).exists():
            messages.error(request, "El nombre de usuario ya existe.")
            return redirect('registrar_usuario')
        
        if Usuario.objects.filter(email=email).exists():
            messages.error(request, "El correo electrónico ya está registrado.")
            return redirect('registrar_usuario')



        user = Usuario.objects.create_user(
            username=username,
            email=email,
            password=password,
            rol=Usuario.ES_EDITOR
        )

        user.is_superuser = False
        user.is_staff = False
        user.save()


        messages.success(request, "El usuario {username} ha sido registrado exitosamente como editor.".format(username=username))
        return redirect('registrar_usuario')

    return render(request, 'registrarUsuarios.html')


# Modificación de usuarios
@login_required
@admin_required
def modificar_usuarios(request):
    usuario = None

    if request.method == 'POST':
        if 'buscar' in request.POST: 
            busqueda = request.POST.get('usuario', '').strip()

            if busqueda:
                try:
                    usuario = Usuario.objects.get(username=busqueda)
                except Usuario.DoesNotExist:
                    try:
                        usuario = Usuario.objects.get(email=busqueda)
                    except Usuario.DoesNotExist:
                        messages.error(request, "No se encontraron usuarios con los criterios proporcionados.")
                        usuario = None

                if usuario and usuario.id == request.user.id:
                    messages.error(request, "No puedes modificar tu propio usuario desde esta sección.")
                    usuario = None
            else:
                messages.error(request, "Por favor ingresa un nombre o correo para buscar.")

        elif 'guardar' in request.POST:  
            user_id = request.POST.get('user_id')

            try:
                usuario = Usuario.objects.get(id=user_id)
            except Usuario.DoesNotExist:
                messages.error(request, "El usuario seleccionado no existe.")
                usuario = None

            if usuario and usuario.id == request.user.id:
                messages.error(request, "No puedes modificar tu propio usuario desde esta sección.")
                usuario = None

            if usuario:
                username = request.POST.get('username').strip()
                email = request.POST.get('email').strip()
                rol = request.POST.get('rol').strip()

                usuario.username = username
                usuario.email = email
                usuario.rol = rol
                usuario.save()

                messages.success(request, f"El usuario {username} ha sido modificado exitosamente.")
                usuario = None

    roles_disponibles = Usuario.ROLES

    return render(request, 'modificarUsuarios.html', {
        'usuario': usuario,
        'roles_disponibles': roles_disponibles
    })


@login_required
@admin_required
def eliminar_usuarios(request):
    usuarios = None

    if request.method == 'POST':
        if 'buscar' in request.POST:
            busqueda = request.POST.get('usuario', '').strip()

            if busqueda:
                usuarios_encontrados = (Usuario.objects.filter(username__icontains=busqueda) |
                                        Usuario.objects.filter(email__icontains=busqueda))

                if not usuarios_encontrados.exists():
                    messages.info(request, "No se encontraron usuarios con los criterios proporcionados.")
                else:
                    if usuarios_encontrados.count() == 1 and usuarios_encontrados.filter(id=request.user.id).exists():
                        messages.warning(request, "No puedes eliminar tu propio usuario.")
                        usuarios = None
                    else:
                        usuarios = usuarios_encontrados.exclude(id=request.user.id)

                        if not usuarios.exists():
                            messages.info(request, "No se encontraron usuarios con los criterios proporcionados.")
            else:
                messages.error(request, "Por favor ingresa un nombre o correo para buscar.")

        elif 'eliminar' in request.POST:
            user_id = request.POST.get('user_id')

            try:
                usuario = Usuario.objects.get(id=user_id)

                if usuario.id == request.user.id:
                    messages.error(request, "No puedes eliminar tu propio usuario.")
                else:
                    nombre = usuario.username
                    usuario.delete()
                    messages.success(request, f"El usuario {nombre} ha sido eliminado exitosamente.")
                    return redirect('eliminar_usuarios')

            except Usuario.DoesNotExist:
                messages.error(request, "El usuario seleccionado no existe.")

    return render(request, 'eliminarUsuarios.html', {'usuarios': usuarios})