import React, { useEffect, useState } from "react";
import { auth, db, requestNotificationPermission } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./styles/global.css";

// AUTH
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// ADMIN
import AdminPanel from "./components/Admin Panel/AdminPanel";
import AsignarEquipos from "./components/Admin Panel/AsignarEquipos";
import CreateMatch from "./components/Admin Panel/CreateMatch";
import PlayersManager from "./components/Admin Panel/PlayersManager";
import Notifications from "./components/Admin Panel/Notifications";
import CloseMatch from "./components/Admin Panel/CloseMatch";
import ImportData from "./components/Admin Panel/ImportData"; 
import Multas from "./components/Admin Panel/Multas";

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

  // Router interno del jugador
  const [screen, setScreen] = useState({ name: "home", data: null });

  // 1) Detectar login y cargar perfil
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

  // 2) Guardar token FCM cuando el usuario inicia sesión
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

  // 3) Si no está logueado → login/registro
  if (!user || !profile) {
    return authScreen === "login" ? (
      <Login onRegister={() => setAuthScreen("register")} />
    ) : (
      <Register onLogin={() => setAuthScreen("login")} />
    );
  }

  // 4) Si es admin → router interno del admin
  if (profile.role === "admin") {
    if (adminScreen === "panel") {
      return <AdminPanel onNavigate={setAdminScreen} />;
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
    // 🔥 NUEVO: Importar Datos
if (adminScreen === "importar") {
  return <ImportData onBack={() => setAdminScreen("panel")} />;
}

// 🔥 NUEVO: Multas
if (adminScreen === "multas") {
  return <Multas onBack={() => setAdminScreen("panel")} />;
}


    return <AdminPanel onNavigate={setAdminScreen} />;
  }

  // 5) Router del jugador
  const navigate = (name, data = null) => {
    setScreen({ name, data });
  };

  return (
    <div style={{ padding: 20 }}>
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
