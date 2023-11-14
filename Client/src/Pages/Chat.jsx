import { useContext } from "react";
import { App } from "../Context/App";

const Chat = () => {
    const { userServers, isUserServersLoading, userServersError } = useContext(App);

    console.log(userServers);
    return ( <>Chat</> );
}
 
export default Chat;