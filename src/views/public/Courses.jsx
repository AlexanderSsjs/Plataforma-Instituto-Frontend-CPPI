import React, { useState, useMemo } from 'react';
import { Monitor, BookOpen } from 'lucide-react';
import InView from '@/components/core/InView';
import CardCources from '@/components/core/CardCources';
import CourseFilters from '@/components/core/CourseFilters';
import styles from '../public/styles/Courses.module.scss';

const COURSES_DATA = [
    {
        id: 8,
        title: 'Gestión Pública Moderna',
        type: 'vivo',
        price: 90,
        rating: 4.8,
        duration: '60 hrs',
        date: '2026-03-26T19:00:00',
        schedule: 'Lun - Vie 7:00pm',
        image: 'https://picsum.photos/seed/gp/400/300',
        requirements: ['Internet estable', 'Asistencia en vivo'],
        features: ['Clases en directo', 'Casos reales'],
    },
    {
        id: 9,
        title: 'Presupuesto Público',
        type: 'vivo',
        price: 85,
        rating: 4.7,
        duration: '70 hrs',
        date: '2026-03-27T18:30:00',
        schedule: 'Mar - Jue 6:30pm',
        image: 'https://picsum.photos/seed/pre/400/300',
        requirements: ['PC o laptop', 'Asistencia'],
        features: ['Clases en vivo', 'Material descargable'],
    },
    {
    id: 45,
    title: 'Sistemas de Control Interno Gubernamental',
    type: 'vivo',
    price: 110,
    rating: 4.9,
    duration: '40 hrs',
    date: '2026-03-21T09:00:00', // Mañana a las 9 AM
    schedule: 'Sábados 9:00am - 1:00pm',
    image: 'https://picsum.photos/seed/control/400/300',
    requirements: ['Conocimientos básicos de administración', 'Laptop'],
    features: ['Certificación oficial', 'Material digital'],
},
{
    id: 46,
    title: 'Planeamiento Estratégico para el Sector Público',
    type: 'vivo',
    price: 130,
    rating: 4.7,
    duration: '50 hrs',
    date: '2026-03-21T15:00:00', // Mañana a las 3 PM
    schedule: 'Sábados 3:00pm - 7:00pm',
    image: 'https://picsum.photos/seed/strategy/400/300',
    requirements: ['Acceso a plataforma Zoom', 'Ficha de inscripción'],
    features: ['Casos prácticos', 'Interacción en vivo'],
},
    {
        id: 10,
        title: 'Excel para Gestión Pública',
        type: 'vivo',
        price: 75,
        rating: 4.6,
        duration: '50 hrs',
        date: '2026-03-28T20:00:00',
        schedule: 'Sáb - Dom 8:00pm',
        image: 'https://picsum.photos/seed/excel/400/300',
        requirements: ['Laptop', 'Excel básico'],
        features: ['Clases prácticas', 'Ejercicios en vivo'],
    },
    {
        id: 11,
        title: 'Contrataciones Públicas Avanzado',
        type: 'vivo',
        price: 95,
        rating: 4.9,
        duration: '90 hrs',
        date: '2026-03-29T19:30:00',
        schedule: 'Lun - Mié 7:30pm',
        image: 'https://picsum.photos/seed/contra/400/300',
        requirements: ['Conocimiento básico', 'Internet'],
        features: ['Casos reales', 'Simulaciones'],
    },
    {
        id: 12,
        title: 'Auditoría Gubernamental',
        type: 'vivo',
        price: 85,
        rating: 4.7,
        duration: '80 hrs',
        date: '2026-03-30T18:00:00',
        schedule: 'Mar - Vie 6:00pm',
        image: 'https://picsum.photos/seed/audi/400/300',
        requirements: ['Laptop', 'Conexión estable'],
        features: ['Clases en vivo', 'Evaluaciones'],
    },
    {
        id: 13,
        title: 'Control Interno del Estado',
        type: 'vivo',
        price: 80,
        rating: 4.8,
        duration: '70 hrs',
        date: '2026-04-01T19:00:00',
        schedule: 'Lun - Mié 7:00pm',
        image: 'https://picsum.photos/seed/control/400/300',
        requirements: ['Internet', 'Asistencia'],
        features: ['Clases dinámicas'],
    },
    {
        id: 14,
        title: 'Planeamiento Estratégico',
        type: 'vivo',
        price: 90,
        rating: 4.9,
        duration: '80 hrs',
        date: '2026-04-02T20:00:00',
        schedule: 'Jue - Vie 8:00pm',
        image: 'https://picsum.photos/seed/plan/400/300',
        requirements: ['PC', 'Participación'],
        features: ['Casos prácticos'],
    },
    {
        id: 15,
        title: 'Gestión de Proyectos Públicos',
        type: 'vivo',
        price: 95,
        rating: 4.8,
        duration: '85 hrs',
        date: '2026-04-03T19:00:00',
        schedule: 'Lun - Jue 7:00pm',
        image: 'https://picsum.photos/seed/proy/400/300',
        requirements: ['Internet', 'Laptop'],
        features: ['Simulación real'],
    },
    {
        id: 16,
        title: 'Normativa del Estado Peruano',
        type: 'vivo',
        price: 70,
        rating: 4.6,
        duration: '60 hrs',
        date: '2026-04-04T18:00:00',
        schedule: 'Sáb - Dom 6:00pm',
        image: 'https://picsum.photos/seed/norm/400/300',
        requirements: ['Conexión estable'],
        features: ['Clases en vivo'],
    },
    {
        id: 17,
        title: 'Gestión de Recursos Humanos',
        type: 'vivo',
        price: 85,
        rating: 4.7,
        duration: '75 hrs',
        date: '2026-04-05T19:30:00',
        schedule: 'Mar - Vie 7:30pm',
        image: 'https://picsum.photos/seed/rrhh/400/300',
        requirements: ['Laptop', 'Participación'],
        features: ['Clases prácticas'],
    },
    {
        id: 18,
        title: 'Excel Básico a Avanzado',
        type: 'virtual',
        price: 50,
        rating: 4.6,
        duration: '60 hrs',
        image: 'https://picsum.photos/seed/excelv/400/300',
        access: '24/7',
        requirements: ['PC o celular'],
        features: ['Clases grabadas', 'Acceso ilimitado'],
    },
    {
        id: 19,
        title: 'Power BI desde cero',
        type: 'virtual',
        price: 70,
        rating: 4.8,
        duration: '70 hrs',
        image: 'https://picsum.photos/seed/pbi/400/300',
        access: '24/7',
        requirements: ['PC'],
        features: ['Proyectos reales'],
    },
    {
        id: 20,
        title: 'Word Profesional',
        type: 'virtual',
        price: 40,
        rating: 4.5,
        duration: '50 hrs',
        image: 'https://picsum.photos/seed/word/400/300',
        access: '24/7',
        requirements: ['Internet'],
        features: ['Clases grabadas'],
    },
    {
        id: 21,
        title: 'Gestión Documentaria',
        type: 'virtual',
        price: 55,
        rating: 4.7,
        duration: '65 hrs',
        image: 'https://picsum.photos/seed/doc/400/300',
        access: '24/7',
        requirements: ['PC'],
        features: ['Material descargable'],
    },
    {
        id: 22,
        title: 'Redacción Administrativa',
        type: 'virtual',
        price: 45,
        rating: 4.6,
        duration: '50 hrs',
        image: 'https://picsum.photos/seed/red/400/300',
        access: '24/7',
        requirements: ['Internet'],
        features: ['Ejercicios prácticos'],
    },
    {
        id: 23,
        title: 'Excel Financiero',
        type: 'virtual',
        price: 65,
        rating: 4.8,
        duration: '70 hrs',
        image: 'https://picsum.photos/seed/exfin/400/300',
        access: '24/7',
        requirements: ['PC'],
        features: ['Casos reales'],
    },
    {
        id: 24,
        title: 'Análisis de Datos',
        type: 'virtual',
        price: 80,
        rating: 4.9,
        duration: '80 hrs',
        image: 'https://picsum.photos/seed/data/400/300',
        access: '24/7',
        requirements: ['Laptop'],
        features: ['Proyectos'],
    },
    {
        id: 25,
        title: 'Ofimática Completa',
        type: 'virtual',
        price: 50,
        rating: 4.6,
        duration: '60 hrs',
        image: 'https://picsum.photos/seed/ofi2/400/300',
        access: '24/7',
        requirements: ['Internet'],
        features: ['Acceso ilimitado'],
    },
    {
        id: 26,
        title: 'PowerPoint Profesional',
        type: 'virtual',
        price: 35,
        rating: 4.5,
        duration: '40 hrs',
        image: 'https://picsum.photos/seed/ppt/400/300',
        access: '24/7',
        requirements: ['PC'],
        features: ['Plantillas premium'],
    },
    {
        id: 27,
        title: 'Google Workspace',
        type: 'virtual',
        price: 45,
        rating: 4.6,
        duration: '50 hrs',
        image: 'https://picsum.photos/seed/google/400/300',
        access: '24/7',
        requirements: ['Cuenta Gmail'],
        features: ['Herramientas colaborativas'],
    },
];

