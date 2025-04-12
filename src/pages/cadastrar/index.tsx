import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { HeaderPrimary } from "../Home/components/header";
import { useState } from "react";
import { useAuth } from "@/hooks";

const schema = z.object({
    name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
})



type FormData = z.infer<typeof schema>;

interface IuserDataProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SingIn = () => {
    const [userData, setUserData] = useState<IuserDataProps>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { entering, signUpWithEmailAndPassword } = useAuth()

    const onChangeUserData = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value })
        console.log("userData", userData)

    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

   
    const handleOnClick = async () => {
        console.log("Executado...");
        if (userData.name === "" || userData.confirmPassword === "" || userData.email === "" || userData.password === "") {
            return
        }
        if (userData.password !== userData.confirmPassword) {
            return
        }
        console.log("Dados enviados:", userData);
        return await signUpWithEmailAndPassword(userData)
    }

    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-2">
            <HeaderPrimary />
            <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                <h1 className="c-cyan-500 font-bold ">CRIAR CONTA</h1>
                <form onSubmit={handleSubmit(handleOnClick)} className="p-4 max-w-md mx-auto">
                    <div className=" mb-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 mt-4"> Nome </label>
                        <input 
                        value={userData.name}
                         placeholder="Nome de usuário" 
                         type="text" 
                         {...register("name")} 
                         onChange={(e) => onChangeUserData("name", e.target.value)}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.name ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.name && <p className="text-red-400">{errors.name.message}</p>}
                    </div>

                    <div className=" mb-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 mt-4"> E-mail </label>
                        <input 
                        value={userData.email}
                         placeholder="E-mail do Usuário" 
                         type="email" 
                         {...register("email")} 
                         onChange={(e => onChangeUserData("email", e.target.value))}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.email ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </div>

                    <div className=" mb-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 mt-4"> Senha </label>
                        <input 
                        value={userData.password}
                         placeholder="Senha" 
                         type="password" 
                         {...register("password")} 
                         onChange={(e) => onChangeUserData("password", e.target.value)}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.password ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                    <div className=" mb-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300 mt-4"> Nome </label>
                        <input 
                        value={userData.confirmPassword}
                         placeholder="Confirmar a senha do usuário" 
                         type="password" 
                         {...register("confirmPassword")} 
                         onChange={(e => onChangeUserData("confirmPassword", e.target.value))}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.confirmPassword ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <Button isLoading={entering} onClick={handleOnClick} type="submit" className="bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 cursor-pointer mt-5 w-50">
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
