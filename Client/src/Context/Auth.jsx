// Imports
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../Utils/Services";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Register States
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({ username: "", email: "", password: "" });
    // Login States
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

    useEffect(() => {
        const user = localStorage.getItem('User');

        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        // Prevent the form from refreshing the page on submit
        e.preventDefault();

        // Starts registration process
        setIsRegisterLoading(true);
        setRegisterError(null);

        // POST request to the API
        const response = await postRequest(`${baseUrl}/app/users/register`, JSON.stringify(registerInfo));
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

    const loginUser = useCallback(async (e) => {
        // Prevent the form from refreshing the page on submit
        e.preventDefault();

        // Starts login process
        setIsLoginLoading(true);
        setLoginError(null);

        // POST request to the API
        const response = await postRequest(`${baseUrl}/app/users/login`, JSON.stringify(loginInfo));
        // Login done
        setIsLoginLoading(false);

        // Returns error, if any, stops the registration
        if (response.error) {
            return setLoginError(response);
        }

        // Store the user to avoid reconnecting at each F5
        localStorage.setItem("User", JSON.stringify(response));

        setUser(response);
    }, [loginInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    return (
        <Auth.Provider
            value= {{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,

                logoutUser,

                loginInfo,
                updateLoginInfo,
                loginUser,
                loginError,
                isLoginLoading
            }}
        >
            { children }
        </Auth.Provider>
    );
};