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
    'https://api.whatsapp.com/send/?phone=3172566612&text&type=phone_number&app_absent=0',
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

