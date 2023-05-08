console.log('dashboard primero');
document.querySelectorAll('.eliminar-btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const productoId = event.currentTarget.dataset.productoId;
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
        fetch(`/productos/delete/${productoId}?_method=DELETE`, {
          method: "POST",
        }).then(() => {
          Swal.fire(
            'Eliminado!',
            'El producto se eliminó.',
            'success'
          )
        })
      }
    })
  })
})
