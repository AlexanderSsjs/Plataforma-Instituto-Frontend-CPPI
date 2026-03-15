import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.scss';

const Navbar = ({ links, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Hook para bloquear el scroll del body
    // Hook mejorado para bloquear el scroll del body y html
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Clave para móviles
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Navegación Desktop */}
            <nav className={styles.navDesktop}>
                {links.map((link) => (
                    <a key={link.name} href={link.href} className={styles.link}>
                        {link.name}
                    </a>
                ))}
            </nav>

            {/* 1. Botón Hamburguesa (Solo abre el menú) */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menú"
            >
                <Menu size={24} />
            </button>

            {/* Overlay: Cierra el menú al hacer clic fuera */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Menú Móvil Desplegable (Slide-in) */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>

                {/* 2. NUEVO: Botón de Cerrar (X) dentro del propio menú */}
                <button
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <X size={24} />
                </button>

                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.name}
                    </a>
                ))}

                {children && (
                    <div className={styles.mobileCtaWrapper}>
                        {children}
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;