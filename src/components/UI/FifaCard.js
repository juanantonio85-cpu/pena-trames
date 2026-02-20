import React from "react";

export default function FifaCard({ player }) {
  if (!player) return null;

  return (
    <div
      style={{
        width: 260,
        background: "linear-gradient(135deg, #0a0f0c, #000)",
        borderRadius: 20,
        padding: 18,
        margin: "0 auto 20px auto",
        border: "1px solid rgba(0,255,136,0.35)",
        boxShadow: "0 0 25px rgba(0,255,136,0.25)",
        position: "relative",
        overflow: "hidden",
        color: "white",
        textAlign: "center",
        fontFamily: "sans-serif"
      }}
    >
      {/* Efecto foil */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 160,
          height: 160,
          background:
            "radial-gradient(circle at center, rgba(0,255,136,0.18), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(4px)"
        }}
      />

      {/* Media general */}
      <div
        style={{
          fontSize: 38,
          fontWeight: "900",
          color: "#00ff88",
          textShadow: "0 0 10px #00ff88",
          marginBottom: -6
        }}
      >
        {player.mediaGeneral || 50}
      </div>

      {/* Posición */}
      <div
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#ccc",
          marginBottom: 10
        }}
      >
        {player.posicion || "N/A"}
      </div>

      {/* Foto */}
      <img
        src={player.fotoURL || "/default-player.png"}
        alt="foto"
        style={{
          width: 110,
          height: 110,
          borderRadius: 12,
          objectFit: "cover",
          border: "2px solid #00ff88",
          boxShadow: "0 0 12px #00ff88",
          marginBottom: 10
        }}
      />

      {/* Nombre */}
      <div
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 4
        }}
      >
        {player.name}
      </div>

      {/* Dorsal */}
      <div
        style={{
          fontSize: 14,
          color: "#ccc",
          marginBottom: 12
        }}
      >
        Dorsal: {player.dorsal || "-"}
      </div>

      {/* Stats FIFA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          textAlign: "left",
          padding: "0 20px"
        }}
      >
        <div style={{ color: "#00ff88" }}>PAC: {player.pac || 50}</div>
        <div style={{ color: "#00ff88" }}>SHO: {player.sho || 50}</div>
        <div style={{ color: "#00ff88" }}>PAS: {player.pas || 50}</div>
        <div style={{ color: "#00ff88" }}>DRI: {player.dri || 50}</div>
        <div style={{ color: "#00ff88" }}>DEF: {player.def || 50}</div>
        <div style={{ color: "#00ff88" }}>PHY: {player.phy || 50}</div>
      </div>
    </div>
  );
}
