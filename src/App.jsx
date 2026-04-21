import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout/PrivateLayout';
import ScrollToTop from './components/common/scrollTop';
import FormLogin from '@/views/public/FormLogin';
import ForgotPass from '@/components/core/ForgotPass';

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
    const isAuthenticated = false;

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

                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Rutas de Autenticación */}
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/recuperar" element={<ForgotPass />} />
                    {/* =========================
              🔐 RUTAS PRIVADAS (Protegidas)
          ========================= */}
                    <Route
                        element={
                            isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />
                        }
                    >
                        <Route path="perfil" element={<h1>Tu Perfil</h1>} />
                    </Route>

                    {/* =========================
              ❌ MANEJO DE 404
          ========================= */}
                    {/* En lugar de solo redirigir, podrías mostrar una página 404 personalizada */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
