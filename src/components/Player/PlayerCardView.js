import React, { useEffect, useState } from "react";
import "./PlayerCardView.css";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import LogoTrames from "../UI/LogoTrames";

export default function PlayerCardView({ player, onBack }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!player?.id) return;

      const q = query(
        collection(db, "valoraciones"),
        where("userId", "==", player.id)
      );

      const snap = await getDocs(q);
      const lista = [];

      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));

      // Ordenar por fecha descendente
      lista.sort((a, b) => b.fecha?.toMillis() - a.fecha?.toMillis());

      setHistorial(lista);
    };

    fetchHistorial();
  }, [player]);

  return (
    <div className="pcard-wrapper">

      <button className="pcard-back" onClick={onBack}>
        ⬅ Volver
      </button>

      <header className="pcard-header">
        <LogoTrames size={110} />
        <h1 className="pcard-title">{player.name}</h1>
        <p className="pcard-subtitle">FICHA DEL JUGADOR</p>
      </header>

      {/* 🟩 CARTA FIFA GRANDE */}
      <div className="pcard-card-container">
        <FifaCard player={player} />
      </div>

      {/* 🟩 BIO DEL JUGADOR */}
      <div className="pcard-section">
        <h2>Biografía</h2>
        <div className="pcard-bio">
          <p><strong>Nombre:</strong> {player.name}</p>
          <p><strong>Dorsal:</strong> {player.dorsal}</p>
          <p><strong>Posición:</strong> {player.posicion}</p>
          <p><strong>Email:</strong> {player.email}</p>
          <p><strong>Media Actual:</strong> {player.mediaGeneral}</p>
        </div>
      </div>

      {/* 🟩 HISTORIAL DE PARTIDOS */}
      <div className="pcard-section">
        <h2>Historial de Valoraciones</h2>

        {historial.length === 0 && (
          <p className="pcard-empty">Este jugador aún no tiene valoraciones.</p>
        )}

        {historial.map((h) => (
          <div key={h.id} className="pcard-hist-item">
            <div>
              <p><strong>Media del partido:</strong> {h.mediaPartido}</p>
              <p><strong>Fecha:</strong> {h.fecha?.toDate().toLocaleDateString()}</p>
            </div>

            <div className="pcard-hist-stats">
              <span>PAC {h.pac}</span>
              <span>SHO {h.sho}</span>
              <span>PAS {h.pas}</span>
              <span>DRI {h.dri}</span>
              <span>DEF {h.def}</span>
              <span>PHY {h.phy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
