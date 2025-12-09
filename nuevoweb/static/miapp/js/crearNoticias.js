const inputImagen = document.getElementById("imagen");
const fileName = document.getElementById("file-name");
const imgPreview = document.getElementById("img-preview");

inputImagen.addEventListener("change", function () {
    const archivo = this.files[0];

    // SI NO HAY ARCHIVO SELECCIONADO
    if (!archivo) {
        fileName.textContent = "Ningún archivo seleccionado";
        imgPreview.style.display = "none";
        return;
    }

    if (!archivo.type.startsWith("image/")) {
        Swal.fire({
            icon: "error",
            title: "Archivo no válido",
            text: "Por favor selecciona una imagen (jpg, png, webp, etc)."
        });
        this.value = "";
        fileName.textContent = "Ningún archivo seleccionado";
        imgPreview.style.display = "none";
        return;
    }

    fileName.textContent = archivo.name;

    // VISTA PREVIA DE LA IMAGEN
    const url = URL.createObjectURL(archivo);
    imgPreview.src = url;
    imgPreview.style.display = "block";

    setTimeout(() => {
        imgPreview.style.opacity = "1";
    }, 50);

    Swal.fire({
        title: "Vista previa de la imagen",
        imageUrl: url,
        imageAlt: "Imagen seleccionada",
        confirmButtonText: "Aceptar",
        width: 500
    });
});


// VALIDAR QUE SE HAYA SELECCIONADO UNA IMAGEN ANTES DE ENVIAR EL FORMULARIO
document.querySelector("form").addEventListener("submit", function(e) {
    const imagen = document.getElementById("imagen").files[0];

    if (!imagen) {
        e.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Debes seleccionar una imagen.",
            text: "Por favor selecciona un archivo antes de continuar."
        });
    }
});