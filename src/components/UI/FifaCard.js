import React from "react";

export default function FifaCard({ children, style }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1f2933, #111827)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 60%)",
          pointerEvents: "none"
        }}
      />
      {children}
    </div>
  );
}
