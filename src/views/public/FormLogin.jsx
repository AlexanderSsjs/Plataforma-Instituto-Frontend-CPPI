import React, { useState, useCallback } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertTriangle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/core/AuthLayout';
import CustomModal from '@/components/Mod/CustomModal';
import styles from '../public/styles/FormLogin.module.scss';

// 🔒 FUNCIÓN PURA EXTERNA: Mapea respuestas del backend sin ensuciar el componente
const parseBackendError = (err) => {
    const status = err.response?.status;
    const responseData = err.response?.data;

    if (status === 422) {
        if (responseData?.errors) {
            const firstErrorKey = Object.keys(responseData.errors)[0];
            return {
                message: responseData.errors[firstErrorKey][0],
                type: 'error',
                title: 'Error de Validación',
            };
        }
        return {
            message: responseData?.message || 'Campos inválidos.',
            type: 'error',
            title: 'Error de Validación',
        };
    }

    if (status === 401) {
        return {
            message: responseData?.message || 'Correo o contraseña incorrectos.',
            type: 'error',
            title: 'Error de Acceso',
        };
    }

    if (status >= 500) {
        return {
            message: 'El servidor no responde. Por favor, intenta más tarde.',
            type: 'danger',
            title: 'Error de Infraestructura',
        };
    }

    return {
        message: 'Ocurrió un problema inesperado al intentar acceder.',
        type: 'danger',
        title: 'Error Indeterminado',
    };
};

const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // 🔒 RENDIMIENTO: Un solo estado para agrupar las credenciales del formulario
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Estado unificado para el modal de alertas
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'error',
    });

    // Manejador genérico para actualizar inputs
    const handleInputChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const sanitizedEmail = formData.email.trim().toLowerCase();

        try {
            await login({ email: sanitizedEmail, password: formData.password });
            navigate('/dashboard');
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Debug Login Error:', err);
            }

            // Desestructuramos la configuración segura del error mapeado
            const { message, type, title } = parseBackendError(err);

            setModalConfig({
                isOpen: true,
                title,
                message,
                type,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Bienvenido a" subtitle="Ingresa tus credenciales para acceder.">
            <form className={styles.form} onSubmit={handleLogin} autoComplete="on">
                {/* Input de Correo Electrónico */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <div className={styles.inputWrapper}>
                        <Mail className={styles.icon} size={18} />
                        <input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>
                </div>

                {/* Input de Contraseña */}
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Contraseña</label>
                    <div className={styles.inputWrapper}>
                        <Lock className={styles.icon} size={18} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword((prev) => !prev)}
                            disabled={loading}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
            </form>

            <footer className={styles.footer}>
                <p>
                    ¿Aún no eres alumno? <Link to="/courses">Ver Cursos</Link>
                </p>
            </footer>

            {/* 🚨 MODAL INTELIGENTE UNIFICADO */}
            <CustomModal
                isOpen={modalConfig.isOpen}
                onClose={handleCloseModal}
                title={modalConfig.title}
                type={modalConfig.type}
                icon={modalConfig.type === 'danger' ? AlertTriangle : X}
            >
                <p style={{ textAlign: 'center', margin: 0 }}>{modalConfig.message}</p>
            </CustomModal>
        </AuthLayout>
    );
};

export default FormLogin;
