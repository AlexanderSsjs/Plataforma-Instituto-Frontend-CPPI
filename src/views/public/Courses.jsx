import React, { useState, useMemo, useCallback } from 'react';
import { Monitor, BookOpen } from 'lucide-react';
import InView from '@/components/core/InView';
import CardCources from '@/components/core/CardCources';
import CourseFilters from '@/components/core/CourseFilters';
import styles from '../public/styles/Courses.module.scss';
import PromoCard from '../../components/core/promoCard';
import useInfiniteScroll from '@/components/hooks/useInfiniteScroll';

// 🔥 NUEVOS JSON
import TYPES from '@/data/type_courses.json';
import SCHEDULE from '@/data/courses_schedule.json';

const DEBUG = false;

const Courses = () => {

    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');

    const getDelay = useCallback((i) => (i % 6) * 0.05, []);

    // 🔥 1. CURSOS EN VIVO (MERGE)
    const vivoCourses = useMemo(() => {
        return SCHEDULE.cursos_programados.map((s) => {
            const base = TYPES.cursos.find(c => c.id === s.curso_id);
            if (!base) return null;

            return {
                id: s.id,
                nombre: base.nombre,
                descripcion: base.descripcion,
                imagen_url: base.imagen_url,
                precio: base.precio,
                horas: base.horas,
                date: `${s.fecha_inicio}T${s.hora_inicio}`,
                type: 'vivo'
            };
        }).filter(Boolean);
    }, []);

    // 🔥 2. CURSOS VIRTUALES
    const virtualCourses = useMemo(() => {
        return TYPES.cursos.map(c => ({
            ...c,
            type: 'virtual'
        }));
    }, []);

    // 🔥 3. UNIFICAR
    const allCourses = useMemo(() => {
        return [...vivoCourses, ...virtualCourses];
    }, [vivoCourses, virtualCourses]);

    // 🔥 4. FILTRO
    const filtered = useMemo(() => {
        const result = allCourses.filter((c) =>
            c.nombre.toLowerCase().includes(search.toLowerCase()) &&
            (filterType === 'all' || c.type === filterType)
        );

        if (DEBUG) console.debug('Filtered:', result.length);

        return result;
    }, [allCourses, search, filterType]);

    // 🔥 5. SEPARAR
    const vivoFiltered = useMemo(() => {
        return filtered
            .filter(c => c.type === 'vivo')
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [filtered]);

    const virtualFiltered = useMemo(() => {
        return filtered.filter(c => c.type === 'virtual');
    }, [filtered]);

    // 🔥 6. SCROLL
    const vivoScroll = useInfiniteScroll({
        initialCount: 6,
        step: 6,
        total: vivoFiltered.length,
        resetDependencies: [search, filterType],
    });

    const virtualScroll = useInfiniteScroll({
        initialCount: 6,
        step: 6,
        total: virtualFiltered.length,
        resetDependencies: [search, filterType],
    });

    const visibleVivo = useMemo(
        () => vivoFiltered.slice(0, vivoScroll.visibleCount),
        [vivoFiltered, vivoScroll.visibleCount]
    );

    const visibleVirtual = useMemo(
        () => virtualFiltered.slice(0, virtualScroll.visibleCount),
        [virtualFiltered, virtualScroll.visibleCount]
    );

    // 🔥 7. RENDER
    const renderVivo = useMemo(() => {
        return visibleVivo.map((c, i) => (
            <InView key={c.id} delay={getDelay(i)} direction="up">
                <CardCources course={c} type="vivo" />
            </InView>
        ));
    }, [visibleVivo, getDelay]);

    const renderVirtual = useMemo(() => {
        return visibleVirtual.map((c, i) => (
            <InView key={c.id} delay={getDelay(i)} direction="left">
                <CardCources course={c} type="virtual" />
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
                />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* 🔴 VIVO */}
                {vivoFiltered.length > 0 && (
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

                {/* 🔵 VIRTUAL */}
                {virtualFiltered.length > 0 && (
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