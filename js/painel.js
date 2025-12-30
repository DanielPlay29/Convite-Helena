let convidados = JSON.parse(localStorage.getItem("convidados")) || [];

const lista = document.getElementById("lista-confirmados");
const totalConfirmados = document.getElementById("total-confirmados");

let ordemAZ = true;

/* Calcula total de pessoas (convidado + acompanhantes) */
function calcularTotalPessoas(c) {
  let acompanhantes = 0;

  if (c.acompanhantesQtd === "1") acompanhantes = 1;
  else if (c.acompanhantesQtd === "2") acompanhantes = 2;
  else if (c.acompanhantesQtd === "3 ou mais") acompanhantes = 3;

  return 1 + acompanhantes;
}

/* Renderiza lista */
function renderizar(filtro = "") {
  lista.innerHTML = "";
  let totalPessoasConfirmadas = 0;

  let filtrados = convidados
    .map((c, index) => ({ ...c, _index: index })) // índice real
    .filter(c => c.presenca && c.presenca.startsWith("Sim"))
    .filter(c => c.nome.toLowerCase().includes(filtro));

  filtrados.sort((a, b) =>
    ordemAZ
      ? a.nome.localeCompare(b.nome)
      : b.nome.localeCompare(a.nome)
  );

  filtrados.forEach((c) => {
    totalPessoasConfirmadas += calcularTotalPessoas(c);

    const item = document.createElement("div");
    item.className = "convidado-item";

    const id = `conf-${c._index}`;

    item.innerHTML = `
      <div class="convidado-header" onclick="toggleDetalhes('${id}')">
        <span class="seta" id="seta-${id}">▶</span>
        <span class="nome">${c.nome}</span>
      </div>

      <div class="convidado-detalhes" id="detalhes-${id}">
        <p><strong>Acompanhantes:</strong> ${c.acompanhantesQtd}</p>
        <p><strong>Nomes:</strong> ${c.acompanhantesNomes || "—"}</p>
        <p><strong>Mensagem:</strong><br>${c.mensagem || "—"}</p>
        <p class="data">Enviado em: ${c.data}</p>

        <button onclick="excluirConvidado(${c._index})">
          ❌ Excluir convidado
        </button>
      </div>
    `;

    lista.appendChild(item);
  });

  totalConfirmados.textContent = totalPessoasConfirmadas;
}

/* Excluir convidado */
function excluirConvidado(index) {
  if (!confirm("Tem certeza que deseja excluir este convidado?")) return;

  convidados.splice(index, 1);
  localStorage.setItem("convidados", JSON.stringify(convidados));

  renderizar(document.getElementById("pesquisa")?.value.toLowerCase() || "");
}

/* Pesquisa */
function filtrarConvidados() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  renderizar(termo);
}

/* Alternar ordem */
function alternarOrdem() {
  ordemAZ = !ordemAZ;
  filtrarConvidados();
}

/* Expandir / recolher */
function toggleDetalhes(id) {
  const detalhes = document.getElementById(`detalhes-${id}`);
  const seta = document.getElementById(`seta-${id}`);

  if (detalhes.style.display === "block") {
    detalhes.style.display = "none";
    seta.textContent = "▶";
  } else {
    detalhes.style.display = "block";
    seta.textContent = "▼";
  }
}

/* Mostrar/ocultar pesquisa */
function togglePesquisa() {
  const box = document.getElementById("box-pesquisa");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

/* Inicializa */
renderizar();
