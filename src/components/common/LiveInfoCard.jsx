import { Calendar, Clock, Users } from 'lucide-react';
import styles from '../../views/public/styles/Details.module.scss';

const LiveInfoCard = ({ schedule }) => {
    if (!schedule) return null;

    return (
        <div className={styles.cardLive}>
            <h3>Próximo inicio</h3>

            <div className={styles.grid}>
                <div>
                    <Calendar />
                    <span>{schedule.fecha_inicio}</span>
                </div>

                <div>
                    <Clock />
                    <span>{schedule.hora_inicio}</span>
                </div>

                <div>
                    <Users />
                    <span>{schedule.inscritos}/{schedule.cupo_maximo}</span>
                </div>
            </div>
        </div>
    );
};

export default LiveInfoCard;