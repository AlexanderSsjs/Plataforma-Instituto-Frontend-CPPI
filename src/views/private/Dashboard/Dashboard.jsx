import React from 'react';
import styles from './Dashboard.module.scss';
import { ShoppingBag, ChartLine, User, Settings } from 'lucide-react';

const Card = ({ icon: Icon, title, desc }) => (
  <div className={styles.card}>
    <div className={styles.cardIcon}><Icon size={24} /></div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.sectionTitle}>Enlaces útiles</h2>
            <div className={styles.cardsGrid}>
                <Card icon={ShoppingBag} title="Pedidos" desc="Ver todos los pedidos" />
                <Card icon={ChartLine} title="Estadísticas" desc="Ver reportes" />
                <Card icon={User} title="Usuarios" desc="Administrar cuentas" />
                <Card icon={Settings} title="Ajustes" desc="Ajustes del sistema" />
                <h1>HOLAA</h1>
            </div>
        </div>
    );
};

export default Dashboard;
