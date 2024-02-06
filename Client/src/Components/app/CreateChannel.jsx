import { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlusCircle, FaHashtag, FaVolumeUp } from 'react-icons/fa';
import { App } from '../../Context/App';

const CreateChannel = () => {
    const { createChannel, channelInfo, updateChannelInfo } = useContext(App);

    // Create channel Modal
    const [show, setShow] = useState(false);
    const [isVoiceChannel, setIsVoiceChannel] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Checks if the channel name is empty
    const isChannelNameEmpty = !channelInfo.channelName.trim(); 

    return (
        <>
            <p
                style={{ color: "white", fontSize: "30px", width: "0px"}}
                onClick={() => handleShow()}
                role="button"
            ><FaPlusCircle /></p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createChannel}>
                        <Form.Group>
                            <Form.Label>CHANNEL TYPE</Form.Label>
                            <div key="channelType" id="channelType">
                                <div
                                    className={`radio-option ${channelInfo.channelType === 'Text' ? 'selected' : ''}`} 
                                    onClick={() => {
                                        updateChannelInfo({ ...channelInfo, channelType: 'Text' });
                                        setIsVoiceChannel(!isVoiceChannel);
                                    }}
                                >
                                    <Form.Check
                                        name="group1"
                                        type="radio"
                                        className="radio-input"
                                        readOnly
                                        checked={channelInfo.channelType === 'Text'}
                                    />
                                    <span className="radio-label">Text</span>
                                </div>
                                <div
                                    className={`radio-option ${channelInfo.channelType === 'Voice' ? 'selected' : ''}`} 
                                    onClick={() => {
                                        updateChannelInfo({ ...channelInfo, channelType: 'Voice' });
                                        setIsVoiceChannel(!isVoiceChannel);
                                    }}
                                >
                                    <Form.Check
                                        name="group1"
                                        type="radio"
                                        className="radio-input"
                                        readOnly
                                        checked={channelInfo.channelType === 'Voice'}
                                    />
                                    <span className="radio-label">Voice</span>
                                </div>
                            </div>
                            <Form.Label>CHANNEL NAME</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>{isVoiceChannel ? <FaVolumeUp /> : <FaHashtag />}</InputGroup.Text>
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
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClose}
                            disabled={isChannelNameEmpty}
                        >
                            Create Channel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
 
export default CreateChannel;