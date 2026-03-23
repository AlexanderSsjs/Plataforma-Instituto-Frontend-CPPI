import { useState, useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = ({
    initialCount = 6,
    step = 6,
    total = 0,
    resetDependencies = [],
} = {}) => {

    const [visibleCount, setVisibleCount] = useState(initialCount);

    const loaderRef = useRef(null);
    const observerRef = useRef(null);

    // 🔥 refs internos (sin re-render)
    const visibleRef = useRef(initialCount);
    const totalRef = useRef(total);
    const isLoadingRef = useRef(false); // 🔥 lock

    const hasMore = visibleCount < total;

    // 🔄 sync total
    useEffect(() => {
        totalRef.current = total;
    }, [total]);

    // 🔄 reset inteligente
    useEffect(() => {
        visibleRef.current = initialCount;
        setVisibleCount(initialCount);
        isLoadingRef.current = false;

        if (import.meta.env.DEV && window.__PERF_MONITOR__) {
            console.log('⚡ InfiniteScroll reset:', {
                initialCount,
                total,
            });
        }
    }, [initialCount, total, ...resetDependencies]);

    const handleIntersect = useCallback((entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        // 🔥 evitar múltiples ejecuciones
        if (isLoadingRef.current) return;

        const current = visibleRef.current;
        const max = totalRef.current;

        if (current >= max) return;

        isLoadingRef.current = true;

        const next = Math.min(current + step, max);

        visibleRef.current = next;
        setVisibleCount(next);

        // 🔥 liberar lock en el siguiente frame (ultra fluido)
        requestAnimationFrame(() => {
            isLoadingRef.current = false;
        });

        if (import.meta.env.DEV && window.__PERF_MONITOR__) {
            console.log('📈 Load more:', {
                from: current,
                to: next,
            });
        }

    }, [step]);

    // 👀 observer SOLO UNA VEZ
    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;

        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '250px', // 🔥 preload estilo Netflix
            threshold: 0.01,
        });

        observerRef.current.observe(el);

        return () => observerRef.current?.disconnect();

    }, [handleIntersect]);

    return {
        visibleCount,
        loaderRef,
        hasMore,
    };
};

export default useInfiniteScroll;