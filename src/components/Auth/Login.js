import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContainer from "./AuthContainer";

export default function Login({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <AuthContainer>
      <h2>Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={login} style={{ width: "100%", marginBottom: 10 }}>
        Entrar
      </button>

      <p style={{ marginTop: 10 }}>
        ¿No tienes cuenta?{" "}
        <span
          style={{ color: "#4ea1ff", cursor: "pointer" }}
          onClick={onRegister}
        >
          Regístrate aquí
        </span>
      </p>
    </AuthContainer>
  );
}
