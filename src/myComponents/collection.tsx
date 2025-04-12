import { ICollectionProps } from "@/@types/iterfaceSystem";
import { routerApp } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

interface CollectionProps {
    props: ICollectionProps;
}


export const Collection = (
    { props }: CollectionProps
) => {
    console.log(props.file);

    const navigate = useNavigate()

    const handleClickButton = (id: string) => {
        navigate(`${routerApp.dashboard}/${id}`, {
            state: {
                title: props.title,
            }
        })
    }

    return (
        <div onClick={() => handleClickButton(props.id)} className="h-60 w-60 bg-gray-500 text-white p-2 rounded-md hover:scale-105 transition duration-300 cursor-pointer flex flex-col gap-2">
            <div className="h-2/3 w-full bg-gray-700 rounded-md flex justify-center items-center">
                <img
                    src={ props.file || undefined }
                    alt={props.file ? props.file || undefined : "Imagem não disponível"}
                    className="w-full h-full rounded"
                />
            </div>
            <div>
                <div>
                    <h1 className="text-cyan-50 font-bold"> {props.title} </h1>
                    <p className="text-gray-300"> { props.description } </p>
                </div>
                <div></div>
            </div>
        </div>
    );
};

