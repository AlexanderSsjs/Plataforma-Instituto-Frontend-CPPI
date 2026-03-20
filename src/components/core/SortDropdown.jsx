import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '@/views/public/styles/Courses.module.scss';

// 1. Constantes fuera para optimizar memoria
const SORT_OPTIONS = [
    { value: 'rating', label: '⭐ Mejor valorados' },
    { value: 'price_low', label: '💰 Menor precio' },
    { value: 'price_high', label: '💸 Mayor precio' },
];

const SortDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref para detectar clics fuera

    // 2. Cerrar dropdown al hacer clic fuera (Efecto Pro)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const selected = SORT_OPTIONS.find(o => o.value === value);

    const handleSelect = useCallback((newValue) => {
        // Toggle logic: si es el mismo, resetea a default
        onChange(newValue === value ? 'default' : newValue);
        setOpen(false);
    }, [value, onChange]);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button
                type="button"
                className={`${styles.dropdownBtn} ${value !== 'default' ? styles.activeBtn : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={styles.btnLabel}>
                    {selected ? selected.label : 'Ordenar por'}
                </span>
                <span className={`${styles.arrow} ${open ? styles.rotate : ''}`}>
                    ⌄
                </span>
            </button>

            {open && (
                <div className={styles.dropdownMenu} role="listbox">
                    <div className={styles.menuTitle}>Selecciona el orden</div>
                    
                    {SORT_OPTIONS
                        .filter(opt => opt.value !== value)
                        .map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                className={styles.dropdownItem}
                                onClick={() => handleSelect(opt.value)}
                                role="option"
                            >
                                {opt.label}
                            </button>
                        ))
                    }

                    {value !== 'default' && (
                        <button 
                            type="button"
                            className={styles.clearFilter}
                            onClick={() => handleSelect(value)}
                        >
                            ✕ Quitar filtro
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;