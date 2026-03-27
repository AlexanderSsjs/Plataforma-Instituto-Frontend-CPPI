import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Users, BookOpen, MessageSquare, Facebook, Instagram, Linkedin, Share2 } from 'lucide-react';
import './styles/Contacto.scss';

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
      { threshold: 0.1 }
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
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : ""}
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
      { threshold: 0.1 }
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
                  icon={Phone}
                  title="Teléfono"
                  info="959 280 078"
                  link="tel:+51959280078"
                  linkText="Llamar ahora"
                />
                <ContactMethod
                  icon={Mail}
                  title="Correo Electrónico"
                  info="tuportalacademico@gmail.com"
                  link="mailto:tuportalacademico@gmail.com"
                  linkText="Enviar mensaje"
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
                  link="https://www.facebook.com/groups/1088438969190108?locale=es_LA"
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
                  icon={Linkedin}
                  title="LinkedIn"
                  info="CPPI"
                  link="https://www.linkedin.com/company/cipcn/"
                  linkText="Conectar"
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
                <p>Únete a nuestro grupo y comparte con otros estudiantes y profesionales de la comunidad.</p>
                <a href="https://chat.whatsapp.com/IkMOAYK2EgA3JOtAqM5OYe" target="_blank" rel="noopener noreferrer" className="btn-accent">
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