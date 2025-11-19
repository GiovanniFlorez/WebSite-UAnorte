const inputImagen = document.getElementById("imagen");
const fileName = document.getElementById("file-name");
const imgPreview = document.getElementById("img-preview");

inputImagen.addEventListener("change", function () {
    const archivo = this.files[0];

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