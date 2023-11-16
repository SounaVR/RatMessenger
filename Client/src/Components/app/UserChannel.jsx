const UserChannel = ({ channel }) => {
    return (
        <>
            <p id={channel?._id}>[{channel?.type}] {channel?.name}</p>
        </>
    );
}
 
export default UserChannel;