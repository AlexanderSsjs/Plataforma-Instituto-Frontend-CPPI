import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, BookOpen, LogOut, ChevronLeft, LayoutGrid, Users, Calendar, ClipboardList } from 'lucide-react';
import styles from './PrivateLayout.module.scss';

const PrivateLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
    const location = useLocation();

    // Cerrar el menú móvil cuando cambia la ruta
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDesktopMenu = () => {
        setIsDesktopCollapsed(!isDesktopCollapsed);
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/perfil', label: 'Cuenta', icon: User },
        { path: '/dashboard/alumnos', label: 'Alumnos', icon: Users },
        { path: '/dashboard/cursos', label: 'Mis Cursos', icon: BookOpen },
        { path: '/dashboard/Asistencias', label: 'Asistencia', icon: ClipboardList },
        { path: '/dashboard/horarios', label: 'Horarios', icon: Calendar },
        { path: '/dashboard/actividades', label: 'Actividades', icon: ClipboardList },
        { path: '/dashboard/CursosAsignados', label: 'Cursos Asignados', icon: ClipboardList },
        { path: '/dashboard/detallealumnos', label: 'Detalles Alumnos', icon: Users },
    ];

    return (
        <div className={styles.dashboardWrapper}>
            {/* 1. Sidebar Lateral (Desktop) / Menú Flotante (Mobile) */}
            <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''} ${isDesktopCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logoContainer} onClick={() => isDesktopCollapsed && toggleDesktopMenu()}>
                        <div className={styles.logoIcon}>
                            <LayoutGrid size={24} strokeWidth={2.5} />
                        </div>
                        <span className={`${styles.logoText} ${isDesktopCollapsed ? styles.hidden : styles.visible}`}>
                            CCIP
                        </span>
                    </div>

                    <button
                        className={`${styles.collapseBtn} ${isDesktopCollapsed ? styles.hideBtn : styles.showBtn}`}
                        onClick={toggleDesktopMenu}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    
                    {/* Botón de cerrar solo para móvil */}
                    <button className={styles.mobileCloseBtn} onClick={toggleMobileMenu} aria-label="Cerrar menú">
                        <X size={24} />
                    </button>
                </div>
                
                <nav className={styles.navigation}>
                    <ul>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.path}>
                                    <Link to={link.path} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                                        <div className={styles.navIcon}>
                                            <link.icon size={22} />
                                        </div>
                                        {!isDesktopCollapsed && <span className={styles.navLabel}>{link.label}</span>}
                                        {isDesktopCollapsed && isMobileMenuOpen && <span className={styles.navLabel}>{link.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Overlay para móvil cuando el menú está abierto */}
            {isMobileMenuOpen && (
                <div className={styles.overlay} onClick={toggleMobileMenu} aria-hidden="true"></div>
            )}

            <div className={`${styles.mainContent} ${isDesktopCollapsed ? styles.expanded : ''}`}>
                {/* 2. Topbar / Header del Dashboard */}
                <header className={styles.topbar}>
                    <button className={styles.mobileToggleBtn} onClick={toggleMobileMenu} aria-label="Abrir menú">
                        <Menu size={24} />
                    </button>
                    
                    <div className={styles.topbarRight}>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>Bienvenido, Alumno</span>
                            <div className={styles.userBadge}>AL</div>
                        </div>
                    </div>
                </header>

                {/* 3. Contenido Dinámico */}
                <main className={styles.pageBody}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;