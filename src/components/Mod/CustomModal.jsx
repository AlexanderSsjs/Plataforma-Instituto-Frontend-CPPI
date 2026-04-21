import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import styles from '../Mod/Modal.module.scss';

const CustomModal = ({ isOpen, onClose, title, children, icon: Icon, type = 'success' }) => {
    // Cerrar con tecla Escape
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modalContainer} ${styles[type]}`} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>
                
                <div className={styles.content}>
                    {Icon && (
                        <div className={styles.iconWrapper}>
                            <Icon size={40} strokeWidth={2.5} />
                        </div>
                    )}
                    <h3>{title}</h3>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;