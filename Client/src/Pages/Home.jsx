//Home Components
import { useState } from 'react';
import ServerSidebar from '../Components/ServerSidebar';
import ChannelSidebar from '../Components/ChannelSidebar';
import Chat from '../Components/Chat';

// CSS
import '../Styles/home.css';

const Home = () => {
    const [activeChannel, setActiveChannel] = useState(null);
    
    const handleChannelChange = (channelId) => {
        setActiveChannel(channelId)
    }
    
    return (
        <div className="app-container">
            <ServerSidebar />
            <ChannelSidebar onChannelChange={handleChannelChange} />
            {activeChannel ? (
                <Chat activeChannel={activeChannel} />
            ) : (
                <p>Click on a channel first</p>
            )}
        </div>
    );
}

export default Home;