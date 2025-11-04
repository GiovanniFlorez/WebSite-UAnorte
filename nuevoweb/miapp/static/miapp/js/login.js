const inputNombre = document.getElementById('usuario');
const inputpPassword = document.getElementById('password');
const formulario = document.getElementById('miFormulario');

inputNombre.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa tu usuario');
});

inputNombre.addEventListener('input', function() {
    this.setCustomValidity('');
});

inputpPassword.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa tu contraseña');
});

inputpPassword.addEventListener('input', function() {
    this.setCustomValidity('');
});