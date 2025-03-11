console.log("Bienvenid@ a Crave Food");

//Articulos a la venta
/*
let hamburguesa = {nombre: "Hamburguesa", precio: 85, calorias: 550};
let hotdog = {nombre: "Hot Dog", precio: 50, calorias: 350};
let chickenbake = {nombre: "Chicken Bake", precio: 75, calorias: 680};
let pizza = {nombre: "Pizza", precio: 90, calorias: 700};
let papasFritas = {nombre: "Papas Fritas", precio: 40, calorias: 400};

//Lista de articulos
let lista = [hamburguesa,hotdog,chickenbake,pizza,papasFritas];


//console.log(lista);
//console.log(`Lista de comida: ${lista}`);
console.log("Lista de comida:",lista);
console.log(lista[0]);
console.log(hamburguesa.nombre);
console.log(hamburguesa.precio);
*/

//----------------------


// 1. Crear un Arreglo de Productos
let productos = [
    { nombre: "Hamburguesa", precio: 85, calorias: 550, stock: 10 },
    { nombre: "Hot Dog", precio: 50, calorias: 350, stock: 15 },
    { nombre: "Chicken Bake", precio: 75, calorias: 680, stock: 8 },
    { nombre: "Pizza", precio: 90, calorias: 700, stock: 5 },
    { nombre: "Papas Fritas", precio: 40, calorias: 400, stock: 20 }
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

//3. Calcular el Total del Carrito:

function calcularTotal(){
    let total =0;
    for (let item of carrito) {
        total+=item.precio*item.cantidad;
    }
    return total;
}

//let printTotal = calcularTotal();
//console.log(printTotal);


//4. Aplicar Descuentos: 

function aplicarDescuento(total){
    if(total>100){
        return total*0.9;
    }
    return total;
}

//let printDescuento = aplicarDescuento(printTotal);
//console.log(printDescuento);


//5. Simular el Proceso de Compra:

function procesarCompra(){
    console.log("Procesando compra...");
    setTimeout(function(){
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    },3000)
}

// 6 - Ejecuta el Código:

agregarAlCarrito("Zapatos",6);
agregarAlCarrito("Hamburguesa",1);
agregarAlCarrito("Pizza",1);
procesarCompra();

//----------------------


/*
// 1. Crear un Arreglo de Productos
let productos = [
    { nombre: "Hamburguesa", precio: 85, calorias: 550, stock: 10 },
    { nombre: "Hot Dog", precio: 50, calorias: 350, stock: 15 },
    { nombre: "Chicken Bake", precio: 75, calorias: 680, stock: 8 },
    { nombre: "Pizza", precio: 90, calorias: 700, stock: 5 },
    { nombre: "Papas Fritas", precio: 40, calorias: 400, stock: 20 }
];

// Carrito de compras
let carrito = [];

// 2. Agregar Productos al Carrito
function agregarAlCarrito(nombreProducto, cantidad) {
    let producto = productos.find(p => p.nombre === nombreProducto);
    
    if (!producto) {
        console.log("El producto no existe.");
        return;
    }

    if (producto.stock < cantidad) {
        console.log(`No hay suficiente stock de ${nombreProducto}. Solo quedan ${producto.stock} disponibles.`);
        return;
    }

    // Buscar si ya está en el carrito
    let itemCarrito = carrito.find(item => item.nombre === nombreProducto);
    
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad });
    }

    producto.stock -= cantidad; // Reducir el stock
    console.log(`${cantidad} ${nombreProducto}(s) agregado(s) al carrito.`);
}

// 3. Eliminar Productos del Carrito
function eliminarDelCarrito(nombreProducto, cantidad) {
    let index = carrito.findIndex(item => item.nombre === nombreProducto);
    
    if (index === -1) {
        console.log("El producto no está en el carrito.");
        return;
    }

    let producto = productos.find(p => p.nombre === nombreProducto);

    if (carrito[index].cantidad > cantidad) {
        carrito[index].cantidad -= cantidad;
        producto.stock += cantidad;
    } else {
        producto.stock += carrito[index].cantidad;
        carrito.splice(index, 1);
    }

    console.log(`${cantidad} ${nombreProducto}(s) eliminado(s) del carrito.`);
}

// 4. Calcular el Total del Carrito
function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// 5. Aplicar Descuentos
function aplicarDescuento(total) {
    if (total > 100) {
        console.log("Se aplicó un 10% de descuento.");
        return total * 0.9; // Aplica el 10% de descuento
    }
    return total;
}

// 6. Mostrar Cuenta Regresiva Antes de la Compra
function cuentaRegresiva(segundos, callback) {
    let tiempo = segundos;
    
    let interval = setInterval(() => {
        console.log(`Compra confirmada en ${tiempo}...`);
        tiempo--;

        if (tiempo < 0) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

// 7. Simular el Proceso de Compra
function procesarCompra() {
    console.log("Procesando compra...");
    
    cuentaRegresiva(3, () => {
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    });
}

// 8. Ejecutar el Código
agregarAlCarrito("Hamburguesa", 2);
agregarAlCarrito("Papas Fritas", 3);
agregarAlCarrito("Pizza", 1);

eliminarDelCarrito("Papas Fritas", 1);

procesarCompra();
*/