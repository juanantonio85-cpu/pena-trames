import React, { useState } from "react";
import "./Profile.css";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import LogoTrames from "./UI/LogoTrames";
import FifaCard from "./UI/FifaCard";

// 🔥 Cloudinary uploader integrado aquí mismo
async function uploadToCloudinary(file) {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    throw new Error("Formato no válido. Usa JPG, PNG o WEBP.");
  }

  const formData = new FormData();
  formData.append("file", file);

  // ⬅️ Cambia esto por tu preset real
  formData.append("upload_preset", "trames_preset");

  // Eliminación de fondo + recorte de cara + redimensionado
  formData.append(
    "transformation",
    JSON.stringify([
      { effect: "background_removal" },
      { crop: "thumb", gravity: "face", width: 400, height: 400 },
      { fetch_format: "png" },
      { quality: "auto" }
    ])
  );

  const cloudName = "TU_CLOUD_NAME"; // ⬅️ cambia esto

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();
  if (!data.secure_url) throw new Error("Error subiendo imagen");

  return data.secure_url;
}

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

  // Subir foto a Cloudinary con eliminación de fondo
  const subirFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setFotoURL(url);
    } catch (err) {
      alert(err.message);
    }

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
        {uploading && <p className="profile-uploading">Procesando foto...</p>}

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
