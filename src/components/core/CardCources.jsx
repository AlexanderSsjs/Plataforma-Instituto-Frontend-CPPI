import React, { useMemo, useState } from 'react';
import Countdown from '@/components/core/CountDown';
import styles from '../../views/public/styles/Courses.module.scss';

// 🔥 formatter fuera (no se recrea nunca)
const CURRENCY_FORMATTER = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
});

// 🔥 comparación custom (CLAVE REAL)
const areEqual = (prev, next) => {
    const a = prev.course;
    const b = next.course;

    return (
        a.id === b.id &&
        a.price === b.price &&
        a.rating === b.rating &&
        a.date === b.date &&
        a.title === b.title &&
        a.image === b.image
    );
};

const CourseCard = ({ course, type }) => {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    // 🔥 SOLO CÁLCULOS NECESARIOS
    const computed = useMemo(() => {
        if (!course) return null;

        const courseType = type || course.type || 'virtual';
        const startDate = course.date ? new Date(course.date) : null;
        const now = Date.now();

        let status = 'virtual';

        if (courseType === 'vivo' && startDate) {
            status = startDate.getTime() > now ? 'proximo' : 'en-curso';
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
        courseType === 'vivo'
            ? status === 'proximo'
                ? '⏳ Próximo'
                : '🔴 En vivo'
            : '📚 Virtual';

    return (
        <article
            className={`${styles.card} ${styles[courseType]} ${styles[status]}`}
            aria-label={`Curso ${course.title}`}
        >
            {/* 🖼 IMAGEN OPTIMIZADA */}
            <div className={styles.imageWrapper}>

                {!imgLoaded && !imgError && (
                    <div className={styles.skeleton} />
                )}

                {!imgError ? (
                    <picture>
                        {course.imageWebp && (
                            <source srcSet={course.imageWebp} type="image/webp" />
                        )}

                        <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            decoding="async" // 🔥 mejora render
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgError(true)}
                            className={imgLoaded ? styles.imageVisible : styles.imageHidden}
                        />
                    </picture>
                ) : (
                    <div className={styles.errorPlaceholder}>
                        Imagen no disponible
                    </div>
                )}

                <div className={styles.overlayTags}>
                    <span
                        className={`${styles.badge} ${
                            status === 'proximo'
                                ? styles.proximo
                                : styles[courseType]
                        }`}
                    >
                        {badgeText}
                    </span>
                </div>
            </div>

            {/* 📄 CONTENIDO */}
            <div className={styles.content}>

                <div className={styles.topRow}>
                    <span className={styles.rating}>⭐ {rating}</span>
                    <span className={styles.price}>{price}</span>
                </div>

                <h3 className={styles.title}>{course.title}</h3>

                <p className={styles.descriptionText}>
                    {course.description}
                </p>

                <div className={styles.infoArea}>
                    {courseType === 'vivo' && startDate ? (
                        <div className={styles.countdownWrapper}>
                            <Countdown targetDate={course.date} />
                        </div>
                    ) : (
                        <p className={styles.static}>
                            ✅ Acceso inmediato
                        </p>
                    )}
                </div>
            </div>

            {/* ⚡ FOOTER */}
            <div className={styles.footer}>
                <span className={styles.duration}>
                    ⏱ {course.duration || '80 hrs'}
                </span>

                <button
                    className={styles.btnAction}
                    aria-label={`Ver curso ${course.title}`}
                >
                    Ver detalles →
                </button>
            </div>
        </article>
    );
};

export default React.memo(CourseCard, areEqual);