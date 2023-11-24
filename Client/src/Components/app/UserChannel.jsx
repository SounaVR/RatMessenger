// CSS
import { FaHashtag, FaVolumeUp } from 'react-icons/fa';
import '../../Styles/home.css';

const UserChannel = ({ channel }) => {
    return (
        <div className="user-channel" id={channel?._id}>
            <p>
            {channel?.type === 'Text' && <FaHashtag />}
            {channel?.type === 'Voice' && <FaVolumeUp />}
            &nbsp;{channel?.name}
            </p>
        </div>
    );
}
 
export default UserChannel;