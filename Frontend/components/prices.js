function renderPrecios() {
  const role = sessionStorage.getItem("role");
  const listaPrecios = precios.map(precio => `
  <li>
  ${precio.elemento}: $${precio.price}
  ${role === "admin" ? `<button onclick="actualizarPrecios(${precio.id})">Editar</button>` : ""}
  </li>
  `).join("");
    
document.getElementById("app").innerHTML = `
  <h2>Precios de las Canchas</h2>
  <ul>${listaPrecios}</ul>
  <button onclick="navigate('dashboard')">Volver</button>
  `;
}
  
function actualizarPrecios(elementoId) {
  const nuevoPrecio = prompt("Ingrese el nuevo precio:");
  if (nuevoPrecio) {
  const elemento = prices.find(p => p.id === elementoId);
  if (elemento) {
    elemento.precio = parseFloat(precioNuevo);
  renderPrices();
    }
  }
}
