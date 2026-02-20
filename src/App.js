// src/App.js
import React, { useEffect, useState } from "react";
import { auth, db, requestNotificationPermission } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./styles/global.css";

// AUTH
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// ADMIN
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AsignarEquipos from "./components/AdminPanel/AsignarEquipos";
import CreateMatch from "./components/AdminPanel/CreateMatch";
import PlayersManager from "./components/AdminPanel/PlayersManager";
import Notifications from "./components/AdminPanel/Notifications";
import CloseMatch from "./components/AdminPanel/CloseMatch";
import ImportData from "./components/AdminPanel/ImportData";
import Multas from "./components/AdminPanel/Multas";
import ValorarJugadores from "./components/AdminPanel/ValorarJugadores";

// PLAYER
import PlayerHome from "./components/Player/PlayerHome";
import MatchDetails from "./components/Match/MatchDetails";
import MatchHistory from "./components/Match/MatchHistory";
import Ranking from "./components/Ranking/Ranking";
import Profile from "./components/Profile";
import Attendance from "./components/Player/Attendance";
import PlayerCardView from "./components/Player/PlayerCardView";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");

  const [adminScreen, setAdminScreen] = useState("panel");
  const [adminMode, setAdminMode] = useState(true);

  const [screen, setScreen] = useState({ name: "home", data: null });

  // 🔥 ESTILO PROFESIONAL PARA EL BOTÓN
  const modeSwitchStyle = {
    background: "linear-gradient(135deg, #00c853, #009624)",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s ease-in-out",
    margin: "15px auto",
    display: "block"
  };

  const modeSwitchHover = {
    background: "linear-gradient(135deg, #00e676, #00c853)",
    transform: "translateY(-2px)"
  };

  const [hover, setHover] = useState(false);

  // Detectar login y cargar perfil
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);

        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile({ id: u.uid, ...snap.data() });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => unsub();
  }, []);

  // Guardar token FCM
  useEffect(() => {
    async function saveFcmToken() {
      if (!user) return;

      try {
        const token = await requestNotificationPermission();

        if (token) {
          await updateDoc(doc(db, "users", user.uid), {
            fcmToken: token
          });
        }
      } catch (error) {
        console.error("Error guardando token FCM:", error);
      }
    }

    saveFcmToken();
  }, [user]);

  if (!user || !profile) {
    return authScreen === "login" ? (
      <Login onRegister={() => setAuthScreen("register")} />
    ) : (
      <Register onLogin={() => setAuthScreen("login")} />
    );
  }

  // Vista ADMIN
  if (profile.role === "admin" && adminMode) {
    if (adminScreen === "panel") {
      return (
        <AdminPanel
          onNavigate={setAdminScreen}
          onSwitch={() => setAdminMode(false)}
        />
      );
    }

    if (adminScreen === "asignar") {
      return <AsignarEquipos onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "crear") {
      return <CreateMatch onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "jugadores") {
      return <PlayersManager onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "notificaciones") {
      return <Notifications onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "cerrar") {
      return <CloseMatch onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "importar") {
      return <ImportData onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "multas") {
      return <Multas onBack={() => setAdminScreen("panel")} />;
    }

    if (adminScreen === "valorar") {
      return <ValorarJugadores onBack={() => setAdminScreen("panel")} />;
    }
  }

  const navigate = (name, data = null) => {
    setScreen({ name, data });
  };

  return (
    <div className="app-shell">
      {profile.role === "admin" && !adminMode && (
        <button
          style={hover ? { ...modeSwitchStyle, ...modeSwitchHover } : modeSwitchStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setAdminMode(true)}
        >
          Cambiar a vista admin
        </button>
      )}

      {screen.name === "home" && (
        <PlayerHome user={user} profile={profile} onNavigate={navigate} />
      )}

      {screen.name === "matchDetails" && (
        <MatchDetails matchId={screen.data} onNavigate={navigate} />
      )}

      {screen.name === "history" && (
        <MatchHistory onNavigate={navigate} />
      )}

      {screen.name === "ranking" && (
        <Ranking onNavigate={navigate} />
      )}

      {screen.name === "profile" && (
        <Profile user={user} profile={profile} onNavigate={navigate} />
      )}

      {screen.name === "attendance" && (
        <Attendance user={user} onNavigate={navigate} />
      )}

      {screen.name === "playerCard" && (
        <PlayerCardView
          player={screen.data}
          onBack={() => navigate("home")}
        />
      )}

      {screen.name !== "home" && (
        <button
          className="back-button-global"
          onClick={() => navigate("home")}
        >
          ⬅ Volver
        </button>
      )}
    </div>
  );
}
