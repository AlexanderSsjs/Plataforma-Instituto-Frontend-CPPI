import React, { useEffect, useRef, useState } from 'react';
import { Star, Clock, ArrowRight, LayoutGrid } from 'lucide-react';
import styles from './styles/Courses.module.scss';
const COURSES_DATA = [
    // --- GESTIÓN PÚBLICA (IDs 1-10) ---
    { id: 1, title: "SIAF - Sistema Administrativo", category: "Gestión", rating: 4.9, duration: "40 hrs", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400" },
    { id: 2, title: "SIGA - Gestión Logística", category: "Gestión", rating: 4.8, duration: "36 hrs", image: "https://images.unsplash.com/photo-1454165833762-0102a0aa7f06?w=400" },
    { id: 3, title: "Seace 3.0 Avanzado", category: "Gestión", rating: 4.7, duration: "30 hrs", image: "https://images.unsplash.com/photo-1507537297325-5bcc28574d71?w=400" },
    { id: 4, title: "Gestión de Recursos Humanos", category: "Gestión", rating: 4.6, duration: "45 hrs", image: "https://images.unsplash.com/photo-1521791136364-798a7bc0d262?w=400" },
    { id: 5, title: "Presupuesto Público", category: "Gestión", rating: 4.9, duration: "32 hrs", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400" },
    { id: 6, title: "Control Gubernamental", category: "Gestión", rating: 4.8, duration: "28 hrs", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" },
    { id: 7, title: "Modernización de Gestión", category: "Gestión", rating: 4.7, duration: "40 hrs", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400" },
    { id: 8, title: "Gestión de Tesorería", category: "Gestión", rating: 4.8, duration: "35 hrs", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400" },
    { id: 9, title: "Ética en Función Pública", category: "Gestión", rating: 4.9, duration: "20 hrs", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400" },
    { id: 10, title: "Redacción Administrativa", category: "Gestión", rating: 4.5, duration: "25 hrs", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" },

    // --- OFIMÁTICA (IDs 11-20) ---
    { id: 11, title: "Excel Nivel Avanzado", category: "Ofimática", rating: 4.7, duration: "24 hrs", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400" },
    { id: 12, title: "Power BI para Gestión", category: "Ofimática", rating: 4.9, duration: "30 hrs", image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?w=400" },
    { id: 13, title: "Microsoft Word Profesional", category: "Ofimática", rating: 4.6, duration: "20 hrs", image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=400" },
    { id: 14, title: "Presentaciones con Canva", category: "Ofimática", rating: 4.8, duration: "15 hrs", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
    { id: 15, title: "Google Workspace Pro", category: "Ofimática", rating: 4.7, duration: "25 hrs", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400" },
    { id: 16, title: "Excel para Finanzas", category: "Ofimática", rating: 4.9, duration: "35 hrs", image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=400" },
    { id: 17, title: "Outlook y Productividad", category: "Ofimática", rating: 4.5, duration: "12 hrs", image: "https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?w=400" },
    { id: 18, title: "PowerPoint para Negocios", category: "Ofimática", rating: 4.7, duration: "18 hrs", image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?w=400" },
    { id: 19, title: "Macros y VBA en Excel", category: "Ofimática", rating: 4.8, duration: "40 hrs", image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?w=400" },
    { id: 20, title: "Análisis de Datos Pro", category: "Ofimática", rating: 4.9, duration: "50 hrs", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },

    // --- SISTEMAS / PROGRAMACIÓN (IDs 21-30) ---
    { id: 21, title: "Desarrollo Web React", category: "Sistemas", rating: 4.8, duration: "60 hrs", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
    { id: 22, title: "Base de Datos SQL Server", category: "Sistemas", rating: 4.6, duration: "45 hrs", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400" },
    { id: 23, title: "Python para Data Science", category: "Sistemas", rating: 4.9, duration: "70 hrs", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
    { id: 24, title: "Seguridad Informática", category: "Sistemas", rating: 4.8, duration: "40 hrs", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400" },
    { id: 25, title: "Full Stack JavaScript", category: "Sistemas", rating: 4.9, duration: "120 hrs", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
    { id: 26, title: "Java Enterprise Edition", category: "Sistemas", rating: 4.7, duration: "80 hrs", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" },
    { id: 27, title: "Redes y Conectividad", category: "Sistemas", rating: 4.6, duration: "50 hrs", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=400" },
    { id: 28, title: "Cloud Computing AWS", category: "Sistemas", rating: 4.9, duration: "55 hrs", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" },
    { id: 29, title: "Desarrollo de Apps Móviles", category: "Sistemas", rating: 4.8, duration: "90 hrs", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400" },
    { id: 30, title: "Inteligencia Artificial", category: "Sistemas", rating: 5.0, duration: "100 hrs", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400" }
];

const CATEGORIES = ["Todos", "Gestión", "Ofimática", "Sistemas"];
const CourseCard = ({ course, index }) => {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            ref={cardRef}
            className={`${styles.card} ${isVisible ? styles.visible : ''}`}
            style={{ transitionDelay: `${(index % 3) * 0.1}s` }} // Delay basado en columna
        >
            <div className={styles.imageWrapper}>
                <img src={course.image} alt={course.title} loading="lazy" />
                <span className={styles.tag}>{course.category}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.rating}><Star size={14} fill="currentColor" /> {course.rating}</span>
                    <span className={styles.duration}><Clock size={14} /> {course.duration}</span>
                </div>
                <h3>{course.title}</h3>
                <button className={styles.btnCard}>
                    Ver detalles <ArrowRight size={16} />
                </button>
            </div>
        </article>
    );
};

const Courses = () => {
    const [activeTab, setActiveTab] = useState("Todos");

    const filteredCourses = activeTab === "Todos" 
        ? COURSES_DATA 
        : COURSES_DATA.filter(c => c.category === activeTab);

    return (
        <section className={styles.coursesSection} id="cursos">
            <div className={styles.container}>
                <header className={styles.header}>
                    <span className={styles.subtitle}>Catálogo Especializado</span>
                    <h2 className={styles.title}>Nuestros <span>Programas</span></h2>
                </header>

                {/* TABS DE FILTRADO */}
                <div className={styles.tabs}>
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat}
                            className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;