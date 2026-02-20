import React, { useEffect, useState } from "react";
import "./MatchDetails.css";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import LogoTrames from "../UI/LogoTrames";

export default function MatchDetails({ matchId, onNavigate }) {
  const [match, setMatch] = useState(null);
  const [playersRojo, setPlayersRojo] = useState([]);
  const [playersBlanco, setPlayersBlanco] = useState([]);

  useEffect(() => {
    const fetchMatch = async () => {
      if (!matchId) return;

      const ref = doc(db, "partidos", matchId);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();
      setMatch({ id: snap.id, ...data });

      // Cargar jugadores completos
      const loadPlayers = async (uids) => {
        const arr = [];
        for (let uid of uids || []) {
          const userSnap = await getDoc(doc(db, "users", uid));
          if (userSnap.exists()) arr.push({ id: uid, ...userSnap.data() });
        }
        return arr;
      };

      const rojo = await loadPlayers(data.equipoRojo || []);
      const blanco = await loadPlayers(data.equipoBlanco || []);

      setPlayersRojo(rojo);
      setPlayersBlanco(blanco);
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
        <LogoTrames size={110} />
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

          {/* EQUIPO ROJO */}
          <div className="team-box rojo">
            <h3>Equipo ROJO</h3>

            {playersRojo.length > 0 ? (
              <div className="team-players">
                {playersRojo.map((p) => (
                  <div key={p.id} className="team-player-card">
                    <FifaCard player={p} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">Sin asignar</p>
            )}
          </div>

          {/* EQUIPO BLANCO */}
          <div className="team-box blanco">
            <h3>Equipo BLANCO</h3>

            {playersBlanco.length > 0 ? (
              <div className="team-players">
                {playersBlanco.map((p) => (
                  <div key={p.id} className="team-player-card">
                    <FifaCard player={p} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty">Sin asignar</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
