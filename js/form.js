import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("rsvpForm");
  if (!form) {
    console.error("Formulário não encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const presenca = document.getElementById("presenca").value;
    const acompanhantesQtd = Number(document.getElementById("acompanhantesQtd").value);
    const acompanhantesNomes = document.getElementById("acompanhantesNomes").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !presenca) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    try {
      // 🔒 Evita duplicar o mesmo nome no Firestore
      const q = query(
        collection(db, "convidados"),
        where("nome", "==", nome)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert("Este nome já confirmou presença.");
        return;
      }

      await addDoc(collection(db, "convidados"), {
        nome,
        presenca,
        acompanhantesQtd,
        acompanhantesNomes,
        mensagem,
        criadoEm: serverTimestamp()
      });

      alert("Presença confirmada com sucesso 💖");
      form.reset();

    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert("Erro ao confirmar presença. Tente novamente.");
    }
  });

});
