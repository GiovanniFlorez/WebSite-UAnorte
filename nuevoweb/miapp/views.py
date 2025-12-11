from django.http import Http404, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template.exceptions import TemplateDoesNotExist
from django.core.mail import EmailMultiAlternatives, send_mail, BadHeaderError
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import logout, get_user_model
from .decorators import admin_required, editor_required
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
import logging
from .models import Usuario
from django.contrib.auth.tokens import PasswordResetTokenGenerator, default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from smtplib import SMTPException
from .models import Noticia
from django.contrib.auth.decorators import login_required
from .models import SliderImage


# ================================================ VISTAS BÁSICAS ================================================

# FUNCIÓN PARA RENDERIZAR LA PÁGINA DE INICIO
logger = logging.getLogger(__name__)

def inicio(request):
    slider_images = SliderImage.objects.all()
    return render(request, 'miapp/index.html', {
        "slider_images": slider_images
    })


# FUNCIÓN PARA RENDERIZAR PÁGINAS
def pagina_estatica(request, pagina):
    # LISTA DE PÁGINAS PROTEGIDAS QUE REQUIEREN AUTENTICACIÓN
    protected = [
        'crud-usuarios',
        'registrar-usuarios',
        'modificar-usuarios',
        'eliminar-usuarios',
        'login',
        'login-redirigir',
        'crudNoticias',
        'crudUsuarios',
        'editarContenido',
        'crearNoticias',
        'editarNoticias',
        'eliminarNoticias',
        'registrarUsuarios',
        'modificarUsuarios',
        'eliminarUsuarios',
        'crudSlider', 
    ]

    if pagina in protected:
        if not request.user.is_authenticated:
            return redirect(f'/login/?next=/{pagina}')

    try:
        return render(request, f'miapp/{pagina}.html')
    except TemplateDoesNotExist:
        raise Http404("Página no encontrada")




# FUNCIÓN PARA CERRAR SESIÓN
def cerrar_sesion(request):
    logout(request)
    return redirect('inicio')


# ================================================ FORMULARIOS DE CONTACTO Y PQRSF ================================================

logger = logging.getLogger(__name__)

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

        # Asunto del correo
        asunto = f"Formulario de contacto: {asunto_form} - {nombre}"

        # Mensaje en texto plano
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

        # Mensaje en HTML
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
        <p><strong>Mensaje:</strong><br>{descripcion_html}</p>
        <hr>
        <p style="font-size: small; color: gray;">Este correo proviene de la página web, por favor no responder directamente.</p>
    </body>
</html>
"""

        try:
            # Crear y enviar el correo usando SendGrid
            email_msg = EmailMultiAlternatives(
                subject=asunto,
                body=texto_plano,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=["medioseducativos@UAnorte.edu.co"],
                bcc=["giovanniflorez22@gmail.com"],
                reply_to=[email]
            )
            email_msg.attach_alternative(html, "text/html")
            email_msg.send(fail_silently=False)

            messages.success(request, "Tu mensaje ha sido enviado con éxito")

        except Exception as e:
            logger.error(f"Error enviando correo: {e}")
            messages.error(request, "Hubo un error al enviar el mensaje. Intenta más tarde.")

    return render(request, "miapp/index.html")




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

        descripcion_html = descripcion.replace("\n", "<br>")

        texto_plano = f"""
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

        html = f"""
<html>
    <body>
        <h2>Nuevo PQRSF recibido</h2>
        <p><strong>Nombre:</strong> {nombre} {apellido}</p>
        <p><strong>Tipo de documento:</strong> {tipo_doc}</p>
        <p><strong>N° Documento:</strong> {documento}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Correo:</strong> {email}</p>
        <p><strong>Cargo:</strong> {cargo}</p>
        <p><strong>Tipo de PQRSF:</strong> {tipo_pqrsf}</p>
        <p><strong>Descripción:</strong><br>{descripcion_html}</p>
        <hr>
        <p style="font-size: small; color: gray;">Este correo proviene de la página web, por favor no responder directamente.</p>
    </body>
</html>
"""

        # Crear el correo
        email_msg = EmailMultiAlternatives(
            subject=asunto,
            body=texto_plano,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=["medioseducativos@UAnorte.edu.co"],
            bcc=["giovanniflorez22@gmail.com"],
            reply_to=[email]
        )

        email_msg.attach_alternative(html, "text/html")

        # Adjuntar archivo si existe
        if archivo:
            email_msg.attach(archivo.name, archivo.read(), archivo.content_type)

        # Enviar correo
        try:
            email_msg.send(fail_silently=False)
            messages.success(request, "Tu PQRSF fue enviada con éxito.")
        except Exception as e:
            messages.error(request, f"Error al enviar: {e}")

        return redirect("enviar_pqrsf")

    return render(request, "miapp/PQRSF.html")


