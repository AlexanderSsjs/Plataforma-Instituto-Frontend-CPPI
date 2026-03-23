import { useEffect, useRef } from 'react';

let observer;

const getObserver = () => {
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const el = entry.target;

                    if (el.dataset.animated === 'true') return;

                    el.dataset.animated = 'true';
                    el.classList.add('inview-visible');

                    if (import.meta.env.DEV && window.__PERF_MONITOR__) {
                        console.log('👁️ InView triggered');
                    }

                    observer.unobserve(el);
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.15,
            },
        );
    }

    return observer;
};

const InView = ({
    children,
    delay = 0,
    duration = 0.5,
    distance = 60,
    scale = 0.96,
    direction = 'up',
    className = '',
}) => {
    const ref = useRef(null);
    console.log('🧩 InView render');
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // 🔥 detectar mobile una sola vez
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        const finalDistance = isMobile ? distance * 0.6 : distance;
        const finalDuration = isMobile ? duration * 0.8 : duration;

        // 🔥 transform sin función extra (más rápido)
        let transform;
        if (direction === 'up') transform = `translateY(${finalDistance}px)`;
        else if (direction === 'down') transform = `translateY(-${finalDistance}px)`;
        else if (direction === 'left') transform = `translateX(${finalDistance}px)`;
        else if (direction === 'right') transform = `translateX(-${finalDistance}px)`;
        else transform = `translateY(${finalDistance}px)`;

        // 🔥 aplicar todo junto (menos reflow)
        el.style.cssText += `
            --delay: ${delay}s;
            --duration: ${finalDuration}s;
            --scale-start: ${scale};
            --transform-start: ${transform};
        `;

        const obs = getObserver();
        obs.observe(el);

        return () => {
            obs.unobserve(el);
        };
    }, []); // 🔥 sin dependencias (clave performance)

    return (
        <div ref={ref} className={`inview ${className}`}>
            {children}
        </div>
    );
};

export default InView;
