import React from "react"
import { Button } from "@/components/ui/button"

interface IHeaderDashboardProps {
    title: string
    valueButton?: string
    isOpen?: boolean
    onOpen?: () => void
}

export const HeaderDashboard = ({ title, onOpen, valueButton }: IHeaderDashboardProps) => {
    return (
        <header className='flex flex-row items-center justify-between border-b-1 border-cyan-500 w-full p-6 '>
            <div className="flex flex-row items-center gap-2">
                <h1 className="text-2xl text-cyan-500 font-bold"> {title} </h1>
            </div>
            <Button onClick={onOpen} className="cursor-pointer bg-cyan-500 hover:bg-cyan-800">{valueButton}</Button>
        </header>
    )
}