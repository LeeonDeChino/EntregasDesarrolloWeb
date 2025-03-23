const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $listaProductos = d.querySelector("#lista-productos");

// Objeto para rastrear productos en el carrito
let carrito = {};

// Función para actualizar el carrito en la UI
function actualizarCarrito() {
  $listaCarrito.innerHTML = "";
  let total = 0;

  for (let id in carrito) {
    const producto = carrito[id];

    const $itemCarrito = d.createElement("li");
    $itemCarrito.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

    // Contador de cantidad
    const $cantidadSpan = d.createElement("span");
    $cantidadSpan.textContent = producto.cantidad;
    $cantidadSpan.classList.add("cantidad");

    // Botón para aumentar cantidad
    const $btnMas = d.createElement("button");
    $btnMas.textContent = "+";
    $btnMas.addEventListener("click", () => {
      carrito[id].cantidad++;
      actualizarCarrito();
    });

    // Botón para disminuir cantidad
    const $btnMenos = d.createElement("button");
    $btnMenos.textContent = "-";
    $btnMenos.addEventListener("click", () => {
      if (carrito[id].cantidad > 1) {
        carrito[id].cantidad--;
      } else {
        delete carrito[id];
      }
      actualizarCarrito();
    });

    $itemCarrito.appendChild($cantidadSpan);
    $itemCarrito.appendChild($btnMas);
    $itemCarrito.appendChild($btnMenos);
    $listaCarrito.appendChild($itemCarrito);

    total += producto.precio * producto.cantidad;
  }

  $totalCarrito.textContent = total;
}

// Evento para agregar productos al carrito
d.addEventListener("click", function (e) {
  if (e.target.matches(".producto")) {
    const $producto = e.target;
    let id = $producto.getAttribute("data-id");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    if (carrito[id]) {
      carrito[id].cantidad++;
    } else {
      carrito[id] = { nombre, precio, cantidad: 1 };
    }

    actualizarCarrito();
  }
});

// Simulación de compra con loader y contador
$btnCompra.addEventListener("click", function () {
  if ($listaCarrito.children.length > 0) {
    let contador = 5;

    const $loader = d.createElement("div");
    $loader.classList.add("mensaje-proceso");
    $loader.innerHTML = `Procesando compra... <br><span class="loader">${contador}</span>`;
    $mensajeCompra.innerHTML = "";
    $mensajeCompra.appendChild($loader);
    $mensajeCompra.classList.remove("hidden");

    // Contador regresivo
    const intervalo = setInterval(() => {
      contador--;
      $loader.querySelector(".loader").textContent = contador;

      if (contador === 0) {
        clearInterval(intervalo);
        $mensajeCompra.innerHTML = "<h2>¡Compra realizada con éxito!</h2><p>Gracias por su compra.</p>";
        carrito = {};
        actualizarCarrito();
      }
    }, 1000);
  } else {
    alert("El carrito está vacío");
  }

  async function obtenerProductosFake() {
    try {
      let response = await fetch("https://fakestoreapi.com/products");
      let productos = await response.json();
  
      // Limpiar productos previos
      $listaProductos.innerHTML = "";
  
      productos.forEach((producto) => {
        const $producto = d.createElement("article");
        $producto.classList.add("producto");
        $producto.setAttribute("data-id", producto.id);
        $producto.setAttribute("data-nombre", producto.title);
        $producto.setAttribute("data-precio", producto.price);
  
        $producto.innerHTML = `
          <img src="${producto.image}" alt="${producto.title}" width="100">
          <p>${producto.title} - $${producto.price}</p>
        `;
  
        $listaProductos.appendChild($producto);
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", function (e) {
    console.log(e);
    obtenerProductosFake();
  });

});