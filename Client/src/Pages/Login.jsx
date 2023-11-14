// Imports
import { useContext } from 'react';
import { Auth } from '../Context/Auth';
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';

const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(Auth);

    return <>
        <Form onSubmit={ loginUser }>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%"
            }}>
                <Col xs={ 6 }>
                    <Stack gap={ 3 }>
                        <h2>Login</h2>
                        
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(e) =>
                                updateLoginInfo({ ...loginInfo, email: e.target.value })
                            }
                        />
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => 
                                updateLoginInfo({ ...loginInfo, password: e.target.value })
                            }   
                        />
                        <Button variant="primary" type="submit">
                            { isLoginLoading ? "Logging in..." : "Login" }
                        </Button>
                        {
                            loginError?.error &&
                            <Alert variant="danger">
                                <p>{loginError?.errorMessage}</p>
                            </Alert>
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>;
}
 
export default Login;