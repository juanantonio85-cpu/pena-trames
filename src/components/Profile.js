import React from "react";
import FifaCard from "./UI/FifaCard";
import FifaButton from "./UI/FifaButton";
import { IconStar, IconBall, IconTrophy } from "./UI/IconsFifa";

export default function Profile({ user, profile, onNavigate }) {
  const totalMatches =
    (profile.wins || 0) + (profile.draws || 0) + (profile.losses || 0);

  return (
    <div>
      {/* Botón volver */}
      <div style={{ marginBottom: 20 }}>
        <FifaButton onClick={() => onNavigate("home")}>⬅ Volver</FifaButton>
      </div>

      <h2 style={{ marginBottom: 20 }}>Perfil de {profile.name}</h2>

      <FifaCard>
        {/* Foto */}
        <div style={{ textAlign: "center" }}>
          <img
            src={profile.photoURL || "/default-player.png"}
            alt="Foto jugador"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #facc15",
              marginBottom: 10
            }}
          />
        </div>

        {/* Datos básicos */}
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Posición:</strong> {profile.position || "—"}</p>
        <p><strong>Dorsal:</strong> #{profile.number || "—"}</p>

        {/* Estadísticas */}
        <div style={{ marginTop: 20 }}>
          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconBall /> Goles: <strong>{profile.goals || 0}</strong>
          </p>

          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconStar /> Victorias: <strong>{profile.wins || 0}</strong>
          </p>

          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconTrophy /> Partidos: <strong>{totalMatches}</strong>
          </p>
        </div>

        {/* Navegación opcional */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <FifaButton onClick={() => onNavigate("ranking")}>
            Ver Ranking
          </FifaButton>

          <FifaButton onClick={() => onNavigate("history")}>
            Historial de Partidos
          </FifaButton>
        </div>
      </FifaCard>
    </div>
  );
}
