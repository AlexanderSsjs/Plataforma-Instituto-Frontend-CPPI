import { useState } from 'react';
import {
    Users, Mail, Phone, MapPin, Search,
    GraduationCap, TrendingUp, CheckCircle,
    AlertTriangle, BookOpen, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './GestionEstudiantes.module.scss';
import { ALUMNOS_MOCK } from '@/data/students';

const GestionEstudiantes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('todos');

    const totalActivos   = ALUMNOS_MOCK.filter(a => a.estado === 'Activo').length;
    const totalInactivos = ALUMNOS_MOCK.filter(a => a.estado === 'Inactivo').length;
    const promedioGeneral = (
        ALUMNOS_MOCK.filter(a => a.promedio > 0).reduce((acc, a) => acc + a.promedio, 0) /
        ALUMNOS_MOCK.filter(a => a.promedio > 0).length
    ).toFixed(1);

    const filteredAlumnos = ALUMNOS_MOCK.filter(alumno => {
        const matchesSearch =
            alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumno.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumno.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumno.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedTab === 'todos')     return matchesSearch;
        if (selectedTab === 'activo')    return matchesSearch && alumno.estado === 'Activo';
        if (selectedTab === 'inactivo')  return matchesSearch && alumno.estado === 'Inactivo';
        return matchesSearch;
    });

    return (
        <div className={styles.container}>
            {/* ENCABEZADO */}
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Gestión de Estudiantes</h1>
                    <p>Visualiza y administra el estado académico de todos los estudiantes matriculados en la plataforma.</p>
                </div>
            </header>

            {/* TARJETAS DE RESUMEN */}
            <div className={styles.summaryGrid}>
                <div className={`${styles.summaryCard} ${styles.cardTotal}`}>
                    <div className={styles.summaryIcon}><Users size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Total Estudiantes</span>
                        <span className={styles.summaryValue}>{ALUMNOS_MOCK.length}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardActivo}`}>
                    <div className={styles.summaryIcon}><CheckCircle size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Cursando Actualmente</span>
                        <span className={styles.summaryValue}>{totalActivos}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardInactivo}`}>
                    <div className={styles.summaryIcon}><AlertTriangle size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Inactivos / Retirados</span>
                        <span className={styles.summaryValue}>{totalInactivos}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardPromedio}`}>
                    <div className={styles.summaryIcon}><TrendingUp size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Promedio General</span>
                        <span className={styles.summaryValue}>{promedioGeneral}</span>
                    </div>
                </div>
            </div>

            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className={styles.actionBar}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, ID, carrera o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.tabsWrapper}>
                    <button
                        className={`${styles.tabBtn} ${selectedTab === 'todos' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('todos')}
                    >
                        Todos <span className={styles.tabBadge}>{ALUMNOS_MOCK.length}</span>
                    </button>
                    <button
                        className={`${styles.tabBtn} ${selectedTab === 'activo' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('activo')}
                    >
                        Activos <span className={`${styles.tabBadge} ${styles.badgeActive}`}>{totalActivos}</span>
                    </button>
                    <button
                        className={`${styles.tabBtn} ${selectedTab === 'inactivo' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('inactivo')}
                    >
                        Inactivos <span className={`${styles.tabBadge} ${styles.badgeInactive}`}>{totalInactivos}</span>
                    </button>
                </div>
            </div>

            {/* TABLA DE ESTUDIANTES */}
            {filteredAlumnos.length > 0 ? (
                <>
                    {/* Vista escritorio: tabla */}
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Estudiante</th>
                                    <th>Contacto</th>
                                    <th>Curso Actual</th>
                                    <th className={styles.centerCol}>Promedio</th>
                                    <th className={styles.centerCol}>Asistencia</th>
                                    <th className={styles.centerCol}>Progreso</th>
                                    <th className={styles.centerCol}>Estado</th>
                                    <th className={styles.centerCol}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAlumnos.map((alumno) => (
                                    <tr key={alumno.id} className={alumno.estado === 'Inactivo' ? styles.rowInactivo : ''}>
                                        <td>
                                            <div className={styles.studentInfo}>
                                                <div className={`${styles.avatar} ${alumno.estado === 'Inactivo' ? styles.avatarInactivo : ''}`}>
                                                    {alumno.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className={styles.studentName}>{alumno.nombre}</div>
                                                    <div className={styles.studentMeta}>
                                                        <GraduationCap size={11} />
                                                        {alumno.carrera} • <span className={styles.studentId}>{alumno.id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.contactInfo}>
                                                <span><Mail size={12} /> {alumno.email}</span>
                                                <span><Phone size={12} /> {alumno.telefono}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.cursoCell}>
                                                <BookOpen size={13} />
                                                <span>{alumno.curso}</span>
                                            </div>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.gradeBadge} ${alumno.promedio >= 13 ? styles.gradePass : alumno.promedio === 0 ? styles.gradeNa : styles.gradeFail}`}>
                                                {alumno.promedio > 0 ? alumno.promedio.toFixed(1) : 'N/A'}
                                            </span>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <div className={styles.asistenciaCell}>
                                                <span className={`${styles.asistenciaValue} ${alumno.asistencia >= 70 ? styles.asistOk : styles.asistBad}`}>
                                                    {alumno.asistencia}%
                                                </span>
                                                <div className={styles.miniBar}>
                                                    <div
                                                        className={`${styles.miniBarFill} ${alumno.asistencia >= 70 ? styles.fillOk : styles.fillBad}`}
                                                        style={{ width: `${alumno.asistencia}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <div className={styles.progresoCell}>
                                                <span>{alumno.progreso}%</span>
                                                <div className={styles.miniBar}>
                                                    <div
                                                        className={`${styles.miniBarFill} ${alumno.estado === 'Inactivo' ? styles.fillInactivo : styles.fillProgress}`}
                                                        style={{ width: `${alumno.progreso}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <span className={`${styles.statusBadge} ${alumno.estado === 'Activo' ? styles.statusActive : styles.statusInactive}`}>
                                                {alumno.estado}
                                            </span>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <Link
                                                to={`/dashboard/detallealumnos/${alumno.id}`}
                                                className={styles.btnVer}
                                                title="Ver historial completo"
                                            >
                                                <ArrowRight size={14} />
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista móvil: tarjetas */}
                    <div className={styles.mobileList}>
                        {filteredAlumnos.map((alumno) => (
                            <div key={alumno.id} className={`${styles.mobileCard} ${alumno.estado === 'Inactivo' ? styles.mobileCardInactivo : ''}`}>
                                <div className={styles.mobileCardHeader}>
                                    <div className={`${styles.avatar} ${alumno.estado === 'Inactivo' ? styles.avatarInactivo : ''}`}>
                                        {alumno.nombre.charAt(0)}
                                    </div>
                                    <div className={styles.mobileCardInfo}>
                                        <span className={styles.studentName}>{alumno.nombre}</span>
                                        <span className={styles.studentMeta}>{alumno.carrera} • {alumno.id}</span>
                                    </div>
                                    <span className={`${styles.statusBadge} ${alumno.estado === 'Activo' ? styles.statusActive : styles.statusInactive}`}>
                                        {alumno.estado}
                                    </span>
                                </div>
                                <div className={styles.mobileCardBody}>
                                    <div className={styles.mobileMetric}>
                                        <span>Promedio</span>
                                        <strong className={alumno.promedio >= 13 ? styles.gradePassText : styles.gradeFailText}>
                                            {alumno.promedio > 0 ? alumno.promedio.toFixed(1) : 'N/A'}
                                        </strong>
                                    </div>
                                    <div className={styles.mobileMetric}>
                                        <span>Asistencia</span>
                                        <strong>{alumno.asistencia}%</strong>
                                    </div>
                                    <div className={styles.mobileMetric}>
                                        <span>Progreso</span>
                                        <strong>{alumno.progreso}%</strong>
                                    </div>
                                </div>
                                <Link to={`/dashboard/detallealumnos/${alumno.id}`} className={styles.mobileBtnVer}>
                                    Ver Historial Completo <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles.noResults}>
                    <GraduationCap size={48} className={styles.noResultsIcon} />
                    <h3>No se encontraron estudiantes</h3>
                    <p>Intenta cambiar los filtros de búsqueda o el estado seleccionado.</p>
                </div>
            )}
        </div>
    );
};

export default GestionEstudiantes;
