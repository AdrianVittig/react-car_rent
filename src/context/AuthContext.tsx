import { createContext, useState, useContext } from "react";

import type { ReactNode } from "react";
import { getUsernameFromToken } from "../utils";

type AuthContextType  = {
    token: string | null,
    username: string | null,
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children}: {children: ReactNode}){
    const [token, setToken] =  useState<string | null>(localStorage.getItem("token"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    
    function login(newToken: string){
        setToken(newToken);
        setUsername(getUsernameFromToken(newToken));
        const username = getUsernameFromToken(newToken);
        localStorage.setItem("username", username);
        localStorage.setItem("token", newToken);
    }

    function logout(){
        setToken(null);
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    return (
        <AuthContext.Provider value={{token, username, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}


export {AuthProvider, useAuth}


