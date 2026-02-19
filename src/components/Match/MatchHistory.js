import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";
import { IconField } from "../UI/IconsFifa";

export default function MatchHistory({ onNavigate }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(collection(db, "matches"), where("status", "==", "closed"));
      const snap = await getDocs(q);

      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));

      // Ordenar por fecha descendente
      list.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setMatches(list);
    };

    load();
  }, []);

  return (
    <div>
      {/* Botón volver */}
      <div style={{ marginBottom: 20 }}>
        <FifaButton onClick={() => onNavigate("home")}>⬅ Volver</FifaButton>
      </div>

      <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconField />
        Historial de Partidos
      </h2>

      {matches.length === 0 && <p>No hay partidos cerrados todavía.</p>}

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {matches.map((m) => (
          <FifaCard key={m.id}>
            <h3>Partido del {m.fecha}</h3>

            <p>
              Resultado: 🔴 {m.finalScore.red} - {m.finalScore.white} ⚪
            </p>

            <FifaButton onClick={() => onNavigate("matchDetails", m.id)}>
              Ver resumen
            </FifaButton>
          </FifaCard>
        ))}
      </div>
    </div>
  );
}
