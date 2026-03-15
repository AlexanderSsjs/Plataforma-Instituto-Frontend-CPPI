import { Link } from 'react-router-dom';
import styles from './styles/Home.module.scss';

const Home = () => {
    return (
        <main className={styles.hero}>
            <div className={styles.container}>
                <span className={styles.badge}>Formación de Alto Impacto</span>
                <h1>Construye tu Futuro con <span>CCIP</span></h1>
                <p>Formación técnica de alta calidad diseñada para los retos del mundo digital actual.</p>
                
                <div className={styles.cta}>
                    <Link to="/cursos" className={styles.btnMain}>Ver Programas</Link>
                    {/* Puedes agregar un botón secundario aquí */}
                </div>
            </div>
        </main>
    );
};

export default Home;
