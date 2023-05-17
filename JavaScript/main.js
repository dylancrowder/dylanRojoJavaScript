const productosEnStock = [
    {
        id: parseInt(1),
        nombre: "buzo",
        cantidad: parseInt(1),
        precio: parseInt(1000),
        img: "/imagenes/253088_900x-removebg-preview.png",
    },
    {
        id: parseInt(2),
        nombre: "remera",
        cantidad: parseInt(1),
        precio: parseInt(4000),
        img: "/imagenes/remerablanca-removebg-preview.png",
    },
    {
        id: parseInt(3),
        nombre: "pantalon",
        cantidad: parseInt(1),
        precio: parseInt(2000),
        img: "/imagenes/25261_900x-removebg-preview.png",
    },


]

let productosEnCarrito = [];

document.addEventListener('DOMContentLoaded', () => {
    productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || []

    sumando()
    mostrarCarrito();
    nuevaCarta()

});

//AGREGA UNA NUEVA CARD
function nuevaCarta() {
    const contenedor = document.querySelector('#javacontenedor')

    productosEnStock.forEach(producto => {
        const { id, nombre, precio, img } = producto

        contenedor.innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <button onclick="nuevoProducto(${id})" class="btn btn-primary boton">agregar al carro </button>
        </div>
    </div>
    `

    });
}


/* AGREGA UN PRODUCTO AL CARRO , INCREMENTA LA CANTIDAD Y SUMA EL PRECIO TOTAL */
function nuevoProducto(id) {

    const existe = productosEnCarrito.some(productoBuscado => productoBuscado.id === id)
    if (existe) {

        productosEnCarrito.map(produc => {

            if (produc.id === id) {
                produc.cantidad++

            }
        })
    } else {

        const item = productosEnStock.find((product) => product.id === id);
        productosEnCarrito.push(item);


    }
    mostrarCarrito()
    guardarEnStorage()

}


/* PINTA EL CARRITO  */
const mostrarCarrito = () => {

    const modalBody = document.querySelector('.modal-body')

    modalBody.innerHTML = '';

    productosEnCarrito.forEach((product) => {
        const { nombre, precio, id, cantidad, img } = product
        modalBody.innerHTML += `
        <div class="carritoImagen">
            <img class="imagenCarrito" src="${img}" alt="">
            <div class="contenedorModal">
                <p>producto :${nombre}</p>
                <p>precio: ${precio}</p>
                <p>cantidad: ${cantidad}</p>
                <button onclick="eliminarProducto (${id})" class="btn btn-danger botonmodal">eliminar producto</button>
                <button  onclick="nuevoProducto(${id})">+</button>
                <button onclick="restarProducto(${id})">-</button>
            </div>
        </div>
`
    })

    guardarEnStorage()
    sumando()
}

//ELIMINAR PRODUCTOS

function eliminarProducto(id) {

    const existe = productosEnCarrito.some(productoBuscado => productoBuscado.id === id)
    if (existe) {

        productosEnCarrito.map(produc => {

            if (produc.id === id) {
                produc.cantidad = 1;

            }
        })
    }

    const prendaID = id;
    productosEnCarrito = productosEnCarrito.filter((prenda) => prenda.id !== prendaID)

    console.log(productosEnCarrito);
    localStorage.clear();
    mostrarCarrito()

}

//GUARDAR EN STORAGE
function guardarEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

/* suma y lo muestra en el total del carrito */
function sumando() {
    let nodoEnvio = document.getElementById("envioCostos");
    let nodo = document.getElementById("precioTotal");
    const precioEnvio = parseInt(15000)
    const envioTotal = 1500;
    let sumadetodo = productosEnCarrito.reduce((acumular, valorsumado) => acumular + valorsumado.precio * valorsumado.cantidad, 0)


    if (sumadetodo > precioEnvio || sumadetodo == 0) {
        nodoEnvio.innerText = "el envio es gratis con la compra mayor a $15.000";
        nodo.innerText = "Total:  $" + sumadetodo;

    }
    else {

        nodoEnvio.innerText = "el costo del envio es de $1500 ";
        nodo.innerText = "Total:  $" + sumadetodo;
        let resultante = sumadetodo + envioTotal
        nodo.innerText = "Total:  $" + resultante;


    }

    /* INCREMENTADORA DE LOS PRODUCTOS EN CARRITO */
    let sumaCarro = productosEnCarrito.reduce((acumular, valorsumado) => acumular + valorsumado.cantidad, 0)
    let numeroCarrito = document.getElementById("carritoNumero");
    numeroCarrito.innerText = sumaCarro;
    console.log(sumaCarro);

    guardarEnStorage()

}


function restarProducto(id) {

    const existe = productosEnCarrito.some(productoBuscado => productoBuscado.id === id)
    if (existe) {

        productosEnCarrito.map(produc => {

            if (produc.id === id && produc.cantidad > 0) {
                produc.cantidad--
            }

            if (produc.cantidad === 0) {

                eliminarProducto(id)
            }
        })


    }


    mostrarCarrito()
    guardarEnStorage()

}

