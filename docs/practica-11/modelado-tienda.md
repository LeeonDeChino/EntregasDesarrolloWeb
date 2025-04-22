
# Modelo Entidad-Relación — CraveSoftware Merch Store

##  Entidades y Atributos

### **Producto**
- `ID_Producto` (PK)
- `Nombre`
- `Descripción`
- `Precio`
- `Stock`
- `Categoría`
- `Variante`

---

### **Cliente**
- `ID_Cliente` (PK)
- `Nombre`
- `Correo`
- `Teléfono`
- `Dirección`

---

### **Pedido**
- `ID_Pedido` (PK)
- `Fecha`
- `Total`
- `Estado`
- `ID_Cliente` (FK)

---

### **DetallePedido**
*(Relaciona Productos con Pedidos)*
- `ID_Detalle` (PK)
- `ID_Pedido` (FK)
- `ID_Producto` (FK)
- `Cantidad`
- `PrecioUnitario`
- `VarianteSeleccionada`

---

### **MétodoPago**
- `ID_MetodoPago` (PK)
- `Tipo` (Ej: Tarjeta, PayPal)
- `Detalles`

---

### **Pago**
- `ID_Pago` (PK)
- `ID_Pedido` (FK)
- `ID_MetodoPago` (FK)
- `FechaPago`
- `Monto`
- `EstadoPago`

---

##  Relaciones

- Un **Cliente** puede hacer **muchos Pedidos**
- Un **Pedido** pertenece a **un Cliente**
- Un **Pedido** puede tener **muchos DetallePedido**
- Un **DetallePedido** está asociado a **un Producto**
- Un **Pedido** puede tener **un Pago**
- Un **Pago** utiliza **un MétodoPago**

---

## Diagrama Relacional 

![DiagramaER](/docs/practica-11/assets/DiagramaER.png)
