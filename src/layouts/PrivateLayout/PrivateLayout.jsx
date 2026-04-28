// src/layouts/PrivateLayout/PrivateLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import styles from './PrivateLayout.module.scss';

const PrivateLayout = () => {
    return (
        <div className={styles.dashboardWrapper}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>INTRA-SENATI</div>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Panel Inicio</Link></li>
                        <li><Link to="/perfil">Mi Perfil</Link></li>
                        <li><Link to="/cursos">Mis Cursos</Link></li>
                        <li><Link to="/">Cerrar Sesión</Link></li>
                    </ul>
                </nav>
            </aside>

            <div className={styles.mainContent}>
                {/* 2. Topbar / Header del Dashboard */}
                <header className={styles.topbar}>
                    <span>Bienvenido, Alumno</span>
                    <div className={styles.userBadge}>JS</div>
                </header>

                {/* 3. Contenido Dinámico */}
                <section className={styles.pageBody}>
                    <Outlet /> {/* Aquí se renderizarán las vistas privadas */}
                </section>
            </div>
        </div>
    );
};

export default PrivateLayout;