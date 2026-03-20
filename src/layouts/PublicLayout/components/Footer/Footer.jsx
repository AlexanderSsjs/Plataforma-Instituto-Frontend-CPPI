import { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { AnimatedIcon } from '../../../../components/Icon/AnimatedIcon';
import {
    MessageCircle,
    Phone,
    Mail,
    BookCheck,
    GraduationCap,
    Facebook,
    Users,
    Home,
    ExternalLink,
} from 'lucide-react';

const Footer = () => {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentFooter = footerRef.current; 
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            threshold: 0.1,
        });

        if (currentFooter) {
            observer.observe(currentFooter);
        }

        return () => {
            if (currentFooter) {
                observer.unobserve(currentFooter); 
            }
            observer.disconnect();
        };
    }, []);

    return (
        <footer ref={footerRef} className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <div className={styles.logoText}>CCIP</div>
                    <p className={styles.description}>
                        Centro de Capacitación e Innovación Profesional. 4 años formando expertos
                        con convenios internacionales.
                    </p>
                    <div className={styles.stats}>
                        <span>
                            <AnimatedIcon color="#facc15">
                                <GraduationCap size={20} />
                            </AnimatedIcon>
                            13,000+ Certificados
                        </span>
                    </div>
                </div>
                <div className={styles.col}>
                    <h4>Plataforma</h4>
                    <ul>
                        <li>
                            <Link to="/">
                                <AnimatedIcon color="#1877F2">
                                    <Home size={18} />
                                </AnimatedIcon>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/cursos">
                                <AnimatedIcon color="#facc15">
                                    <BookCheck size={18} />
                                </AnimatedIcon>
                                Cursos Certificables
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/ccip.org.pe"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AnimatedIcon color="#1877F2">
                                    <Facebook size={18} />
                                </AnimatedIcon>
                                Cursos en Vivo (FB)
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Oportunidades</h4>
                    <ul>
                        <li>
                            <a
                                href="https://fieuna.blogspot.com/2024/05/practicas-pre-profesionales-y.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={16} />
                                Prácticas Pre/Profesionales
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://chat.whatsapp.com/K3AEYyxA4wWE7sHmQeCGbS"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AnimatedIcon color="#25D366">
                                    <MessageCircle size={18} />
                                </AnimatedIcon>
                                Grupo de WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href="#nosotros">
                                <AnimatedIcon color="#facc15">
                                    <Users size={18} />
                                </AnimatedIcon>
                                Nosotros
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Contacto</h4>
                    <ul className={styles.contactList}>
                        <li>
                            <a href="https://wa.me/51930449016">
                                <AnimatedIcon color="#25D366">
                                    <MessageCircle size={18} />
                                </AnimatedIcon>
                                930 449 016
                            </a>
                        </li>
                        <li>
                            <a href="tel:+51959280078">
                                <AnimatedIcon color="#facc15">
                                    <Phone size={18} />
                                </AnimatedIcon>
                                959 280 078
                            </a>
                        </li>
                        <li>
                            <a href="mailto:tuportalacademico@gmail.com">
                                <AnimatedIcon color="#dc2626">
                                    <Mail size={18} />
                                </AnimatedIcon>
                                <div className={styles.emailLink}>
                                    tuportalacademico
                                    <span>@gmail.com</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>© 2026 CCIP - Todos los derechos reservados.</p>
                <div style={{ display: 'none' }}>
                    <p>Hecho por Alexander Piélago Quiroz</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
