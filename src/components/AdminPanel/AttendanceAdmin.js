import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import { IconCheck, IconCross, IconQuestion } from "../UI/IconsFifa";

export default function AttendanceAdmin() {
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

  return (
    <FifaCard>
      <h3>Asistencia</h3>

      <h4>✔ Confirmados</h4>
      <ul>
        {match.attendance.yes.map((p, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconCheck />
            {p}
          </li>
        ))}
      </ul>

      <h4>❌ No vienen</h4>
      <ul>
        {match.attendance.no.map((p, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconCross />
            {p}
          </li>
        ))}
      </ul>

      <h4>❓ Sin respuesta</h4>
      <ul>
        {match.attendance.unknown.map((p, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconQuestion />
            {p}
          </li>
        ))}
      </ul>
    </FifaCard>
  );
}
