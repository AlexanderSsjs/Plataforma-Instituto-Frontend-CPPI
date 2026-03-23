import React, { useEffect, useState, useRef, memo } from 'react';
import styles from '@/views/public/styles/Courses.module.scss';

const pad = (n) => String(n).padStart(2, '0');

// 🔥 OBSERVER GLOBAL
let observer;

const getObserver = (callback) => {
    if (!observer) {
        observer = new IntersectionObserver(callback, {
            threshold: 0.1,
            rootMargin: '100px',
        });
    }
    return observer;
};

const Countdown = memo(({ targetDate }) => {

    const ref = useRef(null);
    const intervalRef = useRef(null);
    const visibleRef = useRef(false);

    const calculateTime = () => {
        const diff = new Date(targetDate).getTime() - Date.now();
        if (diff <= 0) return null;

        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff / 3600000) % 24),
            m: Math.floor((diff / 60000) % 60),
            s: Math.floor((diff / 1000) % 60),
            diff
        };
    };

    const [time, setTime] = useState(calculateTime);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observerInstance = getObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target !== el) return;

                if (entry.isIntersecting) {
                    visibleRef.current = true;

                    // 🔥 iniciar solo si no existe
                    if (!intervalRef.current) {
                        const initial = calculateTime();
                        if (!initial) return;

                        const isLessThanDay = initial.diff < 86400000;
                        const intervalTime = isLessThanDay ? 1000 : 60000;

                        intervalRef.current = setInterval(() => {
                            if (!visibleRef.current) return;

                            setTime((prev) => {
                                const next = calculateTime();
                                if (!next) {
                                    clearInterval(intervalRef.current);
                                    intervalRef.current = null;
                                    return null;
                                }
                                return next;
                            });
                        }, intervalTime);

                        // 🔥 log útil real
                        if (import.meta.env.DEV) {
                            console.log('⏱ Countdown iniciado:', intervalTime);
                        }
                    }

                } else {
                    visibleRef.current = false;

                    // 🔥 pausar (no destruir completamente si quieres ultra perf)
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            });
        });

        observerInstance.observe(el);

        return () => {
            observerInstance.unobserve(el);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, [targetDate]);

    if (!time) {
        return <span ref={ref} className={styles.countdown}>¡Inició! 🚀</span>;
    }

    const { d, h, m, s, diff } = time;
    const isLessThanDay = diff < 86400000;
    const isUrgent = d === 0 && h === 0;

    return (
        <div
            ref={ref}
            className={styles.countdown}
            style={{ fontVariantNumeric: 'tabular-nums' }}
        >
            <span>⏱ </span>

            {d > 0 && <span>{d}d </span>}
            {(d > 0 || h > 0) && <span>{pad(h)}h </span>}
            <span>{pad(m)}m </span>

            {isLessThanDay && (
                <span className={`${styles.seconds} ${isUrgent ? styles.urgent : ''}`}>
                    {pad(s)}s
                </span>
            )}
        </div>
    );
});

export default Countdown;