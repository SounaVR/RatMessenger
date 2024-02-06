// CSS
import { FaHashtag, FaVolumeUp } from 'react-icons/fa';
import '../../Styles/home.css';

const UserChannel = ({ channel, onClick }) => {
    return (
        <div className="user-channel" id={channel?._id} onClick={onClick}>
            <p>
            {channel?.type === 'Text' && <FaHashtag />}
            {channel?.type === 'Voice' && <FaVolumeUp />}
            &nbsp;{channel?.name}
            </p>
        </div>
    );
}
 
export default UserChannel;