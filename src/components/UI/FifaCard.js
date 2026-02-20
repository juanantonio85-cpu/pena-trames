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
      {/* MEDIA (arriba izquierda) */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 26,
          fontSize: 40,
          fontFamily: "'Anton', sans-serif",
          fontWeight: 900,
          color: "#2f2f2f",
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* POSICIÓN */}
      <div
        style={{
          position: "absolute",
          top: 72,
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
          top: 95,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* NOMBRE (bajado 10px) */}
      <div
        style={{
          position: "absolute",
          top: 245,
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {player.name}
      </div>

      {/* NOMBRES DE LAS MÉTRICAS */}
      <div
        style={{
          position: "absolute",
          top: 275,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        PAC&nbsp;&nbsp;SHO&nbsp;&nbsp;PAS&nbsp;&nbsp;DRI&nbsp;&nbsp;DEF&nbsp;&nbsp;PHY
      </div>

      {/* VALORES DE LAS MÉTRICAS */}
      <div
        style={{
          position: "absolute",
          top: 297,
          width: "100%",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: 3,
        }}
      >
        {player.pac || 50}&nbsp;&nbsp;
        {player.sho || 50}&nbsp;&nbsp;
        {player.pas || 50}&nbsp;&nbsp;
        {player.dri || 50}&nbsp;&nbsp;
        {player.def || 50}&nbsp;&nbsp;
        {player.phy || 50}
      </div>

      {/* ESCUDO (reducido y centrado) */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 32,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
