import React, { useEffect, useRef, useState } from 'react';
import {
    Mail,
    Phone,
    Users,
    BookOpen,
    MessageSquare,
    Facebook,
    Instagram,
    Linkedin,
    Share2,
} from 'lucide-react';
import './styles/Contacto.scss';
// Este icono está diseñado para "engañar" al ojo y que parezca de Lucide
const TikTokIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
        stroke={color}
        strokeWidth="3" // Esto iguala el grosor de los iconos de Lucide
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);
// Componente para manejar la animación individual de cada tarjeta
const ContactMethod = ({ icon: Icon, title, info, link, linkText, delay, isExternal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(cardRef.current);
                }
            },
            { threshold: 0.1 },
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`info-card ${isVisible ? 'itemVisible' : ''}`}
            style={{ '--animation-delay': delay }}
        >
            <div className="icon-wrapper">
                <Icon size={22} />
            </div>
            <div className="info-text">
                <h4>{title}</h4>
                <p>{info}</p>
                {link ? (
                    <a
                        href={link}
                        className="btn-link"
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : ''}
                    >
                        {linkText}
                    </a>
                ) : (
                    <span className="info-meta">{linkText}</span>
                )}
            </div>
        </div>
    );
};
const getWhatsAppLink = () => {
    return 'https://chat.whatsapp.com/EkEEFD7093Z0zgJzIcJj1K';
};
const getMailLink = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        return "mailto:tuportalacademico@gmail.com";
    }

    return "https://mail.google.com/mail/?view=cm&fs=1&to=tuportalacademico@gmail.com&su=Consulta%20de%20curso&body=Hola,%20quiero%20información%20sobre...";
};
const Contacto = () => {
    // Lógica para la tarjeta de comunidad
    const [comunidadVisible, setComunidadVisible] = useState(false);
    const comunidadRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setComunidadVisible(true);
                    observer.unobserve(comunidadRef.current);
                }
            },
            { threshold: 0.1 },
        );
        if (comunidadRef.current) observer.observe(comunidadRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="contacto" className="contacto-section">
            <div className="container-wrapper">
                <div className="contacto-main-header">
                    <h1 className="splitTitle">
                        <span className="textBlack">Contáctanos</span>
                        <span className="textRed">ahora</span>
                    </h1>
                    <div className="headerLine"></div>
                </div>

                <div className="alignment-wrapper">
                    <div className="section-header-unified">
                        <BookOpen size={24} className="icon-header" />
                        <h2>Contacto</h2>
                    </div>

                    <div className="contacto-info-grid">
                        <ContactMethod
                            icon={Users}
                            title="WhatsApp"
                            info="930 449 016"
                            link="https://wa.me/51930449016"
                            linkText="Chatear ahora"
                            isExternal={true}
                        />
                        <ContactMethod
                            icon={Mail}
                            title="Correo Electrónico"
                            info="tuportalacademico@gmail.com"
                            link={getMailLink()}
                            linkText="Enviar mensaje"
                            isExternal={true}
                        />
                    </div>

                    <div className="section-header-unified mt-extra">
                        <Share2 size={24} className="icon-header" />
                        <h2>Redes Sociales</h2>
                    </div>

                    <div className="contacto-info-grid">
                        <ContactMethod
                            icon={Facebook}
                            title="Facebook"
                            info="COLEGIO DE INGENIEROS"
                            link="https://www.facebook.com/share/1ZjoH8cEa1/"
                            linkText="Seguir"
                            isExternal={true}
                        />
                        <ContactMethod
                            icon={Instagram}
                            title="Instagram"
                            info="@consejonacionalcip"
                            link="https://www.instagram.com/consejonacionalcip/?hl=es"
                            linkText="Ver perfil"
                            isExternal={true}
                        />
                        <ContactMethod
                            icon={TikTokIcon} // <--- Solo el nombre, sin funciones flecha
                            title="TikTok"
                            info="@consejonacionalcip"
                            link="https://www.tiktok.com/@cursos.cip?_r=1&_t=ZS-95GEgAnCfMi"
                            linkText="Seguir"
                            isExternal={true}
                        />
                    </div>

                    <div className="section-header-unified mt-extra">
                        <MessageSquare size={24} className="icon-header" />
                        <h2>Comunidad</h2>
                    </div>

                    <div className="community-container">
                        <div
                            ref={comunidadRef}
                            className={`community-card ${comunidadVisible ? 'itemVisible' : ''}`}
                        >
                            <div className="icon-wrapper big-icon">
                                <Users size={40} />
                            </div>

                            <h3>Comunidad CCIP</h3>

                            <p>
                                Únete a nuestro grupo y comparte con otros estudiantes y
                                profesionales de la comunidad.
                            </p>

                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-accent"
                            >
                                Unirse al Grupo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacto;
