import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './PublicLayout.module.scss';

const PublicLayout = () => {
    useEffect(() => {
        if (window.self !== window.top) {
            window.top.location = window.self.location;
        }
        document.referrerPolicy = 'same-origin';
    }, []);

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
