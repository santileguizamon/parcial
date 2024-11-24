function messagingComponent() {
  const role = sessionStorage.getItem("role");

return `
  <h2>Mensajes</h2>
  <div>
  ${messageList()}
  </div>
  <div>
  <h3>Enviar Mensaje</h3>
  <form onsubmit="enviarMensaje(event)">
  <textarea id="contenido" placeholder="Dejanos tu duda" required></textarea>
  <button type="submit">Enviar</button>
  </form>
  </div>
  <button onclick="navigate('dashboard')">Volver</button>
  `;
}

function messageList() {
  const role = sessionStorage.getItem("role");
  const usuarioACtual = role === "admin" ? "admin" : "user";

  const mensajesRelevantes = mensajes.filter(
    (mensaje) => mensaje.from === usuarioACtual || mensaje.to === usuarioACtual
  );

return `
  <h3>Historial de Mensajes</h3>
  <ul>
  ${mensajesRelevantes
  .map(
  (mensaje) => `
  <li>
  <strong>De:</strong> ${mensaje.from} <strong>Para:</strong> ${mensaje.to} <br>
  <strong>Mensaje:</strong> ${mensaje.content} <br>
  <small>Fecha: ${mensaje.date}</small>
  </li>`
  )
  .join("")}
  </ul>
  `;
}

function enviarMensaje(event) {
  event.preventDefault();

  const contenido = document.getElementById("contenido").value;
  const de = sessionStorage.getItem("role") === "admin" ? "admin" : "user";
  const para = from === "admin" ? "user" : "admin";
  const fecha = new Date().toISOString().split("T")[0];

  const nuevoMensaje = { de, para, contenido, fecha };
  mensajes.push(nuevoMensaje);

  document.getElementById("contenido").value = "";
  renderApp();
}
