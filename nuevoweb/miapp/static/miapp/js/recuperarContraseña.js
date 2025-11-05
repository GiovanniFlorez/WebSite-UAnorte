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
        text: "Formulario enviado con éxito.",
      }).then(() => {
        form.submit();
      });
    });
  });
  