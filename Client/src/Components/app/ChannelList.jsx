import { useState, useEffect } from 'react';
import { baseUrl, getRequest } from '../../Utils/Services';

const ChannelList = ({ channelInfo, updateChannelInfo }) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequest(`${baseUrl}/app/servers/channels/${channelInfo?.serverId}`);

                // Ensure that channelData is an array before updating the state
                if (Array.isArray(response)) {
                    setChannels(response);
                } else {
                    console.error("Invalid data format received:", response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (channelInfo?.serverId) {
            fetchData();
        }
    }, [channelInfo?.serverId]); // Run the effect whenever channelInfo?.serverId changes

     // Check if 'channels' is not an array
    if (!Array.isArray(channels)) {
        return <div>Error: Invalid data format</div>;
    }
    
    // Check if 'channels' is undefined or an empty array
    if (channels.length === 0) {
        return <div>Select or create a server first</div>;
    }
  
    return (
        <div>
            {channels.map((channel) => (
                <div key={channel._id}>{channel.name}</div>
            ))}
        </div>
    );
}
 
export default ChannelList;