import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.scss';
import { Home, BookOpen, Users, Mail, LogIn } from 'lucide-react'; // Cambiado LayoutDashboard por LogIn

const Header = () => {
    const navLinks = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Cursos', href: '/cursos', icon: BookOpen },
        { name: 'Nosotros', href: '/nosotros', icon: Users },
        { name: 'Contacto', href: '/contacto', icon: Mail },
    ];

    // Botón estático que siempre redirige al Login
    const CtaButton = () => (
        <Link to="/login" className={styles.btn}>
            <LogIn
                size={16}
                style={{
                    marginRight: '8px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                }}
            />
            Iniciar Sesión
        </Link>
    );

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Manteniendo intacto tu logo original de la web */}
                <Link to="/" className={styles.brand}>
                    <span className={styles.logoText}>
                        CC<span>IP</span>
                    </span>
                </Link>

                {/* El Navbar recibe el botón para vistas móviles/hamburguesa */}
                <Navbar links={navLinks}>
                    <CtaButton />
                </Navbar>

                {/* El contenedor de escritorio recibe el mismo botón */}
                <div className={styles.ctaDesktop}>
                    <CtaButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
