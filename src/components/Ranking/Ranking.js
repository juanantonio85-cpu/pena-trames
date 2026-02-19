import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import FifaPlayerCard from "../UI/FifaPlayerCard";
import FifaButton from "../UI/FifaButton";
import { IconTrophy } from "../UI/IconsFifa";

export default function Ranking({ onNavigate }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));

      // Ordenar por goles
      list.sort((a, b) => (b.goals || 0) - (a.goals || 0));

      setPlayers(list);
    };

    load();
  }, []);

  return (
    <div>
      {/* Botón volver */}
      <div style={{ marginBottom: 20 }}>
        <FifaButton onClick={() => onNavigate("home")}>⬅ Volver</FifaButton>
      </div>

      {/* Título */}
      <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconTrophy />
        Ranking de Goleadores
      </h2>

      {/* Lista de jugadores */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 20,
          justifyContent: "center"
        }}
      >
        {players.map((p) => (
          <div
            key={p.id}
            style={{ cursor: "pointer" }}
            onClick={() => onNavigate("profile", p.id)} // ⭐ OPCIONAL
          >
            <FifaPlayerCard player={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
