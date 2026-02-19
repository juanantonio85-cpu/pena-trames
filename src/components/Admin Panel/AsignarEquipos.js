import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function AsignarEquipos({ matchId, onBack }) {
  const [match, setMatch] = useState(null);
  const [apuntados, setApuntados] = useState([]);
  const [rojo, setRojo] = useState([]);
  const [blanco, setBlanco] = useState([]);

  // Cargar datos del partido
  useEffect(() => {
    async function load() {
      const ref = doc(db, "matches", matchId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setMatch(data);

        setApuntados(data.apuntados || []);
        setRojo(data.equipoRojo || []);
        setBlanco(data.equipoBlanco || []);
      }
    }

    load();
  }, [matchId]);

  const moverArojo = (uid) => {
    setRojo([...rojo, uid]);
    setBlanco(blanco.filter((x) => x !== uid));
  };

  const moverAblanco = (uid) => {
    setBlanco([...blanco, uid]);
    setRojo(rojo.filter((x) => x !== uid));
  };

  const guardarEquipos = async () => {
    try {
      await updateDoc(doc(db, "matches", matchId), {
        equipoRojo: rojo,
        equipoBlanco: blanco
      });

      alert("Equipos guardados");
      onBack();
    } catch (e) {
      console.error("Error guardando equipos:", e);
    }
  };

  if (!match) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Asignar equipos</h2>
      <h3>{match.nombre}</h3>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Jugadores apuntados */}
        <div style={{ flex: 1 }}>
          <h3>Apuntados</h3>
          {apuntados.length === 0 && <p>No hay jugadores apuntados.</p>}
          {apuntados.map((uid) => (
            <div key={uid} style={{ marginBottom: 5 }}>
              {uid}
              <button onClick={() => moverArojo(uid)} style={{ marginLeft: 10 }}>
                ➡ Rojo
              </button>
              <button onClick={() => moverAblanco(uid)} style={{ marginLeft: 10 }}>
                ➡ Blanco
              </button>
            </div>
          ))}
        </div>

        {/* Equipo ROJO */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "red" }}>Equipo ROJO</h3>
          {rojo.map((uid) => (
            <div key={uid} style={{ marginBottom: 5 }}>
              {uid}
              <button onClick={() => moverAblanco(uid)} style={{ marginLeft: 10 }}>
                ➡ Blanco
              </button>
            </div>
          ))}
        </div>

        {/* Equipo BLANCO */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "gray" }}>Equipo BLANCO</h3>
          {blanco.map((uid) => (
            <div key={uid} style={{ marginBottom: 5 }}>
              {uid}
              <button onClick={() => moverArojo(uid)} style={{ marginLeft: 10 }}>
                ➡ Rojo
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={guardarEquipos} style={{ marginTop: 20 }}>
        Guardar equipos
      </button>

      <button onClick={onBack} style={{ marginLeft: 10 }}>
        Volver
      </button>
    </div>
  );
}
