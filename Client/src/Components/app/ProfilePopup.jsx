import pfp from '../../Assets/avatar.jpg';
import moment from 'moment';

const ProfilePopup = ({ selectedUser, popupRef }) => {
    const getFormattedTimestamp = (timestamp) => {
        const now = moment();
        const messageTime = moment(timestamp);
    
        if (now.isSame(messageTime, 'day')) {
            return messageTime.format('[Today at] h:mm A');
        } else if (now.subtract(1, 'days').isSame(messageTime, 'day')) {
            return messageTime.format('[Yesterday at] h:mm A');
        } else {
            return messageTime.format('MM/DD/YYYY h:mm A');
        }
    };

    return (
        <>
        {selectedUser && (
            <div ref={popupRef} className={`user-profile-popup`}>
                <img src={pfp} alt="Profile" className='profile-picture' />
                <div>{selectedUser.username}</div>
                <div>Member since: <br />{getFormattedTimestamp(selectedUser.createdAt)}</div>
            </div>
        )}
        </>
    );
};

export default ProfilePopup;