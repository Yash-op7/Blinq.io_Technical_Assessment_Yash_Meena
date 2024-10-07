import {useState, createContext,useContext, useEffect } from "react";
import Cookies from 'js-cookie';


const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
    useEffect(() => {
        const token = Cookies.get('Authorization');
        if(token) {
            setIsLoggedIn(true);
        }
    }, [])
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}