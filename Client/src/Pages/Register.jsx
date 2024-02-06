// Imports
import { useContext } from 'react';
import { Auth } from '../Context/Auth';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(Auth);

    return <>
        <Form onSubmit={ registerUser }>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%"
            }}>
                <Col xs={ 6 }>
                    <Stack gap={ 3 }>
                        <h2>Register</h2>

                        <Form.Control
                            type="text"
                            placeholder="Username"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, username: e.target.value })
                            }
                        />
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, email: e.target.value })
                            }    
                        />
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                updateRegisterInfo({ ...registerInfo, password: e.target.value })
                            }
                        />
                        <Button variant="primary" type="submit">
                            { isRegisterLoading ? "Creating your account..." : "Register" }
                        </Button>
                        
                        {
                            registerError?.error &&
                            <Alert variant="danger">
                                <p className="black-text">{registerError?.errorMessage}</p>
                            </Alert>
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>;
}
 
export default Register;