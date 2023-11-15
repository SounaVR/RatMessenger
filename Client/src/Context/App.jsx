import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../Utils/Services';

export const App = createContext();

export const AppProvider = ({ children, user }) => {
    // Servers States
    const [userServers, setUserServers] = useState(null);
    const [isUserServersLoading, setIsUserServersLoading] = useState(false);
    const [userServersError, setUserServersError] = useState(null);
    const [serverInfo, setServerInfo] = useState({ serverName: "", userId: "" });

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

    const updateServerInfo = useCallback((info) => {
        setServerInfo(info);
        console.log(info)
    }, []);

    const createServer = useCallback(async (e) => {
        e.preventDefault();
        const response = await postRequest(`${baseUrl}/app/servers/create`, JSON.stringify(serverInfo));
        if (response.error) {
            return console.log('Error creating a server', response);
        }

        setUserServers((prev) => [...prev, response]);
        console.log(userServers)
    }, [serverInfo]);

    return (
        <App.Provider
            value={{
                userServers,
                isUserServersLoading,
                userServersError,
                createServer,
                serverInfo,
                updateServerInfo
            }}
        >
            { children }
        </App.Provider>
    )
};  