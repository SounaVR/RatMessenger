// Imports
import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../Utils/Services";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: ""
    });

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        // Prevent the form from refreshing the page on submit
        e.preventDefault();

        // Starts registration process
        setIsRegisterLoading(true);
        setRegisterError(null);

        // POST request to the API
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        // Registration done
        setIsRegisterLoading(false);

        // Returns error, if any, stops the registration
        if (response.error) {
            return setRegisterError(response);
        }

        // Store the user to avoid reconnecting at each F5
        localStorage.setItem("User", JSON.stringify(response));

        setUser(response);
    }, [registerInfo]);

    return (
        <Auth.Provider
            value= {{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading
            }}
        >
            { children }
        </Auth.Provider>
    );
};