import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";

export default function PlayerHistory({ profile }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadMatches = async () => {
      const q = query(collection(db, "matches"), where("status", "==", "closed"));
      const snap = await getDocs(q);

      const list = [];
      snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));

      // Filtrar solo los partidos donde jugó el jugador
      const played = list.filter(
        (m) =>
          m.redTeam.includes(profile.name) ||
          m.whiteTeam.includes(profile.name)
      );

      // Ordenar por fecha descendente
      played.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setMatches(played);
    };

    loadMatches();
  }, [profile]);

  if (matches.length === 0) return <p>No has jugado ningún partido todavía</p>;

  return (
    <div>
      <h2>Mi Historial</h2>

      {matches.map((m) => {
        const isRed = m.redTeam.includes(profile.name);
        const isWhite = m.whiteTeam.includes(profile.name);

        const redGoals = m.goals?.filter((g) =>
          m.redTeam.includes(g.playerName)
        ).length || 0;

        const whiteGoals = m.goals?.filter((g) =>
          m.whiteTeam.includes(g.playerName)
        ).length || 0;

        const myGoals = m.goals?.filter((g) => g.playerName === profile.name)
          .length || 0;

        return (
          <FifaCard key={m.id}>
            <h3>Partido del {m.fecha}</h3>

            <p>
              <strong>Equipo:</strong>{" "}
              {isRed ? "🔴 Rojo" : isWhite ? "⚪ Blanco" : "Invitado"}
            </p>

            <p>
              <strong>Resultado:</strong>  
              🔴 {redGoals} - ⚪ {whiteGoals}
            </p>

            <p>
              <strong>Mis goles:</strong> {myGoals}
            </p>

            <h4>Goleadores</h4>
            {m.goals?.length > 0 ? (
              m.goals.map((g, i) => (
                <p key={i}>
                  {g.playerName} {g.minute ? `(${g.minute}')` : ""}
                </p>
              ))
            ) : (
              <p>No hubo goles</p>
            )}
          </FifaCard>
        );
      })}
    </div>
  );
}
