function rentalComponent() {
  return `
    <h2>Historial de Alquiler</h2>
    <div>
      <h2>Reservas Futuras o en Proceso</h2>
      ${proximasReservas()}
    </div>
    <div>
      <h2>Reservas Completadas</h2>
      ${reservasCompletadas()}
    </div>
    <button onclick="navigate('dashboard')">Volver</button>
  `;
}

function proximasReservas() {
  const hoy = new Date();
  const proximasReservas = reservas.filter(
    (reserva) =>
      new Date(`${reservas.date}T${reserva.time}`) >= hoy &&
    reserva.status === "Pendiente"
  );

  if (proximasReservas.length === 0) return "<p>No hay reservas</p>";

  return `
    <ul>
      ${proximasReservas
        .map(
          (reserva) => `
          <li>
            Elemento: ${reserva.fieldType} | Fecha: ${reserva.date} | Hora: ${reserva.time} | Estado: ${reserva.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function reservasCompletadas() {
  const hoy = new Date();
  const oldReservations = reservas.filter(
    (reserva) =>
      new Date(`${reserva.date}T${reserva.time}`) < hoy || 
    reserva.status !== "Pendiente"
  );

  if (reservasCompletadas.length === 0) return "<p>El historial de reservas se encuentra vacio</p>";

  return `
    <ul>
      ${reservasCompletadas
        .map(
          (reserva) => `
          <li>
            Elemento: ${reserva.fieldType} | Fecha: ${reserva.date} | Hora: ${reserva.time} | Estado: ${reserva.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function verHistorialReservas() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Historial reservas finalizadas</h2>
    ${verHistorialReservas()}
    <button onclick="navigate('dashboard')">Volver al Dashboard</button>
  `;
}


