function eliminar() {
    Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: "No será posible revertir este cambio luego.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'El producto se elimino.',
                'success'
            ).then((result) => {
                document.formEliminar.submit();
            })
        }
    })
}