import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../Utils/Services';

export const App = createContext();

export const AppProvider = ({ children, user }) => {
    // Servers States
    const [userServers, setUserServers] = useState(null);
    const [isUserServersLoading, setIsUserServersLoading] = useState(false);
    const [userServersError, setUserServersError] = useState(null);
    const [serverInfo, setServerInfo] = useState({ serverName: "", userId: "" });
    // Channels States
    const [userChannels, setUserChannels] = useState(null);
    const [channelError, setChannelError] = useState(null);
    const [channelInfo, setChannelInfo] = useState({ serverId: "", channelName: "", channelType: "Text" });

    useEffect(() => {
        const getUserServers = async () => {
            if (user?._id) {
                // Starts loading process
                setIsUserServersLoading(true);
                setUserServersError(null);
                // GET request to the API
                const response = await getRequest(`${baseUrl}/app/servers/${user?._id}`, user.token);
                // Done loading
                setIsUserServersLoading(false);
                
                // Returns error, if any, stops the loading
                if (response.error) {
                    return setUserServersError(response);
                }

                setUserServers(response);
            }
        }

        getUserServers();
    }, [user]);

    const updateServerInfo = useCallback((info) => {
        setServerInfo(info);
    }, []);

    const updateChannelInfo = useCallback((info) => {
        setChannelInfo(info);
    }, []);

    const createServer = useCallback(async (e) => {
        e.preventDefault();
        const response = await postRequest(`${baseUrl}/app/servers/create`, JSON.stringify(serverInfo), user.token);
        if (response.error) {
            return console.log('Error creating a server', response);
        }

        setUserServers((prev) => [...prev, response]);
    }, [serverInfo]);

    const createChannel = useCallback(async (e) => {
        e.preventDefault();
        const response = await postRequest(`${baseUrl}/app/servers/channels/create`, JSON.stringify(channelInfo), user.token);
        if (response.error) {
            return console.log('Error creating a channel', response);
        }

        setUserChannels((prev) => [...prev, response]);
    }, [channelInfo]);

    const getUserChannels = async (serverId) => {
        if (user?._id) {
            try {
                // Starts loading process
                setChannelError(null);

                // GET request to the API
                const response = await getRequest(`${baseUrl}/app/servers/channels/${serverId}`, user.token);
                
                if (Array.isArray(response)) {
                    // Done loading
                    setUserChannels(response);
                } else {
                    console.error("Invalid data format received:", response);
                }
                return response;
            } catch (error) {
                setChannelError(error);

                return { error };
            }
        }
    }

    return (
        <App.Provider
            value={{
                userServers,
                isUserServersLoading,
                userServersError,
                createServer,
                serverInfo,
                updateServerInfo,

                userChannels,
                setUserChannels,
                channelError,
                createChannel,
                channelInfo,
                updateChannelInfo,

                getUserChannels
            }}
        >
            { children }
        </App.Provider>
    )
};  