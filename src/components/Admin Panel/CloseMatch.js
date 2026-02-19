import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function CloseMatch() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const loadMatch = async () => {
      const q = query(collection(db, "matches"), where("status", "==", "open"));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docData = snap.docs[0];
        setMatch({ id: docData.id, ...docData.data() });
      }
    };

    loadMatch();
  }, []);

  if (!match) return <p>No hay partido abierto</p>;

  const redGoals = match.goals?.filter((g) =>
    match.redTeam.includes(g.playerName)
  ).length || 0;

  const whiteGoals = match.goals?.filter((g) =>
    match.whiteTeam.includes(g.playerName)
  ).length || 0;

  const closeMatch = async () => {
    const ref = doc(db, "matches", match.id);

    await updateDoc(ref, {
      status: "closed",
      finalScore: {
        red: redGoals,
        white: whiteGoals
      }
    });

    alert("Partido cerrado correctamente");
    setMatch(null);
  };

  return (
    <FifaCard>
      <h3>Cerrar partido</h3>

      <p><strong>Fecha:</strong> {match.fecha}</p>

      <h4>Marcador</h4>
      <p>🔴 Rojo: {redGoals}</p>
      <p>⚪ Blanco: {whiteGoals}</p>

      <h4>Goleadores</h4>
      {match.goals?.length > 0 ? (
        match.goals.map((g, i) => (
          <p key={i}>
            {g.playerName} {g.minute ? `(${g.minute}')` : ""}
          </p>
        ))
      ) : (
        <p>No hay goles registrados</p>
      )}

      <FifaButton onClick={closeMatch}>Cerrar partido</FifaButton>
    </FifaCard>
  );
}
