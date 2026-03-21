import React, { useState, useMemo } from 'react';
import { Monitor, BookOpen } from 'lucide-react';
import InView from '@/components/core/InView';
import CardCources from '@/components/core/CardCources';
import CourseFilters from '@/components/core/CourseFilters';
import styles from '../public/styles/Courses.module.scss';
import PromoCard from '../../components/core/promoCard';
import useInfiniteScroll from '@/components/hooks/useInfiniteScroll';
import COURSES_DATA from '@/data/courses';

const Courses = () => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState('default');

    const filtered = useMemo(() => {
        return COURSES_DATA.filter((c) => {
            const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
            const matchType = filterType === 'all' || c.type === filterType;
            const matchRating = c.rating >= minRating;
            return matchSearch && matchType && matchRating;
        }).sort((a, b) => {
            if (sort === 'price-low') return a.price - b.price;
            if (sort === 'price-high') return b.price - a.price;
            if (sort === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [search, filterType, minRating, sort]);

    const vivoCourses = useMemo(() => {
        const now = new Date();

        return filtered
            .filter((c) => c.type === 'vivo')
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Prioridad: próximos primero
                const diffA = dateA - now;
                const diffB = dateB - now;

                return diffA - diffB;
            });
    }, [filtered]);

    const virtualCourses = useMemo(() => {
        return filtered.filter((c) => c.type === 'virtual');
    }, [filtered]);

    const vivoScroll = useInfiniteScroll({
        initialCount: 6,
        step: 6,
        total: vivoCourses.length,
        resetDependencies: [search, filterType, minRating, sort],
    });

    const virtualScroll = useInfiniteScroll({
        initialCount: 6,
        step: 6,
        total: virtualCourses.length,
        resetDependencies: [search, filterType, minRating, sort],
    });

    const visibleVivo = vivoCourses.slice(0, vivoScroll.visibleCount);
    const visibleVirtual = virtualCourses.slice(0, virtualScroll.visibleCount);
    console.log('TOTAL VIVO:', vivoCourses.length);
    console.log('VISIBLE VIVO:', visibleVivo.length);

    console.log('TOTAL VIRTUAL:', virtualCourses.length);
    console.log('VISIBLE VIRTUAL:', visibleVirtual.length);
    return (
        <section className={styles.container}>
            <InView direction="none" scale={0.96} delay={0.2}>
                <PromoCard />
            </InView>
            <div style={{ position: 'relative', zIndex: 100 }}>
                <CourseFilters
                    search={search}
                    setSearch={setSearch}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    setSort={setSort}
                    sort={sort}
                />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                {vivoCourses.length > 0 && (
                    <>
                        <InView direction="right" distance={40}>
                            <div className={styles.sectionHeader}>
                                <Monitor/>
                                <h2>Clases en Vivo (Próximas primero)</h2>
                            </div>
                        </InView>

                        <div className={styles.mainGrid}>
                            {visibleVivo.map((c, i) => (
                                <InView key={c.id} delay={i * 0.05} direction="up">
                                    <CardCources course={c} />
                                </InView>
                            ))}
                        </div>

                        {vivoScroll.hasMore && (
                            <div ref={vivoScroll.loaderRef} className={styles.infiniteLoader}>
                                {vivoScroll.isLoading && (
                                    <span className={styles.spinner}>Cargando más...</span>
                                )}
                            </div>
                        )}
                    </>
                )}
                {virtualCourses.length > 0 && (
                    <>
                        <InView direction="right" distance={40} className={styles.mt}>
                            <div className={styles.sectionHeader}>
                                <BookOpen size={20} />
                                <h2>Cursos Virtuales</h2>
                            </div>
                        </InView>

                        <div className={styles.mainGrid}>
                            {visibleVirtual.map((c, i) => (
                                <InView key={c.id} delay={i * 0.05} direction="left">
                                    <CardCources course={c} />
                                </InView>
                            ))}
                        </div>

                        {virtualScroll.hasMore && (
                            <div ref={virtualScroll.loaderRef} className={styles.infiniteLoader}>
                                {virtualScroll.isLoading && (
                                    <span className={styles.spinner}>Cargando más...</span>
                                )}
                            </div>
                        )}
                    </>
                )}

                {filtered.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No se encontraron cursos con esos filtros.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;
