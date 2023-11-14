// Imports
import { useContext } from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Auth } from '../Context/Auth';

const NavBar = () => {
    const { user, logoutUser } = useContext(Auth);

    return <Navbar bg="dark" style={{ height: "3.75rem" }}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">RatMessenger</Link>      
            </h2>
            {/* if the user exists, turn off the span */}
            {user && (
                <span className="text-warning">Logged in as {user?.username}</span>
            )}
            <Nav>
                <Stack direction="horizontal" gap={ 3 }>
                    {/* if the user exists, display a logout button */}
                    {user && (
                        <>
                            <Link onClick={() => logoutUser()} to="/login" className="link-light text-decoration-none">Logout</Link>
                        </>
                    )}

                    {/* if the user is not logged in, display both login and register buttons */}
                    {!user && (
                        <>
                            <Link to="/login" className="link-light text-decoration-none">Login</Link>
                            <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </>
                    )}
                </Stack>
            </Nav>
        </Container>
    </Navbar>;
}
 
export default NavBar;