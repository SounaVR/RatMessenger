import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { App } from '../../Context/App';

const CreateChannel = () => {
    const { createChannel, channelInfo, updateChannelInfo } = useContext(App);

    // Create channel Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <p
                style={{color: "grey", fontSize: "30px", width: "0px", marginBottom: "0px"}}
                onClick={() => handleShow()}
                role="button"
            >+</p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createChannel}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Channel Type</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`reverse-${type}`} className="mb-3">
                                <Form.Check
                                    reverse
                                    label="Text"
                                    value="Text"
                                    name="group1"
                                    type={type}
                                    onChange={(e) => {
                                        updateChannelInfo({ ...channelInfo, channelType: e.target.value })
                                    }}
                                />
                                <Form.Check
                                    reverse
                                    label="Voice"
                                    value="Voice"
                                    name="group1"
                                    type={type}
                                    onChange={(e) => {
                                        updateChannelInfo({ ...channelInfo, channelType: e.target.value })
                                    }}
                                />
                                </div>
                            ))}
                            <Form.Label>Channel name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Put a name..."
                                autoFocus
                                onChange={(e) =>
                                    updateChannelInfo({ ...channelInfo, channelName: e.target.value })
                                }
                            />
                        </Form.Group>
                        
                        <br />
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Create Channel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default CreateChannel;