function dashboardComponent() {
  const role = sessionStorage.getItem("role");
  return `
    <h2>Bienvenido, ${role === "admin" ? "Administrador" : "Usuario"}</h2>
    <button onclick="navigate('reservationManagement')">Gestión de Reservas</button>
    <button onclick="navigate('rentalHistory')">Historial de Alquileres</button>
    <button onclick="navigate('messaging')">Mensajes</button>
    <button onclick="renderPrices()">Precios</button> 
    ${role === "admin" ? `<button onclick="navigate('userManagement')">Gestión de Usuarios</button>` : ""}
    <button onclick="logout()">Cerrar Sesión</button>
  `;
}


function logout() {
  sessionStorage.clear();
  renderApp();
}
