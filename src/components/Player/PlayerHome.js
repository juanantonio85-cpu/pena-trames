import React from "react";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";
import { IconBall, IconTrophy, IconField, IconStar } from "../UI/IconsFifa";

export default function PlayerHome({ user, profile, onNavigate }) {
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>
        Bienvenido, {profile.name}
      </h2>

      {/* Tarjeta principal */}
      <FifaCard>
        <h3>Tu información</h3>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Posición:</strong> {profile.position || "—"}</p>
        <p><strong>Dorsal:</strong> #{profile.number || "—"}</p>

        <div style={{ marginTop: 20 }}>
          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconBall /> Goles: <strong>{profile.goals || 0}</strong>
          </p>

          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconStar /> Victorias: <strong>{profile.wins || 0}</strong>
          </p>

          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconTrophy /> Partidos:{" "}
            <strong>
              {(profile.wins || 0) +
                (profile.draws || 0) +
                (profile.losses || 0)}
            </strong>
          </p>
        </div>
      </FifaCard>

      {/* Navegación principal */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        <FifaButton onClick={() => onNavigate("ranking")}>
          <IconTrophy /> Ver Ranking
        </FifaButton>

        <FifaButton onClick={() => onNavigate("history")}>
          <IconField /> Historial de Partidos
        </FifaButton>

        <FifaButton onClick={() => onNavigate("profile")}>
          <IconStar /> Mi Perfil
        </FifaButton>
      </div>
    </div>
  );
}
