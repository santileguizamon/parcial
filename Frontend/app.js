function navigate(component) {
  const app = document.getElementById("app");

  switch (component) {
    case "dashboard":
      app.innerHTML = dashboardComponent();
      break;
    case "usersManagement":
      if (sessionStorage.getItem("role") === "admin") {
        app.innerHTML = usersManagementComponent();
      } else {
        alert("No tenes los permisos necesarios");
      }
      break;
    case "reservationsManagement":
      app.innerHTML = reservationsManagementComponent();
      break;
    case "rentalsHistory":
      app.innerHTML = rentalsComponent();
      break;
    case "messaging":
      app.innerHTML = messagingComponent();
      break;
    default:
      app.innerHTML = loginComponent();
      break;
  }
}

renderApp();




function renderApp() {
  const role = sessionStorage.getItem("role");
  if (role) {
    navigate("dashboard");
  } else {
    navigate();
  }
}

renderApp();

const reservas = [
  { id: 1, fieldType: "Combo parlantes standar", userId: 2, date: "2024-07-08", time: "19:00", status: "Completada" },
  { id: 2, fieldType: "Combo parlantes jbl/ev", userId: 1, date: "2024-09-10", time: "22:00", status: "Cancelada" },
  { id: 3, fieldType: "Combo parlantes jbl/ev + subuffer", userId: 2, date: "2024-09-17", time: "20:00", status: "Completada" },
  { id: 4, fieldType: "Combo parlantes jbl/ev + subuffer", userId: 1, date: "2024-10-10", time: "20:30", status: "Cancelada" },
  { id: 5, fieldType: "Combo luces pro plus", userId: 1, date: "2024-11-10", time: "21:10", status: "Completada" }
];

const messages = [
  { from: "usuario", to: "administrador", content: "Consulta sobre disponibilidad de cancha", date: "2024-11-25", status: "Leido" },
  { from: "administrador", to: "usuario", content: "Hay disponibilidad para el horario solicitado.", date: "2024-11-25", status: "Leido" },
  { from: "usuario", to: "administrador", content: "Quiero cambiar el horario de mi reserva", date: "2024-11-26", status: "Leido" },
  { from: "administrador", to: "usuario", content: "Se ha cambiado el horario según tu solicitud.", date: "2024-11-06", status: "Pendiente" },
];

const users = [
  { username: "administrador", password: "admin456", role: "admin" },
  { username: "usuario", password: "user456", role: "user" },
];

let prices = [
  { id: 1, courtName: "Combo parlantes standar", price: 10000 },
  { id: 2, courtName: "Combo parlantes jbl/ev", price: 14000 },
  { id: 3, courtName: "Combo parlantes jbl/ev + subuffer", price: 18000 },
  { id: 4, courtName: "Combo luces standar", price: 9000 },
  { id: 5, courtName: "Combo luces pro", price: 12000 },
  { id: 6, courtName: "Combo luces pro plus", price: 14000 },
];
