import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CourseBadges from './CourseBadges';
import styles from '../../views/public/styles/Details.module.scss';

const HeroCourse = ({ course, schedule }) => {
    return (
        <header 
            className={styles.hero}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.16), rgba(0,0,0,0.65)), url(${course.imagen_url})`
            }}
        >
            <div className={styles.container}>
                <Link to="/cursos" className={styles.backLink}>
                    <ArrowLeft size={20} /> Volver a cursos
                </Link>

                <h1 className={styles.title}> {course.nombre_completo}</h1>
                <p className={styles.description}>{course.descripcion}</p>

                <CourseBadges course={course} schedule={schedule} />
            </div>
        </header>
    );
};

export default HeroCourse;