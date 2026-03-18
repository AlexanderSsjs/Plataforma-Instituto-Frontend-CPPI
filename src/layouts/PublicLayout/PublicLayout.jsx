// src/layouts/PublicLayout/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './PublicLayout.module.scss';

const PublicLayout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;