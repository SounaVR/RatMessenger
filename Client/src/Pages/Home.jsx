// Home component
import { useContext, useState } from "react";
import { App } from '../Context/App';
import UserServer from '../Components/app/UserServer';
import CreateServer from '../Components/app/CreateServer';
import ChannelList from '../Components/app/ChannelList';

const Home = () => {
    const { userServers, isUserServersLoading, userServersError, channelInfo, updateChannelInfo } = useContext(App);

    const handleServerClick = (serverId) => {
        updateChannelInfo({ ...channelInfo, serverId: serverId })
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
                <ChannelList channelInfo={channelInfo} updateChannelInfo={updateChannelInfo}/>
            </div>
        </div>
    );
}

export default Home;