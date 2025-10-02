/**----------------------------------------------------Llamado del preloader-------------------------------------------------*/
(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../static/Preloader/preloader.html', false);
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
  fetch("../static/WhatsappButtom/whatsappButtom.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("whatsapp-container").innerHTML = data;
  
        const script = document.createElement("script");
        script.src = "../static/WhatsappButtom/JavaScript/whatsappButtom.js";
        document.body.appendChild(script);
      })
      .catch(error => console.error("Error cargando WhatsApp:", error));
  
  /*----------------------------------------------------Agregar el footer-------------------------------------------*/
  fetch("../static/Footer/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
  });