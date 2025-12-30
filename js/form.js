let convidados = JSON.parse(localStorage.getItem("convidados")) || [];

document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const convidado = {
    nome: document.getElementById("nome").value,
    presenca: document.getElementById("presenca").value,
    acompanhantesQtd: document.getElementById("acompanhantesQtd").value,
    acompanhantesNomes: document.getElementById("acompanhantesNomes").value,
    mensagem: document.getElementById("mensagem").value,
    data: new Date().toLocaleString()
  };

  convidados.push(convidado);
  localStorage.setItem("convidados", JSON.stringify(convidados));

  alert("Presença confirmada! 💖");
  this.reset();
});
