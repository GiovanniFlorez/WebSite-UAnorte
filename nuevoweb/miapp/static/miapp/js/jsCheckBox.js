// HABILITA O DESHABILITA EL BOTÓN DE ENVÍO SEGÚN EL ESTADO DEL CHECKBOX
  document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('checkboxAcepto');
    const boton = document.getElementById('botonEnviar');
  
    if (checkbox && boton) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          boton.disabled = false;
          boton.classList.add('enabled');
        } else {
          boton.disabled = true;
          boton.classList.remove('enabled');
        }
      });
    }
  });