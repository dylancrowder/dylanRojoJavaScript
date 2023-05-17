const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const numero = document.getElementById("numero");
const formulario = document.getElementById("formulario");
const parrafo = document.getElementById("warning")
const formularioNombre = document.querySelector('.formularioNombre')
const formularioNumero = document.querySelector('.formularioNumero')
const formularioEmail = document.querySelector('.formularioEmail')

formulario.addEventListener("submit", e => {

    e.preventDefault();
    let entrar = false;
    let emailValidar = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

    formularioNombre.innerHTML = "";
    formularioNumero.innerHTML = "";
    formularioEmail.innerHTML = "";
    if (nombre.value.length < 6) {
        formularioNombre.innerHTML += `<p id="nombre">Nombre incorrecto</p>`
        entrar = true;
    }
    if (!emailValidar.test(email.value)) {
        formularioEmail.innerHTML += `<p id="nombre">Email incorrecto</p>`
        entrar = true;

    }

    if (!(/^([0-9]{3})+((-{1})*)+([0-9]{3})$/i.test(numero.value))) {
        formularioNumero.innerHTML += `<p id="nombre">Numero incorrecto</p>`
        entrar = true;
    }

    if (entrar) {
      
    }
    else {

        email.value = ""
        nombre.value = ""
        numero.value = ""
        Swal.fire('Enviado');
    }

})