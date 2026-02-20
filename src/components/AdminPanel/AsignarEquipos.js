import React, { useEffect, useState } from "react";
import "./AsignarEquipos.css";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function AsignarEquipos({ onBack }) {
  const [jugadores, setJugadores] = useState([]);
  const [equipoRojo, setEquipoRojo] = useState([]);
  const [equipoBlanco, setEquipoBlanco] = useState([]);
  const [partido, setPartido] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Obtener jugadores
      const snapUsers = await getDocs(collection(db, "users"));
      const listaJugadores = [];
      snapUsers.forEach((d) => listaJugadores.push({ id: d.id, ...d.data() }));
      setJugadores(listaJugadores);

      // Obtener partido pendiente
      const snapPartidos = await getDocs(collection(db, "partidos"));
      let partidoPendiente = null;
      snapPartidos.forEach((d) => {
        if (d.data().estado === "pendiente") {
          partidoPendiente = { id: d.id, ...d.data() };
        }
      });

      if (partidoPendiente) {
        setPartido(partidoPendiente);
        setEquipoRojo(partidoPendiente.equipoRojo || []);
        setEquipoBlanco(partidoPendiente.equipoBlanco || []);
      }
    };

    fetchData();
  }, []);

  const moverJugador = (nombre, destino) => {
    // Quitar de ambos equipos
    const nuevoRojo = equipoRojo.filter((j) => j !== nombre);
    const nuevoBlanco = equipoBlanco.filter((j) => j !== nombre);

    if (destino === "rojo") nuevoRojo.push(nombre);
    if (destino === "blanco") nuevoBlanco.push(nombre);

    setEquipoRojo(nuevoRojo);
    setEquipoBlanco(nuevoBlanco);
  };

  const guardarEquipos = async () => {
    if (!partido) return alert("No hay partido pendiente");

    await updateDoc(doc(db, "partidos", partido.id), {
      equipoRojo,
      equipoBlanco
    });

    alert("Equipos guardados correctamente");
    onBack();
  };

  return (
    <div className="asignar-container">
      <button className="btn volver-btn" onClick={onBack}>⬅ Volver</button>

      <header className="asignar-header">
        <img src="/logo.png" alt="TRAMES FC" className="asignar-logo" />
        <h1 className="asignar-title">ASIGNAR EQUIPOS</h1>
        <p className="asignar-subtitle">ROJO Y BLANCO</p>
      </header>

      {!partido ? (
        <p className="empty">No hay partido pendiente.</p>
      ) : (
        <>
          <div className="jugadores-lista">
            <h2>Jugadores Disponibles</h2>
            {jugadores.map((j) => (
              <div key={j.id} className="jugador-item">
                <span>{j.name}</span>

                <div className="acciones">
                  <button
                    className="btn rojo-btn"
                    onClick={() => moverJugador(j.name, "rojo")}
                  >
                    ROJO
                  </button>

                  <button
                    className="btn blanco-btn"
                    onClick={() => moverJugador(j.name, "blanco")}
                  >
                    BLANCO
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="equipos-grid">
            <div className="equipo-card rojo">
              <h3>Equipo ROJO</h3>
              {equipoRojo.length === 0 ? (
                <p className="empty">Vacío</p>
              ) : (
                equipoRojo.map((j, i) => <p key={i}>{j}</p>)
              )}
            </div>

            <div className="equipo-card blanco">
              <h3>Equipo BLANCO</h3>
              {equipoBlanco.length === 0 ? (
                <p className="empty">Vacío</p>
              ) : (
                equipoBlanco.map((j, i) => <p key={i}>{j}</p>)
              )}
            </div>
          </div>

          <button className="btn guardar-btn" onClick={guardarEquipos}>
            Guardar Equipos →
          </button>
        </>
      )}
    </div>
  );
}
