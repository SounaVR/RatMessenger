import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
    return <>
        <Routes>
            <Route path='/' element={ <Chat/> }/>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/register' element={ <Register/> }/>
            <Route path='*' element={ <Navigate to="/" /> }/>
        </Routes>
    </>;
}

export default App;