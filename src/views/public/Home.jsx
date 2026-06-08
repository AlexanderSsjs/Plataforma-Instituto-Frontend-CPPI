import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Home.module.scss';
import logoImg from '@/assets/public/stydie.jpg';

import { Medal, Users, Star, Calendar } from 'lucide-react';

import StatCard from '@/components/common/RatingItem';

const Home = () => {
    const heroRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [promociones, setPromociones] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px', // 🔥 mejora timing
            },
        );

        if (heroRef.current) observer.observe(heroRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('ccip_promociones');
        if (stored) {
            try {
                setPromociones(JSON.parse(stored));
            } catch (e) {
                console.error('Error al cargar promociones en Home', e);
            }
        }
    }, []);

    const calculateDiscount = (original, promo) => {
        if (!original || original <= promo) return 0;
        return Math.round(((original - promo) / original) * 100);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    };

    return (
        <>
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

                        <div className={`${styles.stats} ${visible ? styles.animate : ''}`}>
                            <StatCard Icon={Users} value="+1200" label="Estudiantes" />
                            <StatCard Icon={Star} value="4.8" label="Valoración" />
                            <StatCard Icon={Medal} value="Cursos" label="Certificados" />
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

            {promociones.length > 0 && (
                <section className={styles.promocionesSection}>
                    <h2>Promociones <span>Especiales</span></h2>
                    <p className={styles.sectionDesc}>Aprovecha nuestros descuentos de tiempo limitado en cursos especializados.</p>
                    
                    <div className={styles.promoGrid}>
                        {promociones.map((promo) => {
                            const discount = calculateDiscount(promo.originalPrice, promo.promoPrice);
                            return (
                                <div key={promo.id} className={styles.promoCard}>
                                    <div className={styles.promoImage}>
                                        <img src={promo.courseImage} alt={promo.courseName} />
                                        {discount > 0 && (
                                            <div className={styles.discountBadge}>
                                                -{discount}% OFF
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.promoContent}>
                                        <h3 className={styles.promoTitle}>{promo.courseName}</h3>
                                        <p className={styles.promoDesc}>{promo.description}</p>
                                        
                                        <div className={styles.priceBox}>
                                            <span className={styles.originalPrice}>S/ {promo.originalPrice}</span>
                                            <span className={styles.promoPrice}>S/ {promo.promoPrice}</span>
                                        </div>

                                        <div className={styles.dateRange}>
                                            <Calendar size={14} />
                                            <span>
                                                Válido del {formatDate(promo.startDate)} al {formatDate(promo.endDate)}
                                            </span>
                                        </div>

                                        <Link to="/login" className={styles.enrollBtn}>
                                            Matricularse Ahora
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </>
    );
};

export default Home;
