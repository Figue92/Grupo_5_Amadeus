window.onload = function () {
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');
    
    let labelEmail = document.querySelector('.login__form--email label');
    let labelPassword = document.querySelector('.login__form--password label');

    let smallEmail = document.querySelector('.login__form--email small');
    let smallPassword = document.querySelector('.login__form--password small');
    
    let errorsEmail = [];
    let errorsPassword = [];

    campoVacio(inputEmail, errorsEmail);
    campoVacio(inputPassword, errorsPassword);

    function moverLabel(label) {
        label.classList.add('divFocus');
    }

    function esconderSmallError(small) {
        small.hidden = true;
    }

    function sacarFocus(label, input) {
        label.classList.remove('divFocus');
        label.style.color = 'red';
        input.style.borderColor = 'red';
    }

    function colocarError(errors, clase) {
        let ulErrors = document.querySelector(clase);
        ulErrors.innerHTML = '';
        errors.forEach(error => {
            ulErrors.innerHTML += `<li>${error}</li>`;
        })
    }

    function addStyleError(input, label) {
        label.style.color = 'red';
        input.style.borderColor = 'red';
    }

    function addStyleCorrect(input, label) {
        input.style.borderColor = 'var(--colorAzul)';
        label.style.color = 'var(--colorAzul)';
    }

    function campoVacio(input, errors) {
        if (input.value == '') {
            if (!errors.includes('Campo requerido')) {
                errors.unshift('Campo requerido');
            }
            return true;
        } else {
            const index = errors.indexOf('Campo requerido');
            if (index !== -1) errors.splice(index, 1);
        }
    }

    function invalidEmail(email, errors) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!campoVacio(inputEmail, errors) && !regex.test(email.value)) {
            if (!errors.includes('Usá un formato válido')) {
                errors.push('Usá un formato válido');
            }
            return true;
        } else {
            const index = errors.indexOf('Usá un formato válido');
            if (index !== -1) errors.splice(index, 1);
        }
    }

    /* function registeredEmail(email, errors) {
        const emailList = document.getElementById('emailList');
        const emails = JSON.parse(emailList.dataset.emails);
        if (emails.includes(email.value)) {
            if (!errors.includes('Email ya registrado')) {
                errors.push('Email ya registrado');
            }
            return true;
        } else {
            const index = errors.indexOf('Email ya registrado');
            if (index !== -1) errors.splice(index, 1);
        }
    } */

    if (/[a-zA-Z]/.test(inputEmail.value)) {
        moverLabel(labelEmail);
    }
    inputEmail.addEventListener('focus', () => {
        moverLabel(labelEmail);
        esconderSmallError(smallEmail);
    })
    inputEmail.addEventListener('blur', () => {
        if (campoVacio(inputEmail, errorsEmail)) {
            invalidEmail(inputEmail, errorsEmail);
            /* registeredEmail(inputEmail, errorsEmail); */
            sacarFocus(labelEmail, inputEmail);
        } else if (invalidEmail(inputEmail, errorsEmail)) {
            addStyleError(inputEmail, labelEmail);
        } /* else if (registeredEmail(inputEmail, errorsEmail)) {
            addStyleError(inputEmail, labelEmail);
        } */ else {
            addStyleCorrect(inputEmail, labelEmail);
        }
        colocarError(errorsEmail, '.errorsEmail');
    })
    inputEmail.addEventListener('input', () => {
        if (campoVacio(inputEmail, errorsEmail) || invalidEmail(inputEmail, errorsEmail) /* || registeredEmail(inputEmail, errorsEmail) */) {
            addStyleError(inputEmail, labelEmail);
            invalidEmail(inputEmail, errorsEmail);
            /* registeredEmail(inputEmail, errorsEmail); */
        } else {
            addStyleCorrect(inputEmail, labelEmail);
        }
        colocarError(errorsEmail, '.errorsEmail');
    })


    inputPassword.addEventListener('focus', () => {
        moverLabel(labelPassword);
        esconderSmallError(smallPassword);
    })
    inputPassword.addEventListener('blur', () => {
        if (campoVacio(inputPassword, errorsPassword)) {
            sacarFocus(labelPassword, inputPassword);
        } else {
            addStyleCorrect(inputPassword, labelPassword);
        }
        colocarError(errorsPassword, '.errorsPassword');
    })
    inputPassword.addEventListener('input', () => {
        if (campoVacio(inputPassword, errorsPassword)) {
            addStyleError(inputPassword, labelPassword);
        } else {
            addStyleCorrect(inputPassword, labelPassword);
        }
        colocarError(errorsPassword, '.errorsPassword');
    })

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            let submitButton = document.getElementById('submitBtn');
            let totalErrors = errorsEmail.length + errorsPassword.length;
            if (totalErrors > 0) {
                submitButton.classList.remove('login__form__button--entrar');
                submitButton.classList.add('buttonLogin-submit');
                submitButton.disabled = true;
            } else {
                submitButton.disabled = false;
                submitButton.classList.remove('buttonLogin-submit');
                submitButton.classList.add('login__form__button--entrar');
            }
        });
    });

    let formulario = document.querySelector('.login__form');
    formulario.addEventListener('submit', (e) => {
        campoVacio(inputEmail, errorsEmail);
        campoVacio(inputPassword, errorsPassword);

        totalErrors = errorsEmail.length + errorsPassword.length;
        console.log(totalErrors);
        if (totalErrors > 0) {
            e.preventDefault();
            console.log('NO PASAS');
        }
    })
}