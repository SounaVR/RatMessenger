import React, { useContext } from 'react';
import { App } from '../Context/App';
import UserServer from '../Components/app/UserServer';
import CreateServer from '../Components/app/CreateServer';

const ServerSidebar = () => {
    const { userServers, isUserServersLoading, channelInfo, updateChannelInfo, setIsChannelsNotLoading } = useContext(App);

    const handleServerClick = (serverId) => {
        updateChannelInfo({ ...channelInfo, serverId: serverId })
        setIsChannelsNotLoading(true);
    };

    return (
        <div className="servers-sidebar">
            {userServers?.length < 0 ? null : (
                <div className="servers-list">
                    {isUserServersLoading && <p>Loading servers...</p>}
                    {userServers?.map((server, i) => (
                        <UserServer key={i} server={server} handleServerClick={handleServerClick} />
                    ))}
                    <CreateServer />
                </div>
            )}
        </div>
    );
};

export default ServerSidebar;