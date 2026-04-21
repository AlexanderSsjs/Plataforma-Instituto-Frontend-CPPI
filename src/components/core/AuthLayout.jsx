import React from 'react';
import styles from '@/views/public/styles/FormLogin.module.scss'; 
import loginBg from '@/assets/public/lOGIN.jpg'; 

const AuthLayout = ({ children, title, subtitle, badgeText }) => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formContent}>
                        <header className={styles.header}>
                            <h1>{title} <span>CCIP</span></h1>
                            <p>{subtitle}</p>
                        </header>
                        {children}
                    </div>
                </div>

                <div 
                    className={styles.imageSection} 
                    style={{ backgroundImage: `url(${loginBg})` }}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.brandInfo}>
                        <span className={styles.badge}>{badgeText || 'Plataforma Educativa'}</span>
                        <h2>Potencia tu carrera técnica con los mejores expertos.</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;