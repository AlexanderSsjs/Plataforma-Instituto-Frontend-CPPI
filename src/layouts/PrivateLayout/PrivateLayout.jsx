import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.tsx';
import { ALL_NAV_LINKS, ROLES } from '@/config/roles';
import { Menu, X, LogOut, ChevronLeft, Bell } from 'lucide-react';
import styles from './PrivateLayout.module.scss';

const PrivateLayout = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
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

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopCollapsed(!isDesktopCollapsed);

    // 🔒 MODIFICACIÓN 2: El filtrado ahora lee directamente de la configuración importada
    const allowedNavLinks = ALL_NAV_LINKS.filter((link) => {
        if (!link.roles) return true;
        return link.roles.includes(user?.rol_id);
    });

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
                    {/* 🛠️ ENVOLTURA INTERMEDIA MÁGICA */}
                    <div className={styles.navLinksScrollContainer}>
                        <ul className={styles.navLinks}>
                            {allowedNavLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                const IconComponent = link.icon;
                                return (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                        >
                                            <div className={styles.navIcon}>
                                                <IconComponent size={20} />
                                            </div>
                                            <span className={styles.navLabel}>{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* El footer se queda al mismo nivel, fijado abajo con flex-shrink: 0 */}
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
                            <span className={styles.breadcrumbCurrent}>
                                {ALL_NAV_LINKS.find((l) => l.path === location.pathname)?.label ||
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
                                <span className={styles.userName}>{user?.email || 'Usuario'}</span>
                                <span className={styles.userRole}>
                                    {/* 🔒 MODIFICACIÓN 3: Evaluación limpia usando nombres semánticos */}
                                    {user?.rol_id === ROLES.SUPERUSER
                                        ? 'Administrador'
                                        : user?.rol_id === ROLES.TEACHER
                                          ? 'Profesor'
                                          : 'Alumno'}
                                </span>
                            </div>
                            <div className={styles.userAvatar}>
                                <span>{getInitials(user?.email)}</span>
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
