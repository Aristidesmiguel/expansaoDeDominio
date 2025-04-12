
import React from "react"
import { HeaderPrimary } from "./components/header"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { routerApp } from "@/utils/constants"



export const Home: React.FC = () => {
    const navigate = useNavigate()
    const onClickutton = () => {
        navigate(routerApp.dashboard)
    }

    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-2">
            <HeaderPrimary />
            <div className="font-sans text-gray-800 flex flex-col items-center justify-center  mt-4" >
                <div className="flex flex-col items-center justify-center h-full">
                    <img src="f1.png" alt="imagem de uma comunidade" className="w-100 h-100" />
                    <p className="text-white mb-5">Venha fazer parte da nossa comunidade!</p>
                </div>
                <Button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-60" onClick={onClickutton}>
                    Começar
                </Button>
                <div className="mt-5 flex gap-4">
                    <img className="w-7 h-7 hover:bg-cyan-800 transition-all rounded-xl cursor-pointer" src="facebook.png" alt="" />
                    <img className="w-7 h-7 hover:bg-cyan-800 transition-all rounded-xl cursor-pointer" src="whatsapp.png" alt="" />
                    <img className="w-7 h-7 hover:bg-cyan-800 transition-all rounded-xl cursor-pointer" src="twitter.png" alt="" />
                </div>
            </div>
        </div>
    )
}