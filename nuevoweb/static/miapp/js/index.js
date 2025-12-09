// --------------------------- Slider de imágenes --------------------------- 

const images = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slider = document.querySelector(".slider");

let index = 0;
let interval;
let startX = 0;
let isDragging = false;

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
  interval = setInterval(nextImage, 10000); // Tiempo que tarda en cambiar la imagen (10 segundos)
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  clearInterval(interval); 
});

slider.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  let endX = e.pageX;
  handleSwipe(endX - startX);
  isDragging = false;
  startInterval();
});

slider.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    startInterval();
  }
});

// EVENTOS TÁCTILES PARA DISPOSITIVOS MÓVILES
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  clearInterval(interval);
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
  startInterval();
});

function handleSwipe(diff) {
  if (Math.abs(diff) > 30) { // sensibilidad
    if (diff > 0) {
      prevImage();
    } else {
      nextImage();
    }
  }
}

showImage(index);
startInterval();