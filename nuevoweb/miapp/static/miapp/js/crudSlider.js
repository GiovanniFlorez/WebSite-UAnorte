const images = document.querySelectorAll("#editor-slider img");
let index = 0;
let interval = null;
let selectedImage = null;

/* ============================== AUTOPLAY DEL SLIDER ============================== */

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

function startInterval() {
    interval = setInterval(nextImage, 6000);
}

function resetInterval() {
    clearInterval(interval);
    if (!selectedImage) startInterval();
}

startInterval();

/* ============================== BOTONES SIGUIENTE / ANTERIOR ============================== */

document.querySelector(".next").onclick = () => { 
    nextImage(); 
    resetInterval();  
};

document.querySelector(".prev").onclick = () => { 
    prevImage(); 
    resetInterval();  
};


/* ============================== SELECCIONAR UNA IMAGEN ============================== */

images.forEach(img => {
    img.addEventListener("click", () => {

        if (selectedImage === img) {
            img.classList.remove("selected");
            selectedImage = null;

            document.getElementById("delete-image-id").value = "";
            document.querySelector(".delete-btn").disabled = true;

            startInterval();
            return;
        }

        clearInterval(interval);

        if (selectedImage) selectedImage.classList.remove("selected");

        selectedImage = img;
        img.classList.add("selected");

        document.getElementById("delete-image-id").value = img.dataset.id;
        document.querySelector(".delete-btn").disabled = false;
    });
});


/* ============================== PREVISUALIZACIÓN DE IMAGEN ============================== */

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        Swal.fire({
            title: '¿Subir esta imagen?',
            imageUrl: e.target.result,
            imageAlt: 'Previsualización',
            showCancelButton: true,
            confirmButtonText: 'Subir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                event.target.form.submit();
            } else {
                event.target.value = "";
            }
        });
    };

    reader.readAsDataURL(file);
}


/* ============================== CONFIRMACIÓN DE ELIMINAR ============================== */

const deleteForm = document.getElementById("delete-form");

deleteForm.addEventListener("submit", function(e){
    e.preventDefault();
    const selected = document.getElementById("delete-image-id").value;

    if (!selected) return;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) deleteForm.submit();
    });
});


/* ============================== SLIDER MÓVIL (SWIPE) ============================== */

let startX = 0;
let isDragging = false;

const slider = document.getElementById("editor-slider");

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(interval);
});

slider.addEventListener("touchend", (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 30) {
        diff > 0 ? prevImage() : nextImage();
    }

    isDragging = false;

    if (!selectedImage) startInterval();
});
