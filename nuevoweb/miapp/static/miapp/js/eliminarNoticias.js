document.addEventListener("DOMContentLoaded", function() {

    const forms = document.querySelectorAll(".form-eliminar");

    // CONFIRMACIÓN ANTES DE ELIMINAR NOTICIA
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta noticia será eliminada permanentemente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });

        });
    });

});