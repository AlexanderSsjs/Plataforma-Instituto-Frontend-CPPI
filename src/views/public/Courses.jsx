import React, { useState, useMemo, useCallback } from 'react';
import { Monitor, BookOpen } from 'lucide-react';
import InView from '@/components/core/InView';
import CardCources from '@/components/core/CardCources';
import CourseFilters from '@/components/core/CourseFilters';
import styles from '../public/styles/Courses.module.scss';
import PromoCard from '../../components/core/promoCard';
import useInfiniteScroll from '@/components/hooks/useInfiniteScroll';
import COURSES_DATA from '@/data/courses';

const DEBUG = false;

const Courses = () => {

    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState('default');

    const getDelay = useCallback((i) => (i % 6) * 0.05, []);
    const filtered = useMemo(() => {
        const result = COURSES_DATA
            .filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase()) &&
                (filterType === 'all' || c.type === filterType) &&
                c.rating >= minRating
            )
            .sort((a, b) => {
                if (sort === 'price-low') return a.price - b.price;
                if (sort === 'price-high') return b.price - a.price;
                if (sort === 'rating') return b.rating - a.rating;
                return 0;
            });

        if (DEBUG) console.debug('Filtered:', result.length);

        return result;
    }, [search, filterType, minRating, sort]);

    const vivoCourses = useMemo(() => {
        return filtered
            .filter((c) => c.type === 'vivo')
            .sort((a, b) => new Date(a.date) - new Date(b.date));
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

    const visibleVivo = useMemo(
        () => vivoCourses.slice(0, vivoScroll.visibleCount),
        [vivoCourses, vivoScroll.visibleCount]
    );

    const visibleVirtual = useMemo(
        () => virtualCourses.slice(0, virtualScroll.visibleCount),
        [virtualCourses, virtualScroll.visibleCount]
    );

    const renderVivo = useMemo(() => {
        return visibleVivo.map((c, i) => (
            <InView
                key={c.id}
                delay={getDelay(i)}
                direction="up"
            >
                <CardCources course={c} />
            </InView>
        ));
    }, [visibleVivo, getDelay]);

    const renderVirtual = useMemo(() => {
        return visibleVirtual.map((c, i) => (
            <InView
                key={c.id}
                delay={getDelay(i)}
                direction="left"
            >
                <CardCources course={c} />
            </InView>
        ));
    }, [visibleVirtual, getDelay]);

    return (
        <section className={styles.container}>

            <InView direction="up" scale={0.96} delay={0.2}>
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

                {/* VIVO */}
                {vivoCourses.length > 0 && (
                    <>
                        <InView direction="up" distance={40}>
                            <div className={styles.sectionHeader}>
                                <Monitor />
                                <h2>Clases en Vivo</h2>
                            </div>
                        </InView>

                        <div className={styles.mainGrid}>
                            {renderVivo}
                        </div>

                        {vivoScroll.hasMore && (
                            <div ref={vivoScroll.loaderRef} className={styles.infiniteLoader} />
                        )}
                    </>
                )}

                {/* VIRTUAL */}
                {virtualCourses.length > 0 && (
                    <>
                        <InView direction="right" distance={40} className={styles.mt}>
                            <div className={styles.sectionHeader}>
                                <BookOpen size={20} />
                                <h2>Cursos Virtuales</h2>
                            </div>
                        </InView>

                        <div className={styles.mainGrid}>
                            {renderVirtual}
                        </div>

                        {virtualScroll.hasMore && (
                            <div ref={virtualScroll.loaderRef} className={styles.infiniteLoader} />
                        )}
                    </>
                )}

                {/* VACÍO */}
                {filtered.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No se encontraron cursos.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;