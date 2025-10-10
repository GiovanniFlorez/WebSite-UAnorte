from django.http import HttpResponse, Http404

from django.shortcuts import render

from django.template.exceptions import TemplateDoesNotExist

def inicio(request):
    return render(request, 'index.html')

def pagina_estatica(request, pagina):
    try:
        return render(request, f'{pagina}.html')
    except TemplateDoesNotExist:
        raise Http404("Página no encontrada")
