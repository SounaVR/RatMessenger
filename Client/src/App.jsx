// Packages Imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

//// Core Imports
// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Error from './Pages/Error';
// Components
import NavBar from './Components/NavBar';
// Contexts
import { Auth } from './Context/Auth';
import { AppProvider } from './Context/App';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const { user } = useContext(Auth);

    return (
        <AppProvider user={ user }>
            <NavBar />
                <Routes>
                    <Route path='/channels/@me' element={ user ? <Home/> : <Login/> }/>
                    <Route path='/login' element={ user ? <Home/> : <Login/> }/>
                    <Route path='/register' element={ user ? <Home/> : <Register/> }/>
                    <Route path='*' element={ <Navigate to="/channels/@me" /> }/>
                    <Route path='/error' element={ <Error /> }/>
                </Routes>
        </AppProvider>
    );
}

export default App;