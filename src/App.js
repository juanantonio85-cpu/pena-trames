import React, { useEffect, useState } from "react";
import { auth, db, requestNotificationPermission } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminPanel from "./components/Admin Panel/AdminPanel";
import PlayerHome from "./components/Player/PlayerHome";
import MatchDetails from "./components/Match/MatchDetails";
import MatchHistory from "./components/Match/MatchHistory";
import Ranking from "./components/Ranking/Ranking";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");
  const [screen, setScreen] = useState({ name: "home", data: null });

  // ------------------------------------------------------
  // 1) Detectar login y cargar perfil
  // ------------------------------------------------------
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

  // ------------------------------------------------------
  // 2) Guardar token FCM cuando el usuario inicia sesión
  // ------------------------------------------------------
  useEffect(() => {
    async function saveFcmToken() {
      if (!user) return;

      try {
        const token = await requestNotificationPermission();

        if (token) {
          console.log("Token FCM obtenido:", token);

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

  // ------------------------------------------------------
  // 3) Si no está logueado → login/registro
  // ------------------------------------------------------
  if (!user || !profile) {
    return authScreen === "login" ? (
      <Login onRegister={() => setAuthScreen("register")} />
    ) : (
      <Register onLogin={() => setAuthScreen("login")} />
    );
  }

  // ------------------------------------------------------
  // 4) Si es admin → panel admin
  // ------------------------------------------------------
  if (profile.role === "admin") {
    return <AdminPanel />;
  }

  // ------------------------------------------------------
  // 5) Router del jugador
  // ------------------------------------------------------
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

      {/* Botón volver */}
      {screen.name !== "home" && (
        <button onClick={() => navigate("home")}>⬅ Volver</button>
      )}
    </div>
  );
}
