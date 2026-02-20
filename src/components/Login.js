import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <img src="/logo.png" alt="TRAMES FC" className="login-logo" />

        <h2 className="login-title">ACCESO TRAMES FC</h2>
        <p className="login-subtitle">PRIVATE ACCESS ONLY</p>

        <form onSubmit={handleLogin} className="login-form">
          <label>E-MAIL CORPORATIVO</label>
          <input
            type="email"
            placeholder="ejemplo@trames.es"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>CONTRASEÑA</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            INICIAR SESIÓN →
          </button>
        </form>
      </div>
    </div>
  );
}
