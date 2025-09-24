/**----------------------------------------------------Llamado del preloader-------------------------------------------------*/
(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/SRC/Preloader/preloader.html', false);
  xhr.send(null);
  if (xhr.status === 200) {
    document.write(xhr.responseText); 
  }
})();

/**-----------------------------------------------------Agregar el header--------------------------------------------------*/
fetch('header.html')
      .then(response => response.text())
      .then(data => document.getElementById('header').innerHTML = data);

/**--------------------------------------------Agregar botón flotante de whatsapp------------------------------------*/
fetch("SRC/WhatsappButtom/whatsappButtom.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("whatsapp-container").innerHTML = data;

      const script = document.createElement("script");
      script.src = "SRC/WhatsappButtom/JavaScript/whatsappButtom.js";
      document.body.appendChild(script);
    })
    .catch(error => console.error("Error cargando WhatsApp:", error));

/*----------------------------------------------------Agregar el footer-------------------------------------------*/
fetch("SRC/Footer/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
});

/**------------------------------------------Habilitar botón si se marca el checkbox----------------------------------*/
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