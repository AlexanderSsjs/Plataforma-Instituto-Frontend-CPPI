import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // 🔒 Importamos la autenticación real
import {
    Menu,
    X,
    LayoutDashboard,
    User,
    BookOpen,
    LogOut,
    ChevronLeft,
    Users,
    Calendar,
    ClipboardList,
    Bell,
} from 'lucide-react';
import styles from './PrivateLayout.module.scss';

const PrivateLayout = () => {
    const { user, logout } = useAuth(); // 🔏 Extraemos los datos reales del usuario y logout
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    // 🔒 SEGURIDAD: Cerrar sesión automático por inactividad (15 minutos)
    const INACTIVITY_TIME = 15 * 60 * 1000;

    const handleInactivityLogout = () => {
        logout();
        navigate('/login?reason=inactivity');
    };

    const resetInactivityTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(handleInactivityLogout, INACTIVITY_TIME);
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        resetInactivityTimer();

        events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
        };
    }, []);

    // Cerrar menú móvil al cambiar de ruta
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopCollapsed(!isDesktopCollapsed);

    // 🔏 ARQUITECTURA SEGURA: Definimos qué roles pueden ver cada enlace
    const allNavLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/perfil', label: 'Mi Perfil', icon: User },
        { path: '/dashboard/alumnos', label: 'Alumnos', icon: Users, roles: ['admin', 'teacher'] },
        { path: '/dashboard/cursos', label: 'Mis Cursos', icon: BookOpen },
        {
            path: '/dashboard/Asistencias',
            label: 'Asistencia',
            icon: ClipboardList,
            roles: ['admin', 'teacher'],
        },
        { path: '/dashboard/horarios', label: 'Horarios', icon: Calendar },
        { path: '/dashboard/actividades', label: 'Actividades', icon: ClipboardList },
        {
            path: '/dashboard/CursosAsignados',
            label: 'Cursos Asignados',
            icon: ClipboardList,
            roles: ['admin', 'teacher'],
        },
        {
            path: '/dashboard/detallealumnos',
            label: 'Detalles Alumnos',
            icon: Users,
            roles: ['admin', 'teacher'],
        },
    ];

    // 🔒 FILTRADO DE SEGURIDAD: El alumno solo ve enlaces permitidos para su rol
    const allowedNavLinks = allNavLinks.filter((link) => {
        if (!link.roles) return true; // Ruta pública para todos los autenticados
        return link.roles.includes(user?.role);
    });

    // Generar iniciales seguras para el avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        return parts
            .map((p) => p[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div className={styles.dashboardWrapper}>
            <aside
                className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''} ${isDesktopCollapsed ? styles.collapsed : ''}`}
            >
                <div
                    className={`${styles.sidebarHeader} ${isDesktopCollapsed ? styles.isCollapsed : ''}`}
                >
                    <button
                        type="button"
                        className={styles.logoContainer}
                        onClick={() => {
                            if (isDesktopCollapsed) {
                                setIsDesktopCollapsed(false);
                            } else {
                                navigate('/dashboard');
                            }
                        }}
                    >
                        <img
                            src="/logo-transparent.png"
                            alt="CCIP Logo"
                            className={styles.logoImg}
                        />
                        <span
                            className={`${styles.logoText} ${isDesktopCollapsed ? styles.hidden : styles.visible}`}
                        >
                            CCIP
                        </span>
                    </button>

                    {!isDesktopCollapsed && (
                        <button
                            className={styles.collapseBtn}
                            onClick={toggleDesktopMenu}
                            aria-label="Minimizar menú"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}

                    <button
                        type="button"
                        className={styles.mobileCloseBtn}
                        onClick={toggleMobileMenu}
                        aria-label="Cerrar menú"
                    >
                        <X size={24} />
                    </button>
                </div>
                <nav className={styles.navigation}>
                    <ul className={styles.navLinks}>
                        {allowedNavLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                    >
                                        <div className={styles.navIcon}>
                                            <link.icon size={20} />
                                        </div>
                                        <span className={styles.navLabel}>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles.navFooter}>
                        <button className={styles.logoutBtn} onClick={() => logout()}>
                            <div className={styles.logoutIcon}>
                                <LogOut size={20} />
                            </div>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {isMobileMenuOpen && (
                <div className={styles.overlay} onClick={toggleMobileMenu} aria-hidden="true"></div>
            )}

            <div className={`${styles.mainContent} ${isDesktopCollapsed ? styles.expanded : ''}`}>
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <button
                            className={styles.mobileToggleBtn}
                            onClick={toggleMobileMenu}
                            aria-label="Abrir menú"
                        >
                            <Menu size={24} />
                        </button>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbLabel}>Plataforma</span>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>
                                {allNavLinks.find((l) => l.path === location.pathname)?.label ||
                                    'Panel'}
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
                                {/* 🔒 DINÁMICO: Mostramos los datos reales provistos por Laravel */}
                                <span className={styles.userName}>{user?.name || 'Usuario'}</span>
                                <span className={styles.userRole}>
                                    {user?.role === 'admin'
                                        ? 'Administrador'
                                        : user?.role === 'teacher'
                                          ? 'Profesor'
                                          : 'Alumno'}
                                </span>
                            </div>
                            <div className={styles.userAvatar}>
                                <span>{getInitials(user?.name)}</span>
                            </div>
                        </div>
                    </div>
                </header>

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
