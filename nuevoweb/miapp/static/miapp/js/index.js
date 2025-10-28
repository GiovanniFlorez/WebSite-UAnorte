/*------------------------------------------------------Slider de imágenes------------------------------------------------*/
const images = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slider = document.querySelector(".slider");

let index = 0;
let interval;
let startX = 0;
let isDragging = false;

// Mostrar imagen actual
function showImage(i) {
  images.forEach(img => img.classList.remove("active"));
  images[i].classList.add("active");
}

// Cambiar imagen
function nextImage() {
  index = (index + 1) % images.length;
  showImage(index);
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

// Botones
nextBtn.addEventListener("click", () => {
  nextImage();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevImage();
  resetInterval();
});

// Auto rotación
function startInterval() {
  interval = setInterval(nextImage, 10000);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

// Movimiento con mouse
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  clearInterval(interval); // pausa el auto-slide
});

slider.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  let endX = e.pageX;
  handleSwipe(endX - startX);
  isDragging = false;
  startInterval(); // reanuda auto-slide
});

slider.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    startInterval();
  }
});

// Movimiento táctil (móvil)
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  clearInterval(interval);
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
  startInterval();
});

// Detectar dirección del deslizamiento
function handleSwipe(diff) {
  if (Math.abs(diff) > 10) { // sensibilidad
    if (diff > 0) {
      prevImage();
    } else {
      nextImage();
    }
  }
}

// Inicialización
showImage(index);
startInterval();
