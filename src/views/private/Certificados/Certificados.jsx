import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    Award, Search, Download, Eye, CheckCircle,
    Calendar, BookOpen, User, Shield, Printer, X
} from 'lucide-react';
import styles from './Certificados.module.scss';
import { ALUMNOS_MOCK } from '@/data/students';

// ─── Datos mock de certificados emitidos ────────────────────────────────────
const generarCodigo = (alumnoId, cursoId) =>
    `CPPI-${alumnoId.split('-')[2]}-${cursoId}-${Date.now().toString(36).toUpperCase().slice(-5)}`;

const CERTIFICADOS_MOCK = ALUMNOS_MOCK
    .filter(a => a.estado === 'Activo' && a.promedio >= 13)
    .map((a, i) => ({
        id:          `CERT-2026-${String(i + 1).padStart(3, '0')}`,
        alumnoId:    a.id,
        alumnoNombre: a.nombre,
        curso:       a.curso,
        carrera:     a.carrera,
        promedio:    a.promedio,
        fechaEmision: new Date(2026, 4, 10 + i).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }),
        horas:       60,
        estado:      'Emitido',
        codigo:      generarCodigo(a.id, String(i + 1).padStart(3, '0')),
    }));

// ─── Componente del certificado imprimible ───────────────────────────────────
const CertificadoTemplate = ({ cert, forwardRef }) => {
    const verifyUrl = `${window.location.origin}/verificar/${cert.codigo}`;

    return (
        <div ref={forwardRef} className={styles.certTemplate}>
            {/* Borde decorativo exterior */}
            <div className={styles.certBorderOuter}>
                <div className={styles.certBorderInner}>

                    {/* Cabecera */}
                    <div className={styles.certHeader}>
                        <img src="/logo-transparent.png" alt="CPPI Logo" className={styles.certLogo} />
                        <div className={styles.certInstituto}>
                            <h2>INSTITUTO CPPI</h2>
                            <p>Centro de Capacitación Profesional en Proyectos e Inversión</p>
                        </div>
                    </div>

                    {/* Título principal */}
                    <div className={styles.certTitleBlock}>
                        <p className={styles.certOtorga}>Otorga el presente</p>
                        <h1 className={styles.certTitulo}>CERTIFICADO DE APROBACIÓN</h1>
                        <p className={styles.certA}>a</p>
                    </div>

                    {/* Nombre del alumno */}
                    <div className={styles.certNombreBlock}>
                        <h2 className={styles.certNombre}>{cert.alumnoNombre}</h2>
                        <div className={styles.certNombreLine} />
                    </div>

                    {/* Cuerpo del texto */}
                    <p className={styles.certCuerpo}>
                        Por haber completado satisfactoriamente el curso de
                    </p>
                    <h3 className={styles.certCurso}>{cert.curso}</h3>
                    <p className={styles.certDetalle}>
                        con una duración de <strong>{cert.horas} horas académicas</strong>, obteniendo
                        una calificación final de <strong>{cert.promedio.toFixed(1)}</strong> sobre 20.
                    </p>

                    {/* Fecha y código */}
                    <div className={styles.certMeta}>
                        <div className={styles.certMetaItem}>
                            <Calendar size={14} />
                            <span>Emitido el {cert.fechaEmision}</span>
                        </div>
                        <div className={styles.certMetaItem}>
                            <Shield size={14} />
                            <span>Código: <strong>{cert.codigo}</strong></span>
                        </div>
                    </div>

                    {/* Firmas y QR */}
                    <div className={styles.certFooter}>
                        <div className={styles.certFirma}>
                            <div className={styles.certFirmaLinea} />
                            <p className={styles.certFirmaNombre}>Director Académico</p>
                            <p className={styles.certFirmaInst}>Instituto CPPI</p>
                        </div>

                        <div className={styles.certQrBlock}>
                            <QRCodeSVG
                                value={verifyUrl}
                                size={90}
                                bgColor="#ffffff"
                                fgColor="#1a1a2e"
                                level="H"
                                includeMargin={false}
                            />
                            <p className={styles.certQrLabel}>Escanea para verificar</p>
                        </div>

                        <div className={styles.certFirma}>
                            <div className={styles.certFirmaLinea} />
                            <p className={styles.certFirmaNombre}>Coordinador de Certificaciones</p>
                            <p className={styles.certFirmaInst}>Instituto CPPI</p>
                        </div>
                    </div>

                    {/* Sello de autenticidad */}
                    <div className={styles.certSello}>
                        <CheckCircle size={14} />
                        <span>Documento digital con validación QR — Verificable en {window.location.origin}/verificar/{cert.codigo}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

// ─── Vista principal ─────────────────────────────────────────────────────────
const Certificados = () => {
    const [searchTerm, setSearchTerm]         = useState('');
    const [selectedTab, setSelectedTab]       = useState('todos');
    const [previewCert, setPreviewCert]       = useState(null);
    const [downloading, setDownloading]       = useState(null);
    const certRef                             = useRef(null);

    const filtered = CERTIFICADOS_MOCK.filter(c => {
        const match =
            c.alumnoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.alumnoId.toLowerCase().includes(searchTerm.toLowerCase());
        if (selectedTab === 'todos') return match;
        return match && c.estado.toLowerCase() === selectedTab;
    });

    const handleDescargar = async (cert) => {
        setDownloading(cert.id);
        setPreviewCert(cert);

        // Esperar a que el DOM renderice el template
        await new Promise(r => setTimeout(r, 400));

        try {
            const element = certRef.current;
            const canvas  = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf     = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
            const pdfW    = pdf.internal.pageSize.getWidth();
            const pdfH    = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
            pdf.save(`Certificado_${cert.alumnoNombre.replace(/ /g, '_')}_${cert.codigo}.pdf`);
        } catch (err) {
            console.error('Error generando PDF:', err);
        } finally {
            setDownloading(null);
            setPreviewCert(null);
        }
    };

    return (
        <div className={styles.container}>
            {/* ENCABEZADO */}
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>Certificados Digitales</h1>
                    <p>Emite y gestiona certificados con validación QR para los alumnos que aprobaron sus cursos.</p>
                </div>
            </header>

            {/* RESUMEN */}
            <div className={styles.summaryGrid}>
                <div className={`${styles.summaryCard} ${styles.cardTotal}`}>
                    <div className={styles.summaryIcon}><Award size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Total Emitidos</span>
                        <span className={styles.summaryValue}>{CERTIFICADOS_MOCK.length}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardActivo}`}>
                    <div className={styles.summaryIcon}><CheckCircle size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Verificables con QR</span>
                        <span className={styles.summaryValue}>{CERTIFICADOS_MOCK.length}</span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardCursos}`}>
                    <div className={styles.summaryIcon}><BookOpen size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Cursos Cubiertos</span>
                        <span className={styles.summaryValue}>
                            {[...new Set(CERTIFICADOS_MOCK.map(c => c.curso))].length}
                        </span>
                    </div>
                </div>
                <div className={`${styles.summaryCard} ${styles.cardAlumnos}`}>
                    <div className={styles.summaryIcon}><User size={22} /></div>
                    <div className={styles.summaryInfo}>
                        <span className={styles.summaryLabel}>Alumnos Certificados</span>
                        <span className={styles.summaryValue}>
                            {[...new Set(CERTIFICADOS_MOCK.map(c => c.alumnoId))].length}
                        </span>
                    </div>
                </div>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className={styles.actionBar}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por alumno, curso o código de certificado..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.tabsWrapper}>
                    <button
                        className={`${styles.tabBtn} ${selectedTab === 'todos' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('todos')}
                    >
                        Todos <span className={styles.tabBadge}>{CERTIFICADOS_MOCK.length}</span>
                    </button>
                    <button
                        className={`${styles.tabBtn} ${selectedTab === 'emitido' ? styles.activeTab : ''}`}
                        onClick={() => setSelectedTab('emitido')}
                    >
                        Emitidos <span className={`${styles.tabBadge} ${styles.badgeActive}`}>{CERTIFICADOS_MOCK.filter(c => c.estado === 'Emitido').length}</span>
                    </button>
                </div>
            </div>

            {/* TABLA */}
            {filtered.length > 0 ? (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Certificado</th>
                                    <th>Alumno</th>
                                    <th>Curso</th>
                                    <th className={styles.centerCol}>Nota</th>
                                    <th className={styles.centerCol}>Fecha Emisión</th>
                                    <th className={styles.centerCol}>Estado</th>
                                    <th className={styles.centerCol}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(cert => (
                                    <tr key={cert.id}>
                                        <td>
                                            <div className={styles.certIdCell}>
                                                <div className={styles.certIconBox}>
                                                    <Award size={16} />
                                                </div>
                                                <div>
                                                    <div className={styles.certId}>{cert.id}</div>
                                                    <div className={styles.certCodigo}>{cert.codigo}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.alumnoCell}>
                                                <div className={styles.alumnoAvatar}>
                                                    {cert.alumnoNombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className={styles.alumnoNombre}>{cert.alumnoNombre}</div>
                                                    <div className={styles.alumnoId}>{cert.alumnoId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.cursoCell}>
                                                <BookOpen size={13} />
                                                <span>{cert.curso}</span>
                                            </div>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <span className={styles.notaBadge}>{cert.promedio.toFixed(1)}</span>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <div className={styles.fechaCell}>
                                                <Calendar size={12} />
                                                <span>{cert.fechaEmision}</span>
                                            </div>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <span className={styles.estadoBadge}>
                                                <CheckCircle size={11} /> {cert.estado}
                                            </span>
                                        </td>
                                        <td className={styles.centerCol}>
                                            <div className={styles.actionsCell}>
                                                <button
                                                    className={styles.btnVer}
                                                    onClick={() => setPreviewCert(cert)}
                                                    title="Vista previa"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    className={styles.btnDescargar}
                                                    onClick={() => handleDescargar(cert)}
                                                    disabled={downloading === cert.id}
                                                    title="Descargar PDF"
                                                >
                                                    {downloading === cert.id
                                                        ? <span className={styles.spinner} />
                                                        : <Download size={14} />
                                                    }
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista móvil */}
                    <div className={styles.mobileList}>
                        {filtered.map(cert => (
                            <div key={cert.id} className={styles.mobileCard}>
                                <div className={styles.mobileCardHeader}>
                                    <div className={styles.certIconBox}><Award size={18} /></div>
                                    <div className={styles.mobileCardInfo}>
                                        <span className={styles.alumnoNombre}>{cert.alumnoNombre}</span>
                                        <span className={styles.certCodigo}>{cert.codigo}</span>
                                    </div>
                                    <span className={styles.estadoBadge}><CheckCircle size={11} /> {cert.estado}</span>
                                </div>
                                <div className={styles.mobileCurso}>
                                    <BookOpen size={12} /> {cert.curso}
                                </div>
                                <div className={styles.mobileActions}>
                                    <button className={styles.btnVer} onClick={() => setPreviewCert(cert)}>
                                        <Eye size={14} /> Vista previa
                                    </button>
                                    <button
                                        className={styles.btnDescargar}
                                        onClick={() => handleDescargar(cert)}
                                        disabled={downloading === cert.id}
                                    >
                                        {downloading === cert.id ? <span className={styles.spinner} /> : <Download size={14} />}
                                        Descargar PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles.noResults}>
                    <Award size={48} className={styles.noResultsIcon} />
                    <h3>No se encontraron certificados</h3>
                    <p>Intenta cambiar los filtros de búsqueda.</p>
                </div>
            )}

            {/* MODAL DE VISTA PREVIA */}
            {previewCert && (
                <div className={styles.modalOverlay} onClick={() => { if (!downloading) setPreviewCert(null); }}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3><Award size={18} /> Vista Previa del Certificado</h3>
                            <div className={styles.modalActions}>
                                <button
                                    className={styles.btnDescargarModal}
                                    onClick={() => handleDescargar(previewCert)}
                                    disabled={!!downloading}
                                >
                                    {downloading ? <span className={styles.spinner} /> : <Download size={15} />}
                                    Descargar PDF
                                </button>
                                <button
                                    className={styles.btnCerrar}
                                    onClick={() => setPreviewCert(null)}
                                    disabled={!!downloading}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                        <div className={styles.modalBody}>
                            <CertificadoTemplate cert={previewCert} forwardRef={certRef} />
                        </div>
                        <div className={styles.modalFooter}>
                            <Shield size={14} />
                            <span>Este certificado incluye un código QR único que permite verificar su autenticidad en línea.</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Template oculto para descarga directa (sin modal) */}
            {downloading && !previewCert && (
                <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }}>
                    <CertificadoTemplate cert={CERTIFICADOS_MOCK.find(c => c.id === downloading)} forwardRef={certRef} />
                </div>
            )}
        </div>
    );
};

export default Certificados;
