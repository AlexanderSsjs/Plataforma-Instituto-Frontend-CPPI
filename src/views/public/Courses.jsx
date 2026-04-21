import React, { useState, useMemo, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import InView from '@/components/core/InView';
import CardCources from '@/components/core/CardCources';
import CourseFilters from '@/components/core/CourseFilters';
import styles from '../public/styles/Courses.module.scss';
import PromoCard from '../../components/core/promoCard';
import useInfiniteScroll from '@/components/hooks/useInfiniteScroll';

// 🔥 JSON
import TYPES from '@/data/type_courses.json';

const DEBUG = false;
const GLOBAL_DISCOUNT = {
    enabled: true,
    price: 70,
    start: '2026-04-01T00:00:00',
    end: '2026-04-30T23:59:59',
};

/**
 * Returns true if the promo is currently active and false otherwise.
 * The promo is considered active if the current date is between the start and end dates.
 * If the promo is not enabled, the function will return false.
 * @returns {boolean} true if the promo is active, false otherwise
 */
const isPromoActive = () => {
    if (!GLOBAL_DISCOUNT.enabled) return false;

    const now = new Date();
    return now >= new Date(GLOBAL_DISCOUNT.start) && now <= new Date(GLOBAL_DISCOUNT.end);
};

const Courses = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('default');
    const [selectedCourse, setSelectedCourse] = useState('');

    const getDelay = useCallback((i) => (i % 6) * 0.05, []);

    const courses = useMemo(() => {
        return TYPES.cursos || [];
    }, []);

    const courseOptions = useMemo(() => {
        return courses.map((c) => ({
            value: c.nombre,
            label: c.nombre,
        }));
    }, [courses]);

    const filtered = useMemo(() => {
        let result = courses.filter((c) => {
            const text = search.toLowerCase();

            const matchSearch =
                c.nombre.toLowerCase().includes(text) ||
                c.nombre_completo.toLowerCase().includes(text) ||
                c.descripcion.toLowerCase().includes(text);

            // 🔥 FILTRO POR DROPDOWN (ID)
            const matchDropdown = sort === 'default' || c.id.toString() === sort;

            return matchSearch && matchDropdown;
        });

        if (DEBUG) console.debug('Filtered:', result.length);

        return result;
    }, [courses, search, sort]);

    const scroll = useInfiniteScroll({
        initialCount: 12,
        step: 12,
        total: filtered.length,
        resetDependencies: [search, sort, selectedCourse],
    });

    const visibleCourses = useMemo(
        () => filtered.slice(0, scroll.visibleCount),
        [filtered, scroll.visibleCount],
    );

    const promoActive = isPromoActive();

    // ✅ RENDER
    const renderCourses = useMemo(() => {
        return visibleCourses.map((c, i) => (
            <InView key={c.id} delay={getDelay(i)} direction="up">
                <CardCources
                    course={c}
                    promoActive={promoActive}
                    promoPrice={GLOBAL_DISCOUNT.price}
                />
            </InView>
        ));
    }, [visibleCourses, getDelay, promoActive]);

    return (
        <section className={styles.container}>
            <InView direction="up" scale={0.96} delay={0.2}>
                <PromoCard />
            </InView>

            <div style={{ position: 'relative', zIndex: 100 }}>
                <CourseFilters
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    options={courseOptions}
                />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                {filtered.length > 0 && (
                    <>
                        <InView direction="up" distance={40}>
                            <div className={styles.sectionHeader}>
                                <BookOpen size={20} />
                                <h2>Cursos</h2>
                            </div>
                        </InView>

                        <div className={styles.mainGrid}>{renderCourses}</div>

                        {scroll.hasMore && (
                            <div ref={scroll.loaderRef} className={styles.infiniteLoader} />
                        )}
                    </>
                )}

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
