import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, BookOpen, Clock, User, FileText, Download } from 'lucide-react';
import styles from './MisCursos.module.scss'; // Reutilizando algunos estilos o puedo crear DetalleCurso.module.scss

const DetalleCurso = () => {
    const { id } = useParams();

    // Mock data para el detalle
    const cursosInfo = {
        1: {
            nombre: 'Desarrollo Web Fullstack',
            descripcion: 'Aprende a construir aplicaciones web modernas desde cero utilizando React, Node.js y bases de datos NoSQL.',
            instructor: 'Alexander Pielago',
            horario: 'Lun - Mie - Vie | 19:00 - 21:00',
            temario: [
                { titulo: 'Módulo 1: Introducción a React', completado: true },
                { titulo: 'Módulo 2: State y Props', completado: true },
                { titulo: 'Módulo 3: Hooks Avanzados', completado: false },
                { titulo: 'Módulo 4: API REST con Node.js', completado: false },
            ]
        },
        2: {
            nombre: 'Diseño UI/UX Avanzado',
            descripcion: 'Domina las herramientas de diseño y los principios de usabilidad para crear interfaces impactantes.',
            instructor: 'Christian Wh',
            horario: 'Mar - Jue | 18:00 - 20:00',
            temario: [
                { titulo: 'Módulo 1: Fundamentos del Diseño', completado: true },
                { titulo: 'Módulo 2: Prototipado en Figma', completado: false },
                { titulo: 'Módulo 3: User Research', completado: false },
            ]
        },
        3: {
            nombre: 'Marketing Digital 360',
            descripcion: 'Estrategias completas para posicionar marcas y productos en el ecosistema digital actual.',
            instructor: 'Diego G.',
            horario: 'Sábados | 09:00 - 13:00',
            temario: [
                { titulo: 'Módulo 1: SEO y SEM', completado: true },
                { titulo: 'Módulo 2: Social Media Ads', completado: true },
                { titulo: 'Módulo 3: Email Marketing', completado: true },
            ]
        }
    };

    const curso = cursosInfo[id] || cursosInfo[1];

    return (
        <div className={styles.cursosContainer}>
            <header className={styles.header}>
                <Link to="/dashboard/cursos" className={styles.backLink}>
                    <ChevronLeft size={20} />
                    Volver a mis cursos
                </Link>
                <h1>{curso.nombre}</h1>
            </header>

            <div className={styles.detalleContent}>
                <section className={styles.infoPrincipal}>
                    <div className={styles.infoCard}>
                        <h3>Información del Curso</h3>
                        <p>{curso.descripcion}</p>
                        <div className={styles.metaGrid}>
                            <div className={styles.metaItem}>
                                <User size={20} />
                                <div>
                                    <span className={styles.label}>Instructor</span>
                                    <span className={styles.value}>{curso.instructor}</span>
                                </div>
                            </div>
                            <div className={styles.metaItem}>
                                <Clock size={20} />
                                <div>
                                    <span className={styles.label}>Horario</span>
                                    <span className={styles.value}>{curso.horario}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <h3>Temario del Curso</h3>
                        <div className={styles.temarioList}>
                            {curso.temario.map((item, index) => (
                                <div key={index} className={styles.temarioItem}>
                                    <div className={`${styles.check} ${item.completado ? styles.done : ''}`}>
                                        {item.completado ? '✓' : index + 1}
                                    </div>
                                    <span>{item.titulo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <aside className={styles.sidebarDetalle}>
                    <div className={styles.infoCard}>
                        <h3>Recursos</h3>
                        <div className={styles.recursosList}>
                            <button className={styles.recursoBtn}>
                                <FileText size={18} />
                                Silabo.pdf
                                <Download size={16} />
                            </button>
                            <button className={styles.recursoBtn}>
                                <FileText size={18} />
                                Lectura_1.pdf
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DetalleCurso;
