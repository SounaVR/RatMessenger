import { createContext, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../Utils/Services';

export const App = createContext();

export const AppProvider = ({ children, user }) => {
    // Servers States
    const [userServers, setUserServers] = useState(null);
    const [isUserServersLoading, setIsUserServersLoading] = useState(false);
    const [userServersError, setUserServersError] = useState(null);

    useEffect(() => {
        const getUserServers = async () => {
            if (user?._id) {
                // Starts loading process
                setIsUserServersLoading(true);
                setUserServersError(null);

                // GET request to the API
                const response = await getRequest(`${baseUrl}/app/servers/find/${user?._id}`)
                // Done loading
                setIsUserServersLoading(false);
                
                // Returns error, if any, stops the loading
                if (response.error) {
                    return setUserServersError(response);
                }

                setUserServers(response);
            }
        }

        getUserServers()
    }, [user]);

    return (
        <App.Provider
            value={{
                userServers,
                isUserServersLoading,
                userServersError
            }}
        >
            { children }
        </App.Provider>
    )
};  