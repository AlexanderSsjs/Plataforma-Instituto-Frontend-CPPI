import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logoImg from "@/assets/public/logo.svg";
import styles from './Header.module.scss';
import { 
    Home, 
    BookOpen, 
    Users, 
    Mail, 
    Rocket 
} from 'lucide-react';
const Header = () => {
    const navLinks = [
        { name: 'Inicio', href: '/', icon: Home }, 
        { name: 'Cursos', href: '/cursos', icon: BookOpen },
        { name: 'Nosotros', href: '/nosotros', icon: Users },
        { name: 'Contacto', href: '/contacto', icon: Mail },
    ];

    const CtaButton = () => (
        <button className={styles.btn}>
            Iniciar Sesión
        </button>
    );

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.brand}>
                    <img src={logoImg} alt="Logo CCIP" className={styles.logoImg} />
                    <span className={styles.logoText}>
                        CC<span>IP</span>
                    </span>
                </Link>
                <Navbar links={navLinks}>
                    <CtaButton />
                </Navbar>

                <div className={styles.ctaDesktop}>
                    <CtaButton />
                </div>

            </div>
        </header>
    );
};

export default Header;