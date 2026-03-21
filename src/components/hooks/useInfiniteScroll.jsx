import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook profesional para scroll infinito
 * @param {Object} config
 * @param {number} config.initialCount
 * @param {number} config.step
 * @param {number} config.total
 * @param {Array} config.resetDependencies
 */
const useInfiniteScroll = ({
    initialCount = 6,
    step = 6,
    total = 0,
    resetDependencies = [],
} = {}) => {

    const [visibleCount, setVisibleCount] = useState(initialCount);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);
    const observerRef = useRef(null);

    // Reset cuando cambian filtros
    useEffect(() => {
        setVisibleCount(initialCount);
    }, [initialCount, ...resetDependencies]);

    // Saber si aún hay más elementos
    const hasMore = visibleCount < total;

    const handleIntersect = useCallback((entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting || isLoading || !hasMore) return;

        setIsLoading(true);

        // Simula pequeña espera (evita múltiples disparos seguidos)
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + step, total));
            setIsLoading(false);
        }, 200); // puedes ajustar
    }, [isLoading, hasMore, step, total]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '150px', // carga antes de llegar
            threshold: 0.1,
        });

        const current = loaderRef.current;
        if (current) observerRef.current.observe(current);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [handleIntersect]);

    return {
        visibleCount,
        loaderRef,
        isLoading,
        hasMore,
    };
};

export default useInfiniteScroll;