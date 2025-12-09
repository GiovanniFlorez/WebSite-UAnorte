document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroFormulario");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // VALIDACIÓN Y ENVÍO DEL FORMULARIO DE REGISTRO
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // VERIFICAR SI LA CONTRASEÑA CUMPLE CON LOS REQUISITOS
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

    if (!regex.test(password.value)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
      });
      return;
    }

    // VERIFICAR SI LAS CONTRASEÑAS COINCIDEN
    if (password.value !== confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const formData = new FormData(form);

    // ENVÍO DEL FORMULARIO CON FETCH API
    fetch(window.location.href, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: new FormData(form)
    })    
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        icon: data.status === "success" ? "success" : "error",
        title: data.status === "success" ? "¡Éxito!" : "Error",
        text: data.message,
      }).then(() => {
        if (data.status === "success") {
          window.location.href = "/login/";
        }
      });
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo procesar la solicitud."
      });
    });
  });
});

// MOSTRAR / OCULTAR CONTRASEÑA
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

// MOSTRAR / OCULTAR CONFIRMAR CONTRASEÑA
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