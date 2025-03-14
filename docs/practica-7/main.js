const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");

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
});
/* 
No apliques un evento a varios elementos mediante un loop, por que es una mala práctica, si quieres asinar un evento a varios elementos usa la DELEGACIÓN DE EVENTOS

const $productos = d.querySelectorAll(".producto");
console.log($productos);

$productos.forEach(function (el) {
  el.addEventListener("click", function (e) {
    alert("Presionando Producto");
  });
}); */