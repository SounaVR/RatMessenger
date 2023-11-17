import { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
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
                    <Modal.Title>Create Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createChannel}>
                        <Form.Group>
                            <Form.Label>CHANNEL TYPE</Form.Label>
                            <div key="channelType" id="channelType">
                                <div className="radio-option">
                                    <Form.Check
                                        defaultChecked
                                        value="Text"
                                        name="group1"
                                        type="radio"
                                        className="radio-input"
                                        onChange={(e) => {
                                            updateChannelInfo({ ...channelInfo, channelType: e.target.value });
                                        }}
                                    />
                                    <span className="radio-label">Text</span>
                                </div>
                                <div className="radio-option">
                                    <Form.Check
                                        value="Voice"
                                        name="group1"
                                        type="radio"
                                        className="radio-input"
                                        onChange={(e) => {
                                            updateChannelInfo({ ...channelInfo, channelType: e.target.value });
                                        }}
                                    />
                                    <span className="radio-label">Voice</span>
                                </div>
                            </div>
                            <Form.Label>CHANNEL NAME</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>#</InputGroup.Text>
                                <Form.Control
                                    className='channelName shadow-none'
                                    type="text"
                                    placeholder="new-channel"
                                    autoFocus
                                    onChange={(e) =>
                                        updateChannelInfo({ ...channelInfo, channelName: e.target.value })
                                    }
                                />
                            </InputGroup>
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