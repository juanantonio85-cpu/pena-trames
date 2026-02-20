import React, { useEffect, useState } from "react";
import "./PlayerHome.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import LogoTrames from "../UI/LogoTrames";
import FifaCard from "../UI/FifaCard";

export default function PlayerHome({ user, profile, onNavigate }) {
  const [proximoPartido, setProximoPartido] = useState(null);

  useEffect(() => {
    const fetchPartido = async () => {
      const snap = await getDocs(collection(db, "partidos"));
      let partidoPendiente = null;

      snap.forEach((d) => {
        if (d.data().estado === "pendiente") {
          partidoPendiente = { id: d.id, ...d.data() };
        }
      });

      setProximoPartido(partidoPendiente);
    };

    fetchPartido();
  }, []);

  return (
    <div className="player-wrapper">

      <header className="player-header">
        <LogoTrames size={110} />
        <h1 className="player-title">BIENVENIDO, {profile.name}</h1>
        <p className="player-subtitle">TRAMES FC — PANEL DEL JUGADOR</p>
      </header>

      {/* 🟩 MINI CARTA FIFA DEL JUGADOR */}
      <div className="player-fifa-card">
        <FifaCard player={profile} />
      </div>

      <div className="player-grid">

        <div
          className="player-card"
          onClick={() =>
            proximoPartido
              ? onNavigate("matchDetails", proximoPartido.id)
              : alert("No hay partido pendiente")
          }
        >
          <h2>Próximo Partido</h2>
          <p>
            {proximoPartido
              ? `${proximoPartido.fecha} — ${proximoPartido.hora}`
              : "No hay partido pendiente"}
          </p>
        </div>

        <div className="player-card" onClick={() => onNavigate("attendance")}>
          <h2>Asistencia</h2>
          <p>Confirma si vas al próximo partido.</p>
        </div>

        <div className="player-card" onClick={() => onNavigate("ranking")}>
          <h2>Ranking</h2>
          <p>Revisa tu posición en la clasificación.</p>
        </div>

        <div className="player-card" onClick={() => onNavigate("history")}>
          <h2>Historial</h2>
          <p>Consulta tus partidos anteriores.</p>
        </div>

        <div className="player-card" onClick={() => onNavigate("profile")}>
          <h2>Mi Perfil</h2>
          <p>Actualiza tus datos personales.</p>
        </div>

      </div>
    </div>
  );
}
