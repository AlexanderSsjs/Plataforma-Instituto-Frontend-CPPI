import { useState } from 'react';
import { 
    User, Mail, Phone, MapPin, Search,
    TrendingUp, CheckCircle, 
    FileText, Calendar, ArrowLeft 
} from 'lucide-react';
import styles from './detallealumno.module.scss'; 

const DetalleAlumno = () => {
    const [searchId, setSearchId] = useState('');
    
    // Datos simulados (esto luego vendrá de una base de datos)
    const alumno = {
        nombre: "Cristian Perez",
        id: "ALU-2026-089",
        carrera: "Ingeniería de Sistemas",
        email: "cristian.perez@cppi.edu.pe",
        asistencia: 88,
        promedio: 16.8,
        estado: "Regular",
        faltas: 2
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Buscando alumno con ID:", searchId);
        // Aquí podrías disparar una función para buscar en tu base de datos
    };

    return (
        <div className={styles.container}>
            {/* BUSCADOR SUPERIOR */}
            <div className={styles.searchBar}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputGroup}>
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar alumno por ID (ej: ALU-2026)..." 
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </div>
                    <button type="submit">Buscar</button>
                </form>
            </div>

            <header className={styles.header}>
                <div className={styles.avatar}>
                    <User size={45} color="#333" />
                </div>
                <div className={styles.info}>
                    <div className={styles.titleRow}>
                        <h1>{alumno.nombre}</h1>
                        <span className={styles.badgeEstado}>{alumno.estado}</span>
                    </div>
                    <p>{alumno.carrera} • {alumno.id}</p>
                </div>
            </header>

            <div className={styles.gridInfo}>
                <section className={styles.card}>
                    <h2><TrendingUp size={18} /> Promedio General</h2>
                    <div className={styles.statValue}>{alumno.promedio}</div>
                </section>

                <section className={styles.card}>
                    <h2><CheckCircle size={18} /> Asistencia Total</h2>
                    <div className={styles.statValue}>{alumno.asistencia}%</div>
                </section>

                <section className={styles.card}>
                    <h2><Calendar size={18} /> Inasistencias</h2>
                    <div className={styles.statValue}>{alumno.faltas}</div>
                </section>
            </div>

            <section className={styles.card} style={{ marginTop: '2rem' }}>
                <h2 className={styles.tableTitle}><FileText size={20} /> Registro de Calificaciones</h2>
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Nota 3</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Desarrollo Web Frontend</strong></td>
                                <td>18</td>
                                <td>15</td>
                                <td>17</td>
                                <td className={styles.notaFinal}>16.6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default DetalleAlumno;