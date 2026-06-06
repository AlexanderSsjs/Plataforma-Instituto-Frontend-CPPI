import { useState } from 'react';
import { 
    BookOpen, Calendar, CheckCircle, Clock, AlertTriangle, XCircle, 
    ChevronDown, UserCheck, Check, Save, Sparkles 
} from 'lucide-react';
import styles from './Asistencias.module.scss';
import { ALUMNOS_MOCK } from '@/data/students';

const Asistencias = () => {
    const esProfesor = true; 

    // Cursos del Profesor
    const cursosData = [
        { id: 1, nombre: 'Desarrollo Web Frontend', modulo: 'Arquitectura de Interfaces' },
        { id: 2, nombre: 'JavaScript Moderno (ES6+)', modulo: 'Lógica de Programación' },
        { id: 3, nombre: 'Seguridad de Redes', modulo: 'Ciberseguridad Aplicada' },
    ];

    const [cursoSeleccionado, setCursoSeleccionado] = useState(cursosData[0]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    
    // Alumnos activos del curso seleccionado
    const alumnosDelCurso = ALUMNOS_MOCK.filter(alumno => 
        // Mostramos todos pero damos indicación de estado
        alumno.estado === 'Activo'
    );

    // Estado local de asistencia: { [alumnoId]: 'P' | 'T' | 'J' | 'F' }
    const [asistencias, setAsistencias] = useState(() => {
        const initial = {};
        alumnosDelCurso.forEach(a => {
            initial[a.id] = 'P'; // Por defecto todos Presentes, igual que en Blackboard
        });
        return initial;
    });

    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    const handleMarcarAsistencia = (alumnoId, estado) => {
        setAsistencias(prev => ({
            ...prev,
            [alumnoId]: estado
        }));
    };

    const marcarTodosPresente = () => {
        const nuevos = {};
        alumnosDelCurso.forEach(a => {
            nuevos[a.id] = 'P';
        });
        setAsistencias(nuevos);
    };

    const guardarAsistencia = () => {
        console.log('Guardando asistencia para el curso:', cursoSeleccionado.nombre);
        console.log('Fecha:', fechaSeleccionada);
        console.log('Asistencias:', asistencias);
        
        setMostrarNotificacion(true);
        setTimeout(() => {
            setMostrarNotificacion(false);
        }, 3000);
    };

    // Estadísticas rápidas
    const totalAlumnos = alumnosDelCurso.length;
    const totalPresentes = Object.values(asistencias).filter(v => v === 'P').length;
    const totalTardes = Object.values(asistencias).filter(v => v === 'T').length;
    const totalJustificados = Object.values(asistencias).filter(v => v === 'J').length;
    const totalFaltas = Object.values(asistencias).filter(v => v === 'F').length;

    if (!esProfesor) {
        return (
            <div className={styles.error}>
                <h2>Acceso Restringido</h2>
                <p>Esta sección es exclusiva para el personal docente.</p>
            </div>
        );
    }

    return (
        <div className={styles.asistenciasContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Registro de Asistencia</h1>
                    <p>Gestiona el control de asistencia diario en tiempo real, al estilo Blackboard.</p>
                </div>
            </header>

            {/* SELECCIÓN DE CURSO Y FECHA */}
            <div className={styles.selectorBar}>
                <div className={styles.inputGroup}>
                    <label htmlFor="cursoSelect"><BookOpen size={16} /> Curso Asignado</label>
                    <div className={styles.selectWrapper}>
                        <select 
                            id="cursoSelect" 
                            value={cursoSeleccionado.id} 
                            onChange={(e) => setCursoSeleccionado(cursosData.find(c => c.id === parseInt(e.target.value)))}
                        >
                            {cursosData.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                        <ChevronDown className={styles.selectArrow} size={18} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="fechaSelect"><Calendar size={16} /> Fecha de Sesión</label>
                    <input 
                        type="date" 
                        id="fechaSelect"
                        value={fechaSeleccionada}
                        onChange={(e) => setFechaSeleccionada(e.target.value)}
                        className={styles.dateInput}
                    />
                </div>
            </div>

            {/* PANEL DE ESTADÍSTICAS RÁPIDAS */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.statP}`}>
                    <div className={styles.statIcon}><CheckCircle size={22} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Presentes</span>
                        <span className={styles.statValue}>{totalPresentes}</span>
                    </div>
                </div>
                <div className={`${styles.statCard} ${styles.statT}`}>
                    <div className={styles.statIcon}><Clock size={22} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Tardes</span>
                        <span className={styles.statValue}>{totalTardes}</span>
                    </div>
                </div>
                <div className={`${styles.statCard} ${styles.statJ}`}>
                    <div className={styles.statIcon}><AlertTriangle size={22} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Justificados</span>
                        <span className={styles.statValue}>{totalJustificados}</span>
                    </div>
                </div>
                <div className={`${styles.statCard} ${styles.statF}`}>
                    <div className={styles.statIcon}><XCircle size={22} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Faltas</span>
                        <span className={styles.statValue}>{totalFaltas}</span>
                    </div>
                </div>
            </div>

            {/* ACCIONES DE LISTADO */}
            <div className={styles.listActionBar}>
                <h3>Lista de Estudiantes Enrolados</h3>
                <button 
                    onClick={marcarTodosPresente}
                    className={styles.btnQuickAction}
                    title="Marcar a todos los alumnos como Presente"
                >
                    <UserCheck size={16} />
                    Marcar Todos como Presente
                </button>
            </div>

            {/* TABLA DE ASISTENCIA (BLACKBOARD STYLE) */}
            <div className={styles.tableWrapper}>
                <table className={styles.asistenciaTable}>
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th className={styles.centerCol}>Código</th>
                            <th className={styles.actionsCol}>Control de Asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnosDelCurso.map((alumno) => {
                            const marcado = asistencias[alumno.id] || 'P';
                            return (
                                <tr key={alumno.id}>
                                    <td>
                                        <div className={styles.studentInfo}>
                                            <div className={styles.avatar}>
                                                {alumno.nombre.charAt(0)}
                                            </div>
                                            <div>
                                                <div className={styles.studentName}>{alumno.nombre}</div>
                                                <div className={styles.studentCareer}>{alumno.carrera}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.centerCol}>
                                        <span className={styles.studentId}>{alumno.id}</span>
                                    </td>
                                    <td className={styles.actionsCol}>
                                        <div className={styles.btnGroupPills}>
                                            <button 
                                                onClick={() => handleMarcarAsistencia(alumno.id, 'P')}
                                                className={`${styles.pillBtn} ${styles.pillP} ${marcado === 'P' ? styles.active : ''}`}
                                            >
                                                <span className={styles.indicator}></span>
                                                Presente
                                            </button>
                                            <button 
                                                onClick={() => handleMarcarAsistencia(alumno.id, 'T')}
                                                className={`${styles.pillBtn} ${styles.pillT} ${marcado === 'T' ? styles.active : ''}`}
                                            >
                                                <span className={styles.indicator}></span>
                                                Tarde
                                            </button>
                                            <button 
                                                onClick={() => handleMarcarAsistencia(alumno.id, 'J')}
                                                className={`${styles.pillBtn} ${styles.pillJ} ${marcado === 'J' ? styles.active : ''}`}
                                            >
                                                <span className={styles.indicator}></span>
                                                Justificado
                                            </button>
                                            <button 
                                                onClick={() => handleMarcarAsistencia(alumno.id, 'F')}
                                                className={`${styles.pillBtn} ${styles.pillF} ${marcado === 'F' ? styles.active : ''}`}
                                            >
                                                <span className={styles.indicator}></span>
                                                Falta
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* VISTA MÓVIL (TARJETAS COLAPSABLES/BOTONERAS DE ASISTENCIA RESPONSIVAS) */}
            <div className={styles.mobileList}>
                {alumnosDelCurso.map((alumno) => {
                    const marcado = asistencias[alumno.id] || 'P';
                    return (
                        <div key={alumno.id} className={styles.mobileStudentCard}>
                            <div className={styles.mobileCardHeader}>
                                <div className={styles.mobileStudentInfo}>
                                    <div className={styles.avatar}>{alumno.nombre.charAt(0)}</div>
                                    <div>
                                        <div className={styles.studentName}>{alumno.nombre}</div>
                                        <div className={styles.studentCareer}>{alumno.id} • {alumno.carrera}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.mobileCardButtons}>
                                <button 
                                    onClick={() => handleMarcarAsistencia(alumno.id, 'P')}
                                    className={`${styles.mobilePill} ${styles.pillP} ${marcado === 'P' ? styles.active : ''}`}
                                >
                                    P
                                </button>
                                <button 
                                    onClick={() => handleMarcarAsistencia(alumno.id, 'T')}
                                    className={`${styles.mobilePill} ${styles.pillT} ${marcado === 'T' ? styles.active : ''}`}
                                >
                                    T
                                </button>
                                <button 
                                    onClick={() => handleMarcarAsistencia(alumno.id, 'J')}
                                    className={`${styles.mobilePill} ${styles.pillJ} ${marcado === 'J' ? styles.active : ''}`}
                                >
                                    J
                                </button>
                                <button 
                                    onClick={() => handleMarcarAsistencia(alumno.id, 'F')}
                                    className={`${styles.mobilePill} ${styles.pillF} ${marcado === 'F' ? styles.active : ''}`}
                                >
                                    F
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* NOTIFICACIÓN Y BOTÓN GUARDAR GENERAL */}
            <div className={styles.bottomBar}>
                {mostrarNotificacion && (
                    <div className={styles.successToast}>
                        <Sparkles size={16} />
                        <span>¡Asistencia de la sesión guardada con éxito en el servidor!</span>
                    </div>
                )}
                
                <button 
                    onClick={guardarAsistencia}
                    className={styles.btnSaveAttendance}
                >
                    <Save size={18} />
                    Guardar Registro de Asistencia
                </button>
            </div>
        </div>
    );
};

export default Asistencias;