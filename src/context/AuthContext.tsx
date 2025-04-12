import { createContext } from 'react';

import { User } from 'firebase/auth';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  entering: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (user: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)