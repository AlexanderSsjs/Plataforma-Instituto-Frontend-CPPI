import React, { useState } from 'react';
import styles from '@/views/public/styles/Courses.module.scss';


/**
 * SortDropdown es un componente que permite al usuario
 * seleccionar una opción de ordenamiento para una lista
 * de cursos.
 *
 * Recibe dos props:
 * - value: el valor seleccionado actualmente
 * - onChange: una función que se llama cuando el usuario
 * selecciona una opción de ordenamiento. Debe recibir
 * el valor de la opción seleccionada como parámetro.
 *
 * Devuelve un JSX que representa un dropdown con las opciones
 * de ordenamiento.
 * 
 * @param {{ value: string, onChange: function }}
 * @returns {JSX.Element}
 * */
const SortDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const options = [
        { value: 'default', label: 'Ordenar por' },
        { value: 'rating', label: '⭐ Mejor valorados' },
        { value: 'price_low', label: '💰 Menor precio' },
        { value: 'price_high', label: '💸 Mayor precio' },
    ];

    const selected = options.find(o => o.value === value);

    return (
        <div className={styles.dropdown}>
            <button
                className={styles.dropdownBtn}
                onClick={() => setOpen(!open)}
            >
                {selected?.label}
                <span className={`${styles.arrow} ${open ? styles.rotate : ''}`}>
                    ⌄
                </span>
            </button>

            {open && (
                <div className={styles.dropdownMenu}>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`${styles.dropdownItem} ${
                                value === opt.value ? styles.active : ''
                            }`}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;