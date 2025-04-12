import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import dataBase from "@/server/dataBase";
import { ICollectionProps } from "@/@types/iterfaceSystem";
import { useAuth } from "@/hooks";
import { uploadFileToStorage } from "./uploadImage";
import { CiCirclePlus } from "react-icons/ci";

interface IDateProsps {
  title: string;
  description?: string;
  file?: File | undefined;
}

export const FormCreate = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [colecao, setColecao] = useState<ICollectionProps[]>([]);
  const [data, setData] = useState<IDateProsps>({
    title: "",
    description: "",
    file: undefined,
  });

  const { user } = useAuth();
  const userId = user?.uid || undefined;

  const handleChange = (key: string, value: string | File | undefined) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // Atualiza a preview da imagem quando o arquivo muda
  useEffect(() => {
    if (data.file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(data.file);
    } else {
      setPreview(null);
    }
  }, [data.file]);

  const createCollection = async () => {
    if (!data.title || !data.description) {
      return;
    }

    if (colecao.some((item) => item.title === data.title)) {
      alert("Título já existe");
      return;
    }

    if (data.file) {
      const filePath = `colecoes/${userId}/${data.file.name}`;
      const downloadURL = await uploadFileToStorage(data.file, filePath);

      const colecaoData: ICollectionProps = {
        id: Date.now().toString(),
        uid: userId,
        title: data.title,
        file: downloadURL,
        description: data.description,
        members: [],
        animes: [],
      };

      await dataBase.salveAnime(colecaoData).then(() => {
        setColecao((res) => [...res, colecaoData]);
      });

      // continue com o objeto de coleção
    } else {
      console.warn("Nenhum arquivo selecionado para upload.");
      return; // ou exiba um alerta
    }





    console.log("Salvo com sucesso");
    setData({ title: "", description: "" });
    setPreview(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-row gap-7 text-white">
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleChange("file", file);
            }}
          />
          <div
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleClick()
            }
            className={`w-[300px] h-[300px] aspect-video border-2 border-dashed  
                   flex items-center justify-center cursor-pointer transition duration-300 
                   text-gray-400 hover:text-gray-500 active:border-cyan-400 active:text-cyan-400 
                   focus:outline-none focus:ring-2 focus:ring-gray-400 bg-cover bg-no-repeat bg-center`}
            style={{
              backgroundImage: preview ? `url(${preview})` : "none",
              backgroundColor: preview ? "transparent" : "",
            }}
          >
            {!preview && (
              <div className="flex flex-col items-center justify-center h-50">
                <CiCirclePlus size={40} />
                <span className="text-center text-sm">Adicionar uma imagem</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 m-5 items-center justify-center">
          <Button
            onClick={createCollection}
            className="hover:bg-cyan-300 w-2/4 cursor-pointer"
          >
            Criar
          </Button>
          <Button className="hover:bg-red-400 w-2/4 cursor-pointer">
            Cancelar
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-4 mb-4">
          <label htmlFor="title">Título:</label>
          <input
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-99 border-gray-500 border-2 focus:outline-none focus:border-cyan-500  rounded-md p-2 text-white"
            type="text"
            id="title"
            name="title"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description">Descrição:</label>
          <textarea
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-99 border-gray-500 border-2 focus:outline-none focus:border-cyan-500 rounded-md p-2 h-35  text-white"
            id="description"
            name="description"
            required
          />
        </div>
      </div>
    </div>
  );
};
