import React, { useEffect, useState } from "react";
import "./CloseMatch.css";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function CloseMatch({ onBack }) {
  const [partidos, setPartidos] = useState([]);
  const [selected, setSelected] = useState("");
  const [golesRojo, setGolesRojo] = useState("");
  const [golesBlanco, setGolesBlanco] = useState("");

  useEffect(() => {
    const fetchPartidos = async () => {
      const snap = await getDocs(collection(db, "partidos"));
      const lista = [];
      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));
      setPartidos(lista.filter((p) => p.estado === "pendiente"));
    };

    fetchPartidos();
  }, []);

  const cerrarPartido = async () => {
    if (!selected) return alert("Selecciona un partido");
    if (golesRojo === "" || golesBlanco === "") return alert("Introduce los goles");

    const partido = partidos.find((p) => p.id === selected);
    if (!partido) return;

    const equipoRojo = partido.equipoRojo || [];
    const equipoBlanco = partido.equipoBlanco || [];

    // LÓGICA DE PUNTOS (TU LÓGICA ORIGINAL)
    let puntosRojo = 0;
    let puntosBlanco = 0;

    if (golesRojo > golesBlanco) {
      puntosRojo = 3;
      puntosBlanco = 1;
    } else if (golesRojo < golesBlanco) {
      puntosRojo = 1;
      puntosBlanco = 3;
    } else {
      puntosRojo = 2;
      puntosBlanco = 2;
    }

    // Actualizar puntos de jugadores
    const usersSnap = await getDocs(collection(db, "users"));
    const updates = [];

    usersSnap.forEach((u) => {
      const data = u.data();
      let nuevosPuntos = data.puntos || 0;

      if (equipoRojo.includes(data.name)) nuevosPuntos += puntosRojo;
      if (equipoBlanco.includes(data.name)) nuevosPuntos += puntosBlanco;

      updates.push(updateDoc(doc(db, "users", u.id), { puntos: nuevosPuntos }));
    });

    await Promise.all(updates);

    // Marcar partido como jugado
    await updateDoc(doc(db, "partidos", selected), {
      estado: "jugado",
      golesRojo: Number(golesRojo),
      golesBlanco: Number(golesBlanco)
    });

    alert("Partido cerrado y puntos actualizados");
    onBack();
  };

  return (
    <div className="close-container">
      <button className="btn volver-btn" onClick={onBack}>⬅ Volver</button>

      <header className="close-header">
        <img src="/logo.png" alt="TRAMES FC" className="close-logo" />
        <h1 className="close-title">CERRAR PARTIDO</h1>
        <p className="close-subtitle">ACTUALIZAR RESULTADO Y PUNTOS</p>
      </header>

      <div className="close-card">
        <label>Seleccionar partido</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="">Selecciona uno...</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fecha} — {p.hora} — {p.lugar}
            </option>
          ))}
        </select>

        <label>Goles Equipo ROJO</label>
        <input
          type="number"
          value={golesRojo}
          onChange={(e) => setGolesRojo(e.target.value)}
        />

        <label>Goles Equipo BLANCO</label>
        <input
          type="number"
          value={golesBlanco}
          onChange={(e) => setGolesBlanco(e.target.value)}
        />

        <button className="btn cerrar-btn" onClick={cerrarPartido}>
          Cerrar Partido →
        </button>
      </div>
    </div>
  );
}
