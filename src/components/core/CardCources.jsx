import React from 'react';
import Countdown from '@/components/core/CountDown';
import styles from "../../views/public/styles/Courses.module.scss";

const CourseCard = ({ course, type }) => {
    const courseType = type || course.type || 'virtual';
    const now = new Date();
    const startDate = course.date ? new Date(course.date) : null;

    let status = 'virtual';
    if (courseType === 'vivo' && startDate) {
        status = startDate > now ? 'proximo' : 'en-curso';
    }

    const price = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
    }).format(course.price);

    return (
        <div className={`${styles.card} ${styles[courseType]} ${styles[status]}`}>
            <div className={styles.imageWrapper}> 
                <img src={course.image} alt={course.title} />
                
                <div className={styles.overlayTags}>
                    {courseType === 'vivo' && (
                        <span className={`${styles.badge} ${styles.vivo}`}>
                            {status === 'proximo' ? '⏳ Próximo' : '🔴 En vivo'}
                        </span>
                    )}

                    {courseType === 'virtual' && (
                        <span className={`${styles.badge} ${styles.virtual}`}>📚 Virtual</span>
                    )}
                </div>
            </div>
            <div className={styles.content}> 
                <div className={styles.topRow}>
                    <span className={styles.rating}>⭐ {course.rating || '4.5'}</span>
                    <span className={styles.price}>{price}</span>
                </div>
                <h3 className={styles.title}>{course.title}</h3>
                {courseType === 'vivo' && startDate ? (
                    <div className={styles.countdown}>
                        <Countdown targetDate={course.date} />
                    </div>
                ) : (
                    <p className={styles.static}>Acceso inmediato</p>
                )}
                <div className={styles.footer}>
                    <span className={styles.duration}>
                        ⏱ {course.duration || '80 hrs'}
                    </span>

                    <button className={styles.btnAction}>
                        Ver detalles →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;