document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroFormulario");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  
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
  
    if (password.value !== confirmPassword.value) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }
  
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
      text: "La contraseña ha sido restablecida con éxito.",
    }).then(() => {
      form.submit();
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

const passwordInput2 = document.getElementById('confirmPassword');
const mostrarPasswordCheckbox2 = document.getElementById('mostrarPassword2');

if (mostrarPasswordCheckbox2) {
  const labelText = mostrarPasswordCheckbox2.nextElementSibling;
  labelText.innerHTML = `<i class="fa-solid fa-eye"></i> Mostrar Contraseña`;

  mostrarPasswordCheckbox2.addEventListener('change', () => {
    const icon = labelText.querySelector('i');

    if (mostrarPasswordCheckbox2.checked) {
      passwordInput2.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
      labelText.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Ocultar Contraseña`;
    } else {
      passwordInput2.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
      labelText.innerHTML = `<i class="fa-solid fa-eye"></i> Mostrar Contraseña`;
    }
  });
}