import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function EditPlayer({ playerId, onBack }) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const loadPlayer = async () => {
      const ref = doc(db, "users", playerId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPlayer(snap.data());
      }
    };

    loadPlayer();
  }, [playerId]);

  const updateField = (field, value) => {
    setPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    const ref = doc(db, "users", playerId);
    await updateDoc(ref, player);
    alert("Jugador actualizado correctamente");
    onBack();
  };

  if (!player) return <p>Cargando jugador...</p>;

  return (
    <FifaCard>
      <h3>Editar Jugador</h3>

      <label>Nombre</label>
      <input
        value={player.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <label>Posición</label>
      <input
        value={player.position || ""}
        onChange={(e) => updateField("position", e.target.value)}
      />

      <label>Dorsal</label>
      <input
        type="number"
        value={player.number || 0}
        onChange={(e) => updateField("number", Number(e.target.value))}
      />

      <label>Goles</label>
      <input
        type="number"
        value={player.goals || 0}
        onChange={(e) => updateField("goals", Number(e.target.value))}
      />

      <label>Victorias</label>
      <input
        type="number"
        value={player.wins || 0}
        onChange={(e) => updateField("wins", Number(e.target.value))}
      />

      <label>Empates</label>
      <input
        type="number"
        value={player.draws || 0}
        onChange={(e) => updateField("draws", Number(e.target.value))}
      />

      <label>Derrotas</label>
      <input
        type="number"
        value={player.losses || 0}
        onChange={(e) => updateField("losses", Number(e.target.value))}
      />

      <br /><br />

      <FifaButton onClick={saveChanges}>Guardar Cambios</FifaButton>
      <FifaButton onClick={onBack}>Volver</FifaButton>
    </FifaCard>
  );
}