# ================================================ CRUD USUARIOS ================================================

@login_required
@admin_required
def crud_usuarios(request):
    return render(request, "miapp/crudUsuarios.html")

@login_required
@admin_required
def registrar_usuarios(request):
    return render(request, "miapp/registrarUsuarios.html")

@login_required
@admin_required
def modificar_usuarios(request):
    return render(request, "miapp/modificarUsuarios.html")

@login_required
@admin_required
def eliminar_usuarios(request):
    return render(request, "miapp/eliminarUsuarios.html")


#VISTA PARA EDITAR CONTENIDO (SOLO EDITORES Y ADMIN)

@login_required
@editor_required
def editar_contenido(request):
    return render(request, "miapp/editarContenido.html")


# REDIRECCIÓN POST LOGIN SEGÚN ROL DE USUARIO
@login_required
def login_redirigir(request):
    usuario = request.user
    if usuario.rol == 'admin':
        return redirect('crud_usuarios')
    elif usuario.rol == 'editor':
        return redirect('editar_contenido')
    else:
        return redirect('inicio')


# LOGIN PERSONALIZADO CON MENSAJES DE ERROR
class CustomLoginView(LoginView):
    template_name = 'miapp/login.html'
    redirect_authenticated_user = True

    def form_invalid(self, form):
        messages.error(self.request, "Usuario o contraseña incorrectos.")
        return super().form_invalid(form)


#REGISTRAR USUARIOS
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

    return render(request, 'miapp/registrarUsuarios.html')


# MODIFICAR USUARIOS
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
                    messages.warning(request, "No puedes modificar tu propio usuario.")
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

    return render(request, 'miapp/modificarUsuarios.html', {
        'usuario': usuario,
        'roles_disponibles': roles_disponibles
    })


# ELIMINAR USUARIOS
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

    return render(request, 'miapp/eliminarUsuarios.html', {'usuarios': usuarios})


# ================================================ RECUPERACIÓN DE CONTRASEÑA ================================================

# ENVÍO DE CORREO PARA RECUPERAR CONTRASEÑA
def recuperar_enviar(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'No existe un usuario con ese correo electrónico.'
            })

        token = PasswordResetTokenGenerator().make_token(usuario)
        uid = urlsafe_base64_encode(force_bytes(usuario.pk))

        reset_url = request.build_absolute_uri(
            reverse('password_reset_custom_confirm', kwargs={'uidb64': uid, 'token': token})
        )

        asunto = "Restablecimiento de contraseña"

        mensaje_plano = (
            f"Hola {usuario.username},\n\n"
            "Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n"
            f"{reset_url}\n\n"
            "Si no solicitaste este cambio, ignora este correo.\n\n"
            "Saludos,\nEl equipo de soporte."
        )

        mensaje_html = f"""
        <html>
            <body>
                <p>Hola <strong>{usuario.username}</strong>,</p>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>
                    Haz clic en el siguiente botón para continuar:
                </p>
                <p>
                    <a href="{reset_url}" 
                       style="display:inline-block;padding:10px 20px;background:#007bff;color:white;
                              text-decoration:none;border-radius:5px;">
                        Restablecer contraseña
                    </a>
                </p>
                <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                <br>
                <p>Saludos,<br>El equipo de soporte.</p>
            </body>
        </html>
        """

        try:
            email_msg = EmailMultiAlternatives(
                subject=asunto,
                body=mensaje_plano,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            email_msg.attach_alternative(mensaje_html, "text/html")
            email_msg.send(fail_silently=False)

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': f'Error enviando correo: {str(e)}'
            })

        return JsonResponse({
            'status': 'success',
            'message': 'Se ha enviado un correo para restablecer la contraseña.'
        })

    return JsonResponse({
        'status': 'error',
        'message': 'Método no permitido.'
    })
   

Usuario = get_user_model()

