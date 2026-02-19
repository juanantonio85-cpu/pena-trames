import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import MatchSummary from "./MatchSummary";
import FifaButton from "../UI/FifaButton";

export default function MatchDetails({ matchId, onNavigate }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const loadMatch = async () => {
      const ref = doc(db, "matches", matchId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setMatch({ id: snap.id, ...snap.data() });
      }
    };

    loadMatch();
  }, [matchId]);

  if (!match) return <p>Cargando detalles del partido...</p>;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <FifaButton onClick={() => onNavigate("home")}>⬅ Volver</FifaButton>
      </div>

      <MatchSummary match={match} />
    </div>
  );
}
