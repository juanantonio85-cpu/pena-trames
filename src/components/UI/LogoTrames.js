import React from "react";
import "./LogoTrames.css";

export default function LogoTrames({ size = 140 }) {
  return (
    <div className="trames-logo-wrapper">
      <img
        src="/logo.png"
        alt="TRAMES FC"
        className="trames-logo"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
