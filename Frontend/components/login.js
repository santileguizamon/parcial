function cargarUsuarios() {
  const usuariosGuardados = localStorage.getItem("usuarios");
  if (usuariosGuardados) {
    return JSON.parse(usuariosGuardados);
  } else {
    return [
      { username: "administrador", password: "admin456", role: "admin" },
      { username: "usuario", password: "user456", role: "user" },
    ];
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const usuarios = loadUsers();

 
  const usuario = usuarios.find(usuario => user.username === username && usuario.password === password);

  if (usuario) {
    sessionStorage.setItem("role", usuario.role);
    renderApp(); 
  } else {
    alert("Error");
  }
}

function loginComponent() {
  return `
    <h1>Armamos tu fiesta, consegui todo aca!</h1> 
    <h2>Ingresar</h2>
    <input type="text" id="username" placeholder="Usuario" />
    <input type="password" id="password" placeholder="Contraseña" />
    <button onclick="login()">Iniciar Sesión</button>
  `;
}
