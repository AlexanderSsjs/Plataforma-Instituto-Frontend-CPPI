import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import ScrollToTop from './components/common/scrollTop';

import Home from './views/public/Home';
import Nosotros from './views/public/Nosotros';
import Courses from './views/public/Courses';
import Details from './views/public/Details'; 

const LoginPage = () => <div style={{padding: '100px', textAlign: 'center'}}><h1>Formulario de Acceso</h1></div>;
const DashboardHome = () => <h1>Bienvenido al Panel de Control (Privado)</h1>;

function App() {
  const isAuthenticated = false; 

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/curso/:id" element={<Details />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route 
          element={isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/perfil" element={<h1>Tu Perfil</h1>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
