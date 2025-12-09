const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const linksContainer = document.querySelector('.links-container');

let nivel = 0;

// FUNCIÓN PARA TOGGLE SUBMENÚS EN MÓVIL
function toggleSubmenu(submenu) {
  if (submenu.style.maxHeight) {
    submenu.style.maxHeight = null;
  } else {
    submenu.style.maxHeight = submenu.scrollHeight + "px";
  }
}

// EVENTO PARA TOGGLE MENÚ PRINCIPAL
toggleBtn.addEventListener('click', () => {
  nivel++;
  if (nivel === 1) {
    linksContainer.classList.add('visible');
    menu.classList.remove('active');
  } else if (nivel === 2) {
    linksContainer.classList.remove('visible');
    menu.classList.add('active');
  } else {
    linksContainer.classList.remove('visible');
    menu.classList.remove('active');
    nivel = 0;
  }
});

const submenuItems = document.querySelectorAll('.submenu > a');

// EVENTOS PARA TOGGLE SUBMENÚS EN MÓVIL
submenuItems.forEach(item => {
  item.addEventListener('click', e => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      e.preventDefault();
      const submenu = item.nextElementSibling;
      toggleSubmenu(submenu);
    }
  });
});

// RESETEAR ESTILOS AL CAMBIAR TAMAÑO DE VENTANA
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    document.querySelectorAll('.submenu-nivel3').forEach(sub => {
      sub.style.maxHeight = null;
    });
  }
});