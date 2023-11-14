import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './Components/NavBar';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <>
            <NavBar />
            <Container>
                <Routes>
                    <Route path='/' element={ <Chat/> }/>
                    <Route path='/login' element={ <Login/> }/>
                    <Route path='/register' element={ <Register/> }/>
                    <Route path='*' element={ <Navigate to="/" /> }/>
                </Routes>
            </Container>
        </>
    );
}

export default App;