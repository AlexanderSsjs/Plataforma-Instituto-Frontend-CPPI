import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Countdown from '@/components/core/CountDown';
import styles from '../../views/public/styles/Courses.module.scss';

const formatCurrency = (monto = 0, moneda = 'PEN') =>
    new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: moneda,
    }).format(monto);

const areEqual = (prev, next) => {
    const a = prev.course;
    const b = next.course;

    return (
        a.id === b.id &&
        a.nombre === b.nombre &&
        a.precio?.monto === b.precio?.monto &&
        a.imagen_url === b.imagen_url &&
        a.date === b.date &&
        prev.type === next.type
    );
};

const CourseCard = ({ course, type = 'virtual' }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const computed = useMemo(() => {
        if (!course) return null;

        const isLive = type === 'vivo';

        const startDate = isLive && course.date ? new Date(course.date) : null;

        return {
            isLive,
            startDate,
            price: formatCurrency(course?.precio?.monto ?? 0, course?.precio?.moneda ?? 'PEN'),
        };
    }, [course, type]);

    if (!course || !computed) return null;

    const { isLive, startDate, price } = computed;

    return (
        <article className={`${styles.card} ${styles[type]}`} aria-label={`Curso ${course.nombre}`}>
            {/* 🖼 IMAGEN */}
            <div className={styles.imageWrapper}>
                {!imgLoaded && !imgError && <div className={styles.skeleton} />}

                {!imgError ? (
                    <img
                        src={course.imagen_url}
                        alt={course.nombre}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                        className={imgLoaded ? styles.imageVisible : styles.imageHidden}
                    />
                ) : (
                    <div className={styles.errorPlaceholder}>Imagen no disponible</div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.topRow}>
                    <h3 className={styles.title}>{course.nombre}</h3>
                    <div className={styles.topRow}>
                        <span className={styles.price}>{price}</span>
                    </div>
                </div>
                <p className={styles.descriptionText}>{course.descripcion}</p>
                <div className={styles.infoArea}>
                    {isLive && startDate ? (
                        <div className={styles.countdownWrapper}>
                            <Countdown targetDate={startDate} />
                        </div>
                    ) : (
                        <p className={styles.static}>✅ Acceso inmediato</p>
                    )}
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.duration}>⏱ {course.horas || 80} hrs</span>

                <Link
                    to={`/curso/${course.id}`}
                    state={{ type: type }} 
                    className={styles.btnAction}
                    aria-label={`Ver curso ${course.nombre}`}
                >
                    Ver detalles →
                </Link>
            </div>
        </article>
    );
};

export default React.memo(CourseCard, areEqual);
