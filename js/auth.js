function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "helena" && pass === "1234") {
    localStorage.setItem("logado", "true");
    window.location.href = "painel.html";
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function protegerPagina() {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("logado");
}
function verSenha() {
  const campo = document.getElementById("pass");
  const botao = document.querySelector(".toggle-senha");

  if (campo.type === "password") {
    campo.type = "text";
    botao.textContent = "🙈 Ocultar senha";
  } else {
    campo.type = "password";
    botao.textContent = "👁 Ver senha";
  }
}
