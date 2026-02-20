import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import FifaCard from "../UI/FifaCard";
import FifaButton from "../UI/FifaButton";

export default function ImportCSV() {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      }
    });
  };

  const uploadToFirebase = async () => {
    if (csvData.length === 0) {
      alert("No hay datos para importar");
      return;
    }

    for (const row of csvData) {
      const id = row.name.toLowerCase().replace(/\s+/g, "_");

      const ref = doc(db, "users", id);

      await setDoc(
        ref,
        {
          name: row.name,
          goals: Number(row.goals || 0),
          wins: Number(row.wins || 0),
          draws: Number(row.draws || 0),
          losses: Number(row.losses || 0),
          position: row.position || "",
          number: Number(row.number || 0),
          updatedAt: new Date()
        },
        { merge: true }
      );
    }

    alert("CSV importado correctamente");
  };

  return (
    <div>
      <h3>Importar CSV</h3>

      <FifaCard>
        <input type="file" accept=".csv" onChange={handleFile} />

        {fileName && <p>Archivo cargado: {fileName}</p>}

        {csvData.length > 0 && (
          <p>{csvData.length} jugadores listos para importar</p>
        )}

        <FifaButton onClick={uploadToFirebase}>
          Importar a Firebase
        </FifaButton>
      </FifaCard>
    </div>
  );
}
