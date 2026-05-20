import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // <--- IMPORTAMOS TU CONTEXTO
import AuthLayout from '@/components/core/AuthLayout';
import styles from '../public/styles/FormLogin.module.scss';

const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // <--- JALAMOS LA FUNCIÓN GLOBAL DE INICIAR SESIÓN

    // Estados para controlar los inputs del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estados para el flujo de carga y errores de la API
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Limpiamos errores anteriores

        try {
            // Enviamos los datos reales capturados a través del Contexto -> Servicio -> Laravel
            const user = await login({ email, password });

            console.log('¡Inicio de sesión exitoso!', user);

            // Redirigimos al Dashboard del LMS de forma real
            navigate('/dashboard');
        } catch (err) {
            console.error('Error capturado en la vista:', err);
            // Capturamos el error que responda Laravel (Ej: 422 o 401 de credenciales incorrectas)
            setError(err.response?.data?.message || 'Correo o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Bienvenido a" subtitle="Ingresa tus credenciales para acceder.">
            <form className={styles.form} onSubmit={handleLogin}>
                {/* ❌ MENSAJE DE ERROR DINÁMICO */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-4 text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label>Correo Electrónico</label>
                    <div className={styles.inputWrapper}>
                        <Mail className={styles.icon} size={18} />
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Vinculamos el estado
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Contraseña</label>
                    <div className={styles.inputWrapper}>
                        <Lock className={styles.icon} size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Vinculamos el estado
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to="/recuperar" className={styles.forgot}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                {/* ⏳ BOTÓN DINÁMICO CON ESTADO DE CARGA */}
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
            </form>

            <footer className={styles.footer}>
                <p>
                    ¿Aún no eres alumno? <Link to="/courses">Ver Cursos</Link>
                </p>
            </footer>
        </AuthLayout>
    );
};

export default FormLogin;
