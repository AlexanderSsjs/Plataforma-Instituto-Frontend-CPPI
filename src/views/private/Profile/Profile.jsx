import React from 'react';
import styles from './Profile.module.scss';
import { User, Mail, Phone, MapPin, Edit3, Camera } from 'lucide-react';

const Profile = () => {
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
                            <span>AL</span>
                            <button className={styles.editAvatarBtn} aria-label="Editar foto de perfil">
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div className={styles.infoSection}>
                        <div className={styles.infoHeader}>
                            <div>
                                <h2>Alumno CCIP</h2>
                                <p className={styles.role}>Estudiante Regular</p>
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
                                    <span className={styles.value}>alumno.ccip</span>
                                </div>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <Mail size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Correo Electrónico</span>
                                    <span className={styles.value}>alumno@ccip.edu.pe</span>
                                </div>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <Phone size={18} />
                                </div>
                                <div className={styles.detailText}>
                                    <span className={styles.label}>Teléfono</span>
                                    <span className={styles.value}>+51 987 654 321</span>
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
