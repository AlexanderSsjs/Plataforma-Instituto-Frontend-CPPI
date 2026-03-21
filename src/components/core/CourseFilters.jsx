import React from 'react';
import { Search } from 'lucide-react';
import styles from '@/views/public/styles/Courses.module.scss';
import InView from '@/components/core/InView';
import SortDropdown from '@/components/core/SortDropdown';

/**
 * Componente que renderiza um conjunto de filtros para cursos,
 * contendo com um campo de busca, seletores de tipo de curso
 * e uma escala de avaliao.
 *
 * @param {string} search - valor do campo de busca
 * @param {function} setSearch - funo para atualizar o valor do campo de busca
 * @param {string} filterType - tipo de curso selecionado ( vivo, virtual)
 * @param {function} setFilterType - funo para atualizar o tipo de curso selecionado
 * @param {number} minRating - avaliao minima selecionada (4.5, 4.8, 0)
 * @param {function} setMinRating - funo para atualizar a avaliao minima selecionada
 */
const CourseFilters = ({
    search,
    setSearch,
    filterType,
    setFilterType,
    minRating,
    setMinRating,
    setSort,
    sort,
}) => {
    return (
        <InView duration={0.6}>
            <div className={styles.searchSection}>
                <div className={styles.filterBar}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search size={18} className={styles.searchIcon} />
                    </div>
                    <div className={styles.tabs}>
                        {['vivo', 'virtual'].map((type) => (
                            <button
                                key={type}
                                className={`${filterType === type ? styles.active : ''} ${styles[type]}`}
                                onClick={() => setFilterType(type)}
                            >
                                {type === 'vivo' && (
                                    <>
                                        <span className={styles.icon}>🔴</span>
                                        <span className={styles.text}>En vivo</span>
                                    </>
                                )}
                                {type === 'virtual' && (
                                    <>
                                        <span className={styles.icon}>🔵</span>
                                        <span className={styles.text}>Virtual</span>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className={styles.sort}>
                        <SortDropdown value={sort} onChange={setSort} />
                    </div>
                </div>
            </div>
        </InView>
    );
};

export default CourseFilters;
