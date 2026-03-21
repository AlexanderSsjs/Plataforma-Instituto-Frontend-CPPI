import React, { useMemo, useState } from 'react';
import Countdown from '@/components/core/CountDown';
import styles from '../../views/public/styles/Courses.module.scss';

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
});
const CourseCard = ({ course, type }) => {
    const [imgState, setImgState] = useState({
        loaded: false,
        error: false,
    });

    const computed = useMemo(() => {
        if (!course) return null;

        const courseType = type || course.type || 'virtual';
        const startDate = course.date ? new Date(course.date) : null;
        const now = new Date();

        let status = 'virtual';

        if (courseType === 'vivo' && startDate) {
            status = startDate > now ? 'proximo' : 'en-curso';
        }

        return {
            courseType,
            status,
            startDate,
            price: CURRENCY_FORMATTER.format(course.price || 0),
            rating: course.rating || 4.5,
        };
    }, [course, type]);

    if (!course || !computed) return null;

    const { courseType, status, startDate, price, rating } = computed;

    const badgeText =
        courseType === 'vivo' ? (status === 'proximo' ? '⏳ Próximo' : '🔴 En vivo') : '📚 Virtual';

    return (
        <article
            className={`${styles.card} ${styles[courseType]} ${styles[status]}`}
            aria-label={`Curso ${course.title}`}
        >
            <div className={styles.imageWrapper}>
                {!imgState.loaded && !imgState.error && <div className={styles.skeleton} />}

                {!imgState.error ? (
                    <picture>
                        {course.imageWebp && <source srcSet={course.imageWebp} type="image/webp" />}

                        <img
                            src={course.image}
                            alt={`Imagen del curso ${course.title}`}
                            loading="lazy"
                            onLoad={() => setImgState({ loaded: true, error: false })}
                            onError={() => setImgState({ loaded: true, error: true })}
                            className={imgState.loaded ? styles.imageVisible : styles.imageHidden}
                        />
                    </picture>
                ) : (
                    <div className={styles.errorPlaceholder}>
                        <span>Imagen no disponible</span>
                    </div>
                )}

                <div className={styles.overlayTags}>
                    <span
                        className={`${styles.badge} ${
                            status === 'proximo' ? styles.proximo : styles[courseType]
                        }`}
                    >
                        {badgeText}
                    </span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.topRow}>
                    <span className={styles.rating}>⭐ {rating}</span>

                    <span className={styles.price}>{price}</span>
                </div>

                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.descriptionText}>{course.description}</p>
                <div className={styles.infoArea}>
                    {courseType === 'vivo' && startDate ? (
                        <div className={styles.countdownWrapper}>
                            <Countdown targetDate={course.date} showSeconds />
                        </div>
                    ) : (
                        <p className={styles.static}>✅ Acceso inmediato</p>
                    )}
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.duration}>⏱ {course.duration || '80 hrs'}</span>

                <button
                    className={styles.btnAction}
                    aria-label={`Ver detalles del curso ${course.title}`}
                >
                    Ver detalles →
                </button>
            </div>
        </article>
    );
};

export default React.memo(CourseCard);
