const whatsappBtn = document.getElementById('whatsappBtn');
const whatsappPopup = document.getElementById('whatsappPopup');
const openChatBtn = document.getElementById('openChatBtn');
const closePopupBtn = document.getElementById('closePopupBtn');

const chatText = document.getElementById('chatText');

let isHoveringBtn = false;
let isHoveringPopup = false;
let manualOpen = false;

whatsappBtn.addEventListener('mouseenter', () => {
  isHoveringBtn = true;
  if (!manualOpen) {
    whatsappPopup.classList.add('visible');
  }
});

// MANEJO DEL HOVER EN EL BOTÓN Y EL POPUP
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

// MANEJO DEL CLICK EN EL BOTÓN Y LOS BOTONES DEL POPUP
whatsappBtn.addEventListener('click', () => {
  if (manualOpen) {
    manualOpen = false;
    whatsappPopup.classList.remove('manual-open');
    whatsappPopup.classList.remove('visible');
  } else {
    manualOpen = true;
    whatsappPopup.classList.add('manual-open');
    whatsappPopup.classList.remove('visible');
  }
});

// ABRIR WHATSAPP EN UNA NUEVA PESTAÑA
openChatBtn.addEventListener('click', () => {
  window.open(
    'https://api.whatsapp.com/send/?phone=3172566612&text&type=phone_number&app_absent=0',
    '_blank',
    'noopener'
  );
  manualOpen = false;
  whatsappPopup.classList.remove('manual-open');
  whatsappPopup.classList.remove('visible');
});

closePopupBtn.addEventListener('click', () => {
  manualOpen = false;
  whatsappPopup.classList.remove('manual-open');
  whatsappPopup.classList.remove('visible');
});

document.addEventListener('click', (e) => {
  if (!whatsappBtn.contains(e.target) && !whatsappPopup.contains(e.target)) {
    if (manualOpen) return;
    whatsappPopup.classList.remove('visible');
  }
});