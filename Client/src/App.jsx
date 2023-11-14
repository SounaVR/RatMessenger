// Packages Imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

// Components
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './Components/NavBar';
import { Auth } from './Context/Auth';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
    const { user } = useContext(Auth);

    return (
        <>
            <NavBar />
            <Container>
                <Routes>
                    <Route path='/' element={ user ? <Chat/> : <Login/> }/>
                    <Route path='/login' element={ user ? <Chat/> : <Login/> }/>
                    <Route path='/register' element={ user ? <Chat/> : <Register/> }/>
                    <Route path='*' element={ <Navigate to="/" /> }/>
                </Routes>
            </Container>
        </>
    );
}

export default App;