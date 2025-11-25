from functools import wraps
from django.shortcuts import redirect

# Decorador para verificar si el usuario es administrador
def admin_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')

        rol = getattr(request.user, 'rol', '').strip().lower()

        if rol == 'admin':
            return view_func(request, *args, **kwargs)

        return redirect('inicio')
    return wrapper


# Decorador para verificar si el usuario es editor
def editor_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')

        rol = getattr(request.user, 'rol', '').strip().lower()

        if rol in ['editor', 'admin']:
            return view_func(request, *args, **kwargs)

        return redirect('inicio')
    return wrapper
