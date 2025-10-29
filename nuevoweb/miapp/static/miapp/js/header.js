const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const linksContainer = document.querySelector('.links-container');
const navbar = document.querySelector('.navbar');

let nivel = 0;

toggleBtn.addEventListener('click', () => {
  nivel++;

  if (nivel === 1) {
    linksContainer.classList.add('visible');
    menu.classList.remove('active');
  } 
  else if (nivel === 2) {
    linksContainer.classList.remove('visible');
    menu.classList.add('active');
  } 
  else {
    linksContainer.classList.remove('visible');
    menu.classList.remove('active');
    nivel = 0;
  }
});
