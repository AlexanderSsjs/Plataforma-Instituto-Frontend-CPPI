import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X, Save, AlertCircle } from 'lucide-react';
import styles from './EditModal.module.scss';

const EditModal = ({ isOpen, onClose, onSave, title, initialData, fields }) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h2>{title}</h2>
                        <p>Actualiza la información necesaria</p>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fieldsGrid}>
                        {fields.map((field) => (
                            <div key={field.name} className={styles.formGroup}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <div className={styles.inputWrapper}>
                                    {field.icon && <field.icon className={styles.inputIcon} size={18} />}
                                    <input
                                        type={field.type || 'text'}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer className={styles.footer}>
                        <button type="button" className={styles.btnCancel} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.btnSave}>
                            <Save size={18} />
                            Guardar Cambios
                        </button>
                    </footer>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default EditModal;
