import React, { useState } from "react";
import "./Profile.css";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile({ user, profile, onNavigate }) {
  const [name, setName] = useState(profile.name || "");
  const [loading, setLoading] = useState(false);

  const guardar = async () => {
    if (!name.trim()) return alert("El nombre no puede estar vacío");

    setLoading(true);

    await updateDoc(doc(db, "users", user.uid), {
      name
    });

    setLoading(false);
    alert("Perfil actualizado");
  };

  return (
    <div className="profile-container">
      <button className="btn volver-btn" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="profile-header">
        <img src="/logo.png" alt="TRAMES FC" className="profile-logo" />
        <h1 className="profile-title">MI PERFIL</h1>
        <p className="profile-subtitle">GESTIONA TU INFORMACIÓN PERSONAL</p>
      </header>

      <div className="profile-card">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input type="text" value={profile.email} disabled />

        <button className="btn guardar-btn" onClick={guardar} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}

