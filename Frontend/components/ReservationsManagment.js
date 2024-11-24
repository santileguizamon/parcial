function reservationsManagementComponent() {
  const role = sessionStorage.getItem("role");

  return `
    <h2>Gestión de Reservas</h2>
    ${role === "admin" ? adminReservationList() : userReservationForm()}
    <button onclick="navigate('dashboard')">Volver</button>
  `;
}

function userReservationForm() {
  return `
    <h3>Reservar una Cancha</h3>
    <form onsubmit="makeReservation(event)">
      <label for="fieldType">Tipo de Cancha:</label>
      <select id="fieldType" required>
        <option value="Combo parlantes standar">Combo parlantes standar</option>
        <option value="Combo parlantes jbl/ev">Combo parlantes jbl/ev</option>
        <option value="Combo parlantes jbl/ev + subuffer">Combo parlantes jbl/ev + subuffer</option>
        <option value="Combo luces standa">Combo luces standa</option>
        <option value="Combo luces pro">Combo luces pro</option>
        <option value="Combo luces pro plus">Combo luces pro plus</option>
      </select>
      <br><br>
      <label for="date">Fecha:</label>
      <input type="date" id="date" required />
      <br>
      <label for="time">Hora:</label>
      <input type="time" id="time" required />
      <button type="submit">Reservar</button>
    </form>
  `;
}

function makeReservation(event) {
  event.preventDefault();

  const fieldType = document.getElementById("fieldType").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const user = sessionStorage.getItem("role") === "admin" ? "admin" : "user";

  const newReservation = { user, fieldType, date, time, status: "Pendiente" };
  reservations.push(newReservation);

  alert("Reserva exitosa");
  renderApp();
}

function userReservationList() {
  const userReservations = reservations.filter(
    (reservation) => reservation.user === "user"
  );

  return `
    <h3>Mis Reservas</h3>
    <ul>
      ${userReservations
        .map(
          (reservation) => `
          <li>
            Fecha: ${reservation.date} | Hora: ${reservation.time} | Estado: ${reservation.status}
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function createReservation(event) {
  event.preventDefault();
  
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  
  const newReservation = {
    user: sessionStorage.getItem("role"),
    date,
    time,
    status: "Pendiente",
  };

  reservations.push(newReservation);
  alert("Reserva creada con éxito.");
  renderApp();
}

function adminReservationList() {
  return `
    <h3>Listado de Reservas</h3>
    <ul>
      ${reservations
        .map(
          (reservation, index) => `
          <li>
            Usuario: ${reservation.user} | Elemento: ${reservation.fieldType} | Fecha: ${reservation.date} | Hora: ${reservation.time} | Estado: ${reservation.status}
            ${
              reservation.status === "Pendiente"
                ? `<button onclick="completeReservation(${index})">Completar</button>
                   <button onclick="cancelReservation(${index})">Cancelar</button>`
                : ""
            }
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function completeReservation(index) {
  reservations[index].status = "Completada";
  renderApp();
}

function cancelReservation(index) {
  reservations[index].status = "Cancelada";
  renderApp();
}

