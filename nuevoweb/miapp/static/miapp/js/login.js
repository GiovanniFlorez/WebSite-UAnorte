const inputNombre = document.getElementById('usuario');
const inputpPassword = document.getElementById('password');
const formulario = document.getElementById('formLogin');

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

const loginContainer = document.getElementById('loginContainer');
const recuperarContainer = document.getElementById('recuperarContainer');
const olvidasteLink = document.getElementById('olvidasteLink');
const mostrarPasswordDiv = document.getElementById('mostrarPasswordDiv');

function mostrarElemento(elemento) {
  elemento.style.display = 'flex';
  setTimeout(() => elemento.classList.add('show'), 10);
}

function ocultarElemento(elemento) {
  elemento.classList.remove('show');
  setTimeout(() => elemento.style.display = 'none', 500);
}

olvidasteLink.addEventListener('click', (e) => {
  e.preventDefault();

  ocultarElemento(loginContainer);
  mostrarPasswordDiv.style.display = 'none';

  setTimeout(() => mostrarElemento(recuperarContainer), 500);
});

const volverLogin = document.getElementById('volverLogin');
if (volverLogin) {
  volverLogin.addEventListener('click', (e) => {
    e.preventDefault();

    ocultarElemento(recuperarContainer);
    setTimeout(() => {
      mostrarElemento(loginContainer);
      mostrarPasswordDiv.style.display = 'block';
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (form) {
    form.addEventListener("submit", (e) => {
      Swal.fire({
        title: "Iniciando sesión...",
        text: "Por favor espera unos segundos",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    });
  }
});



