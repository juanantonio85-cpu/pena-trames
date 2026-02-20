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

// PLAYER
import PlayerHome from "./components/Player/PlayerHome";
import MatchDetails from "./components/Match/MatchDetails";
import MatchHistory from "./components/Match/MatchHistory";
import Ranking from "./components/Ranking/Ranking";
import Profile from "./components/Profile";
import Attendance from "./components/Player/Attendance";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");

  // Router interno del admin
  const [adminScreen, setAdminScreen] = useState("panel");

  // 🔥 Nuevo: modo admin / modo jugador
  const [adminMode, setAdminMode] = useState(true);

  // Router interno del jugador
  const [screen, setScreen] = useState({ name: "home", data: null });

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

  // Si no está logueado → login/registro
  if (!user || !profile) {
    return authScreen === "login" ? (
      <Login onRegister={() => setAuthScreen("register")} />
    ) : (
      <Register onLogin={() => setAuthScreen("login")} />
    );
  }

  // 🔥 ADMIN: puede cambiar entre vista admin y vista jugador
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
  }

  // 🔥 Vista jugador (también accesible para admin)
  const navigate = (name, data = null) => {
    setScreen({ name, data });
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Botón para volver a modo admin */}
      {profile.role === "admin" && !adminMode && (
        <button onClick={() => setAdminMode(true)}>Cambiar a vista admin</button>
      )}

      {screen.name === "home" && (
        <PlayerHome
          user={user}
          profile={profile}
          onNavigate={navigate}
        />
      )}

      {screen.name === "matchDetails" && (
        <MatchDetails
          matchId={screen.data}
          onNavigate={navigate}
        />
      )}

      {screen.name === "history" && (
        <MatchHistory onNavigate={navigate} />
      )}

      {screen.name === "ranking" && (
        <Ranking onNavigate={navigate} />
      )}

      {screen.name === "profile" && (
        <Profile
          user={user}
          profile={profile}
          onNavigate={navigate}
        />
      )}

      {screen.name === "attendance" && (
        <Attendance
          user={user}
          onNavigate={navigate}
        />
      )}

      {screen.name !== "home" && (
        <button onClick={() => navigate("home")}>⬅ Volver</button>
      )}
    </div>
  );
}
