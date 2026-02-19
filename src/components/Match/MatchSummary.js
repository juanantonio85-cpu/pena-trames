import React from "react";
import FifaCard from "../UI/FifaCard";
import FifaPlayerCard from "../UI/FifaPlayerCard";
import { IconBall, IconStar, IconTrophy } from "../UI/IconsFifa"
import { IconField } from "../UI/IconsFifa";

export default function MatchSummary({ match }) {
  if (!match) return <p>No hay datos del partido.</p>;

  const totalGoals = match.goals?.length || 0;

  return (
    <div>
      {/* Título */}
      <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconField />
        Resumen del Partido — {match.fecha}
      </h2>

      {/* Resultado grande */}
      <div
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: "20px 0",
          color: "#facc15",
          textShadow: "0 0 10px rgba(250,204,21,0.6)"
        }}
      >
        🔴 {match.finalScore.red} — {match.finalScore.white} ⚪
      </div>

      {/* Estadísticas principales */}
      <FifaCard>
        <h3>Estadísticas del Partido</h3>

        <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconBall /> Total de goles: <strong>{totalGoals}</strong>
        </p>

        <p>
          <strong>Asistencia total:</strong>{" "}
          {match.attendance.yes.length +
            match.attendance.no.length +
            match.attendance.unknown.length}
        </p>

        <p>
          <strong>Confirmados:</strong> {match.attendance.yes.join(", ")}
        </p>

        <p>
          <strong>No vienen:</strong> {match.attendance.no.join(", ")}
        </p>

        <p>
          <strong>Sin respuesta:</strong> {match.attendance.unknown.join(", ")}
        </p>
      </FifaCard>

      {/* Goleadores */}
      <FifaCard style={{ marginTop: 20 }}>
        <h3>Goleadores</h3>

        {match.goals?.length === 0 && <p>No hay goles registrados.</p>}

        {match.goals?.map((g, i) => (
          <p
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconBall />
            {g.playerName}
            {g.minute ? ` (${g.minute}')` : ""}
          </p>
        ))}
      </FifaCard>

      {/* Equipos con cartas FIFA */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {/* Equipo Rojo */}
        <div>
          <h3 style={{ textAlign: "center" }}>🔴 Equipo Rojo</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center"
            }}
          >
            {match.redTeam.map((player, i) => (
              <FifaPlayerCard key={i} player={player} />
            ))}
          </div>
        </div>

        {/* Equipo Blanco */}
        <div>
          <h3 style={{ textAlign: "center" }}>⚪ Equipo Blanco</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center"
            }}
          >
            {match.whiteTeam.map((player, i) => (
              <FifaPlayerCard key={i} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
