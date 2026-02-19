export async function sendNotification(title, body) {
  const accessToken = await getAccessToken();

  const message = {
    message: {
      topic: "all",
      notification: {
        title,
        body
      },
      webpush: {
        notification: {
          icon: "/icon-192.png"
        }
      }
    }
  };

  await fetch(
    "https://fcm.googleapis.com/v1/projects/trames-fc-4830d/messages:send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(message)
    }
  );
}
