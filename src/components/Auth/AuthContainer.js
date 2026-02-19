import React from "react";

export default function AuthContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        borderRadius: 12,
        background: "#1a1a1a",
        color: "white",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        textAlign: "center"
      }}
    >
      {children}
    </div>
  );
}
