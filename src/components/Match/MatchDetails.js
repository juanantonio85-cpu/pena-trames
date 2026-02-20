import React, { useEffect, useState } from "react";
import "./MatchDetails.css";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MatchDetails({ matchId, onNavigate }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      if (!matchId) return;

      const ref = doc(db, "partidos", matchId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setMatch({ id: snap.id, ...snap.data() });
      }
    };

    fetchMatch();
  }, [matchId]);

  if (!match) {
    return (
      <div className="match-container">
        <p className="loading">Cargando partido...</p>
      </div>
    );
  }

  return (
    <div className="match-container">
      <button className="btn volver-btn" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="match-header">
        <img src="/logo.png" alt="TRAMES FC" className="match-logo" />
        <h1 className="match-title">PRÓXIMO PARTIDO</h1>
        <p className="match-subtitle">DETALLES DEL ENCUENTRO</p>
      </header>

      <div className="match-card">
        <h2>Información del Partido</h2>

        <div className="match-info">
          <p><strong>Fecha:</strong> {match.fecha}</p>
          <p><strong>Hora:</strong> {match.hora}</p>
          <p><strong>Lugar:</strong> {match.lugar}</p>
          <p><strong>Estado:</strong> {match.estado}</p>
        </div>
      </div>

      <div className="match-card">
        <h2>Equipos</h2>

        <div className="teams-grid">
          <div className="team-box rojo">
            <h3>Equipo ROJO</h3>
            {match.equipoRojo?.length > 0 ? (
              match.equipoRojo.map((j, i) => <p key={i}>{j}</p>)
            ) : (
              <p className="empty">Sin asignar</p>
            )}
          </div>

          <div className="team-box blanco">
            <h3>Equipo BLANCO</h3>
            {match.equipoBlanco?.length > 0 ? (
              match.equipoBlanco.map((j, i) => <p key={i}>{j}</p>)
            ) : (
              <p className="empty">Sin asignar</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

