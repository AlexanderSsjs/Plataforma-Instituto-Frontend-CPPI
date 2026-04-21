import React from 'react';
import { Search } from 'lucide-react';
import styles from '@/views/public/styles/Courses.module.scss';
import InView from '@/components/core/InView';
import SortDropdown from '@/components/core/SortDropdown';

/**
 * Filtros de cursos:
 * - Búsqueda por nombre
 * - Ordenamiento
 */
const CourseFilters = ({
    search,
    setSearch,
    setSort,
    sort,
}) => {
    return (
        <InView duration={0.6}>
            <div className={styles.searchSection}>
                <div className={styles.filterBar}>

                    {/* 🔍 BUSCADOR */}
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search size={18} className={styles.searchIcon} />
                    </div>

                    {/* 🔽 ORDENAMIENTO */}
                    <div className={styles.sort}>
                        <SortDropdown value={sort} onChange={setSort} />
                    </div>

                </div>
            </div>
        </InView>
    );
};

export default CourseFilters;