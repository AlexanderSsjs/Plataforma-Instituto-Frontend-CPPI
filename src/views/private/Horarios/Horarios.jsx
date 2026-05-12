import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import styles from './Horarios.module.scss';

const Horarios = () => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const horarioData = [
        { hora: '08:00 - 10:00', cursos: { 'Lunes': 'Matemáticas', 'Miércoles': 'Matemáticas', 'Viernes': 'Física' } },
        { hora: '10:00 - 12:00', cursos: { 'Martes': 'Programación', 'Jueves': 'Programación' } },
        { hora: '12:00 - 14:00', cursos: { 'Lunes': 'Inglés', 'Miércoles': 'Inglés', 'Viernes': 'Inglés' } },
        { hora: '15:00 - 17:00', cursos: { 'Martes': 'Diseño', 'Jueves': 'Diseño' } },
    ];

    return (
        <div className={styles.horariosContainer}>
            <header className={styles.header}>
                <h1>Mi Horario Académico</h1>
                <p>Organiza tu tiempo y asiste puntualmente a tus clases</p>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.horarioTable}>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            {dias.map(dia => <th key={dia}>{dia}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {horarioData.map((row, idx) => (
                            <tr key={idx}>
                                <td className={styles.horaCol}>
                                    <Clock size={16} />
                                    {row.hora}
                                </td>
                                {dias.map(dia => (
                                    <td key={dia}>
                                        {row.cursos[dia] ? (
                                            <div className={styles.cursoItem}>
                                                <span className={styles.cursoName}>{row.cursos[dia]}</span>
                                                <div className={styles.aula}>
                                                    <MapPin size={12} />
                                                    <span>Aula 102</span>
                                                </div>
                                            </div>
                                        ) : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Vista móvil (Tarjetas) */}
            <div className={styles.mobileHorario}>
                {dias.map(dia => (
                    <section key={dia} className={styles.diaSection}>
                        <h3>{dia}</h3>
                        <div className={styles.diaCards}>
                            {horarioData.filter(row => row.cursos[dia]).map((row, idx) => (
                                <div key={idx} className={styles.mobileCard}>
                                    <div className={styles.cardHora}>{row.hora}</div>
                                    <div className={styles.cardInfo}>
                                        <h4>{row.cursos[dia]}</h4>
                                        <p><MapPin size={14} /> Aula 102</p>
                                    </div>
                                </div>
                            ))}
                            {horarioData.filter(row => row.cursos[dia]).length === 0 && (
                                <p className={styles.noClasses}>Sin clases programadas</p>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Horarios;
