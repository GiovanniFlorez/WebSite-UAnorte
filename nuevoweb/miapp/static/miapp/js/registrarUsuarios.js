const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const form = document.getElementById("registroFormulario");

nombre.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el nombre del usuario');
});

nombre.addEventListener('input', function() {
    this.setCustomValidity('');
});

email.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el email del usuario');
});

email.addEventListener('input', function() {
    this.setCustomValidity('');
});

usuario.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa el usuario');
});

usuario.addEventListener('input', function() {
    this.setCustomValidity('');
});

password.addEventListener('invalid', function() {
    this.setCustomValidity('Por favor, ingresa una contraseña');
});

password.addEventListener('input', function() {
    this.setCustomValidity('');
});


form.addEventListener("submit", function(e) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  
  if (!regex.test(password.value)) {
    e.preventDefault(); 
    Swal.fire({
      icon: 'error',
      title: 'Contraseña inválida',
      text: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
      confirmButtonText: 'Entendido'
    });
  }
});

const passwordInput = document.getElementById('password');
const mostrarPasswordCheckbox = document.getElementById('mostrarPassword');

if (mostrarPasswordCheckbox) {
  const labelText = mostrarPasswordCheckbox.nextElementSibling;
  labelText.innerHTML = `<i class="fa-solid fa-eye"></i> Mostrar Contraseña`;

  mostrarPasswordCheckbox.addEventListener('change', () => {
    const icon = labelText.querySelector('i');

    if (mostrarPasswordCheckbox.checked) {
      passwordInput.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
      labelText.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Ocultar Contraseña`;
    } else {
      passwordInput.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
      labelText.innerHTML = `<i class="fa-solid fa-eye"></i> Mostrar Contraseña`;
    }
  });
}