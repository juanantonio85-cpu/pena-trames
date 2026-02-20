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
        color: "#3b3b3b",
        fontFamily: "'Oswald', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        margin: "0 auto",
        textTransform: "uppercase",
      }}
    >
      {/* Media total (arriba izquierda) */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 26,
          fontSize: 34,
          fontWeight: 900,
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* Posición (debajo de la media) */}
      <div
        style={{
          position: "absolute",
          top: 68,
          left: 30,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {player.posicion || "ST"}
      </div>

      {/* Foto jugador (centrada) */}
      <img
        src={player.fotoURL || "/default-player.png"}
        alt="foto"
        style={{
          width: 130,
          height: 130,
          objectFit: "contain",
          position: "absolute",
          top: 90,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Nombre jugador (debajo de la foto) */}
      <div
        style={{
          position: "absolute",
          top: 230,
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {player.name}
      </div>

      {/* Nombres de las métricas (debajo del nombre) */}
      <div
        style={{
          position: "absolute",
          top: 260,
          width: "100%",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        PAC&nbsp;&nbsp;&nbsp;SHO&nbsp;&nbsp;&nbsp;PAS&nbsp;&nbsp;&nbsp;DRI&nbsp;&nbsp;&nbsp;DEF&nbsp;&nbsp;&nbsp;PHY
      </div>

      {/* Valores de las métricas (debajo de los nombres) */}
      <div
        style={{
          position: "absolute",
          top: 280,
          width: "100%",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        {(player.pac || 50)}&nbsp;&nbsp;&nbsp;
        {(player.sho || 50)}&nbsp;&nbsp;&nbsp;
        {(player.pas || 50)}&nbsp;&nbsp;&nbsp;
        {(player.dri || 50)}&nbsp;&nbsp;&nbsp;
        {(player.def || 50)}&nbsp;&nbsp;&nbsp;
        {(player.phy || 50)}
      </div>

      {/* Escudo TRAMES FC (abajo centrado) */}
      <img
        src="/logo.png"
        alt="TRAMES FC"
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 40,
          height: 40,
          objectFit: "contain",
        }}
      />
    </div>
  );
}
