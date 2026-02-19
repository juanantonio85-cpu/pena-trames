import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AuthContainer from "./AuthContainer";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        name,
        position,
        number: Number(number),
        goals: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        role: "player", // por defecto jugador
        photoURL: ""
      });

      alert("Cuenta creada correctamente");
    } catch (err) {
      alert("Error al registrarse: " + err.message);
    }
  };

  return (
    <AuthContainer>
      <h2>Registro</h2>

      <input
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Posición (Ej: Delantero)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Dorsal"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

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

      <button onClick={register} style={{ width: "100%", marginBottom: 10 }}>
        Crear cuenta
      </button>

      <p>
        ¿Ya tienes cuenta?{" "}
        <span
          style={{ color: "#4ea1ff", cursor: "pointer" }}
          onClick={onLogin}
        >
          Inicia sesión
        </span>
      </p>
    </AuthContainer>
  );
}
