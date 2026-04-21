import { useParams } from 'react-router-dom';
import { useMemo } from 'react'; // Para evitar cálculos innecesarios
import TYPES from '@/data/type_courses.json';

import HeroCourse from '@/components/common/HeroCourse';
import CourseAccordion from '@/components/common/CourseAccordion';
import PriceCard from '@/components/common/PriceCard';

import styles from '../public/styles/Details.module.scss';

// Configuración de la promo (Mantener igual que en Courses.jsx)
const GLOBAL_DISCOUNT = {
    enabled: true,
    price: 70,
    start: '2026-04-01T00:00:00',
    end: '2026-04-30T23:59:59',
};

const Details = () => {
    const { id } = useParams();
    const cursoId = Number(id);

    // 🔥 Buscar curso
    const course = useMemo(() => {
        return TYPES.cursos.find((c) => c.id === cursoId);
    }, [cursoId]);

    // 🔥 Lógica de promo (Calculada una sola vez)
    const promoInfo = useMemo(() => {
        if (!GLOBAL_DISCOUNT.enabled) return { active: false };
        
        const now = new Date();
        const isActive = now >= new Date(GLOBAL_DISCOUNT.start) && 
                        now <= new Date(GLOBAL_DISCOUNT.end);
                        
        return {
            active: isActive,
            price: GLOBAL_DISCOUNT.price
        };
    }, []);

    if (!course) {
        return <div className={styles.error}>Error: Curso no encontrado</div>;
    }

    return (
        <div className={styles.detailsPage}>
            {/* HERO */}
            <HeroCourse course={course} />

            <div className={styles.container}>
                <div className={styles.mainLayout}>
                    
                    <div>
                        <div className={styles.virtualInfoText}>
                            <h3>📚 Curso disponible</h3>
                        </div>

                        {/* CONTENIDO */}
                        <CourseAccordion categorias={course.categorias} />
                    </div>

                    {/* SIDEBAR */}
                    <aside className={styles.sidebar}>
                        <PriceCard 
                            course={course} 
                            promoActive={promoInfo.active} 
                            promoPrice={promoInfo.price}
                        />
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default Details;