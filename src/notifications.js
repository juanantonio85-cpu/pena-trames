import { getMessaging, getToken } from "firebase/messaging";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function requestNotificationPermission(user) {
  try {
    const messaging = getMessaging();

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const token = await getToken(messaging, {
      vapidKey: "BOrY1pZ8Yk7xkYp0xJpYp8uQ7u3Z8pYpQ7YpZ8YpQ7YpZ8YpQ7YpZ8Yp"
    });

    if (!token) return;

    await setDoc(doc(db, "tokens", user.uid), {
      token,
      updatedAt: new Date()
    });

    console.log("Token guardado:", token);

  } catch (err) {
    console.error("Error obteniendo token:", err);
  }
}
