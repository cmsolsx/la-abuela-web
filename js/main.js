let carrito = [];

function agregarCarrito(nombre, unidad, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      nombre: nombre,
      unidad: unidad,
      precio: precio,
      cantidad: 1
    });
  }

  mostrarCarrito();
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  mostrarCarrito();
}

function cambiarCantidad(nombre, cambio) {
  const producto = carrito.find(item => item.nombre === nombre);

  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad <= 0) {
    eliminarProducto(nombre);
  }

  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total-carrito");

  if (!lista || !totalElemento) return;

  lista.innerHTML = "";

  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="text-center">Todavía no ha agregado productos.</p>`;
    totalElemento.textContent = "0";
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const textoPrecio = item.precio > 0
      ? `₡${item.precio.toLocaleString("es-CR")}`
      : "Precio por confirmar";

    lista.innerHTML += `
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <strong>${item.nombre}</strong><br>
            <small>${item.unidad} - ${textoPrecio}</small><br>
            <small>Cantidad: ${item.cantidad}</small>
          </div>

          <div>
            <button class="btn btn-sm btn-outline-success" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
            <button class="btn btn-sm btn-outline-warning" onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto('${item.nombre}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  });

  totalElemento.textContent = total.toLocaleString("es-CR");
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let mensaje = "Hola La Abuela, quiero hacer este pedido:%0A%0A";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    if (item.precio > 0) {
      mensaje += `- ${item.nombre} x${item.cantidad} (${item.unidad}) = ₡${subtotal.toLocaleString("es-CR")}%0A`;
    } else {
      mensaje += `- ${item.nombre} x${item.cantidad} (${item.unidad}) - precio por confirmar%0A`;
    }
  });

  mensaje += `%0ATotal aproximado: ₡${total.toLocaleString("es-CR")}`;
  mensaje += "%0A%0APor favor confirmar disponibilidad, precios del día y servicio a domicilio.";

  window.open(`https://wa.me/50689833000?text=${mensaje}`, "_blank");
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
