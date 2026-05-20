import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // <--- IMPORTAMOS EL PROVEEDOR

import './styles/global.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            {' '}
            {/* <--- ENVOLVEMOS LA APP */}
            <App />
        </AuthProvider>
    </StrictMode>,
);
