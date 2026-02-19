import React, { useState } from "react";
import Ranking from "./Ranking";
import AdminPanel from "./AdminPanel/AdminPanel";

export default function Layout({ user, profile }) {
  const [tab, setTab] = useState("profile");

  return (
    <div className="layout-container">

      {/* Header */}
      <div className="layout-header">
        <img src="/logo-glow.png" className="header-logo logo-glow" />
        <h2>Peña Trames</h2>
      </div>

      {/* Content */}
      <div className="layout-content">
        {tab === "profile" && <Profile user={user} profile={profile} />}
        {tab === "matches" && <Matches />}
        {tab === "ranking" && <Ranking />}
        {tab === "admin" && profile?.role === "admin" && <AdminPanel />}
      </div>

      {/* Bottom Menu */}
      <div className="layout-menu">
        <button onClick={() => setTab("profile")}>Perfil</button>
        <button onClick={() => setTab("matches")}>Partidos</button>
        <button onClick={() => setTab("ranking")}>Ranking</button>

        {profile?.role === "admin" && (
          <button onClick={() => setTab("admin")}>Admin</button>
        )}
      </div>

    </div>
  );
}
