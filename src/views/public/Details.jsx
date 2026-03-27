import { useParams, useLocation } from 'react-router-dom'; // 👈 Importamos useLocation
import TYPES from '@/data/type_courses.json';
import SCHEDULE from '@/data/courses_schedule.json';

import HeroCourse from '@/components/common/HeroCourse';
import LiveInfoCard from '@/components/common/LiveInfoCard';
import CourseAccordion from '@/components/common/CourseAccordion';
import PriceCard from '@/components/common/PriceCard';

import styles from '../public/styles/Details.module.scss';

const Details = () => {
    const { id } = useParams();
    const location = useLocation(); // 👈 Inicializamos useLocation
    const cursoId = Number(id);
    const passedType = location.state?.type || 'virtual';
    const isLiveSession = passedType === 'vivo'; // En tu CourseCard usas 'vivo', así que lo mantenemos igual
    const course = TYPES.cursos.find((c) => c.id === cursoId);
    const schedule = isLiveSession 
        ? SCHEDULE.cursos_programados.find((s) => s.curso_id === cursoId && s.estado === 'activo')
        : null;

    if (!course) return <div className={styles.error}>Error: Curso no encontrado</div>;

    const showLiveComponents = isLiveSession && Boolean(schedule);

    return (
        <div className={styles.detailsPage}>
            <HeroCourse course={course} schedule={schedule} isLive={showLiveComponents} />
            
            <div className={styles.container}>
                <div className={styles.mainLayout}>
                    <div>
                        {showLiveComponents ? (
                            <LiveInfoCard schedule={schedule} />
                        ) : (
                            <div className={styles.virtualInfoText}>
                                <h3>💻 Curso Virtual: Acceso inmediato y de por vida.</h3>
                            </div>
                        )}
                        
                        <CourseAccordion categorias={course.categorias} />
                    </div>
                    
                    <aside className={styles.sidebar}>
                        <PriceCard 
                            course={course} 
                            schedule={schedule} 
                            isLive={showLiveComponents} 
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Details;