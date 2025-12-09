document.addEventListener("DOMContentLoaded", () => {
    const logoutForm = document.querySelector("#logoutForm");

    //CONFIRMAR DE CERRAR SESIÓN
    if (logoutForm) {
        logoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            Swal.fire({
                title: '¿Estás seguro de que deseas cerrar sesión?',
                text: "Se cerrará tu sesión.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    logoutForm.submit();
                }
            });
        });
    }
});