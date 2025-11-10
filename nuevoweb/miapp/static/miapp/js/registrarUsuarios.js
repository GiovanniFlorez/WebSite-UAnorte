const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById("registroFormulario");

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


document.addEventListener("DOMContentLoaded", () => {
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  
    if (!regex.test(password.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
        confirmButtonText: 'Entendido'
      });
      return;
    }
  
    Swal.fire({
      title: "Verificando datos...",
      text: "Por favor espera unos segundos",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          form.submit();
        }, 1000);
      }
    });
  });
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
