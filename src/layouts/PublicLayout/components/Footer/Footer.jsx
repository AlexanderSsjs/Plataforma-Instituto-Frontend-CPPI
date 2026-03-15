import styles from './Footer.module.scss';
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
    ExternalLink
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <div className={styles.logoText} style={{ marginBottom: '15px' }}>
                        CCIP
                    </div>
                    <p className={styles.description}>
                        Centro de Capacitación e Innovación Profesional. 4 años formando expertos con convenios internacionales.
                    </p>
                    <div className={styles.stats}>
                        <span style={{ marginLeft: '8px' }}>
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
                            <a href="#inicio-section" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <AnimatedIcon color="#1877F2">
                                    <Home size={18} />
                                </AnimatedIcon>
                                Inicio</a>
                        </li>
                        <li>
                            <a href="#cursos" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AnimatedIcon color="#facc15">
                                    <BookCheck size={18} />
                                </AnimatedIcon>
                                Cursos Certificables
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/ccip.org.pe"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <AnimatedIcon color="#25D366">
                                    <MessageCircle size={18} />
                                </AnimatedIcon>
                                Grupo de WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href="#nosotros" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                            <a href="https://wa.me/51930449016" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AnimatedIcon color="#25D366">
                                    <MessageCircle size={18} />
                                </AnimatedIcon>
                                930 449 016
                            </a>
                        </li>
                        <li>
                            <a href="tel:+51959280078" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AnimatedIcon color="#facc15">
                                    <Phone size={18} />
                                </AnimatedIcon>
                                959 280 078
                            </a>
                        </li>
                        <li>
                            <a href="mailto:tuportalacademico@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <AnimatedIcon color="#dc2626">
                                    <Mail size={18} />
                                </AnimatedIcon>
                                tuportalacademico@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>© 2026 CCIP - Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;