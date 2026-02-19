import React from "react";
import { IconBall, IconStar, IconTrophy } from "./IconsFifa";

export default function FifaPlayerCard({ player }) {
  const totalMatches =
    (player.wins || 0) + (player.draws || 0) + (player.losses || 0);

  return (
    <div
      style={{
        width: 220,
        padding: 16,
        borderRadius: 16,
        background: "linear-gradient(145deg, #1a1a1a, #000)",
        border: "3px solid #facc15",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(250, 204, 21, 0.4)",

        // ⭐ ANIMACIÓN DE ENTRADA
        opacity: 0,
        transform: "translateY(20px)",
        animation: "fadeUp 0.6s ease forwards"
      }}
    >
      {/* ⭐ BRILLO DIAGONAL ANIMADO */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 200,
          height: 200,
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0))",
          transform: "rotate(25deg)",
          animation: "shine 3s linear infinite"
        }}
      />

      {/* Foto */}
      <img
        src={player.photoURL || "/default-player.png"}
        alt="Foto jugador"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #facc15",
          marginBottom: 10,
          position: "relative",
          zIndex: 2
        }}
      />

      {/* Nombre */}
      <h3 style={{ margin: 0, fontSize: 20, zIndex: 2, position: "relative" }}>
        {player.name}
      </h3>

      {/* Posición y dorsal */}
      <p style={{ opacity: 0.8, margin: 4, zIndex: 2, position: "relative" }}>
        {player.position || "—"} • #{player.number || "—"}
      </p>

      {/* Estadísticas */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontSize: 14,
          zIndex: 2,
          position: "relative"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconBall /> Goles: <strong>{player.goals || 0}</strong>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconStar /> Victorias: <strong>{player.wins || 0}</strong>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconTrophy /> Partidos: <strong>{totalMatches}</strong>
        </div>
      </div>

      {/* ANIMACIONES */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shine {
            0% {
              transform: translateX(-150px) rotate(25deg);
            }
            100% {
              transform: translateX(300px) rotate(25deg);
            }
          }
        `}
      </style>
    </div>
  );
}
