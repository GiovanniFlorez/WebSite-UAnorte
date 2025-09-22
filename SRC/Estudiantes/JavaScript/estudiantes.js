/**----------------------------------------------------Llamado del preloader-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    fetch('../Preloader/preloader.html')
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
      });
  });

/**-----------------------------------------------------Agregar el header--------------------------------------------------*/
fetch('../Header/header.html')
.then(response => response.text())
.then(data => document.getElementById('header').innerHTML = data);

/**--------------------------------------------Agregar botón flotante de whatsapp------------------------------------*/
fetch("../WhatsappButtom/whatsappButtom.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("whatsapp-container").innerHTML = data;

      const script = document.createElement("script");
      script.src = "../WhatsappButtom/JavaScript/whatsappButtom.js";
      document.body.appendChild(script);
    })
    .catch(error => console.error("Error cargando WhatsApp:", error));