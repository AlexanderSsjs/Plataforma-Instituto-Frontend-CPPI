import React from 'react';
import styles from './Profile.module.scss';
import { User, Mail, Phone, MapPin, Edit3, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.tsx';
import { ROLES } from '@/config/roles';

const Profile = () => {
    // Extraemos el usuario actual del contexto
    const { user } = useAuth();

    // Función para obtener las iniciales (reutilizada del Layout)
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((p) => p[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    // Función limpia para determinar el nombre del rol
    const getRoleName = (roleId) => {
        switch (roleId) {
            case ROLES?.SUPERUSER:
                return 'Administrador';
            case ROLES?.TEACHER:
                return 'Profesor';
            default:
                return 'Alumno';
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.header}>
                <h1>Mi Perfil</h1>
                <p>Gestiona tu información personal y preferencias</p>
            </div>

            <div className={styles.profileCard}>
                <div className={styles.coverPhoto}>
                    <button className={styles.editCoverBtn}>
                        <Camera size={16} /> Cambiar Portada
                    </button>
                </div>

                <div className={styles.profileInfoWrapper}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            {/* Avatar Dinámico */}
                            <span>{getInitials(user?.email)}</span>
                            <button
                                className={styles.editAvatarBtn}
                                aria-label="Editar foto de perfil"
                            >
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.infoHeader}>
                            <div>
                                {/* Nombre y Rol Dinámicos */}
                                <h2>{user?.email || 'Usuario'}</h2>
                                <p className={styles.role}>{getRoleName(user?.rol_id)}</p>
                            </div>
                            <button className={styles.editProfileBtn}>
                                <Edit3 size={18} /> Editar Perfil
                            </button>
                        </div>

                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <User size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Nombre de Usuario</span>
                                    {/* Extrae la parte antes del @ del correo como username dinámico */}
                                    <span className={styles.value}>
                                        {user?.email?.split('@')[0] || 'usuario'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <Mail size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Correo Electrónico</span>
                                    {/* Correo Dinámico */}
                                    <span className={styles.value}>
                                        {user?.email || 'correo@ccip.edu.pe'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <Phone size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Teléfono</span>
                                    {/* Si tienes el teléfono en el objeto user, puedes usar user?.telefono */}
                                    <span className={styles.value}>
                                        {user?.telefono || '+51 987 654 321'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <MapPin size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Ubicación</span>
                                    <span className={styles.value}>Lima, Perú</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
