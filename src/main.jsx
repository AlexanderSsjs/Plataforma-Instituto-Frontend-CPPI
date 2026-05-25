import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.tsx';

import './styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error(
        'No se encontró el elemento raíz (#root). Asegúrate de que exista en tu index.html',
    );
}

createRoot(rootElement).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>,
);
