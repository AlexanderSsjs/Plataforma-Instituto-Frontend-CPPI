import { useEffect, useState } from 'react';
import "./styles/Contacto.scss";
import { MessageCircle, Phone, Mail, Users } from 'lucide-react'; 

const Contacto = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`contacto-section ${isVisible ? 'animateHeader' : ''}`}>
      <div className="container">
        <header className="contacto-header">
          <div className="splitTitle">
            <span className="textBlack">Contáctanos</span>
            <span className="textRed">ahora</span>
          </div>
          <div className="headerLine"></div>
        </header>

        <div className="contacto-grid">
          {/* COLUMNA IZQUIERDA: Contacto Directo */}
          <div className="contacto-info">
            <div className="info-card">
              <div className="icon-wrapper">
                <MessageCircle size={24} />
              </div>
              <div className="info-text">
                <h4>WhatsApp</h4>
                <p>930 449 016</p>
                <a href="https://wa.me/51930449016" target="_blank" className="btn-link">Chatear ahora</a>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <Phone size={24} />
              </div>
              <div className="info-text">
                <h4>Teléfono</h4>
                <p>959 280 078</p>
                <a href="tel:+51959280078" className="btn-link">Llamar ahora</a>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h4>Correo Electrónico</h4>
                <p>tuportalacademico@gmail.com</p>
                <a href="mailto:tuportalacademico@gmail.com" className="btn-link">Enviar mensaje</a>
              </div>
            </div>
          </div>

          {/* LÍNEA SEPARADORA DINÁMICA */}
          <div className="separator-line"></div>

          {/* COLUMNA DERECHA: Comunidad */}
          <div className="contacto-extra">
           <div className="community-card">
                <div className="icon-wrapper big-icon">
                    <Users size={32} />
                </div>
                <div className="community-content"> {/* Un div opcional para agrupar mejor el texto */}
                    <h3>Comunidad CCIP</h3>
                    <p>Únete a nuestro grupo y comparte con otros estudiantes y profesionales de la comunidad.</p>
                </div>
                <a href="https://chat.whatsapp.com/IkMOAYK2EgA3JOtAqM5OYe" target="_blank" className="btn-accent">
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