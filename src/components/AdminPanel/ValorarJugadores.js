import React, { useEffect, useState } from "react";
import "./ValorarJugadores.css";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where
} from "firebase/firestore";

export default function ValorarJugadores({ onBack }) {
  const [partidos, setPartidos] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  // Cargar partidos
  useEffect(() => {
    const fetchPartidos = async () => {
      const snap = await getDocs(collection(db, "partidos"));
      const lista = [];

      snap.forEach((d) => {
        lista.push({ id: d.id, ...d.data() });
      });

      setPartidos(lista);
    };

    fetchPartidos();
  }, []);

  // Cargar jugadores del partido seleccionado
  const cargarJugadores = async (matchId) => {
    setSelectedMatch(matchId);

    const ref = doc(db, "partidos", matchId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    // Los jugadores vienen en arrays: equipoA y equipoB
    const lista = [...(data.equipoA || []), ...(data.equipoB || [])];

    // Cargar datos completos de cada jugador
    const jugadoresData = [];
    for (let uid of lista) {
      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        jugadoresData.push({ id: uid, ...userSnap.data() });
      }
    }

    setJugadores(jugadoresData);

    // Inicializar stats
    const inicial = {};
    jugadoresData.forEach((j) => {
      inicial[j.id] = {
        pac: 50,
        sho: 50,
        pas: 50,
        dri: 50,
        def: 50,
        phy: 50
      };
    });

    setStats(inicial);
  };

  // Cambiar un stat
  const updateStat = (uid, campo, valor) => {
    setStats((prev) => ({
      ...prev,
      [uid]: {
        ...prev[uid],
        [campo]: Number(valor)
      }
    }));
  };

  // Guardar valoraciones
  const guardarValoraciones = async () => {
    if (!selectedMatch) return alert("Selecciona un partido");

    setLoading(true);

    for (let jugador of jugadores) {
      const s = stats[jugador.id];

      const mediaPartido = Math.round(
        (s.pac + s.sho + s.pas + s.dri + s.def + s.phy) / 6
      );

      // Guardar valoración en colección "valoraciones"
      await addDoc(collection(db, "valoraciones"), {
        userId: jugador.id,
        partidoId: selectedMatch,
        ...s,
        mediaPartido,
        fecha: new Date()
      });

      // Recalcular media general del jugador
      const q = query(
        collection(db, "valoraciones"),
        where("userId", "==", jugador.id)
      );

      const snap = await getDocs(q);

      let total = 0;
      let count = 0;

      let sumPac = 0;
      let sumSho = 0;
      let sumPas = 0;
      let sumDri = 0;
      let sumDef = 0;
      let sumPhy = 0;

      snap.forEach((d) => {
        const v = d.data();
        total += v.mediaPartido;
        count++;

        sumPac += v.pac;
        sumSho += v.sho;
        sumPas += v.pas;
        sumDri += v.dri;
        sumDef += v.def;
        sumPhy += v.phy;
      });

      const mediaGeneral = Math.round(total / count);

      // Actualizar stats del usuario
      await updateDoc(doc(db, "users", jugador.id), {
        mediaGeneral,
        pac: Math.round(sumPac / count),
        sho: Math.round(sumSho / count),
        pas: Math.round(sumPas / count),
        dri: Math.round(sumDri / count),
        def: Math.round(sumDef / count),
        phy: Math.round(sumPhy / count)
      });
    }

    setLoading(false);
    alert("Valoraciones guardadas correctamente");
  };

  return (
    <div className="valorar-wrapper">
      <button className="valorar-back" onClick={onBack}>
        ⬅ Volver
      </button>

      <h1 className="valorar-title">VALORAR JUGADORES</h1>

      {/* Selección de partido */}
      <div className="valorar-card">
        <label>Selecciona un partido</label>
        <select
          onChange={(e) => cargarJugadores(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- Selecciona --
          </option>

          {partidos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fecha} — {p.hora}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de jugadores */}
      {jugadores.length > 0 && (
        <div className="valorar-lista">
          {jugadores.map((j) => (
            <div key={j.id} className="valorar-jugador">
              <h3>{j.name}</h3>

              <div className="valorar-stats">
                {["pac", "sho", "pas", "dri", "def", "phy"].map((campo) => (
                  <div key={campo} className="valorar-stat">
                    <label>{campo.toUpperCase()}</label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={stats[j.id]?.[campo] || 50}
                      onChange={(e) =>
                        updateStat(j.id, campo, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {jugadores.length > 0 && (
        <button
          className="valorar-save"
          onClick={guardarValoraciones}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Valoraciones"}
        </button>
      )}
    </div>
  );
}
