import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Award, Calendar, BookOpen, User, Shield, ArrowLeft } from 'lucide-react';
import { ALUMNOS_MOCK } from '@/data/students';
import styles from './VerificarCertificado.module.scss';

// Mismo mock que en Certificados.jsx — en producción esto sería un GET /api/certificados/{codigo}
const generarCodigo = (alumnoId, cursoId) =>
    `CPPI-${alumnoId.split('-')[2]}-${cursoId}-`;

const CERTIFICADOS_MOCK = ALUMNOS_MOCK
    .filter(a => a.estado === 'Activo' && a.promedio >= 13)
    .map((a, i) => ({
        id:           `CERT-2026-${String(i + 1).padStart(3, '0')}`,
        alumnoId:     a.id,
        alumnoNombre: a.nombre,
        curso:        a.curso,
        carrera:      a.carrera,
        promedio:     a.promedio,
        horas:        60,
        fechaEmision: new Date(2026, 4, 10 + i).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
        estado:       'Válido',
        codigo:       `CPPI-${a.id.split('-')[2]}-${String(i + 1).padStart(3, '0')}-`,
    }));

const VerificarCertificado = () => {
    const { codigo } = useParams();

    // Buscar por prefijo del código (el sufijo aleatorio varía por sesión en el mock)
    const cert = CERTIFICADOS_MOCK.find(c =>
        codigo && c.codigo && codigo.startsWith(c.codigo.split('-').slice(0, 3).join('-'))
    ) || CERTIFICADOS_MOCK.find(c => c.id === codigo);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                {/* Logo */}
                <div className={styles.logoRow}>
                    <img src="/logo-transparent.png" alt="CPPI" className={styles.logo} />
                    <div>
                        <h2 className={styles.institutoName}>Instituto CPPI</h2>
                        <p className={styles.institutoSub}>Sistema de Verificación de Certificados</p>
                    </div>
                </div>

                {cert ? (
                    <>
                        {/* VÁLIDO */}
                        <div className={styles.resultValid}>
                            <CheckCircle size={52} className={styles.iconValid} />
                            <h1>Certificado Válido</h1>
                            <p>Este certificado es auténtico y fue emitido oficialmente por el Instituto CPPI.</p>
                        </div>

                        <div className={styles.certDetails}>
                            <div className={styles.detailItem}>
                                <User size={16} />
                                <div>
                                    <span className={styles.detailLabel}>Alumno</span>
                                    <span className={styles.detailValue}>{cert.alumnoNombre}</span>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <BookOpen size={16} />
                                <div>
                                    <span className={styles.detailLabel}>Curso Aprobado</span>
                                    <span className={styles.detailValue}>{cert.curso}</span>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <Award size={16} />
                                <div>
                                    <span className={styles.detailLabel}>Calificación Final</span>
                                    <span className={`${styles.detailValue} ${styles.nota}`}>{cert.promedio.toFixed(1)} / 20</span>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <Calendar size={16} />
                                <div>
                                    <span className={styles.detailLabel}>Fecha de Emisión</span>
                                    <span className={styles.detailValue}>{cert.fechaEmision}</span>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <Shield size={16} />
                                <div>
                                    <span className={styles.detailLabel}>Código de Certificado</span>
                                    <span className={`${styles.detailValue} ${styles.codigo}`}>{codigo}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.estadoBadge}>
                            <CheckCircle size={14} />
                            Estado: <strong>{cert.estado}</strong>
                        </div>
                    </>
                ) : (
                    <>
                        {/* INVÁLIDO */}
                        <div className={styles.resultInvalid}>
                            <XCircle size={52} className={styles.iconInvalid} />
                            <h1>Certificado No Encontrado</h1>
                            <p>El código <strong>{codigo}</strong> no corresponde a ningún certificado registrado en nuestro sistema.</p>
                            <p className={styles.hint}>Si crees que es un error, contacta al Instituto CPPI para verificar manualmente.</p>
                        </div>
                    </>
                )}

                <Link to="/" className={styles.btnVolver}>
                    <ArrowLeft size={16} />
                    Volver al inicio
                </Link>

                <p className={styles.footer}>
                    © {new Date().getFullYear()} Instituto CPPI — Plataforma de Gestión Académica con Validación QR
                </p>
            </div>
        </div>
    );
};

export default VerificarCertificado;
