import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {getCurrentUser} from '../lib/appwrite'

// interface GlobalContextType {
//     isLoading: boolean;
//     isLoggedIn: boolean;
//     setIsLoggedIn: (value: boolean) => void;
//     user: any | null;
//     setUser: (value: any) => void;
// }

// const GlobalContext = React.createContext<GlobalContextType>({
//     isLoading: true,
//     isLoggedIn: false,
//     setIsLoggedIn: () => {},
//     user: null,
//     setUser: () => {},
// });
const GlobalContext = React.createContext();

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then(res => {
            if (res) {
                setIsLoggedIn(true)
                console.log(typeof res);
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null);
            }
        }).catch(err => {
            console.log(err)
        }).finally(() =>  {
            setIsLoading(false);
        })
    }, [])

    return <GlobalContext.Provider value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
    }}>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalContext = () =>  {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}

export default GlobalProvider;


