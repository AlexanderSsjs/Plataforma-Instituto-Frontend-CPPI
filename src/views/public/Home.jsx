import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/Home.module.scss';
import logoImg from '@/assets/public/stydie.jpg';
import { Medal, Users, Star } from 'lucide-react';

const Home = () => {
    const heroRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log('¿Hero visible?:', entry.isIntersecting); 
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: '0px',
            },
        );
        if (heroRef.current) {
            observer.observe(heroRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={heroRef} className={`${styles.hero} ${visible ? styles.sectionVisible : ''}`}>
            <div className={styles.topFade}></div>
            <div className={styles.container}>
                <div className={styles.text}>
                    <h1>
                        Domina las <span>habilidades del futuro</span>
                    </h1>
                    <p>
                        Especialización técnica en sistemas administrativos y gestión pública con
                        certificación profesional.
                    </p>
                    <div
                        ref={heroRef}
                        className={`${styles.stats} ${visible ? styles.animate : ''}`}
                    >
                        <div className={styles.stat}>
                            <Users size={30} />
                            <div className={styles.rating}>
                                <span className={styles.ratingValue}>+1200</span>
                                <div className={styles.ratingText}>estudiantes</div>
                            </div>
                        </div>

                        <div className={styles.stat}>
                            <Star size={30} />
                            <div className={styles.rating}>
                                <span className={styles.ratingValue}>4.8</span>
                                <div className={styles.ratingText}>valoración</div>
                            </div>
                        </div>

                        <div className={styles.stat}>
                            <Medal size={30} />
                            <div className={styles.rating}>
                                <span className={styles.ratingValue}>Cursos</span>
                                <div className={styles.ratingText}>Certificados</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cta}>
                        <Link to="/cursos" className={styles.btnPrimary}>
                            Ver Cursos
                        </Link>
                        <Link to="/nosotros" className={styles.btnGhost}>
                            Conocer más
                        </Link>
                    </div>
                </div>

                <div className={styles.image}>
                    <img src={logoImg} alt="Estudios CCIP" className={styles.Img} />
                </div>
            </div>
        </section>
    );
};

export default Home;
