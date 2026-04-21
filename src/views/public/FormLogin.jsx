import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/core/AuthLayout';
import styles from '../public/styles/FormLogin.module.scss';
const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout 
            title="Bienvenido a" 
            subtitle="Ingresa tus credenciales para acceder."
        >
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                    <label>Correo Electrónico</label>
                    <div className={styles.inputWrapper}>
                        <Mail className={styles.icon} size={18} />
                        <input type="email" placeholder="ejemplo@correo.com" required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Contraseña</label>
                    <div className={styles.inputWrapper}>
                        <Lock className={styles.icon} size={18} />
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                        <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to="/recuperar" className={styles.forgot}>¿Olvidaste tu contraseña?</Link>
                </div>

                <button type="submit" className={styles.submitBtn}>Iniciar Sesión</button>
            </form>

            <footer className={styles.footer}>
                <p>¿Aún no eres alumno? <Link to="/courses">Ver Cursos</Link></p>
            </footer>
        </AuthLayout>
    );
};

export default FormLogin;