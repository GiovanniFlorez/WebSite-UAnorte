/**----------------------------------------------------Llamado del preloader-------------------------------------------------*/
(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../static/Preloader/preloader.html', false);
  xhr.send(null);
  if (xhr.status === 200) {
    document.write(xhr.responseText); 
  }
})();


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


/**-----------------------------------------------------Agregar el header--------------------------------------------------*/
fetch('header.html')
      .then(response => response.text())
      .then(data => document.getElementById('header').innerHTML = data);


/*------------------------------------------------------Slider de imagenes------------------------------------------------*/
const images = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
let interval; 

function showImage(i) {
  images.forEach(img => img.classList.remove("active"));
  images[i].classList.add("active");
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage(index);
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

nextBtn.addEventListener("click", () => {
  nextImage();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevImage();
  resetInterval();
});

function startInterval() {
  interval = setInterval(nextImage, 10000);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

showImage(index);
startInterval();


/*----------------------------------------------------Agregar el footer-------------------------------------------*/
fetch("../static/Footer/footer.html")
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