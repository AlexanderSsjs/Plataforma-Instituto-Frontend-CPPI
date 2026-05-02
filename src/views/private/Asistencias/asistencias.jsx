import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import styles from './Asistencias.module.scss';

const Asistencias = () => {
    // SIMULACIÓN DE ROL: Cambia a false para ver cómo lo vería el alumno
    const esProfesor = true; 

    const cursosData = [
        { id: 1, nombre: 'Curso 1' },
        { id: 2, nombre: 'Curso 2' },
        { id: 3, nombre: 'Curso 3' },
    ];

    const [cursoAbierto, setCursoAbierto] = useState(null);
    const [asistenciasMarcadas, setAsistenciasMarcadas] = useState({
        1: ['Lunes', 'Miércoles'], // Ejemplo de datos que ya podrían venir cargados
    });

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const toggleCurso = (id) => {
        setCursoAbierto(cursoAbierto === id ? null : id);
    };

    const toggleAsistencia = (cursoId, dia) => {
        // BLOQUEO SEGURIDAD: Si no es profesor, la función no hace nada
        if (!esProfesor) return;

        const asistenciasActuales = asistenciasMarcadas[cursoId] || [];
        const nuevasAsistencias = asistenciasActuales.includes(dia)
            ? asistenciasActuales.filter(d => d !== dia)
            : [...asistenciasActuales, dia];
        
        setAsistenciasMarcadas({ ...asistenciasMarcadas, [cursoId]: nuevasAsistencias });
    };

    return (
        <div className={styles.asistenciasContainer}>
            <header className={styles.header}>
                <h1>Registro de Asistencias</h1>
                <p>{esProfesor ? 'Panel de control para docentes' : 'Consulta tu estado de asistencia'}</p>
            </header>

            <div className={styles.listaCursos}>
                {cursosData.map((curso) => (
                    <section key={curso.id} className={styles.asistenciasCard}>
                        <div 
                            className={`${styles.cursoSelector} ${cursoAbierto === curso.id ? styles.activo : ''}`}
                            onClick={() => toggleCurso(curso.id)}
                        >
                            <div className={styles.cursoInfo}>
                                <div className={styles.iconBox}><BookOpen size={24} /></div>
                                <div className={styles.textWrapper}>
                                    <span className={styles.label}>Curso Actual</span>
                                    <span className={styles.value}>{curso.nombre}</span>
                                </div>
                            </div>
                            <div className={styles.arrowIcon}>
                                {cursoAbierto === curso.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>

                        {cursoAbierto === curso.id && (
                            <div className={styles.adminPanel}>
                                <div className={styles.diasGrid}>
                                    {dias.map((dia) => {
                                        const marcado = (asistenciasMarcadas[curso.id] || []).includes(dia);
                                        return (
                                            <div 
                                                key={dia} 
                                                // Si no es profesor, quitamos la clase de puntero
                                                className={`${styles.diaItem} ${marcado ? styles.marcado : ''} ${!esProfesor ? styles.soloLectura : ''}`}
                                                onClick={() => toggleAsistencia(curso.id, dia)}
                                            >
                                                <div className={styles.diaIcon}>
                                                    {marcado ? <CheckCircle size={20} /> : <Calendar size={20} />}
                                                </div>
                                                <span className={styles.diaNombre}>{dia}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* EL BOTÓN SOLO SE MUESTRA SI ES PROFESOR */}
                                {esProfesor && (
                                    <button className={styles.btnGuardar}>
                                        Guardar Asistencia de {curso.nombre}
                                    </button>
                                )}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Asistencias;