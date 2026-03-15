import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import Home from './views/public/Home';

const LoginPage = () => <div style={{padding: '100px', textAlign: 'center'}}><h1>Formulario de Acceso</h1></div>;
const DashboardHome = () => <h1>Bienvenido al Panel de Control (Privado)</h1>;

function App() {
  const isAuthenticated = false; 

  return (
    <BrowserRouter>
      <Routes>
        {/* --- GRUPO 1: VISTAS PÚBLICAS --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* IMPORTANTE: Agrega la ruta de login aquí para que el redireccionamiento funcione */}
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* --- GRUPO 2: VISTAS PRIVADAS (PROTEGIDAS) --- */}
        <Route 
          element={isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/perfil" element={<h1>Tu Perfil</h1>} />
        </Route>

        {/* REDIRECCIÓN POR DEFECTO (404) */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;