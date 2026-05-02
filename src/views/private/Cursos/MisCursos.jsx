import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, User, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './MisCursos.module.scss';

const MisCursos = () => {
    const cursosData = [
        { 
            id: 1, 
            nombre: 'Desarrollo Web Fullstack', 
            instructor: 'Alexander Pielago',
            progreso: 75,
            horario: 'Lun - Mie - Vie | 19:00 - 21:00'
        },
        { 
            id: 2, 
            nombre: 'Diseño UI/UX Avanzado', 
            instructor: 'Christian Wh',
            progreso: 40,
            horario: 'Mar - Jue | 18:00 - 20:00'
        },
        { 
            id: 3, 
            nombre: 'Marketing Digital 360', 
            instructor: 'Diego G.',
            progreso: 90,
            horario: 'Sábados | 09:00 - 13:00'
        },
    ];

    return (
        <div className={styles.cursosContainer}>
            <header className={styles.header}>
                <h1>Mis Cursos</h1>
                <p>Gestiona tus clases y sigue tu progreso académico</p>
            </header>

            <div className={styles.gridCursos}>
                {cursosData.map((curso) => (
                    <div key={curso.id} className={styles.cursoCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconBox}><BookOpen size={24} /></div>
                            <div className={styles.progresoBadge}>{curso.progreso}%</div>
                        </div>
                        
                        <div className={styles.cardBody}>
                            <h3>{curso.nombre}</h3>
                            <div className={styles.instructor}>
                                <User size={16} />
                                <span>{curso.instructor}</span>
                            </div>
                            <div className={styles.horario}>
                                <Clock size={16} />
                                <span>{curso.horario}</span>
                            </div>
                            
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill} 
                                    style={{ width: `${curso.progreso}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            <Link to={`/dashboard/cursos/${curso.id}`} className={styles.btnDetalles}>
                                Ver Detalles
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MisCursos;
