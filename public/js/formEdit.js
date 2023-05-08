console.log('Formulario de edición vinculado con éxito!');
window.onload = async ()=>{
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
    $('name').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-name', "Debes ingresar el nombre del producto", e)
        break;
case this.value.length < 5:
    msgError('error-name', "El nombre del producto debe tener al menos 5 caracteres!", e)
break;
    default:
        this.classList.add('is-valid')
        break;
}
    })
$('name').addEventListener('focus', function(e){
    cleanError('error-name', e)
})
$('description').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-description', "Debes ingresar la descripción del producto", e)
        break;
case this.value.length < 20:
    msgError('error-description', "La descripción del producto debe tener al menos 20 caracteres!", e)
break;
case this.value.length > 500:
    msgError('error-description', "La descripción del productos debe tener hasta 500 caracteres", e )
    default:
        this.classList.add('is-valid')
        break;
}
})
let maxCaracteres = 500;
let cantCaracteres = 500;

$('description').addEventListener('focus', function(e){
cleanError('error-description', e)
})


let textValido;

$('description').addEventListener('keyup', function(e){
    if (textValido && e.key !== 'Backspace') {
        this.value = textValido
        msgError('error-description', "Hasta 500 caracteres", e)
        return null
    }
    cantCaracteres = maxCaracteres - +this.value.length;
    $('cantCaracteres').innerHTML = cantCaracteres;

    if (cantCaracteres === 0){
        textValido = this.value.trim()
    }else{
        textValido = null
    }
    if (cantCaracteres <= 0){
        $('descriptionInfo').hidden = true;
        msgError('descriptionError', "Máximo 500 caracteres", e)
    }else{
        $('descriptionInfo').hidden = false;
        cleanError('descriptionError', e)
    }
    }
)
$('category').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-category', "Debes seleccionar la categoría del producto", e)
        break;
    default:
        this.classList.add('is-valid')
        break;
}
    })
    $('category').addEventListener('focus', function(e){
    cleanError('error-category', e)
})
$('marca').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-marca', "Debes seleccionar la categoría del producto", e)
        break;
    default:
        this.classList.add('is-valid')
        break;
}
    })
    $('marca').addEventListener('focus', function(e){
    cleanError('error-marca', e)
})
$('price').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-price', "Debes ingresar el precio del producto", e)
        break;
case this.value < 1:
    msgError('error-price', "Debes ingresar un precio válido", e)
break;
    default:
        this.classList.add('is-valid')
        break;
}
    })
    $('price').addEventListener('focus', function(e){
    cleanError('error-price', e)
})
$('discount').addEventListener('blur', function(e){
switch (true) {
    case !this.value:
msgError('error-discount', "Este campo no puede estar vacío. Si no hay descuento, por favor ingresa cero(0)", e)
        break;
case this.value > 100:
    msgError('error-discount', "El descuento del producto no puede ser superior a 100%", e)
break;
case this.value < 0:
    msgError('error-discount', "El descuento del producto no puede ser un número negativo", e)
break;
    default:
        this.classList.add('is-valid')
        break;
}
    })
$('discount').addEventListener('focus', function(e){
cleanError('error-discount', e)
})
$('form--edit').addEventListener('submit', function (e){
    e.preventDefault()
    let error = false;
      for (let i = 0; i < this.elements.length - 4; i++) {

        if (!this.elements[i].value || this.elements[i].classList.contains('is-invalid')) {
          error = true
        }

      }

      if (!error) {
        this.submit()
      } else {
        for (let i = 0; i < this.elements.length -4; i++) {
            !this.elements[i].value && this.elements[i].classList.add('is-invalid') 
                
            }
            $('form-error').innerHTML = "Debes completar los campos"
        }
})
 
} catch (error) {
    console.log(error);
}
   
}