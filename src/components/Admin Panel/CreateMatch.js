import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function CreateMatch({ onMatchCreated }) {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [date, setDate] = useState("");

  // Cargar jugadores
  useEffect(() => {
    const loadPlayers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setPlayers(list);
    };
    loadPlayers();
  }, []);

  const setTeam = (id, team) => {
    setTeams((prev) => ({ ...prev, [id]: team }));
  };

  const addGuest = () => {
    if (!guestName.trim()) return;
    setGuests((prev) => [...prev, guestName.trim()]);
    setGuestName("");
  };

  const createMatch = async () => {
    const redTeam = players
      .filter((p) => teams[p.id] === "red")
      .map((p) => p.name);

    const whiteTeam = players
      .filter((p) => teams[p.id] === "white")
      .map((p) => p.name);

    const allPlayers = players.map((p) => p.name);

    await addDoc(collection(db, "matches"), {
      fecha: date,
      redTeam,
      whiteTeam,
      guests,
      status: "open",
      attendance: {
        yes: [],
        no: [],
        unknown: allPlayers
      }
    });

    if (onMatchCreated) onMatchCreated();

    alert("Partido creado y equipos asignados");
  };

  return (
    <FifaCard>
      <h3>Crear partido</h3>

      <label>Fecha</label>
      <input value={date} onChange={(e) => setDate(e.target.value)} />

      <h4>Asignar equipos</h4>
      {players.map((p) => (
        <div key={p.id} style={{ marginBottom: 8 }}>
          <span>{p.name}</span>
          <button onClick={() => setTeam(p.id, "red")}>Rojo</button>
          <button onClick={() => setTeam(p.id, "white")}>Blanco</button>
          <span>
            {teams[p.id] === "red" && " 🔴"}
            {teams[p.id] === "white" && " ⚪"}
          </span>
        </div>
      ))}

      <h4>Invitados</h4>
      <input
        placeholder="Nombre del invitado"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <button onClick={addGuest}>Añadir invitado</button>

      {guests.length > 0 && (
        <ul>
          {guests.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      )}

      <FifaButton onClick={createMatch}>Guardar partido</FifaButton>
    </FifaCard>
  );
}
