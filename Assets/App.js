const images = document.querySelectorAll(".slider img");
let index = 0;

function showNextImage() {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}

setInterval(showNextImage, 3000);
