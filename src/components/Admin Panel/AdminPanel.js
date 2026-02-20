import React from "react";
import "./AdminPanel.css";

export default function AdminPanel({ onNavigate }) {
  return (
    <div className="admin-container">

      <header className="admin-header">
        <img src="/logo.png" alt="TRAMES FC" className="admin-logo" />
        <h1 className="admin-title">PANEL ADMINISTRATIVO</h1>
        <p className="admin-subtitle">GESTIÓN INTERNA DEL CLUB</p>
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

        {/* 🔥 NUEVA TARJETA: IMPORTAR DATOS */}
        <div className="admin-card" onClick={() => onNavigate("importar")}>
          <h2>Importar Datos</h2>
          <p>Sube los CSV y reconstruye la base de datos.</p>
        </div>

        {/* 🔥 NUEVA TARJETA: MULTAS */}
        <div className="admin-card" onClick={() => onNavigate("multas")}>
          <h2>Multas</h2>
          <p>Gestiona multas y retrasos de jugadores.</p>
        </div>

        <div className="admin-card" onClick={() => onNavigate("cerrar")}>
          <h2>Cerrar Partido</h2>
          <p>Introduce resultado y asigna puntos.</p>
        </div>

      </div>
    </div>
  );
}
