import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

initializeApp();
const db = getFirestore();
const messaging = getMessaging();

// ------------------------------------------------------
// 1) Notificar cuando se crea un partido nuevo
// ------------------------------------------------------

export const notifyConvocatoria = onDocumentCreated(
  "matches/{matchId}",
  async (event) => {
    const data = event.data.data();

    if (!data.convocatoriaAbierta) return;

    const usersSnap = await db.collection("users").get();
    const tokens = usersSnap.docs.map(d => d.data().fcmToken).filter(Boolean);

    if (tokens.length === 0) return;

    await messaging.sendEachForMulticast({
      tokens,
      notification: {
        title: "Convocatoria abierta",
        body: `Ya puedes apuntarte al partido del ${data.fecha}`
      }
    });
  }
);

// ------------------------------------------------------
// 2) Notificar cuando el admin cierra el partido
// ------------------------------------------------------

export const notifyEquiposAsignados = onDocumentUpdated(
  "matches/{matchId}",
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();

    if (!before.equiposAsignados && after.equiposAsignados) {
      const usersSnap = await db.collection("users").get();
      const tokens = usersSnap.docs.map(d => d.data().fcmToken).filter(Boolean);

      if (tokens.length === 0) return;

      await messaging.sendEachForMulticast({
        tokens,
        notification: {
          title: "Equipos listos",
          body: "Ya puedes ver si juegas en el ROJO o en el BLANCO"
        }
      });
    }
  }
);
