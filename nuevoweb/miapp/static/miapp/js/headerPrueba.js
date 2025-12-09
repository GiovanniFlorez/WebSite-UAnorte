const btnHamb = document.getElementById("hamburger-btn");
const menuDesplegable = document.getElementById("menu-desplegable");

btnHamb.addEventListener("click", () => {
  menuDesplegable.classList.toggle("active");
  btnHamb.textContent = menuDesplegable.classList.contains("active") ? "✖" : "☰";
});

/* BOTÓN MÁS */
const btnMas = document.getElementById("btnMas");
const menuExtra = document.getElementById("menu-extra");

btnMas.addEventListener("click", () => {
  menuExtra.classList.toggle("active");
  btnMas.textContent = menuExtra.classList.contains("active") ? "Más ▲" : "Más ▼";
});


/* SUBMENÚS */
function toggleMenuLevel(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const submenu = this.nextElementSibling;
        const arrow = this.querySelector(".flecha");

        // cerrar solo submenús del mismo nivel
        const siblings = Array.from(this.parentElement.parentElement.children);

        siblings.forEach(li => {
            if (li !== this.parentElement) {
                const sm = li.querySelector(":scope > ul");
                const ar = li.querySelector(":scope > a .flecha");
                if (sm) sm.classList.remove("active");
                if (ar) ar.style.transform = "rotate(0deg)";
            }
        });

        submenu.classList.toggle("active");
        arrow.style.transform = submenu.classList.contains("active")
            ? "rotate(90deg)"
            : "rotate(0deg)";
    });
}


/* NIVEL 2 — solo hijos directos de navbar */
document.querySelectorAll("#navbar-completo > ul > li.submenu > a")
    .forEach(link => toggleMenuLevel(link));

/* NIVEL 3 — solo hijos dentro de .submenu-nivel2 */
document.querySelectorAll(".submenu-nivel2 > li.submenu > a")
    .forEach(link => toggleMenuLevel(link));
