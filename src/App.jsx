import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import ScrollToTop from './components/common/scrollTop';
import FormLogin from '@/views/public/FormLogin';
import ForgotPass from '@/components/core/ForgotPass';

// Private Views (No usamos lazy loading para el layout base, pero podemos usarlo para sus vistas)
import Dashboard from './views/private/Dashboard/Dashboard';
import Profile from './views/private/Profile/Profile';
import Asistencias from './views/private/Asistencias/asistencias';
import Alumnos from './views/private/Alumnos/Alumnos';
import MisCursos from './views/private/Cursos/MisCursos';
import DetalleCurso from './views/private/Cursos/DetalleCurso';
import Horarios from './views/private/Horarios/Horarios';
import Actividades from './views/private/Actividades/Actividades';
import CursosAsignados from './views/private/CursosAsignados/cursosasignados';
import DetalleAlumno from './views/private/detallesalumnos/detallealumno';

const Home = lazy(() => import('./views/public/Home'));
const Nosotros = lazy(() => import('./views/public/Nosotros'));
const Courses = lazy(() => import('./views/public/Courses'));
const Contacto = lazy(() => import('./views/public/Contacto'));
const Details = lazy(() => import('./views/public/Details'));

const PageLoader = () => (
    <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
        <p>Cargando CCIP...</p>
    </div>
);

function App() {
    // Aquí conectarás tu lógica de Auth (Context o Redux)
    // TEMPORAL: Cambiado a true para que el usuario pueda probar el Dashboard
    const isAuthenticated = true;

    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* Suspense atrapa las rutas mientras cargan los archivos JS */}
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* =========================
                        🌐 RUTAS PÚBLICAS
          ========================= */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="cursos" element={<Courses />} />
                        <Route path="curso/:id" element={<Details />} />
                        <Route path="nosotros" element={<Nosotros />} />
                        <Route path="contacto" element={<Contacto />} />
                    </Route>

                    {/* Rutas de Autenticación */}
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/recuperar" element={<ForgotPass />} />

                    {/* =========================
                        🔐 RUTAS PRIVADAS (Protegidas)
          ========================= */}
                    {/* --- GRUPO PRIVADO (Autenticación desactivada para prototipo) --- */}
                    <Route path="/dashboard" element={<PrivateLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="perfil" element={<Profile />} />
                        {/* Asegúrate de que el componente CoursesPrivate esté importado arriba */}
                    </Route>

                    {/* <Route
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
                        <Route path="Asistencias" element={<Asistencias />} />
                        <Route path="horarios" element={<Horarios />} />
                        <Route path="actividades" element={<Actividades />} />
                        <Route path="CursosAsignados" element={<CursosAsignados />} />
                        <Route path="/dashboard/detallealumnos/:id?" element={<DetalleAlumno />} />
                    </Route>

                    {/* En lugar de solo redirigir, podrías mostrar una página 404 personalizada */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
