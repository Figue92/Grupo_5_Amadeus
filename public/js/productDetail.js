function agregarProductoAlCarrito(producto) {
    const idProduct = producto.id;
    const cantidad = 1;
    fetch('/api/carrito')
    .then(response => response.json())
    .then(data => {
      const idCart = data.idCart;
      return fetch('/api/carrito/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idCart, idProduct, cantidad })
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el producto en el carrito.');
      }
      actualizarInterfazDeUsuario();
    })
    .catch(error => {
      console.error('Error al guardar el producto en el carrito:', error);
    });
  }
  
  const botonAgregar = document.getElementById('agregar-carrito');
  botonAgregar.addEventListener('click', function() {
    const id = '1'; 
    fetch(`/api/productos/${id}`)
      .then(response => response.json())
      .then(data => {
        agregarProductoAlCarrito(data);
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
      });
  });
   
  
  
  
  
  
  