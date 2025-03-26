document.addEventListener("DOMContentLoaded", () => {
  const listaProductos = document.getElementById("lista-productos");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const btnCompra = document.getElementById("btn-compra");
  const mensajeCompra = document.getElementById("mensaje-compra");
  let carrito = [];

  // Cargar productos desde la FakeStore API
  fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
          data.forEach(producto => {
              const productoElemento = document.createElement("div");
              productoElemento.classList.add("producto");
              productoElemento.innerHTML = `
                  <img src="${producto.image}" alt="${producto.title}" class="producto-img">
                  <h3>${producto.title}</h3>
                  <p>Precio: $${producto.price.toFixed(2)}</p>
                  <button onclick="agregarAlCarrito(${producto.id}, '${producto.title}', ${producto.price})">Agregar al Carrito</button>
              `;
              listaProductos.appendChild(productoElemento);
          });
      });

  // Agregar producto al carrito
  window.agregarAlCarrito = (id, title, price) => {
      const itemIndex = carrito.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
          carrito[itemIndex].cantidad += 1;
      } else {
          carrito.push({ id, title, price, cantidad: 1 });
      }
      actualizarCarrito();
  };

  window.modificarCantidad = (id, cambio) => {
    const itemIndex = carrito.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        carrito[itemIndex].cantidad += cambio;
        if (carrito[itemIndex].cantidad <= 0) {
            carrito.splice(itemIndex, 1);
        }
        actualizarCarrito();
    }
};

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        total += item.price * item.cantidad;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.title} - $${(item.price * item.cantidad).toFixed(2)} (x${item.cantidad})
            <button onclick="modificarCantidad(${item.id}, -1)">-</button>
            <button onclick="modificarCantidad(${item.id}, 1)">+</button>
        `;
        listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total.toFixed(2);
}

  // Simular compra
  btnCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        mensajeCompra.textContent = "El carrito está vacío.";
        mensajeCompra.classList.remove("hidden");
        setTimeout(() => mensajeCompra.classList.add("hidden"), 3000);
    } else {
        mensajeCompra.innerHTML = `<span class="loader"></span> Procesando compra...`;
        mensajeCompra.classList.remove("hidden");

        setTimeout(() => {
            mensajeCompra.textContent = "¡Gracias por tu compra!";
            carrito = [];
            actualizarCarrito();

            setTimeout(() => mensajeCompra.classList.add("hidden"), 3000);
        }, 3000);
    }
});

});
