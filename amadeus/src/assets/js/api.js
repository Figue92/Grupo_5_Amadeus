export const createProduct = (productData) => {
    return fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
  
        return data;
      })
      .catch(error => {
   
        console.error(error);
      });
  };