import { Stack } from "react-bootstrap";
import pfp from '../../Assets/avatar.jpg'

const userServer = ({ server, user }) => {
    return (
        <Stack
            direction="horizontal"
            gap={ 3 }
            className="user-card align-items-center p-2
            justify-content-between"
            role="button"
        >
            <div className="d-flex">
                <div className="me-2">
                    <img className="rounded-circle" src={pfp} height="35px"></img>
                </div>
                <div className="text-content">
                    <div className="name">{ server?.name }</div>
                    <div className="text">Text Message</div>
                </div>
            </div>
            <div className="d-flex flex-cloumn align-items-end">
                <div className="date">
                    12/12/2022
                </div>
                <div className="this-user-notifications">2</div>
                <span className="user-online"></span>
            </div>
        </Stack>
    );
}
 
export default userServer;