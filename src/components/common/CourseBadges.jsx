import { Clock, BookOpen, Video } from 'lucide-react';
import styles from '../../views/public/styles/Details.module.scss';

const CourseBadges = ({ course, schedule }) => {
    return (
        <div className={styles.badges}>
            <span><Clock size={16}/> {course.horas} Horas</span>
            <span><BookOpen size={16}/> {course.categorias.length} Módulos</span>
            
            {schedule && (
                <span className={styles.live}>
                    <Video size={16}/> {schedule.modalidad}
                </span>
            )}
        </div>
    );
};

export default CourseBadges;