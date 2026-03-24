import { useEffect, useRef, useState } from 'react';
import styles from './styles/Nosotros.module.scss';
import { Target, Award, ShieldCheck, Rocket, Users, TrendingUp } from 'lucide-react';

const TimelineItem = ({ item, index }) => {
    const itemRef = useRef(null);
    const [isItemVisible, setIsItemVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsItemVisible(true);
                    observer.unobserve(entry.target); // Deja de observar una vez que ya apareció
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" } // Se activa un poco antes de llegar
        );

        if (itemRef.current) observer.observe(itemRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={itemRef}
            className={`${styles.timelineItem} 
                        ${index % 2 === 0 ? styles.left : styles.right} 
                        ${isItemVisible ? styles.itemVisible : ''}`}
        >
            <div className={styles.timelineDot}>
                {item.icon}
            </div>
            <div className={styles.timelineCard}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        </div>
    );
};

const Nosotros = () => {
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

    const hitos = [
        { icon: <Target />, title: "Nuestro Propósito", desc: "Fortalecer competencias técnicas en gestión pública y sistemas del Estado." },
        { icon: <Award />, title: "Calidad Académica", desc: "Docentes especializados y metodologías 100% prácticas y actualizadas." },
        { icon: <ShieldCheck />, title: "Ética y Transparencia", desc: "Integridad total en nuestros procesos de enseñanza y certificación." },
        { icon: <Rocket />, title: "Innovación", desc: "Herramientas digitales de vanguardia para una experiencia educativa superior." },
        { icon: <Users />, title: "Enfoque Humano", desc: "Atención personalizada para asegurar el éxito laboral de cada estudiante." },
        { icon: <TrendingUp />, title: "Mejora Continua", desc: "Evolucionamos con los cambios normativos para darte lo mejor siempre." }
    ];

    return (
    
        <section id="nosotros" className={styles.nosotrosSection}>
            <div className={styles.nosotrosContainer}>
                
                <div ref={headerRef} className={`${styles.nosotrosHeader} ${headerVisible ? styles.animateHeader : ''}`}>
                    <h2 className={styles.splitTitle}>
                        <span className={styles.textBlack}>Ingeniería</span>
                        <span className={styles.textRed}>Líder</span>
                        <span className={styles.textRed}>SRL</span>
                    </h2>
                    <div className={styles.headerLine}></div>
                </div>

                <div className={styles.timelineWrapper}>
                    <div className={`${styles.centralLine} ${headerVisible ? styles.lineGrow : ''}`}></div>
                    
                    {hitos.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Nosotros;