const Courses = () => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState('default');
    const filteredAndSorted = useMemo(() => {
        return COURSES_DATA.filter((c) => {
            const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
            const matchType = filterType === 'all' || c.type === filterType;
            const matchRating = c.rating >= minRating;
            return matchSearch && matchType && matchRating;
        }).sort((a, b) => {
            if (sort === 'price-low') return a.price - b.price;
            if (sort === 'price-high') return b.price - a.price;
            if (sort === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [search, filterType, minRating, sort]);
    const vivoCourses = filteredAndSorted.filter((c) => c.type === 'vivo');
    const virtualCourses = filteredAndSorted.filter((c) => c.type === 'virtual');

    return (
        <section className={styles.container}>
            <InView direction="none" scale={0.96} delay={0.2}>
                <div className={styles.promoCard}>
                    <div className={styles.promoLeft}>
                        <div className={styles.badge}>🔥 OFERTA LIMITADA</div>
                        <h4>Aprende más pagando menos</h4>
                        <p className={styles.promoText}>
                            Lleva <strong>3 cursos</strong> por solo <span>S/ 120</span>
                        </p>
                        <div className={styles.features}>
                            {['Acceso inmediato', 'Certificado incluido', 'Clases en vivo'].map(
                                (f, i) => (
                                    <span key={i} className={styles.cardFeature}>
                                        <i>✔</i> <p>{f}</p>
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                    <div className={styles.promoRight}>
                        <div className={styles.priceBox}>
                            <span className={styles.oldPrice}>Antes S/ 300</span>
                            <span className={styles.newPrice}>S/ 120</span>
                        </div>
                        <button className={styles.promoBtn}>¡Lo quiero ahora! 🚀</button>
                    </div>
                </div>
            </InView>
            <div style={{ position: 'relative', zIndex: 100 }}>
                {' '}
                <CourseFilters
                    search={search}
                    setSearch={setSearch}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    setSort={setSort}
                    sort={sort}
                />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                {vivoCourses.length > 0 && (
                    <>
                        <InView direction="right" distance={40}>
                            <div className={styles.sectionHeader}>
                                <Monitor size={20} /> <h2>Clases Programadas en Vivo</h2>
                            </div>
                        </InView>
                        <div className={styles.mainGrid}>
                            {vivoCourses.map((c, i) => (
                                <InView key={c.id} delay={i * 0.1} direction="up">
                                    <CardCources course={c} />
                                </InView>
                            ))}
                        </div>
                    </>
                )}

                {virtualCourses.length > 0 && (
                    <>
                        <InView direction="right" distance={40} className={styles.mt}>
                            <div className={styles.sectionHeader}>
                                <BookOpen size={20} /> <h2>Catálogo Virtual (Acceso Inmediato)</h2>
                            </div>
                        </InView>
                        <div className={styles.mainGrid}>
                            {virtualCourses.map((c, i) => (
                                <InView key={c.id} delay={i * 0.1} direction="left">
                                    <CardCources course={c} />
                                </InView>
                            ))}
                        </div>
                    </>
                )}
                {filteredAndSorted.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No se encontraron cursos con esos filtros. Intenta con otra búsqueda.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;
