// Packages Imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

//// Core Imports
// Pages
import Home from './Pages/Home';
import MainApp from './Pages/MainApp';
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
                    {/* Home Page */}
                    <Route path='/channels/@me' element={ user ? <Home/> : <Login/> }/>

                    {/* App Pages Handler */}
                    <Route path='/channels/:serverId/:channelId' element={ user ? <MainApp/> : <Login/> }/>

                    {/* Auth Logic */}
                    <Route path='/login' element={ user ? <Navigate to="/channels/@me" /> : <Login/> }/>
                    <Route path='/register' element={ user ? <Navigate to="/channels/@me" /> : <Register/> }/>
                    
                    {/* Fallback */}
                    <Route path='*' element={ <Navigate to="/channels/@me" /> }/>

                    {/* Error Page */}
                    <Route path='/error' element={ <Error /> }/>
                </Routes>
        </AppProvider>
    );
}

export default App;