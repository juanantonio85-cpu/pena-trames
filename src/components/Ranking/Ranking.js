import React, { useEffect, useState } from "react";
import "./Ranking.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import LogoTrames from "../UI/LogoTrames";

export default function Ranking({ onNavigate }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const snap = await getDocs(collection(db, "users"));
      const lista = [];

      snap.forEach((d) => {
        const data = d.data();

        // Solo jugadores (no admins)
        if (data.role !== "admin") {
          lista.push({
            id: d.id,
            ...data,
            mediaGeneral: data.mediaGeneral || 50
          });
        }
      });

      // Ordenar por media general descendente
      lista.sort((a, b) => b.mediaGeneral - a.mediaGeneral);

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
        <LogoTrames size={110} />
        <h1 className="ranking-title">RANKING FIFA</h1>
        <p className="ranking-subtitle">MEJORES JUGADORES DEL CLUB</p>
      </header>

      <div className="ranking-list">
        {jugadores.length === 0 && (
          <p className="empty">No hay jugadores registrados.</p>
        )}

        {jugadores.map((j, index) => (
          <div key={j.id} className="ranking-card">

            {/* POSICIÓN */}
            <div className="ranking-position">#{index + 1}</div>

            {/* MINI CARTA FIFA */}
            <div className="ranking-mini-card">
              <FifaCard player={j} />
            </div>

            {/* INFO */}
            <div className="ranking-info">
              <h3>{j.name}</h3>
              <p>Dorsal: {j.dorsal || "-"}</p>
              <p>Media: {j.mediaGeneral}</p>
            </div>

            {/* MEDALLAS */}
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
