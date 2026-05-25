import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.tsx';

// Layouts
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import ScrollTop from './components/common/ScrollTop';
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
import CursosAsignados from './views/private/CursosAsignados/CursosAsignados';
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

// 🔒 GUARDIÁN DE SEGURIDAD AVANZADO (Autenticación + Autorización + Escudo de Carga)
const ProtectedRoute = ({ isAuthenticated, user, allowedRoles, loading }) => {
    // ⏳ CRÍTICO: Si el contexto está ocupado verificando si el token es válido contra Laravel,
    // congelamos la pantalla temporalmente aquí en lugar de redirigir falsamente al login.
    if (loading) {
        return <PageLoader />;
    }

    // 1. Validar autenticación básica
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. Validar autorización por roles (si la ruta requiere roles específicos)
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

function App() {
    // 🔏 Extraemos tanto el usuario como el estado de carga real del contexto
    const { user, loading } = useAuth();

    return (
        <BrowserRouter>
            <ScrollTop />

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* ==========================================
                        🌐 RUTAS PÚBLICAS
                       ========================================== */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="cursos" element={<Courses />} />
                        <Route path="curso/:id" element={<Details />} />
                        <Route path="nosotros" element={<Nosotros />} />
                        <Route path="contacto" element={<Contacto />} />
                    </Route>

                    {/* Rutas de Autenticación (Dinámicas y reactivas al objeto user directo) */}
                    <Route
                        path="/login"
                        element={
                            loading ? (
                                <PageLoader />
                            ) : user ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <FormLogin />
                            )
                        }
                    />
                    <Route
                        path="/recuperar"
                        element={
                            loading ? (
                                <PageLoader />
                            ) : user ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <ForgotPass />
                            )
                        }
                    />

                    {/* ==========================================
                        密 RUTAS PRIVADAS (Estructura de Triple Capa)
                       ========================================== */}

                    {/* 🔑 CAPA 1: Acceso Privado General (Cualquier usuario autenticado) */}
                    <Route
                        element={
                            <ProtectedRoute
                                isAuthenticated={!!user} // 🔒 Evaluación reactiva directa en línea
                                user={user}
                                loading={loading}
                            />
                        }
                    >
                        <Route path="/dashboard" element={<PrivateLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="perfil" element={<Profile />} />
                            <Route path="cursos" element={<MisCursos />} />
                            <Route path="cursos/:id" element={<DetalleCurso />} />
                            <Route path="horarios" element={<Horarios />} />
                            <Route path="actividades" element={<Actividades />} />

                            {/* 🔑 CAPA 2: Rutas de Alta Sensibilidad Académica (Solo Admin y Profesores) */}
                            <Route
                                element={
                                    <ProtectedRoute
                                        isAuthenticated={!!user} // 🔒 Evaluación reactiva directa en línea
                                        user={user}
                                        allowedRoles={['admin', 'teacher']}
                                        loading={loading}
                                    />
                                }
                            >
                                <Route path="alumnos" element={<Alumnos />} />
                                <Route path="asistencias" element={<Asistencias />} />
                                <Route path="cursos-asignados" element={<CursosAsignados />} />
                                <Route path="detallealumnos/:id?" element={<DetalleAlumno />} />
                            </Route>
                        </Route>
                    </Route>

                    {/* Enrutador de escape inteligente reactivo adaptativo */}
                    <Route
                        path="*"
                        element={
                            loading ? (
                                <PageLoader />
                            ) : user ? (
                                <Navigate to="/dashboard" replace />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
