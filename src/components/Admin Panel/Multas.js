import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Multas({ onBack }) {
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [multas, setMultas] = useState([]);

  const [jugador, setJugador] = useState("");
  const [partido, setPartido] = useState("");
  const [motivo, setMotivo] = useState("Llegar tarde");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    const partidosSnap = await getDocs(collection(db, "partidos"));
    const multasSnap = await getDocs(collection(db, "multas"));

    setJugadores(usersSnap.docs.map((d) => d.data().name));
    setPartidos(partidosSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setMultas(multasSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const crearMulta = async () => {
    await addDoc(collection(db, "multas"), {
      jugador,
      partidoId: partido,
      motivo,
      estado: "pendiente",
      fecha: new Date().toISOString(),
    });

    cargar();
  };

  const marcarPagada = async (id) => {
    await updateDoc(doc(db, "multas", id), { estado: "pagada" });
    cargar();
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>⬅ Volver</button>
      <h1>Multas</h1>

      <h2>Añadir multa</h2>

      <select onChange={(e) => setJugador(e.target.value)}>
        <option>Selecciona jugador</option>
        {jugadores.map((j) => (
          <option key={j}>{j}</option>
        ))}
      </select>

      <select onChange={(e) => setPartido(e.target.value)}>
        <option>Selecciona partido</option>
        {partidos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.fecha}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <button onClick={crearMulta}>Crear multa</button>

      <h2>Multas pendientes</h2>

      {multas
        .filter((m) => m.estado === "pendiente")
        .map((m) => (
          <div key={m.id}>
            {m.jugador} — {m.motivo} — {m.fecha}
            <button onClick={() => marcarPagada(m.id)}>Marcar pagada</button>
          </div>
        ))}
    </div>
  );
}
