import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Edit2, Search, Eye, Award, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Alumnos.module.scss';
import EditModal from '@/components/Mod/EditModal';
import { ALUMNOS_MOCK } from '@/data/students';

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState(ALUMNOS_MOCK);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('todos'); // 'todos', 'activo', 'inactivo'

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);

    const handleEdit = (e, alumno) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedAlumno(alumno);
        setIsModalOpen(true);
    };

    const handleSave = (updatedData) => {
        setAlumnos(prev => prev.map(a => a.id === updatedData.id ? { ...a, ...updatedData } : a));
        console.log('Información actualizada:', updatedData);
    };

    const fields = [
        { name: 'nombre', label: 'Nombre Completo', icon: Users, placeholder: 'Ej. Juan Pérez', required: true },
        { name: 'email', label: 'Correo Electrónico', icon: Mail, type: 'email', placeholder: 'correo@ejemplo.com', required: true },
        { name: 'telefono', label: 'Teléfono', icon: Phone, placeholder: 'Ej. 987654321' },
        { name: 'direccion', label: 'Dirección', icon: MapPin, placeholder: 'Ej. Av. Principal 123' },
    ];

    // Filtrado
    const filteredAlumnos = alumnos.filter(alumno => {
        const matchesSearch = 
            alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumno.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumno.carrera.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (selectedTab === 'todos') return matchesSearch;
        return matchesSearch && alumno.estado.toLowerCase() === selectedTab;
    });

    return (
        <div className={styles.alumnosContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Panel de Alumnos</h1>
                    <p>Gestión académica, control de asistencia e información detallada de los estudiantes</p>
                </div>
            </header>

            {/* BARRA DE ACCIONES: BUSCADOR Y FILTROS */}
            <div className={styles.actionBar}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input 
                        type="text" 
                        placeholder="Buscar alumno por nombre, carrera o ID..." 
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
                        Todos <span className={styles.tabBadge}>{alumnos.length}</span>
                    </button>
                    <button 
                        className={`${styles.tabBtn} ${selectedTab === 'activo' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('activo')}
                    >
                        Activos <span className={`${styles.tabBadge} ${styles.badgeActive}`}>{alumnos.filter(a => a.estado === 'Activo').length}</span>
                    </button>
                    <button 
                        className={`${styles.tabBtn} ${selectedTab === 'inactivo' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('inactivo')}
                    >
                        Inactivos <span className={`${styles.tabBadge} ${styles.badgeInactive}`}>{alumnos.filter(a => a.estado === 'Inactivo').length}</span>
                    </button>
                </div>
            </div>

            {/* LISTA/GRID DE ESTUDIANTES */}
            {filteredAlumnos.length > 0 ? (
                <div className={styles.listaAlumnos}>
                    {filteredAlumnos.map((alumno) => (
                        <div key={alumno.id} className={`${styles.alumnoCard} ${alumno.estado === 'Inactivo' ? styles.inactivoCard : ''}`}>
                            <div className={styles.alumnoHeader}>
                                <div className={styles.headerMain}>
                                    <div className={`${styles.iconBox} ${alumno.estado === 'Activo' ? styles.iconActive : styles.iconInactive}`}>
                                        <Users size={24} />
                                    </div>
                                    <div className={styles.textWrapper}>
                                        <div className={styles.nameRow}>
                                            <span className={styles.value}>{alumno.nombre}</span>
                                            <span className={`${styles.statusBadge} ${alumno.estado === 'Activo' ? styles.statusActive : styles.statusInactive}`}>
                                                {alumno.estado}
                                            </span>
                                        </div>
                                        <span className={styles.label}>{alumno.carrera} • {alumno.id}</span>
                                    </div>
                                </div>
                                <button 
                                    className={styles.btnEdit} 
                                    onClick={(e) => handleEdit(e, alumno)}
                                    title="Editar información básica"
                                >
                                    <Edit2 size={15} />
                                </button>
                            </div>

                            <div className={styles.alumnoInfo}>
                                <div className={styles.infoItem}>
                                    <Mail size={16} />
                                    <span>{alumno.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Phone size={16} />
                                    <span>{alumno.telefono}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <MapPin size={16} />
                                    <span>{alumno.direccion}</span>
                                </div>
                            </div>

                            {/* MÉTRICAS RÁPIDAS DEL ALUMNO */}
                            <div className={styles.metricsGrid}>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Promedio</span>
                                    <span className={`${styles.metricValue} ${alumno.promedio >= 13 ? styles.goodGrade : styles.badGrade}`}>
                                        {alumno.promedio > 0 ? alumno.promedio.toFixed(1) : 'N/A'}
                                    </span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Asistencia</span>
                                    <span className={styles.metricValue}>{alumno.asistencia}%</span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Progreso</span>
                                    <span className={styles.metricValue}>{alumno.progreso}%</span>
                                </div>
                            </div>

                            {/* BARRA DE PROGRESO */}
                            <div className={styles.progressContainer}>
                                <div className={styles.progressLabel}>Progreso del Curso</div>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={`${styles.progressFill} ${alumno.estado === 'Inactivo' ? styles.fillInactive : ''}`}
                                        style={{ width: `${alumno.progreso}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* BOTÓN DE ACCIÓN DETALLES */}
                            <div className={styles.cardActions}>
                                <Link 
                                    to={`/dashboard/detallealumnos/${alumno.id}`} 
                                    className={styles.btnDetalles}
                                >
                                    <span>Ver Historial y Notas</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <GraduationCap size={48} className={styles.noResultsIcon} />
                    <h3>No se encontraron estudiantes</h3>
                    <p>Intenta cambiar los filtros de búsqueda o el estado seleccionado.</p>
                </div>
            )}

            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                title="Editar Estudiante"
                initialData={selectedAlumno}
                fields={fields}
            />
        </div>
    );
};

export default Alumnos;
