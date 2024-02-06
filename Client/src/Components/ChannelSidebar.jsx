import React, { useContext } from 'react';
import { App } from '../Context/App';
import UserChannel from '../Components/app/UserChannel';
import CreateChannel from '../Components/app/CreateChannel';

const ChannelSidebar = ({ onChannelChange }) => {
    const { userChannels } = useContext(App);

    const handleChannelClick = (channelId) => {
        onChannelChange(channelId);
    };

    return (
        <div className="channels-sidebar">
            {!userChannels && (
                    <p>Select or create a server first</p>
                )}
                {userChannels && (
                    <div className="channels-list">
                        <CreateChannel />
                        {userChannels?.map((channel, i) => (
                            <UserChannel
                                key={i}
                                channel={channel}
                                onClick={() => handleChannelClick(channel._id)}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default ChannelSidebar;