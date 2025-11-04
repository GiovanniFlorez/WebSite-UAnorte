const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');

inputNombre.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el nombre del usuario');
});

inputNombre.addEventListener('input', function() {
    this.setCustomValidity('');
});

inputEmail.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el email del usuario');
});

inputEmail.addEventListener('input', function() {
    this.setCustomValidity('');
});

inputUsuario.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el usuario');
});

inputUsuario.addEventListener('input', function() {
    this.setCustomValidity('');
});

inputPassword.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa una contraseña');
});

inputPassword.addEventListener('input', function() {
    this.setCustomValidity('');
});