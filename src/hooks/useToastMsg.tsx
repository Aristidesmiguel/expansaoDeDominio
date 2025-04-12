import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

const resgistrarUser = async (email: string, password: string) => {
    const credencial = await createUserWithEmailAndPassword(auth, email, password)
    const user = credencial.user
    console.log(user);
    
}


export const createUser = {
    resgistrarUser
}