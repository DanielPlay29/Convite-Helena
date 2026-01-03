// Firebase via CDN (compatível com GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCg7Luzg0rDPbXNDrCJezzNgcIQFYv0L9E",
  authDomain: "convite-helena-86178.firebaseapp.com",
  projectId: "convite-helena-86178",
  storageBucket: "convite-helena-86178.firebasestorage.app",
  messagingSenderId: "1041072958112",
  appId: "1:1041072958112:web:e58b644a544faaeb1bb7c5"
};

// Inicializa Firebase (apenas uma vez)
export const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);
