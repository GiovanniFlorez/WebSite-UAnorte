from django.shortcuts import redirect

def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.es_admin():
            return view_func(request, *args, **kwargs)
        return redirect('inicio')  # Redirige si no es admin
    return wrapper

def editor_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated and request.user.es_editor():
            return view_func(request, *args, **kwargs)
        return redirect('inicio')  # Redirige si no es editor
    return wrapper
