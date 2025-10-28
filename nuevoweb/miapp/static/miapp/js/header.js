const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
  const expanded = menu.classList.contains('active');
  toggleBtn.setAttribute('aria-expanded', expanded);
});

document.querySelectorAll('.submenu > a').forEach(link => {
  link.addEventListener('click', e => {
    if(window.innerWidth <= 768){
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    }
  });
});
