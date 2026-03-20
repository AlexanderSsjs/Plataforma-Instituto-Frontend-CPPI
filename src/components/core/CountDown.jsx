import { useEffect, useState } from 'react';

const Countdown = ({ targetDate, showSeconds = false }) => {
    const getTimeLeft = () => {
        const diff = new Date(targetDate) - new Date();

        if (diff <= 0) {
            return null; // ya empezó
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // 🎯 si ya terminó
    if (!time) {
        return <span className="countdown-end">Inició</span>;
    }

    return (
        <div className="countdown">
            ⏱ {time.days}d {time.hours}h {time.minutes}m 
            {showSeconds && ` ${time.seconds}s`}
        </div>
    );
};

export default Countdown;