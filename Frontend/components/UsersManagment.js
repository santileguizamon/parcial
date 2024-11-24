function loadUsers() {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    return JSON.parse(storedUsers);
  } else {
    return [
      { usuario: "administrador", password: "admin456", role: "admin" },
      { usuario: "usuario", password: "user456", role: "user"  }
    ];
  }
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderApp() {
  users = loadUsers(); 
  const role = sessionStorage.getItem("role");
  if (role) {
    navigate("dashboard");
  } else {
    navigate();
  }
}

function addUser(event) {
  event.preventDefault();
  const  usuario= document.getElementById("newUsuario").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  if (users.some(user => user.usuario === usuario)) {
    alert("Nombre ya utilizado, ingresa otro");
    return;
  }

  users.push({ username, password, role });
  saveUsers();
  alert("Usuario agregado exitosamente.");

  document.getElementById("newUsuario").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("newRole").value = "user";
  renderApp();
}

function editUser(index) {
  const user = users[index];
  const newUsername = prompt("Editar nombre de usuario:", user.usuario);
  const newPassword = prompt("Editar contraseña:", user.password);
  const newRole = prompt("Editar rol (user/admin):", user.role);

  if (newUsername && newPassword && (newRole === "user" || newRole === "admin")) {
    users[index] = { username: newUsuario, password: newPassword, role: newRole };
    saveUsers();
    alert("Usuario editado exitosamente.");
    renderApp();
  } else {
    alert("Complete todos los campos por favor");
  }
}

function deleteUser(index) {
  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    users.splice(index, 1);
    saveUsers();
    alert("Usuario eliminado exitosamente.");
    renderApp();
  }
}

function userList() {
  return `
    <h3>Lista de Usuarios</h3>
    <ul>
      ${users
        .map(
          (user, index) => `
          <li>
            <strong>Nombre:</strong> ${user.usuario} | <strong>Rol:</strong> ${user.role}
            <button onclick="editUser(${index})">Editar</button>
            <button onclick="deleteUser(${index})">Eliminar</button>
          </li>`
        )
        .join("")}
    </ul>
  `;
}

function usersManagementComponent() {
  return `
    <h2>Gestión de Usuarios</h2>
    <div>
      ${userList()}
      <h3>Agregar Nuevo Usuario</h3>
      <form onsubmit="addUser(event)">
        <input type="text" id="newUsuario" placeholder="Nombre de usuario" required />
        <input type="password" id="newPassword" placeholder="Contraseña" required />
        <select id="newRole">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
    <button onclick="navigate('dashboard')">Volver</button>
  `;
}
