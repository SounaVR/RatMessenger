import React, { useContext } from 'react';
import { App } from '../Context/App';
import UserChannel from '../Components/app/UserChannel';
import CreateChannel from '../Components/app/CreateChannel';

const ChannelSidebar = ({ onChannelChange, activeChannel }) => {
    const { userChannels } = useContext(App);

    const handleChannelClick = (channelId) => {
        onChannelChange(channelId);
    };

    return (
        <div className="channels-sidebar">
            {userChannels && (
                <div className="channels-list">
                    <CreateChannel />
                    {userChannels?.map((channel, i) => (
                        <UserChannel
                            key={i}
                            channel={channel}
                            onClick={() => handleChannelClick(channel._id)}
                            isActive={channel._id === activeChannel}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChannelSidebar;