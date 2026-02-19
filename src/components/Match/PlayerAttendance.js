import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";
import { IconCheck, IconCross } from "../UI/IconsFifa";

export default function PlayerAttendance({ profile }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const loadMatch = async () => {
      const q = query(collection(db, "matches"), where("status", "==", "open"));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docData = snap.docs[0];
        const data = docData.data();

        const attendance = data.attendance || {
          yes: [],
          no: [],
          unknown: []
        };

        setMatch({
          id: docData.id,
          ...data,
          attendance
        });
      }
    };

    loadMatch();
  }, []);

  if (!match) return <p>No hay partido abierto</p>;

  const confirm = async (type) => {
    const ref = doc(db, "matches", match.id);

    const yes = new Set(match.attendance.yes);
    const no = new Set(match.attendance.no);
    const unknown = new Set(match.attendance.unknown);

    yes.delete(profile.name);
    no.delete(profile.name);
    unknown.delete(profile.name);

    if (type === "yes") yes.add(profile.name);
    if (type === "no") no.add(profile.name);

    await updateDoc(ref, {
      attendance: {
        yes: Array.from(yes),
        no: Array.from(no),
        unknown: Array.from(unknown)
      }
    });

    alert("Asistencia actualizada");
  };

  return (
    <FifaCard>
      <h3>Asistencia</h3>

      <FifaButton type="success" onClick={() => confirm("yes")}>
        <IconCheck />
        Sí, voy
      </FifaButton>

      <FifaButton type="danger" onClick={() => confirm("no")}>
        <IconCross />
        No puedo ir
      </FifaButton>
    </FifaCard>
  );
}
