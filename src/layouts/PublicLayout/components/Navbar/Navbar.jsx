import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.scss';

const Navbar = ({ links, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
        };
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        links.forEach((link) => {
            if (link.href.startsWith('#')) {
                const sectionId = link.href.replace('#', '');
                const element = document.getElementById(sectionId);
                if (element) observer.observe(element);
            }
        });
        return () => observer.disconnect();
    }, [links]);
    const isLinkActive = useCallback(
        (href) => {
            if (href.startsWith('#')) {
                return activeSection === href.replace('#', '');
            }
            return location.pathname === href;
        },
        [activeSection, location.pathname],
    );
    useEffect(() => {
        setIsOpen(false);
    }, [location]);
    return (
        <>
            {/* Desktop Navigation */}
            <nav className={styles.navDesktop}>
                {links.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={`${styles.link} ${isLinkActive(link.href) ? styles.active : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
            {/* Toggle Button */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menú"
            >
                <Menu size={24} />
            </button>
            {/* Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />
            {/* Mobile Menu */}
            <aside className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
                <button
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <X size={24} />
                </button>
                <div className={styles.mobileLinksContainer}>
                    {links.map((link, index) => (
                        <Link
                            key={`${link.name}-${index}`}
                            to={link.href}
                            className={`${styles.mobileLink} ${isLinkActive(link.href) ? styles.mobileActive : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.icon && <link.icon size={22} className={styles.navIcon} />}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
                {children && <div className={styles.mobileCtaWrapper}>{children}</div>}
            </aside>
        </>
    );
};

export default Navbar;
