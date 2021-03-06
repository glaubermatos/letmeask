import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string
}

type AuthContextData = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signOut: () => void;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.')
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            // boa pratica desiscrever da ouvidoria(listener) de eventos -> auth.onAuthStateChanged 
            // fica executando mesmo que o componente saia da tela, dai fica dando erro
            unsubscribe()
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    async function signOut() {
        await auth.signOut()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}