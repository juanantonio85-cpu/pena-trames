import React, { useEffect, useState } from "react";
import "./MatchHistory.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MatchHistory({ onNavigate }) {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      const snap = await getDocs(collection(db, "partidos"));
      const lista = [];
      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));

      lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setPartidos(lista);
    };

    fetchPartidos();
  }, []);

  return (
    <div className="history-container">
      <button className="btn volver-btn" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="history-header">
        <img src="/logo.png" alt="TRAMES FC" className="history-logo" />
        <h1 className="history-title">HISTORIAL DE PARTIDOS</h1>
        <p className="history-subtitle">RESULTADOS Y PARTIDOS PASADOS</p>
      </header>

      <div className="history-list">
        {partidos.length === 0 && (
          <p className="empty">No hay partidos registrados todavía.</p>
        )}

        {partidos.map((p) => (
          <div key={p.id} className="history-card">
            <h2>{p.fecha} — {p.hora}</h2>
            <p><strong>Lugar:</strong> {p.lugar}</p>
            <p><strong>Estado:</strong> {p.estado}</p>

            {p.estado === "jugado" && (
              <p><strong>Resultado:</strong> Rojo {p.golesRojo} - {p.golesBlanco} Blanco</p>
            )}

            <div className="teams-box">
              <div>
                <h3>Equipo ROJO</h3>
                {p.equipoRojo?.length > 0 ? (
                  p.equipoRojo.map((j, i) => <p key={i}>{j}</p>)
                ) : (
                  <p className="empty-team">Sin asignar</p>
                )}
              </div>

              <div>
                <h3>Equipo BLANCO</h3>
                {p.equipoBlanco?.length > 0 ? (
                  p.equipoBlanco.map((j, i) => <p key={i}>{j}</p>)
                ) : (
                  <p className="empty-team">Sin asignar</p>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
