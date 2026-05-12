import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import styles from './Alumnos.module.scss';
import EditModal from '@/components/Mod/EditModal';

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState([
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '987654321', direccion: 'Av. Siempre Viva 123' },
        { id: 2, nombre: 'María García', email: 'maria.garcia@example.com', telefono: '912345678', direccion: 'Calle Falsa 456' },
        { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@example.com', telefono: '956789123', direccion: 'Jr. Unión 789' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);

    const handleEdit = (alumno) => {
        setSelectedAlumno(alumno);
        setIsModalOpen(true);
    };

    const handleSave = (updatedData) => {
        setAlumnos(prev => prev.map(a => a.id === updatedData.id ? updatedData : a));
        console.log('Información actualizada:', updatedData);
    };

    const fields = [
        { name: 'nombre', label: 'Nombre Completo', icon: Users, placeholder: 'Ej. Juan Pérez', required: true },
        { name: 'email', label: 'Correo Electrónico', icon: Mail, type: 'email', placeholder: 'correo@ejemplo.com', required: true },
        { name: 'telefono', label: 'Teléfono', icon: Phone, placeholder: 'Ej. 987654321' },
        { name: 'direccion', label: 'Dirección', icon: MapPin, placeholder: 'Ej. Av. Principal 123' },
    ];

    return (
        <div className={styles.alumnosContainer}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Panel de Alumnos</h1>
                    <p>Gestión e información detallada de los estudiantes</p>
                </div>
            </header>

            <div className={styles.listaAlumnos}>
                {alumnos.map((alumno) => (
                    <section key={alumno.id} className={styles.alumnoCard}>
                        <div className={styles.alumnoHeader}>
                            <div className={styles.headerMain}>
                                <div className={styles.iconBox}><Users size={24} /></div>
                                <div className={styles.textWrapper}>
                                    <span className={styles.label}>Estudiante</span>
                                    <span className={styles.value}>{alumno.nombre}</span>
                                </div>
                            </div>
                            <button 
                                className={styles.btnEdit} 
                                onClick={() => handleEdit(alumno)}
                                title="Editar información"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>

                        <div className={styles.alumnoInfo}>
                            <div className={styles.infoItem}>
                                <Mail size={18} />
                                <span>{alumno.email}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <Phone size={18} />
                                <span>{alumno.telefono}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <MapPin size={18} />
                                <span>{alumno.direccion}</span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

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
