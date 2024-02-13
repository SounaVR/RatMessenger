import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServerSidebar from '../Components/ServerSidebar';
import ChannelSidebar from '../Components/ChannelSidebar';
import Chat from '../Components/Chat';
import UserList from '../Components/UserList';

const MainApp = () => {
    const { serverId, channelId } = useParams();
    const [activeChannel, setActiveChannel] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        setActiveChannel(channelId);
    }, [serverId]);
    
    const handleChannelChange = (channelId) => {
        setActiveChannel(channelId);
        navigate(`/channels/${serverId}/${channelId}`);
    }

    return (
        <div className="app-container">
            <ServerSidebar />
            <ChannelSidebar onChannelChange={handleChannelChange} activeChannel={activeChannel} />
            <Chat activeChannel={activeChannel} serverId={serverId} />
            <UserList activeServer={serverId} />
        </div >
    )
}

export default MainApp;