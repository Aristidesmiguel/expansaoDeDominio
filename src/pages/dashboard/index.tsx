import { ICollectionProps } from '@/@types/iterfaceSystem'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useAuth } from '@/hooks'
import { Collection, FormCreate, HeaderDashboard } from '@/myComponents'
import dataBase from '@/server/dataBase'
import React, { useEffect, useState } from 'react'



export const Dashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }
    const [colletion, setcolletion] = useState<ICollectionProps[]>([])

    const { user } = useAuth()
    const userId = user?.uid || undefined
    const getAnime = async () => {
        const colletion = await dataBase.getAnime(userId)
        setcolletion(colletion)
    }

    useEffect(() => {
        getAnime()
    }, [userId])
    
    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-2">
            <HeaderDashboard valueButton='Criar Coleção' onOpen={onOpen} title='Coleções' />
            <div>
                <div className='flex flex-row gap-4 p-4 flex-wrap '>
                    {colletion && colletion.length > 0 ? (colletion.map((anime) => (
                       <div key={anime.id} > 
                        <Collection props={anime} />
                        </div>
                    ))) : (
                        <p className='text-gray-500'>Nenhuma coleção encontrada.</p>
                    )}
                </div>
            </div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent className='h-full bg-gray-800'>
                    <DrawerHeader className='flex flex-col '>
                        <DrawerTitle className='text-white font-bold text-2xl'>CRIAR COLEÇÃO</DrawerTitle>
                        <div>
                            <FormCreate />
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>

            </Drawer>
        </div>
    )
}