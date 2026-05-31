// member-check.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async user => {
  if (!user) {
    location.href = "./member/login.html";
    return;
  }

  const snap = await getDoc(doc(db, "members", user.uid));

  if (!snap.exists()) {
    location.href = "./member/waiting.html";
    return;
  }

  const d = snap.data();

  if (d.vip === true || d.active === true || d.role === "admin") {
    window.TIEA_USER = { uid: user.uid, email: user.email, ...d };
    document.dispatchEvent(new CustomEvent("tiea-member-ready", { detail: window.TIEA_USER }));
    return;
  }

  location.href = "./member/waiting.html";
});
