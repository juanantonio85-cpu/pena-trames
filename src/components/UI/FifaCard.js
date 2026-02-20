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
        color: "#000",
        fontFamily: "sans-serif",
        margin: "0 auto"
      }}
    >
      {/* Media */}
      <div
        style={{
          position: "absolute",
          top: 45,
          left: 28,
          fontSize: 40,
          fontWeight: "900",
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* Posición */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 32,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {player.posicion || "N/A"}
      </div>

      {/* Escudo TRAMES FC */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          top: 50,
          right: 28,
          width: 40,
          height: 40,
          objectFit: "contain",
        }}
      />

      {/* Foto jugador */}
      <img
        src={player.fotoURL || "/default-player.png"}
        alt="foto"
        style={{
          width: 130,
          height: 130,
          objectFit: "contain",
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Nombre */}
      <div
        style={{
          position: "absolute",
          top: 260,
          width: "100%",
          textAlign: "center",
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        {player.name}
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          fontSize: 15,
          fontWeight: "700",
          lineHeight: "22px",
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
