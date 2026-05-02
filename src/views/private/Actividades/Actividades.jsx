import React from 'react';
import { ClipboardList, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import styles from './Actividades.module.scss';

const Actividades = () => {
    const actividadesData = [
        { id: 1, titulo: 'Entrega de Proyecto Final', curso: 'Desarrollo Web', fecha: '2026-05-15', estado: 'pendiente', prioridad: 'alta' },
        { id: 2, titulo: 'Examen Parcial II', curso: 'Diseño UI/UX', fecha: '2026-05-10', estado: 'completado', prioridad: 'media' },
        { id: 3, titulo: 'Tarea: Responsive Design', curso: 'Desarrollo Web', fecha: '2026-05-05', estado: 'pendiente', prioridad: 'media' },
        { id: 4, titulo: 'Investigación de Mercado', curso: 'Marketing Digital', fecha: '2026-05-20', estado: 'pendiente', prioridad: 'baja' },
    ];

    return (
        <div className={styles.actividadesContainer}>
            <header className={styles.header}>
                <h1>Actividades y Tareas</h1>
                <p>Mantente al día con tus obligaciones académicas</p>
            </header>

            <div className={styles.listaActividades}>
                {actividadesData.map((act) => (
                    <div key={act.id} className={`${styles.actividadCard} ${styles[act.estado]}`}>
                        <div className={styles.statusIcon}>
                            {act.estado === 'completado' ? <CheckCircle size={24} /> : <Clock size={24} />}
                        </div>
                        
                        <div className={styles.actInfo}>
                            <h3>{act.titulo}</h3>
                            <span className={styles.cursoName}>{act.curso}</span>
                            <div className={styles.meta}>
                                <div className={styles.fecha}>
                                    <Clock size={14} />
                                    <span>Vence: {act.fecha}</span>
                                </div>
                                <div className={`${styles.prioridad} ${styles[act.prioridad]}`}>
                                    <AlertCircle size={14} />
                                    <span>Prioridad {act.prioridad}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actActions}>
                            <button className={styles.btnVer}>
                                Detalle
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Actividades;
