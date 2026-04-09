import { useState, useRef, useEffect } from 'react';
import styles from './styles/nosotros.module.scss'; 
import { Calendar, Award, BookOpen, Briefcase, Handshake } from 'lucide-react';

const Nosotros = () => {
    const [activeStep, setActiveStep] = useState(0);
    const headerRef = useRef(null);
    const [headerVisible, setHeaderVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.1 }
        );
        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleStepClick = (index) => {
        if (index === activeStep) return; 

        setActiveStep(index);

        // Usamos un pequeño delay (50ms) para que React alcance a renderizar 
        // la nueva tarjeta antes de buscarla en el DOM
        setTimeout(() => {
            const card = document.querySelector(`.${styles.contentCard}`);
            if (card) {
                // Aplicamos la animación estilo "Contacto"
                card.classList.remove(styles.cardEntranceAnimation);
                void card.offsetWidth; // Reset de animación
                card.classList.add(styles.cardEntranceAnimation);
            }
        }, 50);
    };

    const trayectoria = [
        { 
            date: "2014", 
            title: "Fundación y Registro Oficial", 
            desc: "Ingeniería Líder S.R.L. nace el 5 de diciembre. Inscrita en SUNARP (Partida N.º 11117191) y registrada en SUNAT con RUC 20448864139. Iniciamos consultoría avalada por el OSCE.",
            icon: <Briefcase /> 
        },
        { 
            date: "2018", 
            title: "Inicio del Ámbito Académico", 
            desc: "Nuestro equipo multidisciplinario inicia formalmente las actividades académicas presenciales, enfocadas en ingeniería especializada.",
            icon: <BookOpen /> 
        },
        { 
            date: "2020", 
            title: "Tu Portal Académico", 
            desc: "Lanzamos nuestra red social académica. Organizamos eventos avalados por el Colegio de Ingenieros del Perú (CIP) - CD Puno.",
            icon: <Award /> 
        },
        { 
            date: "2023", 
            title: "Autorización MTPE", 
            desc: "El Ministerio de Trabajo nos otorga la autorización como Centro de Certificación de Competencias Laborales (Auto Directoral N.º 000578-2023).",
            icon: <Calendar /> 
        },
        { 
            date: "2024", 
            title: "Convenios Estratégicos", 
            desc: "Suscripción de convenios con el Colegio de Estadísticos y el CIP CD Puno para fortalecer la cooperación institucional permanente.",
            icon: <Handshake /> 
        }
    ];

    return (
        <section id="nosotros" className={styles.nosotrosSection}>
            <div className={styles.nosotrosContainer}>
                
                <div ref={headerRef} className={`${styles.nosotrosHeader} ${headerVisible ? styles.animateHeader : ''}`}>
                    <h2 className={styles.splitTitle}>
                        <span className={styles.textBlack}>Ingenería</span>
                        <span className={styles.textRed}>Lider S.R.L</span>
                    </h2>
                    <div className={styles.headerLine}></div>
                </div>

                <div className={styles.interactiveTimeline}>
                    {/* 1. Área de Información */}
                    <div className={styles.displayArea}>
                        {trayectoria.map((item, index) => (
                            index === activeStep && (
                                <div key={index} className={`${styles.contentCard} ${styles.cardEntranceAnimation}`}>
                                    <div className={styles.iconBox}>{item.icon}</div>
                                    <div className={styles.textBox}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* 2. Navegación */}
                    <div className={styles.stepperNav}>
                        <div className={styles.progressLine}>
                            <div 
                                className={styles.progressFill} 
                                style={{ 
                                    "--progress": `calc((100% / ${trayectoria.length - 1}) * ${activeStep})`
                                }}
                            ></div>
                        </div>
                        
                        {trayectoria.map((item, index) => (
                            <button 
                                key={index}
                                className={`${styles.stepBtn} ${index === activeStep ? styles.active : ''}`}
                                onClick={() => handleStepClick(index)} 
                            >
                                <div className={styles.dot}></div>
                                <span className={styles.dateLabel}>{item.date}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Nosotros;