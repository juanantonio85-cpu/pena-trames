// ------------------------------------------------------
//  Firebase inicialización + servicios + notificaciones
// ------------------------------------------------------

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ------------------------------------------------------
//  CONFIGURACIÓN REAL DE TU PROYECTO
// ------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyDNAsQwKIb4tTAJmCSG3mjnrStUrpEiIcY",
  authDomain: "trames-fc-4830d.firebaseapp.com",
  projectId: "trames-fc-4830d",
  storageBucket: "trames-fc-4830d.appspot.com",
  messagingSenderId: "437400719832",
  appId: "1:437400719832:web:f4dcc26b893bc414bee2ad"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ------------------------------------------------------
//  EXPORTAR SERVICIOS PRINCIPALES
// ------------------------------------------------------

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ------------------------------------------------------
//  NOTIFICACIONES PUSH (FCM)
// ------------------------------------------------------

export const messaging = getMessaging(app);

// Tu clave VAPID pública (la de la captura)
const VAPID_KEY =
  "BLgmr2PeIFxbh7jVGKBa4C36Y1LgO_ESTOD_AsaoaGSqmF6SafvttZk450A303kl4uH4Si64CUej3dqrTahGl";

// ------------------------------------------------------
//  Solicitar permiso y obtener token FCM
// ------------------------------------------------------

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Permiso de notificaciones denegado");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY
    });

    console.log("Token FCM obtenido:", token);
    return token;
  } catch (error) {
    console.error("Error obteniendo token FCM:", error);
    return null;
  }
}

// ------------------------------------------------------
//  Recibir notificaciones en primer plano
// ------------------------------------------------------

export function onForegroundMessage(callback) {
  return onMessage(messaging, callback);
}
