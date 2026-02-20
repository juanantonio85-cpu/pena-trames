// src/services/uploadImage.js
import axios from "axios";

export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);

  // Tu preset de Cloudinary (lo crearás en tu panel)
  formData.append("upload_preset", "trames_preset");

  // Eliminación de fondo + PNG transparente
  formData.append("transformation", JSON.stringify([
    { effect: "background_removal" },
    { fetch_format: "png" },
    { quality: "auto" }
  ]));

  const cloudName = "TU_CLOUD_NAME"; // <-- cámbialo

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return res.data.secure_url;
}
