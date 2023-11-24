import { useContext, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { App } from '../../Context/App';
import { Auth } from '../../Context/Auth';

const createServer = () => {
    const { user } = useContext(Auth);
    const { createServer, serverInfo, updateServerInfo } = useContext(App);
    
    // Create server Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Checks if the server name is empty
    const isServerNameEmpty = !serverInfo.serverName.trim(); 

    return (
    <>
        <p
            role="button"
            onClick={() => handleShow()}
            style={{ color: "grey",fontSize: "35px" }}
        ><FaPlusCircle /></p>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createServer}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>SERVER NAME</Form.Label>
                        <Form.Control
                            className='channelName shadow-none'
                            type="text"
                            placeholder={`${user.username}'s server`}
                            autoFocus
                            onChange={(e) =>
                                updateServerInfo({ ...serverInfo, serverName: e.target.value, userId: user._id })
                            }
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleClose}
                        disabled={isServerNameEmpty}
                    >
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
    );
}

export default createServer;