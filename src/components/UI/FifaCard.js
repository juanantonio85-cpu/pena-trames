import React from "react";

export default function FifaCard({ player }) {
  if (!player) return null;

  return (
    <div
      style={{
        width: 260,
        height: 380,
        position: "relative",
        backgroundImage: "url('/fifa-card-gold.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#3a3a3a",
        fontFamily: "'Roboto Condensed', sans-serif",
        margin: "0 auto",
        textTransform: "uppercase",
      }}
    >
      {/* MEDIA (más baja) */}
      <div
        style={{
          position: "absolute",
          top: 42,     // BAJADO
          left: 26,
          fontSize: 40,
          fontFamily: "'Anton', sans-serif",
          fontWeight: 900,
          color: "#2f2f2f",
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* POSICIÓN (más baja) */}
      <div
        style={{
          position: "absolute",
          top: 88,     // BAJADO
          left: 30,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {player.posicion || "ST"}
      </div>

      {/* FOTO */}
      <img
        src={player.fotoURL || "/default-player.png"}
        alt="foto"
        style={{
          width: 130,
          height: 130,
          objectFit: "contain",
          position: "absolute",
          top: 105,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* NOMBRE (bajado un poco más) */}
      <div
        style={{
          position: "absolute",
          top: 250,     // BAJADO
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {player.name}
      </div>

      {/* NOMBRES DE LAS MÉTRICAS (más estrechos) */}
      <div
        style={{
          position: "absolute",
          top: 278,     // BAJADO
          width: "100%",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        PAC&nbsp;SHO&nbsp;PAS&nbsp;DRI&nbsp;DEF&nbsp;PHY
      </div>

      {/* VALORES DE LAS MÉTRICAS (más compactos) */}
      <div
        style={{
          position: "absolute",
          top: 298,     // BAJADO
          width: "100%",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        {player.pac || 50}&nbsp;
        {player.sho || 50}&nbsp;
        {player.pas || 50}&nbsp;
        {player.dri || 50}&nbsp;
        {player.def || 50}&nbsp;
        {player.phy || 50}
      </div>

      {/* ESCUDO (más pequeño y más arriba) */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          bottom: 32,    // SUBIDO
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,     // MÁS PEQUEÑO
          height: 24,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
