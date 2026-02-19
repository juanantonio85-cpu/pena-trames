import React from "react";
import FifaCard from "./UI/FifaCard";

export default function Matches() {
  const exampleMatches = [
    { rival: "Equipo A", resultado: "3 - 1", fecha: "10/02/2024" },
    { rival: "Equipo B", resultado: "1 - 1", fecha: "05/02/2024" },
    { rival: "Equipo C", resultado: "0 - 2", fecha: "01/02/2024" }
  ];

  return (
    <div>
      <h2>Partidos</h2>

      {exampleMatches.map((m, i) => (
        <FifaCard key={i}>
          <h3>{m.rival}</h3>
          <p>Resultado: {m.resultado}</p>
          <p>Fecha: {m.fecha}</p>
        </FifaCard>
      ))}
    </div>
  );
}
