import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import addServerButton from '../../Assets/addServer.png';
import { App } from '../../Context/App';
import { Auth } from '../../Context/Auth';

const createServer = () => {
    const { user } = useContext(Auth);
    const { createServer, serverInfo, updateServerInfo } = useContext(App);
    
    // Create server Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
        <img
            className="rounded-circle"
            src={addServerButton}
            height="35px"
            role="button"
            onClick={() => handleShow()}
            style={{ marginTop: "5px", marginBottom: "10px" }}
        ></img>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createServer}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Server name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Put a name..."
                            autoFocus
                            onChange={(e) =>
                                updateServerInfo({ ...serverInfo, serverName: e.target.value, userId: user._id })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
    );
}

export default createServer;