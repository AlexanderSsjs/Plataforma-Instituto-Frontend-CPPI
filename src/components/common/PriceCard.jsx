import { CheckCircle } from 'lucide-react';
import styles from '../../views/public/styles/Details.module.scss';

const PriceCard = ({ course, schedule }) => {
    const formatPrice = (monto, moneda) => {
        try {
            return new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: moneda || 'PEN',
            }).format(monto);
        } catch {
            return `S/ ${monto}`;
        }
    };
    console.log(course);
    if (!course || !course.precio) {
        return (
            <div className={styles.cardPrice}>
                <h2>Consultar</h2>
            </div>
        );
    }
    return (
        <div className={styles.cardPrice}>
            <h2>{formatPrice(course.precio.monto, course.precio.moneda)}</h2>

            {schedule && (
                <p className={styles.alert}>
                    Últimos {schedule.cupo_maximo - schedule.inscritos} cupos
                </p>
            )}

            <button>Inscribirme ahora</button>

            <ul>
                <li>
                    <CheckCircle /> Certificado
                </li>
                <li>
                    <CheckCircle /> Material
                </li>
                <li>
                    <CheckCircle /> Acceso 24/7
                </li>
            </ul>
        </div>
    );
};

export default PriceCard;
