import * as DocumentPicker from "expo-document-picker";
import { getSignature } from "./getSignature";
type Props = {
  image: DocumentPicker.DocumentPickerAsset | null;
};

export async function getUrl({ image }: Props) {
  try {
    const response = await getSignature();
    const signatureData = response.data;
    if (!image) return null;
    console.log("Image data:", image, signatureData);
    const formData = new FormData();
    const imageData = {
      uri: image.uri,
      name: image.name,
      type: image.mimeType || "image/jpeg",
    };
    formData.append("file", imageData as any);
    formData.append("api_key", signatureData.apiKey);
    formData.append("timestamp", signatureData.timestamp);
    formData.append("signature", signatureData.signature);
    formData.append("folder", "dansal-app");
    formData.append("upload_preset", "dansal-images");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    console.log("Cloudinary response:", res);
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error preparing form data:", error);
    throw error;
  }
}
