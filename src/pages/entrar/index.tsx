import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { HeaderPrimary } from "../Home/components/header";
import { useState } from "react";
import { useAuth } from "@/hooks";

const schema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Pelo menos 6 caracteres OU Senha inválida"),
})

type FormData = z.infer<typeof schema>;

interface IUserProps {
    email: string;
    password: string;
}

export const Login = () => {
    const [userData, setUserData] = useState<IUserProps>({
        email: '',
        password: ''
    })

    const handleOnChange = (key: string, value: string) => {
        setUserData({ ...userData, [key]: value })
    }

    const { entering, loginWithEmail } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async () => {
        if (userData.email === "" || userData.password === "") {
            return
        }
        return await loginWithEmail(userData.email, userData.password)
    };



    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white p-2">
            <HeaderPrimary />
            <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                <h1 className="c-cyan-500 font-bold ">ENTRAR</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto">
                    <div className=" mb-2">
                    <input 
                        value={userData.email}
                         placeholder="E-mail do Usuário" 
                         type="email" 
                         {...register("email")} 
                         onChange={(e => handleOnChange("email", e.target.value))}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.email ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </div>

                    <div className=" mb-2">
                    <input 
                        value={userData.password}
                         placeholder="E-mail do Usuário" 
                         type="password" 
                         {...register("password")} 
                         onChange={(e => handleOnChange("password", e.target.value))}
                         className={`border p-2 w-96 mt-3 rounded-md focus:outline-none ${errors.password ? "border-red-400" : "border-cyan-500"}`} 
                         />
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Button isLoading={entering} type="submit" className="bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 cursor-pointer mt-5 w-50">
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
