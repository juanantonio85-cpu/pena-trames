import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion
} from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function PendingGoals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const loadGoals = async () => {
      const snap = await getDocs(collection(db, "pendingGoals"));
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setGoals(list);
    };
    loadGoals();
  }, []);

  const acceptGoal = async (goal) => {
    const playerRef = doc(db, "users", goal.playerId);
    const matchRef = doc(db, "matches", goal.matchId);

    // 1. Sumar gol al jugador
    await updateDoc(playerRef, {
      goals: increment(1)
    });

    // 2. Añadir gol al partido
    await updateDoc(matchRef, {
      goals: arrayUnion({
        playerId: goal.playerId,
        playerName: goal.playerName,
        minute: goal.minute || null
      })
    });

    // 3. Eliminar gol pendiente
    await deleteDoc(doc(db, "pendingGoals", goal.id));

    alert("Gol aceptado");
    setGoals((prev) => prev.filter((g) => g.id !== goal.id));
  };

  const rejectGoal = async (goal) => {
    await deleteDoc(doc(db, "pendingGoals", goal.id));
    alert("Gol rechazado");
    setGoals((prev) => prev.filter((g) => g.id !== goal.id));
  };

  if (goals.length === 0) return <p>No hay goles pendientes</p>;

  return (
    <div>
      <h3>Goles pendientes</h3>
      {goals.map((g) => (
        <FifaCard key={g.id}>
          <p><strong>Jugador:</strong> {g.playerName}</p>
          <p><strong>Partido:</strong> {g.matchId}</p>
          {g.minute && <p><strong>Minuto:</strong> {g.minute}</p>}
          <FifaButton onClick={() => acceptGoal(g)}>Aceptar</FifaButton>
          <FifaButton onClick={() => rejectGoal(g)}>Rechazar</FifaButton>
        </FifaCard>
      ))}
    </div>
  );
}