# CONFIRMACIÓN Y CAMBIO DE CONTRASEÑA
def password_reset_custom_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = Usuario.objects.get(pk=uid)
    except Exception:
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return JsonResponse({
                "status": "error",
                "message": "Enlace inválido"
            })
        return render(request, "miapp/recuperarContraseña.html", {"error": "Enlace inválido"})

    if not default_token_generator.check_token(user, token):
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return JsonResponse({
                "status": "error",
                "message": "Token expirado o inválido"
            })
        return render(request, "miapp/recuperarContraseña.html", {"error": "Token inválido"})

    if request.method == "POST":
        pass1 = request.POST.get("new_password1")
        pass2 = request.POST.get("new_password2")

        if not pass1 or not pass2:
            return JsonResponse({
                "status": "error",
                "message": "Debes llenar todos los campos."
            })

        if pass1 != pass2:
            return JsonResponse({
                "status": "error",
                "message": "Las contraseñas no coinciden."
            })

        user.set_password(pass1)
        user.save()

        return JsonResponse({
            "status": "success",
            "message": "Contraseña actualizada correctamente."
        })

    return render(request, "miapp/recuperarContraseña.html", {
        "uidb64": uidb64,
        "token": token
    })

# ================================================ CRUD NOTICIAS ================================================

# CREAR NOTICIAS
@login_required
@editor_required

def crear_noticias(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descripcion = request.POST.get('descripcion')
        imagen = request.FILES.get('imagen')

        if not titulo:
            messages.error(request, "Debes ingresar un título.")
            return redirect('crear_noticias')

        if not descripcion:
            messages.error(request, "Debes ingresar una descripción.")
            return redirect('crear_noticias')

        if not imagen:
            messages.error(request, "Debes seleccionar una imagen.")
            return redirect('crear_noticias')

        Noticia.objects.create(
            titulo=titulo,
            descripcion=descripcion,
            imagen=imagen,
            autor=request.user if request.user.is_authenticated else None
        )

        messages.success(request, "La noticia fue creada correctamente.")
        return redirect('crear_noticias')

    return render(request, 'miapp/crearNoticias.html')


# EDITAR NOTICIAS
@login_required
@editor_required

def editar_noticias(request):
    noticias = Noticia.objects.all().order_by('-fecha_creacion')
    
    if request.method == "POST":
        try:
            id = request.POST.get("noticia_id")
            noticia = Noticia.objects.get(id=id)

            noticia.titulo = request.POST.get("titulo")
            noticia.descripcion = request.POST.get("descripcion")

            if request.FILES.get("imagen"):
                noticia.imagen = request.FILES["imagen"]

            noticia.save()
            messages.success(request, "Noticia actualizada correctamente.")

        except Exception as e:
            messages.error(request, "Hubo un error al actualizar la noticia.")

        return redirect("editar_noticias")
    
    return render(request, 'miapp/editarNoticias.html', {'noticias': noticias})




# ELIMINAR NOTICIAS
@login_required
@editor_required

def eliminar_noticias(request):
    noticias = Noticia.objects.all().order_by('-fecha_creacion')

    if request.method == 'POST':
        noticia_id = request.POST.get('noticia_id')
        noticia = get_object_or_404(Noticia, id=noticia_id)

        if request.user != noticia.autor and not request.user.es_admin():
            messages.error(request, "No tienes permiso para eliminar esta noticia.")
            return redirect('eliminar_noticias')

        noticia.delete()
        messages.success(request, "La noticia fue eliminada correctamente.")
        return redirect('eliminar_noticias')

    return render(request, 'miapp/eliminarNoticias.html', {'noticias': noticias})



# MOSTRAR NOTICIAS PÚBLICAS

def noticias(request):
    lista_noticias = Noticia.objects.all().order_by('-fecha_creacion')
    return render(request, 'miapp/noticias.html', {'noticias': lista_noticias})



# ================================================ CRUD DE SLIDER ================================================

# EDITOR DE SLIDER
@login_required
@editor_required
def slider_editor(request):
    images = SliderImage.objects.all()
    return render(request, "miapp/crudSlider.html", {"images": images})

# AÑADIR IMAGEN AL SLIDER
@login_required
@editor_required
def add_slider_image(request):
    image_file = request.FILES.get("image")
    if image_file:
        SliderImage.objects.create(image=image_file)
    return redirect("slider_editor")

# ELIMINAR IMAGEN DEL SLIDER
@login_required
@editor_required
def delete_slider_image(request):
    image_id = request.POST.get("image_id")
    img = get_object_or_404(SliderImage, id=image_id)
    img.delete()
    return redirect("slider_editor")