import React, { useState } from "react";
import "./Profile.css";
import { db, storage, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword } from "firebase/auth";
import LogoTrames from "./UI/LogoTrames";
import FifaCard from "./UI/FifaCard";

export default function Profile({ user, profile, onNavigate }) {
  const [name, setName] = useState(profile.name || "");
  const [dorsal, setDorsal] = useState(profile.dorsal || 0);
  const [posicion, setPosicion] = useState(profile.posicion || "Sin posición");
  const [fotoURL, setFotoURL] = useState(profile.fotoURL || "");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Guardar datos básicos
  const guardar = async () => {
    if (!name.trim()) return alert("El nombre no puede estar vacío");

    setLoading(true);

    await updateDoc(doc(db, "users", user.uid), {
      name,
      dorsal: Number(dorsal),
      posicion,
      fotoURL
    });

    setLoading(false);
    alert("Perfil actualizado");
  };

  // Subir foto a Firebase Storage
  const subirFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const storageRef = ref(storage, `fotosPerfil/${user.uid}.jpg`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    setFotoURL(url);

    setUploading(false);
  };

  // Cambiar contraseña
  const cambiarPassword = async () => {
    if (!newPassword.trim()) return alert("Introduce una nueva contraseña");

    try {
      await updatePassword(auth.currentUser, newPassword);
      alert("Contraseña actualizada");
      setNewPassword("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="profile-wrapper">

      <button className="profile-back" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="profile-header">
        <LogoTrames size={110} />
        <h1 className="profile-title">MI PERFIL</h1>
        <p className="profile-subtitle">GESTIONA TU INFORMACIÓN PERSONAL</p>
      </header>

      {/* 🟩 CARTA FIFA DEL JUGADOR */}
      <FifaCard
        player={{
          name,
          dorsal,
          posicion,
          fotoURL,
          mediaGeneral: profile.mediaGeneral,
          pac: profile.pac,
          sho: profile.sho,
          pas: profile.pas,
          dri: profile.dri,
          def: profile.def,
          phy: profile.phy
        }}
      />

      <div className="profile-card">

        {/* FOTO */}
        <label>Foto de Perfil</label>
        {fotoURL ? (
          <img src={fotoURL} alt="Foto" className="profile-photo" />
        ) : (
          <p className="profile-no-photo">No tienes foto subida</p>
        )}

        <input type="file" onChange={subirFoto} />
        {uploading && <p className="profile-uploading">Subiendo foto...</p>}

        {/* NOMBRE */}
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <label>Email</label>
        <input type="text" value={profile.email} disabled />

        {/* DORSAL */}
        <label>Dorsal</label>
        <input
          type="number"
          value={dorsal}
          onChange={(e) => setDorsal(e.target.value)}
        />

        {/* POSICIÓN */}
        <label>Posición</label>
        <select
          value={posicion}
          onChange={(e) => setPosicion(e.target.value)}
          className="profile-select"
        >
          <option>Portero</option>
          <option>Defensa</option>
          <option>Centrocampista</option>
          <option>Delantero</option>
          <option>Admin</option>
        </select>

        {/* GUARDAR */}
        <button
          className="profile-save"
          onClick={guardar}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>

        {/* CAMBIAR CONTRASEÑA */}
        <label>Nueva Contraseña</label>
        <input
          type="password"
          placeholder="Nueva contraseña..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="profile-save" onClick={cambiarPassword}>
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
}
