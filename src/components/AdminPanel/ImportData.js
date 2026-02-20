import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function ImportData({ onBack }) {
  const [jugadoresCSV, setJugadoresCSV] = useState(null);
  const [resultadosCSV, setResultadosCSV] = useState(null);
  const [goleadoresCSV, setGoleadoresCSV] = useState(null);
  const [multasCSV, setMultasCSV] = useState(null);
  const [log, setLog] = useState([]);

  const appendLog = (msg) => setLog((prev) => [...prev, msg]);

  const parseCSV = (file) =>
    new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
      });
    });

  const importar = async () => {
    appendLog("Iniciando importación...");

    // 1) Parsear CSVs
    const jugadores = jugadoresCSV ? await parseCSV(jugadoresCSV) : [];
    const resultados = resultadosCSV ? await parseCSV(resultadosCSV) : [];
    const goleadores = goleadoresCSV ? await parseCSV(goleadoresCSV) : [];
    const multas = multasCSV ? await parseCSV(multasCSV) : [];

    appendLog("CSV parseados correctamente.");

    // 2) Borrar colecciones excepto admin
    appendLog("Borrando usuarios excepto admin...");

    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);

    for (const u of usersSnap.docs) {
      const data = u.data();
      if (data.role !== "admin") {
        await deleteDoc(doc(db, "users", u.id));
      }
    }

    appendLog("Usuarios borrados (excepto admin).");

    // 3) Crear usuarios desde jugadores.csv
    appendLog("Creando jugadores...");

    for (const j of jugadores) {
      if (!j.nombre) continue;

      const email = `${j.nombre.toLowerCase().replace(/ /g, "")}@peñatrames.com`;

      await addDoc(collection(db, "users"), {
        name: j.nombre,
        email,
        dorsal: Number(j.numerodecamiseta) || 0,
        posicion: j.posicionpreferida || "Sin asignar",
        role: "player",
        puntos: 0,
        golesTotales: 0,
        asistencia: {},
        fcmToken: "",
        fotoURL: "",
      });
    }

    appendLog("Jugadores creados.");

    // 4) Crear partidos desde resultados.csv
    appendLog("Creando partidos...");

    for (const r of resultados) {
      const partidoRef = await addDoc(collection(db, "partidos"), {
        fecha: r.fecha,
        hora: "",
        lugar: "",
        estado: "jugado",
        equipoRojo: JSON.parse(r.jugadoresrojo),
        equipoBlanco: JSON.parse(r.jugadoresblanco),
        golesRojo: Number(r.equiporojogoles),
        golesBlanco: Number(r.equipoblancogoles),
        goleadores: [],
      });

      r._id = partidoRef.id;
    }

    appendLog("Partidos creados.");

    // 5) Añadir goleadores
    appendLog("Asignando goleadores...");

    for (const g of goleadores) {
      const partido = resultados.find((p) => p.fecha.startsWith(g.fecha));
      if (!partido) continue;

      const partidoRef = doc(db, "partidos", partido._id);
      const snap = await getDocs(collection(db, "partidos"));
      const data = snap.docs.find((d) => d.id === partido._id).data();

      const existing = data.goleadores || [];
      const found = existing.find((x) => x.nombre === g.nombre);

      if (found) found.goles += 1;
      else existing.push({ nombre: g.nombre, goles: 1 });

      await setDoc(partidoRef, { ...data, goleadores: existing });
    }

    appendLog("Goleadores asignados.");

    // 6) Crear multas
    appendLog("Creando multas...");

    for (const m of multas) {
      await addDoc(collection(db, "multas"), {
        jugador: m.nombre,
        fecha: m.fecha,
        estado: m.estado,
        motivo: "Llegar tarde",
        partidoId: "",
      });
    }

    appendLog("Multas creadas.");

    // 7) Recalcular puntos
    appendLog("Recalculando puntos...");

    const usersSnap2 = await getDocs(collection(db, "users"));
    const usersMap = {};

    usersSnap2.forEach((u) => {
      usersMap[u.data().name] = { id: u.id, ...u.data() };
    });

    for (const p of resultados) {
      const rojo = JSON.parse(p.jugadoresrojo);
      const blanco = JSON.parse(p.jugadoresblanco);

      let puntosRojo = 0;
      let puntosBlanco = 0;

      if (p.equiporojogoles > p.equipoblancogoles) {
        puntosRojo = 3;
        puntosBlanco = 1;
      } else if (p.equiporojogoles < p.equipoblancogoles) {
        puntosRojo = 1;
        puntosBlanco = 3;
      } else {
        puntosRojo = 2;
        puntosBlanco = 2;
      }

      rojo.forEach((j) => {
        if (j === "Invitado") return;
        if (!usersMap[j]) return;
        usersMap[j].puntos += puntosRojo;
      });

      blanco.forEach((j) => {
        if (j === "Invitado") return;
        if (!usersMap[j]) return;
        usersMap[j].puntos += puntosBlanco;
      });
    }

    // Guardar puntos
    for (const name in usersMap) {
      const u = usersMap[name];
      await setDoc(doc(db, "users", u.id), u);
    }

    appendLog("Puntos recalculados.");
    appendLog("IMPORTACIÓN COMPLETA.");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>⬅ Volver</button>
      <h1>Importar Datos</h1>

      <p>Sube los CSV y reconstruye Firestore</p>

      <div>
        <label>Jugadores.csv</label>
        <input type="file" onChange={(e) => setJugadoresCSV(e.target.files[0])} />
      </div>

      <div>
        <label>Resultados.csv</label>
        <input type="file" onChange={(e) => setResultadosCSV(e.target.files[0])} />
      </div>

      <div>
        <label>Goleadores.csv</label>
        <input type="file" onChange={(e) => setGoleadoresCSV(e.target.files[0])} />
      </div>

      <div>
        <label>Multas.csv</label>
        <input type="file" onChange={(e) => setMultasCSV(e.target.files[0])} />
      </div>

      <button onClick={importar}>Importar todo</button>

      <h3>Log:</h3>
      <pre>{log.join("\n")}</pre>
    </div>
  );
}
