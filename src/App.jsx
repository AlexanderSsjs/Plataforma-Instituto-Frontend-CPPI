import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // <--- IMPORTAMOS TU AUTENTICACIÓN REAL

// Layouts
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import ScrollTop from './components/common/ScrollTop'; // Corregido a mayúscula para evitar errores de TS
import FormLogin from '@/views/public/FormLogin';
import ForgotPass from '@/components/core/ForgotPass';

// Private Views
import Dashboard from './views/private/Dashboard/Dashboard';
import Profile from './views/private/Profile/Profile';
import Asistencias from './views/private/Asistencias/asistencias';
import Alumnos from './views/private/Alumnos/Alumnos';
import MisCursos from './views/private/Cursos/MisCursos';
import DetalleCurso from './views/private/Cursos/DetalleCurso';
import Horarios from './views/private/Horarios/Horarios';
import Actividades from './views/private/Actividades/Actividades';
import CursosAsignados from './views/private/CursosAsignados/CursosAsignados'; // Corregido a mayúscula
import DetalleAlumno from './views/private/detallesalumnos/detallealumno';

// Lazy loading para vistas públicas
const Home = lazy(() => import('./views/public/Home'));
const Nosotros = lazy(() => import('./views/public/Nosotros'));
const Courses = lazy(() => import('./views/public/Courses'));
const Contacto = lazy(() => import('./views/public/Contacto'));
const Details = lazy(() => import('./views/public/Details'));

const PageLoader = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#0f172a',
            color: '#fff',
        }}
    >
        <p className="animate-pulse">Cargando CCIP...</p>
    </div>
);

function App() {
    // 🔏 CAPTURAMOS EL ESTADO REAL DE LA SESIÓN DESDE TU CONTEXTO
    const { user } = useAuth();
    const isAuthenticated = !!user; // Si 'user' existe es true, si es null es false

    return (
        <BrowserRouter>
            {/* Cambiado para que coincida exactamente con el nombre de la importación */}
            <ScrollTop />

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* ==========================================
                        🌐 RUTAS PÚBLICAS (Accesibles por cualquiera)
                       ========================================== */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="cursos" element={<Courses />} />
                        <Route path="curso/:id" element={<Details />} />
                        <Route path="nosotros" element={<Nosotros />} />
                        <Route path="contacto" element={<Contacto />} />
                    </Route>

                    {/* Rutas de Autenticación */}
                    {/* Si un usuario ya está logueado e intenta ir a /login, lo mandamos al dashboard directamente */}
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? <Navigate to="/dashboard" replace /> : <FormLogin />
                        }
                    />
                    <Route path="/recuperar" element={<ForgotPass />} />

                    {/* ==========================================
                        🔐 RUTAS PRIVADAS (Completamente Protegidas)
                       ========================================== */}
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="perfil" element={<Profile />} />
                        <Route path="alumnos" element={<Alumnos />} />
                        <Route path="cursos" element={<MisCursos />} />
                        <Route path="cursos/:id" element={<DetalleCurso />} />
                        <Route path="asistencias" element={<Asistencias />} />
                        <Route path="horarios" element={<Horarios />} />
                        <Route path="actividades" element={<Actividades />} />
                        <Route path="cursos-asignados" element={<CursosAsignados />} />
                        <Route path="detallealumnos/:id?" element={<DetalleAlumno />} />
                    </Route>

                    {/* Enrutador de escape: Cualquier ruta rota redirige al Home público */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
