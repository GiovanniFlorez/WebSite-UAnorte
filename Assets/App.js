/*------------------Movimiento de imágenes del slider con flechas y automático-------------*/
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

/*-------------------------------------Agregar el footer-------------------------------------------*/
fetch("../SRC/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
