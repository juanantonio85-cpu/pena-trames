import React, { useEffect, useState } from "react";
import "./Notifications.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Notifications({ onBack }) {
  const [jugadores, setJugadores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [destino, setDestino] = useState("todos");
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState("");

  useEffect(() => {
    const fetchJugadores = async () => {
      const snap = await getDocs(collection(db, "users"));
      const lista = [];
      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));
      setJugadores(lista);
    };

    fetchJugadores();
  }, []);

  const enviar = async () => {
    if (!mensaje.trim()) return alert("Escribe un mensaje");

    let tokens = [];

    if (destino === "todos") {
      tokens = jugadores.map((j) => j.fcmToken).filter(Boolean);
    }

    if (destino === "jugador" && jugadorSeleccionado) {
      const j = jugadores.find((x) => x.id === jugadorSeleccionado);
      if (j?.fcmToken) tokens = [j.fcmToken];
    }

    if (tokens.length === 0) {
      alert("No hay tokens disponibles para enviar notificaciones");
      return;
    }

    await fetch("https://us-central1-trames-fc.cloudfunctions.net/sendNotification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokens,
        title: "TRAMES FC",
        body: mensaje
      })
    });

    alert("Notificación enviada");
    setMensaje("");
  };

  return (
    <div className="notif-container">
      <button className="btn volver-btn" onClick={onBack}>⬅ Volver</button>

      <header className="notif-header">
        <img src="/logo.png" alt="TRAMES FC" className="notif-logo" />
        <h1 className="notif-title">NOTIFICACIONES</h1>
        <p className="notif-subtitle">ENVÍO DE AVISOS AL EQUIPO</p>
      </header>

      <div className="notif-card">
        <label>Mensaje</label>
        <textarea
          placeholder="Escribe el aviso..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <label>Destino</label>
        <select value={destino} onChange={(e) => setDestino(e.target.value)}>
          <option value="todos">Todos los jugadores</option>
          <option value="jugador">Jugador específico</option>
        </select>

        {destino === "jugador" && (
          <>
            <label>Seleccionar jugador</label>
            <select
              value={jugadorSeleccionado}
              onChange={(e) => setJugadorSeleccionado(e.target.value)}
            >
              <option value="">Selecciona uno...</option>
              {jugadores.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name || j.email}
                </option>
              ))}
            </select>
          </>
        )}

        <button className="btn enviar-btn" onClick={enviar}>
          Enviar Notificación →
        </button>
      </div>
    </div>
  );
}
