import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // 🔒 Importamos el estado real de autenticación
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.scss';
import { Home, BookOpen, Users, Mail, LayoutDashboard } from 'lucide-react';

const Header = () => {
    const { user } = useAuth(); // 🔏 Consumimos el usuario del contexto global
    const isAuthenticated = !!user;

    const navLinks = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Cursos', href: '/cursos', icon: BookOpen },
        { name: 'Nosotros', href: '/nosotros', icon: Users },
        { name: 'Contacto', href: '/contacto', icon: Mail },
    ];

    // 🔒 CONTROL DE FLUJO SEGURO: Modifica el CTA dinámicamente si hay sesión
    const CtaButton = () => {
        if (isAuthenticated) {
            return (
                <Link to="/dashboard" className={`${styles.btn} ${styles.btnPanel}`}>
                    <LayoutDashboard
                        size={16}
                        style={{
                            marginRight: '8px',
                            display: 'inline-block',
                            verticalAlign: 'middle',
                        }}
                    />
                    Ir al Panel
                </Link>
            );
        }

        return (
            <Link to="/login" className={styles.btn}>
                Iniciar Sesión
            </Link>
        );
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Manteniendo intacto tu logo original de la web */}
                <Link to="/" className={styles.brand}>
                    <span className={styles.logoText}>
                        CC<span>IP</span>
                    </span>
                </Link>

                {/* El Navbar recibe el botón inteligente para vistas móviles/hamburguesa */}
                <Navbar links={navLinks}>
                    <CtaButton />
                </Navbar>

                {/* El contenedor de escritorio recibe el mismo botón inteligente */}
                <div className={styles.ctaDesktop}>
                    <CtaButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
