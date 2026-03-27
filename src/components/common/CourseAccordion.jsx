import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import styles from '../../views/public/styles/Details.module.scss';

const CourseAccordion = ({ categorias }) => {
    const [open, setOpen] = useState(null);

    return (
        <div className={styles.accordion}>
            {categorias.map(cat => (
                <div key={cat.id} className={styles.cardAccordion}>
                    <button onClick={() => setOpen(open === cat.id ? null : cat.id)}>
                        <h4>{cat.orden}. {cat.nombre}</h4>
                        {open === cat.id ? <ChevronUp/> : <ChevronDown/>}
                    </button>

                    <div className={`${styles.content} ${open === cat.id ? styles.open : ''}`}>
                        {cat.temas.map((t, i) => (
                            <div key={i}>
                                <PlayCircle size={14}/> {t}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseAccordion;