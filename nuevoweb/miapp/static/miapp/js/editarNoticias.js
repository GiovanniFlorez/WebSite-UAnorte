document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalEditar");
    const cerrar = document.querySelector(".cerrar-modal");

    const editID = document.getElementById("edit_id");
    const editTitulo = document.getElementById("edit_titulo");
    const editDescripcion = document.getElementById("edit_descripcion");
    const editImagen = document.getElementById("edit_imagen");
    const editPreview = document.getElementById("edit-img-preview");
    const editFilename = document.getElementById("edit-file-name");

    const botonesEditar = document.querySelectorAll(".btn-editar");

    // ABRIR MODAL Y RELLENAR CAMPOS
    botonesEditar.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            const noticia = document.querySelectorAll(".columnas")[index];

            const titulo = noticia.querySelector(".subtitulo").innerText;
            const descripcion = noticia.querySelector(".textNoticias").innerText;
            const id = noticia.querySelector('input[name="noticia_id"]').value;
            const imagen = noticia.querySelector(".imgNoticias")?.src || "";

            editID.value = id;
            editTitulo.value = titulo;
            editDescripcion.value = descripcion;

            if (imagen) {
                editPreview.src = imagen;
                editPreview.style.display = "block";
                editFilename.textContent = "Imagen actual";
            }

            modal.classList.remove("oculto");
        });
    });

    cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });

    // PREVISUALIZAR IMAGEN SELECCIONADA
    editImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        editFilename.innerText = file ? file.name : "Ningún archivo seleccionado";

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                editPreview.src = reader.result;
                editPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
});