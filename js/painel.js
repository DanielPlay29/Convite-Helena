import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("lista-confirmados");
const totalConfirmados = document.getElementById("total-confirmados");

let ordemAZ = true;
let convidadosCache = [];

/* Calcula total de pessoas (convidado + acompanhantes) */
function calcularTotalPessoas(c) {
  return 1 + (Number(c.acompanhantesQtd) || 0);
}

/* Renderiza painel */
function renderizarPainel(filtro = "") {
  lista.innerHTML = "";
  let totalPessoasConfirmadas = 0;

  let filtrados = convidadosCache
    .filter(c => c.presenca === "Sim")
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
    const id = `conf-${c.id}`;

    item.innerHTML = `
      <div class="convidado-header" onclick="toggleDetalhes('${id}')">
        <span class="seta" id="seta-${id}">▶</span>
        <span class="nome">${c.nome}</span>
      </div>

      <div class="convidado-detalhes" id="detalhes-${id}" style="display:none">
        <p><strong>Acompanhantes:</strong> ${c.acompanhantesQtd}</p>
        <p><strong>Nomes:</strong> ${c.acompanhantesNomes || "—"}</p>
        <p><strong>Mensagem:</strong><br>${c.mensagem || "—"}</p>

        <button onclick="excluirConvidado('${c.id}')">
          🗑 Excluir convidado
        </button>
      </div>
    `;

    lista.appendChild(item);
  });

  totalConfirmados.textContent = totalPessoasConfirmadas;
}

/* 🔥 Tempo real: escuta Firestore */
onSnapshot(collection(db, "convidados"), (snapshot) => {
  convidadosCache = snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

  renderizarPainel();
});

/* Excluir convidado (somente manualmente pela debutante) */
window.excluirConvidado = async function (id) {
  if (!confirm("Tem certeza que deseja excluir este convidado?")) return;
  await deleteDoc(doc(db, "convidados", id));
};

/* Pesquisa */
window.filtrarConvidados = function () {
  const termo = document.getElementById("pesquisa")?.value.toLowerCase() || "";
  renderizarPainel(termo);
};

/* Alternar ordem */
window.alternarOrdem = function () {
  ordemAZ = !ordemAZ;
  filtrarConvidados();
};

/* Expandir / recolher */
window.toggleDetalhes = function (id) {
  const detalhes = document.getElementById(`detalhes-${id}`);
  const seta = document.getElementById(`seta-${id}`);

  if (!detalhes) return;

  if (detalhes.style.display === "block") {
    detalhes.style.display = "none";
    seta.textContent = "▶";
  } else {
    detalhes.style.display = "block";
    seta.textContent = "▼";
  }
};

/* Mostrar / ocultar pesquisa */
window.togglePesquisa = function () {
  const box = document.getElementById("box-pesquisa");
  if (!box) return;
  box.style.display = box.style.display === "none" ? "block" : "none";
};
