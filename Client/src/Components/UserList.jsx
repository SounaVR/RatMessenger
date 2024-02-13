// Example in your React component
import React, { useContext, useEffect, useRef, useState } from 'react';
import { baseUrl, getRequest } from '../Utils/Services';
import { Auth } from '../Context/Auth';
import ProfilePopup from './app/ProfilePopup';
import pfp from '../Assets/avatar.jpg';

const UserList = ({ activeServer }) => {
    const { user } = useContext(Auth);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Fetch server members based on the active server
                const response = await getRequest(`${baseUrl}/app/servers/members/${activeServer}`, user.token);
                setMembers(response);
            } catch (error) {
                console.error(error);
            }
        };

        if (activeServer) {
            fetchMembers();
        }
    }, [activeServer]);

    const [selectedUser, setSelectedUser] = useState(null);
    const popupRef = useRef(null);

    const handleProfileClick = (user) => {
        setSelectedUser(user);
    }

    const closePopup = () => {
        setSelectedUser(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef, closePopup]);

    return (
        <div className="user-list">
            {activeServer && (
                <>
                    <h3>Members</h3>
                    <div className='users'>
                        {members?.map((member) => (
                            <div key={member._id} className="member" onClick={() => handleProfileClick(member)}>
                            <img src={pfp} alt="Profile" className="profile-picture" />
                                {member.username}
                            </div>
                        ))}
                        <ProfilePopup selectedUser={selectedUser} popupRef={popupRef} />
                    </div>
                </>
            )}
        </div>
    );
};

export default UserList;