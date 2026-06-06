import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    User, Mail, Phone, MapPin, Search,
    TrendingUp, CheckCircle, Award, 
    FileText, Calendar, ArrowLeft, GraduationCap, Check, HelpCircle
} from 'lucide-react';
import styles from './detallealumno.module.scss'; 
import { ALUMNOS_MOCK } from '@/data/students';

const DetalleAlumno = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Si no hay ID en la URL, por defecto usamos el primero de la lista
    const activeId = id || 'ALU-2026-089';
    
    // Buscar estudiante
    const alumno = ALUMNOS_MOCK.find(a => a.id.toLowerCase() === activeId.toLowerCase());

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        // Intentar buscar por ID o Nombre exacto
        const found = ALUMNOS_MOCK.find(a => 
            a.id.toLowerCase().includes(searchId.toLowerCase()) ||
            a.nombre.toLowerCase().includes(searchId.toLowerCase())
        );

        if (found) {
            setErrorMsg('');
            navigate(`/dashboard/detallealumnos/${found.id}`);
        } else {
            setErrorMsg('Estudiante no encontrado. Intenta con "ALU-2026-089" o "María".');
        }
    };

    if (!alumno) {
        return (
            <div className={styles.container}>
                <div className={styles.errorCard}>
                    <GraduationCap size={48} color="#c62828" />
                    <h2>Estudiante No Registrado</h2>
                    <p>El código de estudiante solicitado no se encuentra en el sistema.</p>
                    <Link to="/dashboard/alumnos" className={styles.btnVolver}>
                        <ArrowLeft size={16} /> Volver a la Lista
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* ENCABEZADO DE RETORNO Y BÚSQUEDA */}
            <div className={styles.topActions}>
                <Link to="/dashboard/alumnos" className={styles.btnVolverLink}>
                    <ArrowLeft size={18} />
                    <span>Volver a Alumnos</span>
                </Link>

                <div className={styles.searchBar}>
                    <form onSubmit={handleSearch}>
                        <div className={styles.inputGroup}>
                            <Search size={16} />
                            <input 
                                type="text" 
                                placeholder="Buscar otro alumno por ID o Nombre..." 
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                        </div>
                        <button type="submit">Buscar</button>
                    </form>
                    {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
                </div>
            </div>

            {/* TARJETA DE PERFIL CABECERA */}
            <header className={styles.header}>
                <div className={styles.avatar}>
                    <User size={45} className={styles.avatarIcon} />
                </div>
                <div className={styles.info}>
                    <div className={styles.titleRow}>
                        <h1>{alumno.nombre}</h1>
                        <span className={`${styles.badgeEstado} ${alumno.estado === 'Activo' ? styles.badgeActivo : styles.badgeInactivo}`}>
                            {alumno.estado}
                        </span>
                    </div>
                    <p className={styles.subtext}>
                        <GraduationCap size={14} /> 
                        <span>{alumno.carrera} • <strong>{alumno.id}</strong></span>
                    </p>
                </div>
            </header>

            {/* CUADRICULA DE DETALLES E INFORMACIÓN BÁSICA */}
            <div className={styles.profileLayout}>
                {/* COLUMNA DETALLES GENERALES */}
                <div className={styles.leftCol}>
                    {/* TARJETA CONTACTO */}
                    <section className={styles.card}>
                        <h3>Información de Contacto</h3>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <Mail size={16} />
                                <div>
                                    <label>Correo Institucional</label>
                                    <span>{alumno.email}</span>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={16} />
                                <div>
                                    <label>Teléfono Móvil</label>
                                    <span>{alumno.telefono}</span>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin size={16} />
                                <div>
                                    <label>Dirección Domiciliaria</label>
                                    <span>{alumno.direccion}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TARJETA AVANCE ACADÉMICO / CURSO */}
                    <section className={styles.card}>
                        <h3>Avances del Alumno</h3>
                        <div className={styles.courseProgressCard}>
                            <div className={styles.courseHeader}>
                                <span className={styles.courseLabel}>Curso en Curso</span>
                                <span className={styles.courseValue}>{alumno.curso}</span>
                            </div>

                            <div className={styles.progressStatus}>
                                <div className={styles.progressLabel}>
                                    <span>Porcentaje Completado</span>
                                    <strong>{alumno.progreso}%</strong>
                                </div>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={styles.progressFill} 
                                        style={{ width: `${alumno.progreso}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* COLUMNA ESTADÍSTICAS RÁPIDAS */}
                <div className={styles.rightCol}>
                    <div className={styles.gridInfo}>
                        <section className={`${styles.card} ${styles.statCard}`}>
                            <h2><TrendingUp size={18} /> Promedio General</h2>
                            <div className={`${styles.statValue} ${alumno.promedio >= 13 ? styles.passing : styles.failing}`}>
                                {alumno.promedio > 0 ? alumno.promedio.toFixed(1) : 'N/A'}
                            </div>
                            <span className={styles.statSubtext}>Min. aprobatorio: 13.0</span>
                        </section>

                        <section className={`${styles.card} ${styles.statCard}`}>
                            <h2><CheckCircle size={18} /> Asistencia Total</h2>
                            <div className={styles.statValue}>{alumno.asistencia}%</div>
                            <span className={styles.statSubtext}>Requerido: 70%</span>
                        </section>

                        <section className={`${styles.card} ${styles.statCard}`}>
                            <h2><Calendar size={18} /> Faltas (Sesiones)</h2>
                            <div className={`${styles.statValue} ${alumno.faltas >= 4 ? styles.danger : ''}`}>
                                {alumno.faltas}
                            </div>
                            <span className={styles.statSubtext}>Límite: 6 faltas</span>
                        </section>
                    </div>

                    {/* REGISTRO DE CALIFICACIONES DE PRÁCTICAS */}
                    <section className={styles.card} style={{ marginTop: '1.5rem' }}>
                        <h2 className={styles.tableTitle}><FileText size={20} /> Calificaciones Detalladas</h2>
                        <div className={styles.tableWrapper}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evaluación</th>
                                        <th className={styles.centerCol}>Nota</th>
                                        <th className={styles.centerCol}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Práctica Calificada 1 (PC1)</td>
                                        <td className={styles.centerCol}><strong>{alumno.notas.practicas[0]}</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.notas.practicas[0] >= 13 ? styles.gradePass : styles.gradeFail}`}>
                                                {alumno.notas.practicas[0] >= 13 ? 'Aprobado' : 'Desaprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Práctica Calificada 2 (PC2)</td>
                                        <td className={styles.centerCol}><strong>{alumno.notas.practicas[1]}</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.notas.practicas[1] >= 13 ? styles.gradePass : styles.gradeFail}`}>
                                                {alumno.notas.practicas[1] >= 13 ? 'Aprobado' : 'Desaprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Práctica Calificada 3 (PC3)</td>
                                        <td className={styles.centerCol}><strong>{alumno.notas.practicas[2]}</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.notas.practicas[2] >= 13 ? styles.gradePass : styles.gradeFail}`}>
                                                {alumno.notas.practicas[2] >= 13 ? 'Aprobado' : 'Desaprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Examen Parcial</td>
                                        <td className={styles.centerCol}><strong>{alumno.notas.examenParcial}</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.notas.examenParcial >= 13 ? styles.gradePass : styles.gradeFail}`}>
                                                {alumno.notas.examenParcial >= 13 ? 'Aprobado' : 'Desaprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Proyecto Final Entregable</td>
                                        <td className={styles.centerCol}><strong>{alumno.notas.proyectoFinal}</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.notas.proyectoFinal >= 13 ? styles.gradePass : styles.gradeFail}`}>
                                                {alumno.notas.proyectoFinal >= 13 ? 'Aprobado' : 'Desaprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className={styles.finalRow}>
                                        <td><strong>Promedio Final Ponderado</strong></td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.finalGrade} ${alumno.promedio >= 13 ? styles.passing : styles.failing}`}>
                                                {alumno.promedio.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.statusLabel} ${alumno.promedio >= 13 ? styles.statusPass : styles.statusFail}`}>
                                                {alumno.promedio >= 13 ? 'APROBADO' : 'DESAPROBADO'}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DetalleAlumno;