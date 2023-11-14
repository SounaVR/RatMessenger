// Packages Imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

//// Core Imports
// Pages
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';
// Components
import NavBar from './Components/NavBar';
// Contexts
import { Auth } from './Context/Auth';
import { AppProvider } from './Context/App';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
    const { user } = useContext(Auth);

    return (
        <AppProvider user={ user }>
            <NavBar />
            <Container>
                <Routes>
                    <Route path='/' element={ user ? <Chat/> : <Login/> }/>
                    <Route path='/login' element={ user ? <Chat/> : <Login/> }/>
                    <Route path='/register' element={ user ? <Chat/> : <Register/> }/>
                    <Route path='*' element={ <Navigate to="/" /> }/>
                </Routes>
            </Container>
        </AppProvider>
    );
}

export default App;