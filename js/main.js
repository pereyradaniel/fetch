let carritoDeCompras = [];
let stockProductos = [    {
  id: 1,
  producto: "Yerba",
  marca: "La Merced",
  categoria: "Almacen",
  peso: 500,
  precio: 400,
  stock: 50,
  img: "./img/yerba-mate-la-merced-opt.jpg"
},
{
  id: 2,
  producto: "Dulce de Leche",
  marca: "La Serenisima",
  categoria: "Lacteos",
  peso: 500,
  precio: 400,
  stock: 50,
  img: "./img/dulce-de-leche-la-serenisima-estilo-colonial-opt.jpg"
},];

const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonTerminar = document.getElementById("boton-terminar");
const finCompra = document.getElementById("fin-compra");

const contadorCarrito = document.getElementById("contador-carrito");
const precioTotal = document.getElementById("precioTotal");

const selectCategoria = document.getElementById("selectCategoria");

document.addEventListener("DOMContentLoaded", () => {

  mostrarDatos();
  });

//traer productos de stock.json

const traerProductos = async() => {
  let respuesta = await fetch('./stock.json');
  return respuesta.json()
}

const mostrarDatos = async() => {
  let productos = await traerProductos()
  console.log(productos)
  
  }
// En esta parte es donde estoy trabado. Como  puedo hacer para pasar el array de 
// productos y pasarselo a stockProductos, intenté de varias formas y me da error
// Dejé el array de productos arriba cargado con dos productos de muestra para que no de error por todos lados

 console.log(stockProductos)


/*filtro de categorias con operador ternario*/
selectCategoria.addEventListener("change", () => {
  selectCategoria.value==="Todos" ? mostrarProductos(stockProductos) : (arrayNuevo = stockProductos.filter(
          (item) => item.categoria == selectCategoria.value)
        );
        mostrarProductos(arrayNuevo);
  });
  
  mostrarProductos(stockProductos);
  
  //logica de como muestro el Ecommerce con aplicación de destructuración
  function mostrarProductos(array) {
    contenedorProductos.innerHTML = "";
  
    for (const el of array) {
      let { img, producto, precio, marca, id } = el;
      let div = document.createElement("div");
      div.className = "productos";
      div.innerHTML = `<div class="card" style="width: 18rem;">
          <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${producto}</h5>
              <h6>Precio $${precio}</h6>
              <p class="card-text">${marca}</p>
              <a id="boton${id}" class="btn btn-light btn-estilo"><i class="fa-solid fa-cart-arrow-down"></i> Agregar al Carrito</a>
          </div>
      </div> `;
  
      contenedorProductos.appendChild(div);
  
      let btnAgregar = document.getElementById(`boton${el.id}`);
  
      btnAgregar.addEventListener("click", () => {
        agregarAlCarrito(el.id);
        Toastify({
          text: "Producto agregado "+el.producto+" "+ el.marca,
          duration: 4000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          
          onClick: function(){} // Callback after click
        }).showToast();
      });
    }
  }
mostrarDatos();

/*funcion agregar*/
function agregarAlCarrito(id) {
  let yaExiste = carritoDeCompras.find((elemento) => elemento.id == id);
  console.log("Carrito de compras ++"+carritoDeCompras)

  if (yaExiste) {
    yaExiste.cantidad = yaExiste.cantidad + 1;

    document.getElementById(
      `cantidad${yaExiste.id}`
    ).innerHTML = `<p id="cantidad${yaExiste.id}">cantidad: ${yaExiste.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let productoAgregar = stockProductos.find((ele) => ele.id === id);
    productoAgregar.cantidad = 1;
    carritoDeCompras.push(productoAgregar);
    actualizarCarrito();
    mostrarCarrito(productoAgregar);
  }
}

/*Funcion mostrar carrito con destructuración aplicada*/
function mostrarCarrito(productoAgregar) {
guardarCarrito();

  let { img, producto, precio, id, cantidad } = productoAgregar;
  let div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `<img src="${img}" width=50>
                <p>${producto}</p>
                <p>Precio: $${precio}</p>
                <p id="cantidad${id}">cantidad: ${cantidad}</p>
                <button id="eliminar${id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;
  contenedorCarrito.appendChild(div);

  let btnEliminar = document.getElementById(`eliminar${id}`);
  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      // Pop Up que muestra producto eliminado

      Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            "linear-gradient(90deg, rgba(157,4,4,1) 44%, rgba(255,63,63,1) 81%, rgba(255,0,0,1) 100%)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      btnEliminar.parentElement.remove();
      carritoDeCompras = carritoDeCompras.filter(
        (item) => item.id !== productoAgregar.id
      );
      actualizarCarrito();
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;

      // Pop Up que muestra el mensaje de una unidad eliminada de determinado producto
      Toastify({
        text: "Eliminaste una unidad del producto",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:
            "linear-gradient(90deg, rgba(157,4,4,1) 44%, rgba(255,63,63,1) 81%, rgba(255,0,0,1) 100%)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      document.getElementById(
        `cantidad${productoAgregar.id}`
      ).innerHTML = `<p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>`;

      actualizarCarrito();
    }
  });
}

// funcion que suma la cantidad de elementos del carrito
function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  let memoriaCarrito = localStorage.getItem("carrito")
  let recuperacion = JSON.parse(memoriaCarrito)
  console.log("Carrito De compras" + memoriaCarrito );
}
