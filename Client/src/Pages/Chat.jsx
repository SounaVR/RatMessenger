// Imports
import { useContext } from "react";
import { App } from "../Context/App";
import { Auth } from '../Context/Auth';
import UserServer from '../Components/app/UserServer';

// CSS
import { Stack } from 'react-bootstrap';

const Chat = () => {
    const { user } = useContext(Auth);
    const { userServers, isUserServersLoading, userServersError } = useContext(App);

    return (
        <>
            { userServers?.length < 1 ? null : (
                <Stack direction="horizontal" gap={ 4 } className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={ 3 }>
                        { isUserServersLoading && <p>Loading servers...</p> }
                        { userServers?.map((server, i) =>
                            {
                                return (
                                    <div key={ i }>
                                        <UserServer server={ server } user= { user } />
                                    </div>
                                )
                            })
                        }
                    </Stack>
                    <p>ChatBox</p>
                </Stack>
            )}
        </>
    );
}
 
export default Chat;