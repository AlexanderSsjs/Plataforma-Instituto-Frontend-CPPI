import { CheckCircle } from 'lucide-react';
import styles from '../../views/public/styles/Details.module.scss';

const PriceCard = ({ course, schedule, promoActive, promoPrice }) => {
    
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

    if (!course || !course.precio) {
        return (
            <div className={styles.cardPrice}>
                <h2>Consultar</h2>
            </div>
        );
    }

    // 🔥 Determinamos qué precio mostrar
    const finalPrice = promoActive ? promoPrice : course.precio.monto;

    return (
        <div className={styles.cardPrice}>
            {/* Contenedor de precio con lógica de descuento */}
            <div className={styles.priceWrapper}>
                <h2 className={promoActive ? styles.salePrice : ''}>
                    {formatPrice(finalPrice, course.precio.moneda)}
                </h2>
            </div>

            {schedule && (
                <p className={styles.alert}>
                    Últimos {schedule.cupo_maximo - schedule.inscritos} cupos
                </p>
            )}

            <button className={styles.btnEnroll}>Inscribirme ahora</button>

            <ul>
                <li>
                    <CheckCircle size={18} /> Certificado
                </li>
                <li>
                    <CheckCircle size={18} /> Material
                </li>
                <li>
                    <CheckCircle size={18} /> Acceso 24/7
                </li>
            </ul>
        </div>
    );
};

export default PriceCard;