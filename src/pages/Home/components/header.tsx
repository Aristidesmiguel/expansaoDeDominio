import { Button } from "@/components/ui/button";
import { routerApp } from "@/utils/constants";
import { useNavigate } from "react-router-dom";


export const HeaderPrimary = () => {
  const navigate = useNavigate()
  const handleOnClick = (router: string) => {
      navigate(router)
  }
  return (
    <div className="flex items-center gap-8 justify-center w-1/2 h-16 bg-gray-800 text-white rounded-sm shadow-lg shadow-gray-800/80" >
        <h1 className="cursor-pointer">
          <a href={routerApp.home} >Início</a>
        </h1>
        <div className="flex gap-4">
            <Button onClick={() => handleOnClick(routerApp.login)} className="cursor-pointer" variant={'ghost'}>Entrar </Button>
            <Button onClick={() => handleOnClick(routerApp.cadastrar)} className="cursor-pointer" variant={'ghost'}>Cadastra-se </Button>
            
        </div>
    </div>
  );
}