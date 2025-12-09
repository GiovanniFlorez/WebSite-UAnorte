from functools import wraps
from django.shortcuts import redirect

# DECORADORES PARA LA GESTIÓN DE ROLES DE USUARIO
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


# DECORADOR PARA RESTRINGIR EL ACCESO A USUARIOS CON ROL DE 'EDITOR' O 'ADMIN'
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