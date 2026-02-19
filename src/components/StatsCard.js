import React from "react";
import FifaCard from "./UI/FifaCard";

export default function StatsCard({ title, value }) {
  return (
    <FifaCard>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 28, fontWeight: "bold", color: "#00ff87" }}>
        {value}
      </p>
    </FifaCard>
  );
}
