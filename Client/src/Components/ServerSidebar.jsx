import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../Context/App';
import UserServer from '../Components/app/UserServer';
import CreateServer from '../Components/app/CreateServer';

const ServerSidebar = () => {
    const navigate = useNavigate();
    const { userServers, updateChannelInfo, getUserChannels, setUserChannels } = useContext(App);

    const handleServerClick = async (serverId) => {
        updateChannelInfo(prevChannelInfo  => ({ ...prevChannelInfo, serverId: serverId }));
        const response = await getUserChannels(serverId);
        setUserChannels(response);

        navigate(`/channels/${serverId}/${response[0]._id}`);
    };

    return (
        <div className="servers-sidebar">
            {userServers?.length < 0 ? null : (
                <div className="servers-list">
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