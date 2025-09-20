/**----------------------------------------------------Llamado del preloader-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
  fetch('SRC/Preloader/preloader.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    });
});


/**------------------------------------------------Boton flotante de whatsapp-------------------------------------------*/
const whatsappBtn = document.getElementById('whatsappBtn');
const whatsappPopup = document.getElementById('whatsappPopup');
const openChatBtn = document.getElementById('openChatBtn');
const closePopupBtn = document.getElementById('closePopupBtn');

const chatText = document.getElementById('chatText');

let isHoveringBtn = false;
let isHoveringPopup = false;
let manualOpen = false;

function mostrarAbrir() {
  chatText.textContent = "Abrir chat";
}

function mostrarCerrar() {
  chatText.textContent = "Cerrar chat";
}

whatsappBtn.addEventListener('mouseenter', () => {
  isHoveringBtn = true;
  if (!manualOpen) {
    whatsappPopup.classList.add('visible');
  }
});

whatsappBtn.addEventListener('mouseleave', () => {
  isHoveringBtn = false;
  setTimeout(() => {
    if (!isHoveringBtn && !isHoveringPopup && !manualOpen) {
      whatsappPopup.classList.remove('visible');
    }
  }, 150);
});

whatsappPopup.addEventListener('mouseenter', () => {
  isHoveringPopup = true;
  if (!manualOpen) {
    whatsappPopup.classList.add('visible');
  }
});

whatsappPopup.addEventListener('mouseleave', () => {
  isHoveringPopup = false;
  setTimeout(() => {
    if (!isHoveringBtn && !isHoveringPopup && !manualOpen) {
      whatsappPopup.classList.remove('visible');
    }
  }, 150);
});

whatsappBtn.addEventListener('click', () => {
  if (manualOpen) {
    manualOpen = false;
    whatsappPopup.classList.remove('manual-open');
    whatsappPopup.classList.remove('visible');
    mostrarAbrir();
  } else {
    manualOpen = true;
    whatsappPopup.classList.add('manual-open');
    whatsappPopup.classList.remove('visible');
    mostrarCerrar();
  }
});

openChatBtn.addEventListener('click', () => {
  window.open(
    'https://web.whatsapp.com/send?phone=573172566612&text=Hola%2C%20te%20escribo%20desde%20la%20pagina%20web.%0AQuiero%20mas%20informaci%C3%B3n',
    '_blank',
    'noopener'
  );
  manualOpen = false;
  whatsappPopup.classList.remove('manual-open');
  whatsappPopup.classList.remove('visible');
  mostrarAbrir();
});

closePopupBtn.addEventListener('click', () => {
  manualOpen = false;
  whatsappPopup.classList.remove('manual-open');
  whatsappPopup.classList.remove('visible');
  mostrarAbrir();
});

document.addEventListener('click', (e) => {
  if (!whatsappBtn.contains(e.target) && !whatsappPopup.contains(e.target)) {
    if (manualOpen) return;
    whatsappPopup.classList.remove('visible');
  }
});


/**-----------------------------------------------------Agregar el header--------------------------------------------------*/
fetch('SRC/Header/header.html')
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
  interval = setInterval(nextImage, 3000);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

showImage(index);
startInterval();


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
