import React, { useEffect, useState } from "react";
import "./Ranking.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Ranking({ onNavigate }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const snap = await getDocs(collection(db, "users"));
      const lista = [];

      snap.forEach((d) => {
        lista.push({
          id: d.id,
          ...d.data(),
          puntos: d.data().puntos || 0
        });
      });

      // Ordenar por puntos descendente
      lista.sort((a, b) => b.puntos - a.puntos);

      setJugadores(lista);
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      <button className="btn volver-btn" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="ranking-header">
        <img src="/logo.png" alt="TRAMES FC" className="ranking-logo" />
        <h1 className="ranking-title">RANKING GENERAL</h1>
        <p className="ranking-subtitle">CLASIFICACIÓN DE JUGADORES</p>
      </header>

      <div className="ranking-list">
        {jugadores.length === 0 && (
          <p className="empty">No hay jugadores registrados.</p>
        )}

        {jugadores.map((j, index) => (
          <div key={j.id} className="ranking-card">
            <div className="ranking-position">
              #{index + 1}
            </div>

            <div className="ranking-info">
              <h3>{j.name || j.email}</h3>
              <p>Puntos: {j.puntos}</p>
            </div>

            <div className="ranking-badge">
              {index === 0 && <span className="oro">🥇</span>}
              {index === 1 && <span className="plata">🥈</span>}
              {index === 2 && <span className="bronce">🥉</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
