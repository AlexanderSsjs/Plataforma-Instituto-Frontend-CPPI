import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '@/views/public/styles/Courses.module.scss';
import TYPES from '@/data/type_courses.json'; // 🔥 Importamos tu JSON de cursos

// 1. Generamos las opciones dinámicamente mapeando el JSON
const COURSE_OPTIONS = TYPES.cursos.map((curso) => ({
    value: curso.id.toString(), // Usamos el ID como identificador
    label: curso.nombre         // Usamos el nombre del curso para mostrar
}));

const SortDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    // Buscamos si hay un curso seleccionado actualmente
    const selected = COURSE_OPTIONS.find(o => o.value === value);

    const handleSelect = useCallback((newValue) => {
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
                    {/* Cambiamos el texto por defecto */}
                    {selected ? selected.label : 'Todos los cursos'} 
                </span>
                <span className={`${styles.arrow} ${open ? styles.rotate : ''}`}>
                    ⌄
                </span>
            </button>

            {open && (
                <div className={styles.dropdownMenu} role="listbox">
                    
                    {COURSE_OPTIONS
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
                            onClick={() => handleSelect('default')} // 🔥 Corregido para limpiar explícitamente
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