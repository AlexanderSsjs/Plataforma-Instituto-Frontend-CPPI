import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// import logoImg from "@/assets/public/logo.svg"; // Comentado temporalmente para no depender de imágenes
import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    const navLinks = [
        { name: 'Soluciones', href: '#soluciones' },
        { name: 'Arquitectura', href: '#arquitectura' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Contacto', href: '#contacto' },
    ];

    const CtaButton = () => (
        <button className={styles.btn}>
            Empezar
        </button>
    );

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                {/* Logo */}
                <a href="/" className={styles.logo}>
                    Dev<span>Pro</span>
                </a>

                {/* Navbar */}
                <Navbar links={navLinks}>
                    <CtaButton />
                </Navbar>

                {/* Botón CTA Desktop */}
                <div className={styles.ctaDesktop}>
                    <CtaButton />
                </div>

            </div>
        </header>
    );
};

export default Header;