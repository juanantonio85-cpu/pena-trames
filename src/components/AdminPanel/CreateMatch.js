import React, { useState } from "react";
import "./CreateMatch.css";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function CreateMatch({ onBack }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");

  const crearPartido = async () => {
    if (!fecha || !hora || !lugar) {
      return alert("Rellena todos los campos");
    }

    await addDoc(collection(db, "partidos"), {
      fecha,
      hora,
      lugar,
      estado: "pendiente",
      equipoRojo: [],
      equipoBlanco: [],
      creado: Timestamp.now()
    });

    alert("Partido creado correctamente");
    onBack();
  };

  return (
    <div className="create-container">
      <button className="btn volver-btn" onClick={onBack}>⬅ Volver</button>

      <header className="create-header">
        <img src="/logo.png" alt="TRAMES FC" className="create-logo" />
        <h1 className="create-title">CREAR PARTIDO</h1>
        <p className="create-subtitle">CONFIGURAR NUEVO ENCUENTRO</p>
      </header>

      <div className="create-card">
        <label>Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <label>Hora</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <label>Lugar</label>
        <input
          type="text"
          placeholder="Campo Municipal..."
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
        />

        <button className="btn crear-btn" onClick={crearPartido}>
          Crear Partido →
        </button>
      </div>
    </div>
  );
}
