import React from 'react';
import confetti from 'canvas-confetti';
import styles from '@/views/public/styles/Courses.module.scss'; // Asegúrate de que la ruta sea correcta

/**
 * PromoCard - Componente que renderiza um cartão de promoção com efeitos de confetti
 * @param {string} className - Classe CSS para personalizar o cartão
 * @returns {React.Component} - Componente renderizado
 */
const PromoCard = (className) => {
    const handleConfetti = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 40,
            spread: 60,
            origin: { x, y },
            colors: ['#fbbf24', '#ffffff', '#e11d48'],
            disableForReducedMotion: true,
            zIndex: 100,
        });
    };

    return (
        <div className={styles.promoCard}>
            <div className={styles.promoLeft}>
                <div className={styles.badge}>🔥 OFERTA LIMITADA</div>
                <h4>Aprende más pagando menos</h4>
                <p className={styles.promoText}>
                    Lleva <strong>3 cursos</strong> por solo <span>S/ 120</span>
                </p>
                <div className={styles.features}>
                    {['Acceso inmediato', 'Certificado incluido', 'Clases en vivo'].map((f, i) => (
                        <span key={i} className={styles.cardFeature}>
                            <i>✔</i> <p>{f}</p>
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.promoRight}>
                <div className={styles.priceBox}>
                    <span className={styles.oldPrice}>Antes S/ 300</span>
                    <span className={styles.newPrice}>S/ 130</span>
                </div>
                <a
                    href="https://api.whatsapp.com/send/?phone=51930449016&text=¡Hola! Quiero aprovechar la promoción de S/ 120&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <button className={styles.promoBtn} onMouseEnter={handleConfetti}>
                        ¡Lo quiero ahora! <i className={styles.arrowRight}>🚀</i>
                    </button>
                </a>
            </div>
        </div>
    );
};

export default PromoCard;
