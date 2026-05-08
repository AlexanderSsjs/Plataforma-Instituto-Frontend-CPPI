import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, BookOpen, LogOut, ChevronLeft, LayoutGrid, Users, Calendar, ClipboardList, Bell, Search } from 'lucide-react';
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
        { path: '/dashboard/perfil', label: 'Mi Perfil', icon: User },
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
            {/* 1. Sidebar Lateral */}
            <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''} ${isDesktopCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <Link to="/dashboard" className={styles.logoContainer}>
                        <img src="/logo-transparent.png" alt="CCIP Logo" className={styles.logoImg} />
                        <span className={`${styles.logoText} ${isDesktopCollapsed ? styles.hidden : styles.visible}`}>
                            CCIP
                        </span>
                    </Link>

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
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.path}>
                                    <Link to={link.path} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                                        <div className={styles.navIcon}>
                                            <link.icon size={20} />
                                        </div>
                                        {!isDesktopCollapsed && <span className={styles.navLabel}>{link.label}</span>}
                                        {isDesktopCollapsed && isMobileMenuOpen && <span className={styles.navLabel}>{link.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles.navFooter}>
                        <button className={styles.logoutBtn}>
                            <LogOut size={20} />
                            {!isDesktopCollapsed && <span>Cerrar Sesión</span>}
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Overlay para móvil */}
            {isMobileMenuOpen && (
                <div className={styles.overlay} onClick={toggleMobileMenu} aria-hidden="true"></div>
            )}

            <div className={`${styles.mainContent} ${isDesktopCollapsed ? styles.expanded : ''}`}>
                {/* 2. Topbar Mejorado */}
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <button className={styles.mobileToggleBtn} onClick={toggleMobileMenu} aria-label="Abrir menú">
                            <Menu size={24} />
                        </button>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbLabel}>Plataforma</span>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>
                                {navLinks.find(l => l.path === location.pathname)?.label || 'Panel'}
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles.topbarRight}>
                        <button className={styles.topbarAction} aria-label="Notificaciones">
                            <Bell size={20} />
                            <span className={styles.actionBadge}></span>
                        </button>
                        
                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>Alexander Ssjs</span>
                                <span className={styles.userRole}>Alumno</span>
                            </div>
                            <div className={styles.userAvatar}>
                                <span>AL</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 3. Contenido con Marco */}
                <div className={styles.pageContainer}>
                    <main className={styles.pageBody}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PrivateLayout;