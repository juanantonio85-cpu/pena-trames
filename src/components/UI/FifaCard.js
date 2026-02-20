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
        fontFamily: "'Oswald', sans-serif",
        margin: "0 auto",
        textTransform: "uppercase",
      }}
    >
      {/* MEDIA */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 26,
          fontSize: 38,
          fontWeight: 900,
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

      {/* NOMBRE */}
      <div
        style={{
          position: "absolute",
          top: 235,
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
          top: 270,
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
          top: 292,
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

      {/* ESCUDO */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 42,
          height: 42,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
