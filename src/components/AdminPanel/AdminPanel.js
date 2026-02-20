import React from "react";
import "./AdminPanel.css";
import LogoTrames from "../UI/LogoTrames";

export default function AdminPanel({ onNavigate, onSwitch }) {
  return (
    <div className="admin-container">

      <header className="admin-header">
        <LogoTrames size={110} />
        <h1 className="admin-title">PANEL ADMINISTRATIVO</h1>
        <p className="admin-subtitle">GESTIÓN INTERNA DEL CLUB</p>

        {/* 🔥 Botón para cambiar a vista jugador */}
        <button className="admin-switch" onClick={onSwitch}>
          Cambiar a vista jugador
        </button>
      </header>

      <div className="admin-grid">

        <div className="admin-card" onClick={() => onNavigate("crear")}>
          <h2>Crear Partido</h2>
          <p>Configura fecha, hora y lugar del próximo encuentro.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("asignar")}>
          <h2>Asignar Equipos</h2>
          <p>Organiza a los jugadores en equipos equilibrados.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("jugadores")}>
          <h2>Gestión de Jugadores</h2>
          <p>Consulta y administra la lista de jugadores.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("notificaciones")}>
          <h2>Notificaciones</h2>
          <p>Envía avisos y comunicados al equipo.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("importar")}>
          <h2>Importar Datos</h2>
          <p>Sube los CSV y reconstruye la base de datos.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("multas")}>
          <h2>Multas</h2>
          <p>Gestiona multas y retrasos de jugadores.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("cerrar")}>
          <h2>Cerrar Partido</h2>
          <p>Introduce resultado y asigna puntos.</p>
        </div>

        {/* 🟩 NUEVA OPCIÓN: VALORAR JUGADORES */}
        <div className="admin-card" onClick={() => onNavigate("valorar")}>
          <h2>Valorar Jugadores</h2>
          <p>Asigna puntuaciones FIFA tras cada partido.</p>
        </div>

      </div>
    </div>
  );
}
