import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import {} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 🔥 Importamos useNavigate
import AuthLayout from '@/components/core/AuthLayout';
import CustomModal from '@/components/Mod/CustomModal';
import styles from '@/views/public/styles/FormLogin.module.scss';

const ForgotPass = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // 🔥 Inicializamos el hook
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
        icon: CheckCircle,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalConfig({
            isOpen: true,
            type: 'success',
            title: 'Enlace Enviado',
            message: 'Hemos enviado las instrucciones a tu correo institucional.',
            icon: CheckCircle,
        });
        
        
        /* // EJEMPLO 2: EL CORREO NO EXISTE (Error / Warning)
    setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Correo no encontrado',
        message: 'El correo ingresado no está registrado en el sistema CCIP.',
        icon: AlertCircle
    });

    
    // EJEMPLO 3: EL SERVIDOR SE CAYÓ (Danger / Crítico)
    setModalConfig({
        isOpen: true,
        type: 'danger',
        title: 'Error de Conexión',
        message: 'Ocurrió un problema técnico. Por favor, intenta más tarde.',
        icon: XCircle
    });*/
    };
    // 🔥 Función para cerrar y redirigir
    const handleClose = () => {
        const wasSuccess = modalConfig.type === 'success';
        setModalConfig({ ...modalConfig, isOpen: false });

        if (wasSuccess) {
            navigate('/login');
        }
    };
    return (
        <AuthLayout
            title="Recuperar"
            subtitle="Introduce tu correo institucional para enviarte un enlace de recuperación."
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Correo Electrónico</label>
                    <div className={styles.inputWrapper}>
                        <Mail className={styles.icon} size={18} />
                        <input type="email" placeholder=" " required />
                    </div>
                </div>

                <p
                    style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                    }}
                >
                    * Se enviará un código de verificación a tu bandeja de entrada.
                </p>

                <button type="submit" className={styles.submitBtn}>
                    Enviar enlace
                </button>
            </form>

            <CustomModal
                isOpen={modalConfig.isOpen}
                onClose={handleClose}
                title={modalConfig.title}
                icon={modalConfig.icon}
                type={modalConfig.type}
            >
                <p>{modalConfig.message}</p>

                <button
                    onClick={handleClose}
                    className={styles.submitBtn}
                    style={{
                        marginTop: '20px',
                        backgroundColor:
                            modalConfig.type === 'danger'
                                ? '#dc2626'
                                : modalConfig.type === 'error'
                                ? '#f59e0b'
                                : '',
                    }}
                >
                    {modalConfig.type === 'success' ? 'Entendido' : 'Cerrar'}
                </button>
            </CustomModal>

            <footer className={styles.footer}>
                <Link
                    to="/login"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                    }}
                >
                    <ArrowLeft size={16} /> Volver al Login
                </Link>
            </footer>
        </AuthLayout>
    );
};

export default ForgotPass;
