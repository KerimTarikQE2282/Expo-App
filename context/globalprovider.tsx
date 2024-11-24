import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from '../lib/appwrite';

// Create the context
const GlobalContext = createContext<any>({});

// Export a hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);

// Create the provider component
const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        getCurrentUser()
            .then((res: any) => {
                if (res) {
                    console.log("logged in")
                    setIsLoggedIn(true);
                    setUser(res);
                    console.log("🚀 ==> file: globalprovider.tsx:14 ==> GlobalProvider ==> user:", user);

                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error: any) => {
                console.error("Error fetching current user:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
