// utils/storage.ts
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// ajuste esse import ao seu projeto

export const uploadFileToStorage = async (
    file: File, path: string 
): Promise<string> => {
  const storageRef = ref(storage, path);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw error;
  }
};

/**
 * Obtém a URL de download de um arquivo já existente no storage.
 * @param path Caminho no storage (ex: "imagens/arquivo.jpg")
 * @returns URL de download
 */
export const getDownloadURLFromStorage = async (
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);

  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Erro ao obter URL:", error);
    throw error;
  }
};
