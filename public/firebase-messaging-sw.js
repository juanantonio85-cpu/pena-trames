/* ------------------------------------------------------
   Service Worker de Firebase Cloud Messaging (FCM)
   Recibe notificaciones cuando la app está cerrada
--------------------------------------------------------- */

importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// Configuración de tu proyecto Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDNAsQwKIb4tTAJmCSG3mjnrStUrpEiIcY",
  authDomain: "trames-fc-4830d.firebaseapp.com",
  projectId: "trames-fc-4830d",
  storageBucket: "trames-fc-4830d.appspot.com",
  messagingSenderId: "437400719832",
  appId: "1:437400719832:web:f4dcc26b893bc414bee2ad"
});

// Inicializar FCM en el Service Worker
const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("[FCM] Notificación en segundo plano:", payload);

  const notificationTitle = payload.notification?.title || "Nueva notificación";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
