// Imports
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './Styles/index.css'

import { AuthProvider } from './Context/Auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
