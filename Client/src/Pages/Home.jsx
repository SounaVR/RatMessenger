// Home component
import { useContext } from "react";
import { App } from '../Context/App';
import UserServer from '../Components/app/UserServer';
import UserChannel from '../Components/app/UserChannel';
import CreateServer from '../Components/app/CreateServer';
import CreateChannel from '../Components/app/CreateChannel';

// CSS
import '../Styles/home.css';

const Home = () => {
    const { userServers, isUserServersLoading, channelInfo, updateChannelInfo, userChannels, setIsChannelsNotLoading } = useContext(App);

    const handleServerClick = (serverId) => {
        updateChannelInfo({ ...channelInfo, serverId: serverId })
        setIsChannelsNotLoading(true);
    };

    return (
        <div id="chat-container">
            {userServers?.length < 0 ? null : (
                <div className="sidebar">
                    {isUserServersLoading && <p>Loading servers...</p>}
                    {userServers?.map((server, i) => (
                        <UserServer key={i} server={server} handleServerClick={handleServerClick} />
                    ))}
                    <CreateServer />
                </div>
            )}
            <div className="main-content">
                
                {!userChannels && (
                    <p>Select or create a server first</p>
                )}
                {userChannels && (
                    <div className="channels-list">
                        <CreateChannel />
                        {userChannels?.map((channel, i) => (
                            <UserChannel key={i} channel={channel} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;