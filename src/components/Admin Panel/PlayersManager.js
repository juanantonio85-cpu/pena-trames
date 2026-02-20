import React, { useEffect, useState } from "react";
import "./PlayersManager.css";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function PlayersManager({ onBack }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      const snap = await getDocs(collection(db, "users"));
      const lista = [];
      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));
      setJugadores(lista);
    };

    fetchJugadores();
  }, []);

  const cambiarRol = async (id, nuevoRol) => {
    await updateDoc(doc(db, "users", id), { role: nuevoRol });
    setJugadores((prev) =>
      prev.map((j) => (j.id === id ? { ...j, role: nuevoRol } : j))
    );
  };

  return (
    <div className="players-container">
      <button className="btn volver-btn" onClick={onBack}>⬅ Volver</button>

      <header className="players-header">
        <img src="/logo.png" alt="TRAMES FC" className="players-logo" />
        <h1 className="players-title">GESTIÓN DE JUGADORES</h1>
        <p className="players-subtitle">ROLES, PUNTOS Y ESTADO</p>
      </header>

      <div className="players-list">
        {jugadores.map((j) => (
          <div key={j.id} className="player-card">
            <div className="player-info">
              <h3>{j.name}</h3>
              <p>Email: {j.email}</p>
              <p>Puntos: {j.puntos || 0}</p>
              <p>Rol: {j.role}</p>
            </div>

            <div className="player-actions">
              <button
                className="btn admin-btn"
                onClick={() => cambiarRol(j.id, "admin")}
              >
                Hacer Admin
              </button>

              <button
                className="btn player-btn"
                onClick={() => cambiarRol(j.id, "player")}
              >
                Hacer Jugador
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
