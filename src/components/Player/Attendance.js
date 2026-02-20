import React, { useEffect, useState } from "react";
import "./Attendance.css";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

export default function Attendance({ user, onNavigate }) {
  const [partido, setPartido] = useState(null);
  const [asistencia, setAsistencia] = useState(null);

  useEffect(() => {
    const fetchPartido = async () => {
      const snap = await getDocs(collection(db, "partidos"));
      let partidoPendiente = null;

      snap.forEach((d) => {
        if (d.data().estado === "pendiente") {
          partidoPendiente = { id: d.id, ...d.data() };
        }
      });

      if (partidoPendiente) {
        setPartido(partidoPendiente);

        // Ver si el jugador ya respondió
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();

        if (data.asistencia && data.asistencia[partidoPendiente.id] !== undefined) {
          setAsistencia(data.asistencia[partidoPendiente.id]);
        }
      }
    };

    fetchPartido();
  }, [user.uid]);

  const guardarAsistencia = async (valor) => {
    if (!partido) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();

    const nuevasAsistencias = data.asistencia || {};
    nuevasAsistencias[partido.id] = valor;

    await updateDoc(userRef, {
      asistencia: nuevasAsistencias
    });

    setAsistencia(valor);
    alert("Asistencia actualizada");
  };

  if (!partido) {
    return (
      <div className="attendance-container">
        <button className="btn volver-btn" onClick={() => onNavigate("home")}>
          ⬅ Volver
        </button>
        <p className="empty">No hay partido pendiente.</p>
      </div>
    );
  }

  return (
    <div className="attendance-container">
      <button className="btn volver-btn" onClick={() => onNavigate("home")}>
        ⬅ Volver
      </button>

      <header className="attendance-header">
        <img src="/logo.png" alt="TRAMES FC" className="attendance-logo" />
        <h1 className="attendance-title">ASISTENCIA</h1>
        <p className="attendance-subtitle">CONFIRMA TU DISPONIBILIDAD</p>
      </header>

      <div className="attendance-card">
        <h2>Próximo Partido</h2>
        <p><strong>Fecha:</strong> {partido.fecha}</p>
        <p><strong>Hora:</strong> {partido.hora}</p>
        <p><strong>Lugar:</strong> {partido.lugar}</p>

        <div className="attendance-buttons">
          <button
            className={`btn asistir-btn ${asistencia === true ? "active" : ""}`}
            onClick={() => guardarAsistencia(true)}
          >
            Asistir
          </button>

          <button
            className={`btn noasistir-btn ${asistencia === false ? "active" : ""}`}
            onClick={() => guardarAsistencia(false)}
          >
            No asistir
          </button>
        </div>
      </div>
    </div>
  );
}
