document.querySelectorAll('.form-eliminar').forEach(form => {

    // CONFIRMACIÓN ANTES DE ELIMINAR USUARIO
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        Swal.fire({
            title: '¿Eliminar usuario?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#001d9e',
            cancelButtonColor: '#e63946',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'eliminar';
                input.value = '1';
                form.appendChild(input);

                form.submit();
            }
        });
    });
});
