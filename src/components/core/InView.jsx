import { useEffect, useRef, useState } from 'react';

const InView = ({
    children,
    threshold = 0.15,
    delay = 0,
    duration = 0.8,
    triggerOnce = false,

    distance = 80,
    blur = 6,
    scale = 0.96,

    initialDirection = 'down',    
    reenterFromTop = 'left',      
    reenterFromBottom = 'right',  

    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [entryDirection, setEntryDirection] = useState(initialDirection);

    const domRef = useRef(null);
    const lastScrollY = useRef(0);

    // detectar dirección del scroll
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setScrollDirection(current > lastScrollY.current ? 'down' : 'up');
            lastScrollY.current = current;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // 🔥 decidir dirección SOLO cuando entra
                    if (!hasEntered) {
                        setEntryDirection(initialDirection);
                        setHasEntered(true);
                    } else {
                        if (scrollDirection === 'down') {
                            setEntryDirection(reenterFromBottom);
                        } else {
                            setEntryDirection(reenterFromTop);
                        }
                    }

                    setIsVisible(true);

                    if (triggerOnce) observer.unobserve(entry.target);
                } else {
                    if (!triggerOnce) setIsVisible(false);
                }
            },
            { threshold }
        );

        const current = domRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [threshold, triggerOnce, scrollDirection, hasEntered]);

    const getTransform = () => {
        switch (entryDirection) {
            case 'up':
                return `translateY(${distance}px)`;
            case 'down':
                return `translateY(-${distance}px)`;
            case 'left':
                return `translateX(${distance}px)`;
            case 'right':
                return `translateX(-${distance}px)`;
            default:
                return `translateY(${distance}px)`;
        }
    };

    return (
        <div
            ref={domRef}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? `translate(0,0) scale(1)`
                    : `${getTransform()} scale(${scale})`,
                filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,

                transition: `
                    opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s,
                    transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s,
                    filter ${duration}s ease ${delay}s
                `,
                willChange: 'transform, opacity, filter',
                width: '100%',
            }}
        >
            {children}
        </div>
    );
};

export default InView;