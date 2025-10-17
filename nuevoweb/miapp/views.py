from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from django.template.exceptions import TemplateDoesNotExist
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.contrib import messages

def inicio(request):
    return render(request, 'index.html')

def pagina_estatica(request, pagina):
    try:
        return render(request, f'{pagina}.html')
    except TemplateDoesNotExist:
        raise Http404("Página no encontrada")

def enviar_contacto(request):
    if request.method == "POST":
        nombre = request.POST.get("nombre")
        email = request.POST.get("email")
        asunto_form =request.POST.get("asunto")
        carrera = request.POST.get("carrera")
        documento =request.POST.get("documento")
        telefono = request.POST.get("telefono")
        descripcion = request.POST.get("descripcion")
        acepto = request.POST.get("acepto")
        
        if not acepto:
            messages.error(request, "Debes aceptar la política de tratamiento de datos.")
            return redirect("inicio")
        
        asunto = f"Formulario de contacto: {asunto_form} - {nombre}"
        texto_plano = f"""
Has recibido un nuevo mensaje desde el formulario de contacto:

nombre: {nombre}
Correo electrónico: {email}
Número de documento: {documento}
Teléfono: {telefono}

Mensaje:
{descripcion}

---
Este correo es automático, por favor no responder directamente.
"""
        
        html = f"""
<html>
    <body>
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Correo electrónico:</strong> {email}</p>
        <p><strong>Carrera de interés:</strong> {carrera}</p>
        <p><strong>Número de documento:</strong> {documento}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Mensaje:</strong> {descripcion.replace('\n', '<br>')}</p>
        <hr>
        <p style="font-size: small; color: gray;">Este correo es automático, por favor no responder directamente.</p>
    </body>
</html>
"""
        
        email_msg = EmailMultiAlternatives(
            asunto,
            texto_plano,
            settings.DEFAULT_FROM_EMAIL,
            [""], #Aquí debe ir el correo al que llega el mensaje
            reply_to=[email]
        )
        email_msg.attach_alternative(html, "text/html")
        email_msg.send()

        messages.success(request, "Tu mensaje ha sido enviado con éxito")
        return redirect("inicio")
    
    return render(request, "index.html")

