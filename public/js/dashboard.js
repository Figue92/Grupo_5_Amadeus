const formE = document.querySelector('#formE');
console.log(formE);

formE.addEventListener('submit', (event) => {
    event.preventDefault();  
    const action = event.target.action;
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
            fetch(action, {
                  method: "POST",
                
            }).then(()=>{
                Swal.fire(
                    'Eliminado!',
                    'El producto se eliminó.',
                    'success'
                  );
            })
        
        }
      });
    });