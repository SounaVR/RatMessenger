// Imports
import { createContext, useCallback, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: ""
    });

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    return <Auth.Provider value= {{ user, registerInfo, updateRegisterInfo }}>
        { children }
    </Auth.Provider>
}