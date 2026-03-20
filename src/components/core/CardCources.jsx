import React, { useMemo } from 'react';
import Countdown from '@/components/core/CountDown';
import styles from "../../views/public/styles/Courses.module.scss";

// 1. Formateador fuera para no re-crearlo en cada render
const CURRENCY_FORMATTER = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
});

const CourseCard = ({ course, type }) => {
    // 2. Memoización de lógica pesada
    const { courseType, status, formattedPrice, startDate } = useMemo(() => {
        const cType = type || course?.type || 'virtual';
        const start = course?.date ? new Date(course.date) : null;
        const now = new Date();

        let currentStatus = 'virtual';
        if (cType === 'vivo' && start) {
            currentStatus = start > now ? 'proximo' : 'en-curso';
        }

        return {
            courseType: cType,
            status: currentStatus,
            formattedPrice: CURRENCY_FORMATTER.format(course?.price || 0),
            startDate: start
        };
    }, [course, type]);

    // 3. Early return si no hay datos (Seguridad)
    if (!course) return null;

    return (
        <div 
            className={`${styles.card} ${styles[courseType]} ${styles[status]}`}
            role="article" // SEO y Accesibilidad
        >
            <div className={styles.imageWrapper}> 
                <img 
                    src={course.image} 
                    alt={course.title} 
                    loading="lazy" // Mejora de Performance LCP
                />
                
                <div className={styles.overlayTags}>
                    <span className={`${styles.badge} ${styles[courseType]}`}>
                        {courseType === 'vivo' 
                            ? (status === 'proximo' ? '⏳ Próximo' : '🔴 En vivo') 
                            : '📚 Virtual'
                        }
                    </span>
                </div>
            </div>

            <div className={styles.content}> 
                <div className={styles.topRow}>
                    <span className={styles.rating} aria-label={`Rating: ${course.rating}`}>
                        ⭐ {course.rating || '4.5'}
                    </span>
                    <span className={styles.price}>{formattedPrice}</span>
                </div>

                <h3 className={styles.title}>{course.title}</h3>

                <div className={styles.infoArea}>
                    {courseType === 'vivo' && startDate ? (
                        <div className={styles.countdownWrapper}>
                            <Countdown targetDate={course.date} showSeconds={true} />
                        </div>
                    ) : (
                        <p className={styles.static}>✅ Acceso inmediato</p>
                    )}
                </div>

                <div className={styles.footer}>
                    <span className={styles.duration}>
                        ⏱ {course.duration || '80 hrs'}
                    </span>

                    <button 
                        className={styles.btnAction}
                        aria-label={`Ver detalles del curso ${course.title}`}
                    >
                        Ver detalles →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CourseCard);