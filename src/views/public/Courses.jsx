import React from 'react';
import { Link } from "react-router-dom";
import styles from './styles/Courses.module.scss';
import { Star, Clock, ArrowRight } from 'lucide-react';

const COURSES_DATA = [
    {
        id: 1,
        title: "SIAF - Sistema Administrativo",
        category: "Gestión Pública",
        rating: 4.9,
        duration: "40 hrs",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "SIGA - Gestión Logística",
        category: "Gestión Pública",
        rating: 4.8,
        duration: "36 hrs",
        image: "https://images.unsplash.com/photo-1454165833762-0102a0aa7f06?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Excel para la Gestión Pública",
        category: "Sistemas",
        rating: 4.7,
        duration: "24 hrs",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=400"
    }
];

const Courses = () => {
    return (
        <section className={styles.coursesSection} id="cursos">
            <div className={styles.container}>
                <header className={styles.header}>
                    <span className={styles.subtitle}>Explora nuestro catálogo</span>
                    <h2 className={styles.title}>Programas de <span>Especialización</span></h2>
                    <p className={styles.description}>
                        Capacitación de alto nivel con certificación oficial para potenciar tu perfil profesional.
                    </p>
                </header>
                <div className={styles.grid}>
                    {COURSES_DATA.map((course) => (
                        <article key={course.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={course.image} alt={course.title} />
                                <span className={styles.tag}>{course.category}</span>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span className={styles.rating}>
                                        <Star size={14} fill="currentColor" /> {course.rating}
                                    </span>
                                    <span className={styles.duration}>
                                        <Clock size={14} /> {course.duration}
                                    </span>
                                </div>
                                <h3>{course.title}</h3>
                                <button className={styles.btnCard}>
                                    Ver detalles <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;