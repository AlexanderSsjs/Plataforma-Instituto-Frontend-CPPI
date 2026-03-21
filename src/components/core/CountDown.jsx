import React, { useEffect, useState, useCallback, memo } from 'react';
import styles from '@/views/public/styles/Courses.module.scss'; // Asegúrate de importar tus estilos

const pad = (n) => String(n).padStart(2, '0');

const Countdown = memo(({ targetDate, showSeconds = true }) => {
    const calculateTime = useCallback(() => {
        const diff = new Date(targetDate).getTime() - Date.now();
        if (diff <= 0) return null;

        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff / 3600000) % 24),
            m: Math.floor((diff / 60000) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    }, [targetDate]);

    const [time, setTime] = useState(calculateTime());

    useEffect(() => {
        const timer = setInterval(() => {
            const nextTime = calculateTime();
            setTime(nextTime);
            if (!nextTime) clearInterval(timer);
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTime]);

    if (!time) return <span className={styles.countdown}>¡Inició! 🚀</span>;

    const { d, h, m, s } = time;
    const isUrgent = d === 0 && h === 0;

    return (
        <div className={styles.countdown} style={{ fontVariantNumeric: 'tabular-nums' }}>
                <span>⏱ </span>
                {d > 0 && <span>{d}d </span>}
                {(d > 0 || h > 0) && <span>{pad(h)}h </span>}
                <span>{pad(m)}m </span>
                {showSeconds && (
                    <span className={`${styles.seconds} ${isUrgent ? styles.urgent : ''}`}>
                        {pad(s)}s
                    </span>
                )}
        </div>
    );
});

export default Countdown;
