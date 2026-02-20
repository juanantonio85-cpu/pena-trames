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
        padding: "20px 15px",
        color: "#000",
        fontFamily: "sans-serif",
        margin: "0 auto"
      }}
    >
      {/* Media */}
      <div
        style={{
          position: "absolute",
          top: 25,
          left: 25,
          fontSize: 38,
          fontWeight: "900"
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* Posición */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 28,
          fontSize: 16,
          fontWeight: "700"
        }}
      >
        {player.posicion || "N/A"}
      </div>

      {/* Escudo TRAMES FC (único) */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          top: 25,
          right: 25,
          width: 38,
          height: 38,
          objectFit: "contain"
        }}
      />

      {/* Foto jugador */}
      <img
        src={player.fotoURL || "/default-player.png"}
        alt="foto"
        style={{
          width: 110,
          height: 110,
          objectFit: "cover",
          position: "absolute",
          top: 105,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: 12
        }}
      />

      {/* Nombre */}
      <div
        style={{
          position: "absolute",
          top: 225,
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "700"
        }}
      >
        {player.name}
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          left: 30,
          fontSize: 14,
          fontWeight: "700",
          lineHeight: "20px"
        }}
      >
        <div>PAC {player.pac || 50}</div>
        <div>SHO {player.sho || 50}</div>
        <div>PAS {player.pas || 50}</div>
        <div>DRI {player.dri || 50}</div>
        <div>DEF {player.def || 50}</div>
        <div>PHY {player.phy || 50}</div>
      </div>
    </div>
  );
}
