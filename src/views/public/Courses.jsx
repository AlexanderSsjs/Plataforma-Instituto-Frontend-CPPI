import React, { useEffect, useRef, useState } from 'react';
import { Star, Clock, ArrowRight, Search, Zap, Monitor, BookOpen } from 'lucide-react';
import styles from './styles/Courses.module.scss';

const COURSES_DATA = [
    {
        id: 1,
        title: 'Invierte.pe (Ciclo de Inversión)',
        type: 'vivo',
        price: 80,
        rating: 4.9,
        duration: '80 hrs',
        date: '2026-03-21T19:00:00',
        image: 'https://picsum.photos/seed/inv/400/300',
    },
    {
        id: 2,
        title: 'Sistemas Administrativos del Estado',
        type: 'vivo',
        price: 80,
        rating: 4.8,
        duration: '80 hrs',
        date: '2026-03-22T18:00:00',
        image: 'https://picsum.photos/seed/adm/400/300',
    },
    {
        id: 3,
        title: 'INFOBRAS y Obras Públicas',
        type: 'virtual',
        price: 60,
        rating: 4.7,
        duration: '80 hrs',
        image: 'https://picsum.photos/seed/info/400/300',
    },
    {
        id: 4,
        title: 'SIAF - Adm. Financiera',
        type: 'vivo',
        price: 80,
        rating: 4.9,
        duration: '80 hrs',
        date: '2026-03-23T20:00:00',
        image: 'https://picsum.photos/seed/siaf/400/300',
    },
    {
        id: 5,
        title: 'SIGA - Gestión Logística',
        type: 'virtual',
        price: 60,
        rating: 4.8,
        duration: '80 hrs',
        image: 'https://picsum.photos/seed/siga/400/300',
    },
    {
        id: 6,
        title: 'Contrataciones del Estado (OECE)',
        type: 'vivo',
        price: 80,
        rating: 4.7,
        duration: '80 hrs',
        date: '2026-03-25T19:30:00',
        image: 'https://picsum.photos/seed/cece/400/300',
    },
    {
        id: 7,
        title: 'Ofimática Profesional (Office)',
        type: 'virtual',
        price: 40,
        rating: 4.5,
        duration: '80 hrs',
        image: 'https://picsum.photos/seed/ofi/400/300',
    },
];

const CourseCard = ({ course, index }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 },
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    const getTimeLeft = (date) => {
        const diff = new Date(date) - new Date();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        return days > 0 ? `Faltan ${days}d ${hours}h` : 'Inicia pronto';
    };

    return (
        <article
            ref={cardRef}
            className={`${styles.card} ${isVisible ? styles.visible : ''}`}
            style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
        >
            <div className={styles.imageWrapper}>
                <img src={course.image} alt={course.title} loading="lazy" />
                <div className={styles.overlayTags}>
                    <span className={`${styles.badge} ${styles[course.type]}`}>
                        {course.type === 'vivo' ? '• En Vivo' : 'Virtual'}
                    </span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.topRow}>
                    <span className={styles.rating}>
                        <Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating}
                    </span>
                    <span className={styles.price}>S/ {course.price}</span>
                </div>
                <h3>{course.title}</h3>

                {course.type === 'vivo' && (
                    <div className={styles.countdown}>
                        <Clock size={14} /> <span>{getTimeLeft(course.date)}</span>
                    </div>
                )}

                <div className={styles.footer}>
                    <span className={styles.duration}>
                        <Monitor size={14} /> {course.duration}
                    </span>
                    <button className={styles.btnAction}>
                        Detalles <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </article>
    );
};

const Courses = () => {
    const [search, setSearch] = useState('');

    const filtered = COURSES_DATA.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <section className={styles.container}>
            {/* Buscador Moderno */}
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Buscar entre nuestros cursos especializados..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search size={20} className={styles.searchIcon} />
                </div>
            </div>

            {/* Banner de Promoción */}
            <div className={styles.promoCard}>
                <div className={styles.promoLeft}>
                    <div className={styles.badge}>🔥 OFERTA LIMITADA</div>
                    <h4>Aprende más pagando menos</h4>
                    <p className={styles.promoText}>
                        Lleva <strong>3 cursos</strong> por solo <span>S/ 120</span>
                    </p>

                    <div className={styles.features}>
                        <span className='cardFeature'>
                            <i>✔</i>
                            <p>Acceso inmediato</p>
                        </span>
                        <span className='cardFeature'>
                            <i>✔</i>
                            <p>Certificado incluido</p>
                        </span>
                        <span className='cardFeature'>
                            <i>✔</i>
                            <p>Clases en vivo</p>
                        </span>
                    </div>
                </div>
                <div className={styles.promoRight}>
                    <div className={styles.priceBox}>
                        <span className={styles.oldPrice}>Antes S/ 300</span>
                        <span className={styles.newPrice}>S/ 120</span>
                    </div>
                    <button className={styles.promoBtn}>¡Lo quiero ahora! <i>🚀</i></button>
                </div>
            </div>

            {/* Cursos En Vivo */}
            <div className={styles.sectionHeader}>
                <Monitor size={20} /> <h2>Clases Programadas en Vivo</h2>
            </div>
            <div className={styles.mainGrid}>
                {filtered
                    .filter((c) => c.type === 'vivo')
                    .map((c, i) => (
                        <CourseCard key={c.id} course={c} index={i} />
                    ))}
            </div>

            {/* Cursos Virtuales */}
            <div className={`${styles.sectionHeader} ${styles.mt}`}>
                <BookOpen size={20} /> <h2>Catálogo Virtual (Acceso Inmediato)</h2>
            </div>
            <div className={styles.mainGrid}>
                {filtered
                    .filter((c) => c.type === 'virtual')
                    .map((c, i) => (
                        <CourseCard key={c.id} course={c} index={i} />
                    ))}
            </div>
        </section>
    );
};

export default Courses;
