window.onload = function () {


    /* let labels = document.querySelectorAll('div label'); */
    /* let inputs = document.querySelectorAll('.register__form div input'); */
    let inputName = document.getElementById('name');
    let inputSurname = document.getElementById('surname');
    let inputEmail = document.getElementById('email');
    let inputCodarea = document.getElementById('codarea');
    let inputTel = document.getElementById('tel');
    let inputPassword = document.getElementById('password');
    let inputRepeatPass = document.getElementById('password2');
    let inputCondiciones = document.querySelector('.checkCondiciones input');
    let inputPolitica = document.querySelector('.checkPolitica input');

    let labelName = document.querySelector('.register__form--name label');
    let labelSurname = document.querySelector('.register__form--surname label');
    let labelEmail = document.querySelector('.register__form--email label');
    let labelCodarea = document.querySelector('.register__form--codarea label');
    let labelTel = document.querySelector('.register__form--tel label');
    let labelPassword = document.querySelector('.register__form--pass label');
    let labelRepeatPass = document.querySelector('.register__form--repeatPass label');

    let smallName = document.querySelector('.register__form--name small');
    let smallSurname = document.querySelector('.register__form--surname small');
    let smallEmail = document.querySelector('.register__form--email small');
    let smallCodarea = document.querySelector('.register__form--codarea small');
    let smallTel = document.querySelector('.register__form--tel small');
    let smallPassword = document.querySelector('.register__form--pass small');
    let smallCondiciones = document.querySelector('.checkCondiciones small');
    let smallPolitica = document.querySelector('.checkPolitica small');

    let errorsName = [];
    let errorsSurname = [];
    let errorsEmail = [];
    let errorsCodarea = [];
    let errorsTel = [];
    let errorsPassword = [];
    let errorsRepeatPass = [];

    campoVacio(inputName, errorsName);
    campoVacio(inputSurname, errorsSurname);
    campoVacio(inputCodarea, errorsCodarea);
    campoVacio(inputTel, errorsTel);
    campoVacio(inputEmail, errorsEmail);
    campoVacio(inputPassword, errorsPassword);
    campoVacio(inputRepeatPass, errorsRepeatPass);

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

    function pocosCaracteres(input, errors, cant) {
        if (input.value.length < cant && !campoVacio(input, errors)) {
            if (!errors.includes(`Al menos ${cant} letras`)) {
                errors.push(`Al menos ${cant} letras`);
            }
            return true;
        } else {
            const index = errors.indexOf(`Al menos ${cant} letras`);
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

    function registeredEmail(email, errors) {
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
    }

    function notNumbers(input, errors) {
        const regex = /^[0-9]*$/;
        if (!regex.test(input.value)) {
            if (!errors.includes('Sólo números')) {
                errors.push('Sólo números');
            }
            return true;
        } else {
            const index = errors.indexOf('Sólo números');
            if (index !== -1) errors.splice(index, 1);
        }
    }

    function muchNumbers(input, errors, cant) {
        if (input.value.length > cant) {
            if (!errors.includes(`Máximo ${cant} números`)) {
                errors.push(`Máximo ${cant} números`);
            }
            return true;
        } else {
            const index = errors.indexOf(`Máximo ${cant} números`);
            if (index !== -1) errors.splice(index, 1);
        }
    }

    function invalidPassword(password, errors) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!campoVacio(inputPassword, errors) && !regex.test(password.value)) {
            if (!errors.includes('Mínimo 8 caracteres, una minúscula, una mayúscula, un número y un caracter especial')) {
                errors.push('Mínimo 8 caracteres, una minúscula, una mayúscula, un número y un caracter especial');
            }
            return true;
        } else {
            const index = errors.indexOf('Mínimo 8 caracteres, una minúscula, una mayúscula, un número y un caracter especial');
            if (index !== -1) errors.splice(index, 1);
        }
    }

    function notMatchPass() {
        if (!campoVacio(inputRepeatPass, errorsRepeatPass) && inputRepeatPass.value != inputPassword.value) {
            if (!errorsRepeatPass.includes('Las contraseñas no coinciden')) {
                errorsRepeatPass.push('Las contraseñas no coinciden');
            }
            return true;
        } else {
            const index = errorsRepeatPass.indexOf('Las contraseñas no coinciden');
            if (index !== -1) errorsRepeatPass.splice(index, 1);
        }
    }

    if (/[a-zA-Z]/.test(inputName.value)) {
        moverLabel(labelName);
    }
    if (/[a-zA-Z]/.test(inputSurname.value)) {
        moverLabel(labelSurname);
    }
    if (/[a-zA-Z]/.test(inputEmail.value)) {
        moverLabel(labelEmail);
    }
    if (/\d/.test(inputCodarea.value)) {
        moverLabel(labelCodarea);
    }
    if (/\d/.test(inputTel.value)) {
        moverLabel(labelTel);
    }

    inputName.addEventListener('focus', () => {
        moverLabel(labelName);
        esconderSmallError(smallName);
    })
    inputName.addEventListener('blur', () => {
        if (campoVacio(inputName, errorsName)) {
            sacarFocus(labelName, inputName);
        } else if (pocosCaracteres(inputName, errorsName, 2)) {
            addStyleError(inputName, labelName);
        } else {
            addStyleCorrect(inputName, labelName);
        }
        colocarError(errorsName, '.errorsName');
    })
    inputName.addEventListener('input', () => {
        if (campoVacio(inputName, errorsName) || pocosCaracteres(inputName, errorsName, 2)) {
            pocosCaracteres(inputName, errorsName, 2);
            addStyleError(inputName, labelName);
        } else {
            addStyleCorrect(inputName, labelName);
        }
        colocarError(errorsName, '.errorsName');
    })

    inputSurname.addEventListener('focus', () => {
        moverLabel(labelSurname);
        esconderSmallError(smallSurname);
    })
    inputSurname.addEventListener('blur', () => {
        if (campoVacio(inputSurname, errorsSurname)) {
            sacarFocus(labelSurname, inputSurname);
        } else if (pocosCaracteres(inputSurname, errorsSurname, 2)) {
            addStyleError(inputSurname, labelSurname);
        } else {
            addStyleCorrect(inputSurname, labelSurname);
        }
        colocarError(errorsSurname, '.errorsSurname');
    })
    inputSurname.addEventListener('input', () => {
        if (campoVacio(inputSurname, errorsSurname) || pocosCaracteres(inputSurname, errorsSurname, 2)) {
            pocosCaracteres(inputSurname, errorsSurname, 2);
            addStyleError(inputSurname, labelSurname);
        } else {
            addStyleCorrect(inputSurname, labelSurname);
        }
        colocarError(errorsSurname, '.errorsSurname');
    })

    inputEmail.addEventListener('focus', () => {
        moverLabel(labelEmail);
        esconderSmallError(smallEmail);
    })
    inputEmail.addEventListener('blur', () => {
        if (campoVacio(inputEmail, errorsEmail)) {
            invalidEmail(inputEmail, errorsEmail);
            registeredEmail(inputEmail, errorsEmail);
            sacarFocus(labelEmail, inputEmail);
        } else if (invalidEmail(inputEmail, errorsEmail)) {
            addStyleError(inputEmail, labelEmail);
        } else if (registeredEmail(inputEmail, errorsEmail)) {
            addStyleError(inputEmail, labelEmail);
        } else {
            addStyleCorrect(inputEmail, labelEmail);
        }
        colocarError(errorsEmail, '.errorsEmail');
    })
    inputEmail.addEventListener('input', () => {
        if (campoVacio(inputEmail, errorsEmail) || invalidEmail(inputEmail, errorsEmail) || registeredEmail(inputEmail, errorsEmail)) {
            invalidEmail(inputEmail, errorsEmail);
            registeredEmail(inputEmail, errorsEmail);
            addStyleError(inputEmail, labelEmail);
        } else {
            addStyleCorrect(inputEmail, labelEmail);
        }
        colocarError(errorsEmail, '.errorsEmail');
    })

    inputCodarea.addEventListener('focus', () => {
        moverLabel(labelCodarea);
        esconderSmallError(smallCodarea);
    })
    inputCodarea.addEventListener('blur', () => {
        if (campoVacio(inputCodarea, errorsCodarea)) {
            notNumbers(inputCodarea, errorsCodarea);
            muchNumbers(inputCodarea, errorsCodarea, 5);
            sacarFocus(labelCodarea, inputCodarea);
        } else if (notNumbers(inputCodarea, errorsCodarea)) {
            addStyleError(inputCodarea, labelCodarea);
        } else if (muchNumbers(inputCodarea, errorsCodarea, 5)) {
            addStyleError(inputCodarea, labelCodarea);
        } else {
            addStyleCorrect(inputCodarea, labelCodarea);
        }
        colocarError(errorsCodarea, '.errorsCodarea');
    })
    inputCodarea.addEventListener('input', () => {
        if (campoVacio(inputCodarea, errorsCodarea) || notNumbers(inputCodarea, errorsCodarea) || muchNumbers(inputCodarea, errorsCodarea, 5)) {
            notNumbers(inputCodarea, errorsCodarea);
            muchNumbers(inputCodarea, errorsCodarea, 5);
            addStyleError(inputCodarea, labelCodarea);
        } else {
            addStyleCorrect(inputCodarea, labelCodarea);
        }
        colocarError(errorsCodarea, '.errorsCodarea');
    })

    inputTel.addEventListener('focus', () => {
        moverLabel(labelTel);
        esconderSmallError(smallTel);
    })
    inputTel.addEventListener('blur', () => {
        if (campoVacio(inputTel, errorsTel)) {
            notNumbers(inputTel, errorsTel);
            muchNumbers(inputTel, errorsTel, 10);
            sacarFocus(labelTel, inputTel);
        } else if (notNumbers(inputTel, errorsTel)) {
            addStyleError(inputTel, labelTel);
        } else if (muchNumbers(inputTel, errorsTel, 10)) {
            addStyleError(inputTel, labelTel);
        } else {
            addStyleCorrect(inputTel, labelTel);
        }
        colocarError(errorsTel, '.errorsTel');
    })
    inputTel.addEventListener('input', () => {
        if (campoVacio(inputTel, errorsTel) || notNumbers(inputTel, errorsTel) || muchNumbers(inputTel, errorsTel, 10)) {
            notNumbers(inputTel, errorsTel);
            muchNumbers(inputTel, errorsTel, 10);
            addStyleError(inputTel, labelTel);
        } else {
            addStyleCorrect(inputTel, labelTel);
        }
        colocarError(errorsTel, '.errorsTel');
    })

    inputPassword.addEventListener('focus', () => {
        moverLabel(labelPassword);
        esconderSmallError(smallPassword);
    })
    inputPassword.addEventListener('blur', () => {
        if (campoVacio(inputPassword, errorsPassword)) {
            invalidPassword(inputPassword, errorsPassword);
            sacarFocus(labelPassword, inputPassword);
        } else if (invalidPassword(inputPassword, errorsPassword)) {
            addStyleError(inputPassword, labelPassword);
        } else {
            addStyleCorrect(inputPassword, labelPassword);
        }
        colocarError(errorsPassword, '.errorsPassword');
    })
    inputPassword.addEventListener('input', () => {
        if (campoVacio(inputPassword, errorsPassword) || invalidPassword(inputPassword, errorsPassword)) {
            invalidPassword(inputPassword, errorsPassword);
            addStyleError(inputPassword, labelPassword);
        } else {
            addStyleCorrect(inputPassword, labelPassword);
        }
        colocarError(errorsPassword, '.errorsPassword');
    })

    inputRepeatPass.addEventListener('focus', () => {
        moverLabel(labelRepeatPass);
    })
    inputRepeatPass.addEventListener('blur', () => {
        if (campoVacio(inputRepeatPass, errorsRepeatPass)) {
            sacarFocus(labelRepeatPass, inputRepeatPass);
        } else if (notMatchPass()) {
            addStyleError(inputRepeatPass, labelRepeatPass);
        } else {
            addStyleCorrect(inputRepeatPass, labelRepeatPass);
        }
        colocarError(errorsRepeatPass, '.errorsRepeatPass');
    })
    inputRepeatPass.addEventListener('input', () => {
        if (campoVacio(inputRepeatPass, errorsRepeatPass) || notMatchPass()) {
            notMatchPass();
            addStyleError(inputRepeatPass, labelRepeatPass);
        } else {
            addStyleCorrect(inputRepeatPass, labelRepeatPass);
        }
        colocarError(errorsRepeatPass, '.errorsRepeatPass');
    })

    inputCondiciones.addEventListener('change', () => {
        if (inputCondiciones.checked) {
            smallCondiciones.hidden = true;
        } else {
            smallCondiciones.hidden = false;
        }
    });

    inputPolitica.addEventListener('change', () => {
        if (inputPolitica.checked) {
            smallPolitica.hidden = true;
        } else {
            smallPolitica.hidden = false;
        }
    });

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            let submitButton = document.getElementById('submitBtn');
            let totalErrors = errorsName.length + errorsSurname.length + errorsEmail.length + errorsCodarea.length + errorsTel.length + errorsPassword.length + errorsRepeatPass.length;
            if (totalErrors > 0) {
                submitButton.classList.remove('register__form__button--siguiente');
                submitButton.classList.add('button-submit');
                submitButton.disabled = true;
            } else {
                submitButton.disabled = false;
                submitButton.classList.remove('button-submit');
                submitButton.classList.add('register__form__button--siguiente');
            }
        });
    });

    let formulario = document.querySelector('.register__form');
    formulario.addEventListener('submit', (e) => {
        pocosCaracteres(inputName, errorsName, 2);
        pocosCaracteres(inputName, errorsName, 2);
        campoVacio(inputCodarea, errorsCodarea);
        campoVacio(inputTel, errorsTel);
        notNumbers(inputCodarea, errorsCodarea);
        notNumbers(inputTel, errorsTel);
        muchNumbers(inputCodarea, errorsCodarea, 5);
        muchNumbers(inputTel, errorsTel, 10);
        invalidEmail(inputEmail, errorsEmail);
        invalidPassword(inputPassword, errorsPassword);
        notMatchPass();

        totalErrors = errorsName.length + errorsSurname.length + errorsEmail.length + errorsCodarea.length + errorsTel.length + errorsPassword.length + errorsRepeatPass.length;
        console.log(totalErrors);
        if (totalErrors > 0) {
            e.preventDefault();
            console.log('NO PASAS');
        }
    })



}