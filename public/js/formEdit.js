console.log('Formulario de edición vinculado con éxito!');
window.onload = async () => {
    const $ = (id) => document.getElementById(id)

    const msgError = (element, message, { target }) => {

        $(element).innerHTML = message
        target.classList.add('is-invalid')
    }

    const cleanError = (element, { target }) => {
        target.classList.remove('is-valid')
        target.classList.remove('is-invalid')
        $(element).innerHTML = null
    }

    try {
        const form = $('form--edit')
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let error = false;

            const name = $('name');
            if (!name.value) {
                msgError('error-name', "Debes ingresar el nombre del producto", e);
                error = true;
            } else if (name.value.length < 5) {
                msgError('error-name', "El nombre del producto debe tener al menos 5 caracteres!", e)
                error = true;
            } else {
                name.classList.add('is-valid');
            }

            const description = $('description');
            if (!description.value) {
                msgError('error-description', "Debes ingresar la descripción del producto", e);
                error = true;
            } else if (description.value.length < 20) {
                msgError('error-description', "La descripción del producto debe tener al menos 20 caracteres!", e)
                error = true;
            } else {
                description.classList.add('is-valid');
            }
            const category = $('category')
            if (!category.value) {
                msgError('error-category', "Debes seleccionar la categoría del producto", e)
                error = true;
            } else {
                category.classList.add('is-valid')
            }

            const marca = $('marca')
            if (!marca.value) {
                msgError('error-marca', "Debes seleccionar la categoría del producto", e)
                error = true
            } else {
                marca.classList.add('is-valid')
            }

            const price = $('price')
            if (!price.value) {
                msgError('error-price', "Debes ingresar el precio del producto", e)
                error = true;
            } else if (price.value < 1) {
                msgError('error-price', "Debes ingresar un precio válido", e)
                error = true
            } else {
                price.classList.add('is-valid')
            }


            const discount = $('discount');
            if (discount.value !== '') {
              if (discount.value > 100) {
                msgError('error-discount', "El descuento del producto no puede ser superior a 100%", e);
                error = true;
              } else if (discount.value < 0) {
                msgError('error-discount', "El descuento del producto no puede ser un número negativo", e);
                error = true;
              } else {
                discount.classList.add('is-valid');
              }
            }

            if (!error) {
            form.submit()
            } else {
                // Mostrar mensaje de error
                $('#form-error').innerHTML = "Debes completar los campos"
            }
        })

        $('name').addEventListener('focus', function (e) {
            cleanError('error-name', e);
          });
          $('description').addEventListener('focus', function (e) {
            cleanError('error-description', e);
          });
          $('price').addEventListener('focus', function (e) {
            cleanError('error-price', e);
          });
          $('category').addEventListener('focus', function (e) {
            cleanError('error-category', e);
          });
          $('marca').addEventListener('focus', function (e) {
            cleanError('error-marca', e);
          });
          $('discount').addEventListener('focus', function (e) {
            cleanError('error-discount', e);
          });
          let maxCaracteres = 500;
          let cantCaracteres = 500;
          let textValido;

          $('description').addEventListener('keyup', function (e) {
              if (textValido && e.key !== 'Backspace') {
                  this.value = textValido
                  msgError('error-description', "Hasta 500 caracteres", e)
                  return null
              }
              cantCaracteres = maxCaracteres - +this.value.length;
              $('cantCaracteres').innerHTML = cantCaracteres;

              if (cantCaracteres === 0) {
                  textValido = this.value.trim()
              } else {
                  textValido = null
              }
              if (cantCaracteres <= 0) {
                  $('descriptionInfo').hidden = true;
                  msgError('descriptionError', "Máximo 500 caracteres", e)
              } else {
                  $('descriptionInfo').hidden = false;
                  cleanError('descriptionError', e)
              }
          }
          )

    } catch (error) { console.log(error) }
}
