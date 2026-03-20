// src/components/common/RatingItem.jsx
import styles from '@/views/public/styles/Home.module.scss';

const RatingItem = ({ Icon, value, label }) => {
    // Si no llega el icono, evitamos que rompa
    if (!Icon) return null;

    return (
        <div className={styles.stat}>
            <Icon size={30} className={styles.icon} />
            <div className={styles.rating}>
                <span className={styles.ratingValue}>{value}</span>
                <div className={styles.ratingText}>{label}</div>
            </div>
        </div>
    );
};

export default RatingItem;