import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Home.module.scss';
import logoImg from '@/assets/public/stydie.jpg';

import { Medal, Users, Star } from 'lucide-react';

import StatCard from '@/components/common/RatingItem'; 

const Home = () => {
    const heroRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={heroRef} className={`${styles.hero} ${visible ? styles.sectionVisible : ''}`}>
            <div className={styles.topFade}></div>
            <div className={styles.container}>
                <div className={styles.text}>
                    <h1>Domina las <span>habilidades del futuro</span></h1>
                    <p>Especialización técnica en sistemas administrativos y gestión pública con certificación profesional.</p>
                    
                    <div className={`${styles.stats} ${visible ? styles.animate : ''}`}>
                        <StatCard Icon={Users} value="+1200" label="Estudiantes" />
                        <StatCard Icon={Star} value="4.8" label="Valoración" />
                        <StatCard Icon={Medal} value="Cursos" label="Certificados" />
                    </div>

                    <div className={styles.cta}>
                        <Link to="/cursos" className={styles.btnPrimary}>Ver Cursos</Link>
                        <Link to="/nosotros" className={styles.btnGhost}>Conocer más</Link>
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