console.log("Bienvenid@ a CraveSoftware Store");

// 1. Crear un Arreglo de Productos
let productos = [
    { nombre: "Labubu", precio: 700, stock: 8 },
    { nombre: "FunkoPop", precio: 600, stock: 10 },
    { nombre: "FidgetSpinner", precio: 150, stock: 12 },
    { nombre: "Slime", precio: 90, stock: 20 },
    { nombre: "Rubik", precio: 40,  stock: 20 }
];

// Carrito de compras
let carrito = [];


// 2. Agregar Productos al Carrito
function agregarAlCarrito(nombreProducto, cantidad){
    for (let producto of productos){
        if(producto.nombre===nombreProducto){
            if(producto.stock>=cantidad){
                carrito.push({
                    nombre:nombreProducto,
                    cantidad:cantidad,
                    precio:producto.precio
                });

                producto.stock-=cantidad;
                console.log(`*${cantidad} ${producto.nombre}(s) agregado(s) al carrito.`);
                console.log(productos);
                console.log(carrito);
            }
            else{
                console.log(`No hay suficiente stock de ${nombreProducto}. Solo quedan ${producto.stock} disponibles.`)
                return;
            }
        }
        /*else{
            console.log("El producto no existe");
        }*/
    }
}

// 3. Eliminar Productos del Carrito
function eliminarDelCarrito(nombreProducto, cantidad) {
  let index = carrito.findIndex(item => item.nombre === nombreProducto);
  
  if (index !== -1) {
      let item = carrito[index];
      
      if (cantidad >= item.cantidad) {
          carrito.splice(index, 1); // Elimina el producto si la cantidad es igual o mayor a la del carrito
      } else {
          item.cantidad -= cantidad;
      }

      // Reponer stock
      let productoOriginal = productos.find(p => p.nombre === nombreProducto);
      if (productoOriginal) {
          productoOriginal.stock += cantidad;
      }

      console.log(`* ${cantidad} ${nombreProducto}(s) eliminado(s) del carrito.`);
      console.log(productos);
      console.log(carrito);
  } else {
      console.log(`El producto ${nombreProducto} no está en el carrito.`);
  }
}


//4. Calcular el Total del Carrito:

function calcularTotal(){
    let total =0;
    for (let item of carrito) {
        total+=item.precio*item.cantidad;
    }
    return total;
}


//5. Aplicar Descuentos: 

function aplicarDescuento(total){
    if(total>100){
        return total*0.9;
    }
    return total;
}


//6. Simular el Proceso de Compra:

function procesarCompra() {
  console.log("Procesando compra...");
  
  let tiempoRestante = 3;
  let intervalo = setInterval(() => {
      console.log(`Compra confirmada en ${tiempoRestante}...`);
      tiempoRestante--;
      
      if (tiempoRestante < 0) {
          clearInterval(intervalo);
          let total = calcularTotal();
          total = aplicarDescuento(total);
          console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
      }
  }, 1000);
}


// 7 - Ejecuta el Código:

agregarAlCarrito("Rubik",3);
agregarAlCarrito("Slime",3);
agregarAlCarrito("Labubu",1);

eliminarDelCarrito("Slime", 1);

procesarCompra();

//---------------------

