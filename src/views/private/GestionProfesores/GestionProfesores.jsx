import { useState } from 'react';
import {
    Search, Mail, Phone, BookOpen,
    ChevronDown, ChevronUp, Users,
    Award, Wifi, Monitor, UserX
} from 'lucide-react';
import styles from './GestionProfesores.module.scss';
import { PROFESORES_MOCK } from '@/data/teachers';

const GestionProfesores = () => {
    const [searchTerm, setSearchTerm]       = useState('');
    const [selectedTab, setSelectedTab]     = useState('todos');
    const [expandedId, setExpandedId]       = useState(null);

    const totalActivos   = PROFESORES_MOCK.filter(p => p.estado === 'Activo').length;
    const totalInactivos = PROFESORES_MOCK.filter(p => p.estado === 'Inactivo').length;
    const totalCursos    = PROFESORES_MOCK.reduce((acc, p) => acc + p.cursosAsignados.length, 0);
    const totalAlumnos   = PROFESORES_MOCK.reduce(
        (acc, p) => acc + p.cursosAsignados.reduce((s, c) => s + c.alumnos, 0), 0
    );

    const filteredProfesores = PROFESORES_MOCK.filter(prof => {
        const matchesSearch =
            prof.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.email.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedTab === 'todos')    return matchesSearch;
        if (selectedTab === 'activo')   return matchesSearch && prof.estado === 'Activo';
        if (selectedTab === 'inactivo') return matchesSearch && prof.estado === 'Inactivo';
        return matchesSearch;
    });

    const toggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div className={styles.container}>
            {/* ENCABEZADO */}
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Gestión de Profesores</h1>
                    <p>Administra el plantel docente y visualiza los cursos asignados a cada profesor.</p>
                </div>
            </header>

            {/* TARJETAS DE RESUMEN */}
            <div className={styles.summaryGrid}>
                <div className={`${styles.summaryCard} ${styles.cardTotal}`}>
                    <div className={styles.summaryIcon}><Award size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Total Profesores</span>
                        <span className={styles.summaryValue}>{PROFESORES_MOCK.length}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardActivo}`}>
                    <div className={styles.summaryIcon}><Award size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Docentes Activos</span>
                        <span className={styles.summaryValue}>{totalActivos}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardCursos}`}>
                    <div className={styles.summaryIcon}><BookOpen size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Cursos Asignados</span>
                        <span className={styles.summaryValue}>{totalCursos}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardAlumnos}`}>
                    <div className={styles.summaryIcon}><Users size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Alumnos Atendidos</span>
                        <span className={styles.summaryValue}>{totalAlumnos}</span>
                    </div>
                </div>
            </div>

            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className={styles.actionBar}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, ID, especialidad o correo..."
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
                        Todos <span className={styles.tabBadge}>{PROFESORES_MOCK.length}</span>
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

            {/* LISTA DE PROFESORES */}
            {filteredProfesores.length > 0 ? (
                <div className={styles.profesoresList}>
                    {filteredProfesores.map((prof) => {
                        const isExpanded = expandedId === prof.id;
                        const totalAlumnosProf = prof.cursosAsignados.reduce((s, c) => s + c.alumnos, 0);

                        return (
                            <div
                                key={prof.id}
                                className={`${styles.profesorCard} ${prof.estado === 'Inactivo' ? styles.cardInactivo : ''}`}
                            >
                                {/* CABECERA DEL PROFESOR */}
                                <div className={styles.cardHeader}>
                                    <div className={styles.profMain}>
                                        <div className={`${styles.avatar} ${prof.estado === 'Inactivo' ? styles.avatarInactivo : ''}`}>
                                            {prof.nombre.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <div className={styles.profInfo}>
                                            <div className={styles.profNameRow}>
                                                <span className={styles.profName}>{prof.nombre}</span>
                                                <span className={`${styles.statusBadge} ${prof.estado === 'Activo' ? styles.statusActive : styles.statusInactive}`}>
                                                    {prof.estado}
                                                </span>
                                            </div>
                                            <span className={styles.profEspecialidad}>
                                                <Award size={12} /> {prof.especialidad}
                                            </span>
                                            <span className={styles.profId}>{prof.id}</span>
                                        </div>
                                    </div>

                                    {/* MÉTRICAS RÁPIDAS */}
                                    <div className={styles.profMetrics}>
                                        <div className={styles.metricItem}>
                                            <BookOpen size={14} />
                                            <div>
                                                <span className={styles.metricValue}>{prof.cursosAsignados.length}</span>
                                                <span className={styles.metricLabel}>Cursos</span>
                                            </div>
                                        </div>
                                        <div className={styles.metricDivider} />
                                        <div className={styles.metricItem}>
                                            <Users size={14} />
                                            <div>
                                                <span className={styles.metricValue}>{totalAlumnosProf}</span>
                                                <span className={styles.metricLabel}>Alumnos</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTÓN EXPANDIR */}
                                    <button
                                        className={styles.btnExpand}
                                        onClick={() => toggleExpand(prof.id)}
                                        aria-label={isExpanded ? 'Colapsar cursos' : 'Ver cursos asignados'}
                                    >
                                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        <span>{isExpanded ? 'Ocultar' : 'Ver cursos'}</span>
                                    </button>
                                </div>

                                {/* CONTACTO */}
                                <div className={styles.contactRow}>
                                    <span><Mail size={13} /> {prof.email}</span>
                                    <span><Phone size={13} /> {prof.telefono}</span>
                                </div>

                                {/* PANEL DE CURSOS EXPANDIBLE */}
                                {isExpanded && (
                                    <div className={styles.cursosPanel}>
                                        <div className={styles.cursosPanelHeader}>
                                            <BookOpen size={15} />
                                            <span>Cursos asignados a {prof.nombre.split(' ')[1]}</span>
                                        </div>

                                        {prof.cursosAsignados.length > 0 ? (
                                            <div className={styles.cursosGrid}>
                                                {prof.cursosAsignados.map((curso) => (
                                                    <div key={curso.id} className={styles.cursoItem}>
                                                        <div className={styles.cursoItemHeader}>
                                                            <div className={`${styles.tipoBadge} ${curso.tipo === 'vivo' ? styles.tipoVivo : styles.tipoVirtual}`}>
                                                                {curso.tipo === 'vivo'
                                                                    ? <><Wifi size={10} /> En Vivo</>
                                                                    : <><Monitor size={10} /> Virtual</>
                                                                }
                                                            </div>
                                                            <span className={styles.cursoAlumnos}>
                                                                <Users size={11} /> {curso.alumnos} alumnos
                                                            </span>
                                                        </div>
                                                        <p className={styles.cursoTitulo}>{curso.titulo}</p>
                                                        <span className={styles.cursoHorario}>{curso.horario}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={styles.noCursos}>
                                                <UserX size={20} />
                                                <span>Sin cursos asignados actualmente.</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <Award size={48} className={styles.noResultsIcon} />
                    <h3>No se encontraron profesores</h3>
                    <p>Intenta cambiar los filtros de búsqueda o el estado seleccionado.</p>
                </div>
            )}
        </div>
    );
};

export default GestionProfesores;
