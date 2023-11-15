// Chat component
import { useContext } from "react";
import { App } from "../Context/App";
import { Auth } from '../Context/Auth';
import UserServer from '../Components/app/UserServer';
import CreateServer from '../Components/app/CreateServer';
import { Stack } from 'react-bootstrap'; // Importing Stack component

const Chat = () => {
    const { user } = useContext(Auth);
    const { userServers, isUserServersLoading, userServersError } = useContext(App);

    return (
        <div id="chat-container">
            {userServers?.length < 0 ? null : (
                <div className="sidebar">
                    {isUserServersLoading && <p>Loading servers...</p>}
                    {userServers?.map((server, i) => (
                        <UserServer key={i} server={server} user={user} />
                    ))}
                    <CreateServer />
                </div>
            )}
            <div className="main-content">
                <p style={{ color: "white" }}>ChatBox</p>
            </div>
        </div>
    );
}

export default Chat;
