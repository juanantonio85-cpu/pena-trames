import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function ReportGoal({ user, profile }) {
  const [matches, setMatches] = useState([]);
  const [matchId, setMatchId] = useState("");
  const [minute, setMinute] = useState("");

  // Cargar partidos abiertos
  useEffect(() => {
    const loadMatches = async () => {
      const q = query(collection(db, "matches"), where("status", "==", "open"));
      const snap = await getDocs(q);

      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));

      setMatches(list);

      // Si solo hay un partido abierto, seleccionarlo automáticamente
      if (list.length === 1) {
        setMatchId(list[0].id);
      }
    };

    loadMatches();
  }, []);

  const sendGoal = async () => {
    if (!matchId) {
      alert("Selecciona un partido");
      return;
    }

    await addDoc(collection(db, "pendingGoals"), {
      playerId: profile.id,
      playerName: profile.name,
      matchId,
      minute: minute || null,
      createdBy: user.uid,
      createdAt: new Date()
    });

    alert("Gol enviado para revisión");
    setMinute("");
  };

  return (
    <FifaCard>
      <h3>Reportar gol</h3>

      {matches.length === 0 && <p>No hay partidos abiertos</p>}

      {matches.length > 0 && (
        <>
          <label>Partido</label>
          <select value={matchId} onChange={(e) => setMatchId(e.target.value)}>
            <option value="">Selecciona un partido</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>
                Partido del {m.fecha}
              </option>
            ))}
          </select>

          <label>Minuto (opcional)</label>
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="Ej: 23"
          />

          <FifaButton onClick={sendGoal}>Enviar gol</FifaButton>
        </>
      )}
    </FifaCard>
  );
}
