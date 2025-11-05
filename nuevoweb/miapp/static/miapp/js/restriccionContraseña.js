const Password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementById("registroFormulario");

form.addEventListener("submit", function(e) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  
    if (!regex.test(Password.value, confirmPassword.value)) {
      e.preventDefault(); 
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
        confirmButtonText: 'Entendido'
      });
    }
});