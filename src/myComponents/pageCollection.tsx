import { useLocation } from "react-router-dom"
import { HeaderDashboard } from "./headerDashboard"
import { useEffect, useState } from "react"

interface IAnime {
    title: string;
    description: string;
}


export const PageCollection = () => {
    const [dataAnime, setDataAnime] = useState<IAnime[]>([])
    const location = useLocation()
    const { title } = location.state || {}

    const getAnime = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/1/full`);
            if (response.ok) {
                const data = await response.json();
                setDataAnime(data.data);
                console.log(data.data);
                
            } else {
                console.error("Erro ao buscar anime:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar anime:", error);
        }
    };
    useEffect(() => {
        getAnime()
    })
    return (
        <div className="h-screen w-full bg-gray-900 text-white">
            <div className="flex flex-row items-center">
                <HeaderDashboard valueButton="Adicionar" title={title} />
            </div>
            <div key={title} className="flex flex-col items-center justify-center h-full">
                {dataAnime && dataAnime.length > 0 ? dataAnime.map((anime) => (
                    <h1> {anime.title} </h1>
                )) : (
                    <p className="text-gray-500">Nenhum anime encontrado.</p>
                )}
            </div>

        </div>
    )
}