/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db, googleProvider } from '../firebase/firebase';
import { AuthContext } from '../context';

import { routerApp } from '@/utils/constants';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [entering, setEntering] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("current: ", currentUser);
            
            setLoading(false);
            setEntering(false)
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Erro ao fazer login com Google:', error);
        }
    };

    const loginWithEmail = async (email: string, password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                setEntering(true);
                signInWithEmailAndPassword(auth, email, password)
                    .then(async () => {
                        const docRef = doc(db, "users_dario", user?.uid ?? "");
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data()
                            localStorage.setItem('email', userData.email);
                            localStorage.setItem('displayName', userData.displayName);
                            if (location.hostname === 'localhost') {
                                location.href = `http://localhost:5173${routerApp.dashboard}`;
                            } else if (location.hostname === "my-tasks-bay.vercel.app") {
                                location.href = `https://my-tasks-bay.vercel.app${routerApp.dashboard}`;
                            } else {
                                console.log("aconteceu um erro")
                                location.href = `https://my-tasks-bay.vercel.app${routerApp.home}`;
                            }
                            resolve()
                        } else {
                            console.log("USER: ", user)
                            reject();
                        }

                    })
                    .catch(reject)
                    .finally(() => setEntering(false))
            } catch (error) {
                console.error('Erro ao fazer login com Google:', error);
                reject(error);
            }
        })
    };

    const signUpWithEmailAndPassword = async (user: { name: string, email: string, password: string }) => {
        try {
            setEntering(true)
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((currentUser) => {
                    setEntering(true)
                    const userData = {
                        uid: currentUser.user.uid,
                        displayName: user.name,
                        email: user.email,
                    }
                    createUser(userData)
                    setEntering(false)
                })

        } catch (error) {
            console.error('Erro ao criar a conta:', error);
        }
    };

    const createUser = async (user: any) => {
        const docRef = doc(db, "users_dario", user.uid);
        setDoc(docRef, user)
            .then(() => {
                localStorage.setItem('email', user.email);
                localStorage.setItem('displayName', user.displayName);
                if (location.hostname === 'localhost') {
                    location.href = `http://localhost:5173${routerApp.dashboard}`;
                } else if (location.hostname === "my-tasks-bay.vercel.app") {
                    location.href = `https://my-tasks-bay.vercel.app${routerApp.dashboard}`;
                } else {
                    console.log("aconteceu um erro")
                    location.href = `https://my-tasks-bay.vercel.app${routerApp.home}`;
                }
            });
    }

    return (
        <AuthContext.Provider value={{ user, loading, entering, logout, loginWithGoogle, signUpWithEmailAndPassword, loginWithEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
