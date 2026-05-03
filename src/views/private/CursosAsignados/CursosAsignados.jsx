import { useState } from 'react';
import { ClipboardList, GraduationCap, X, BookOpen, Code, ShieldCheck } from 'lucide-react';
import styles from './CursosAsignados.module.scss';

const CursosAsignados = () => {
    const esProfesor = true;
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const bloquesData = [
        {
            titulo: "BLOQUE 1: FUNDAMENTOS",
            cursos: [
                { 
                    id: 101, 
                    nombre: "Desarrollo Web Frontend", 
                    modulo: "Arquitectura de Interfaces",
                    icon: <Code />,
                    temario: [
                        { sem: 1, horas: "04", proyectos: "Estructura Semántica con HTML5", operaciones: ["Maquetación de header y footer", "Uso de etiquetas de sección"], conocimientos: ["SEO Básico", "Validación W3C"], complementarios: ["Accesibilidad Web"] },
                        { sem: 2, horas: "04", proyectos: "Estilos Avanzados con CSS3", operaciones: ["Implementación de Flexbox", "Creación de Grid Layout"], conocimientos: ["Box Model", "Selectores Complejos"], complementarios: ["Metodología BEM"] },
                    ]
                }
            ]
        },
        {
            titulo: "BLOQUE 2: PROGRAMACIÓN",
            cursos: [
                { 
                    id: 201, 
                    nombre: "JavaScript Moderno (ES6+)", 
                    modulo: "Lógica de Programación",
                    icon: <BookOpen />,
                    temario: [
                        { sem: 5, horas: "06", proyectos: "Manipulación Dinámica del DOM", operaciones: ["Creación de nodos", "Manejo de eventos de teclado"], conocimientos: ["Event Bubbling", "Local Storage"], complementarios: ["JSON Manipulation"] },
                        { sem: 6, horas: "06", proyectos: "Consumo de API Fetch", operaciones: ["Peticiones GET/POST", "Manejo de Promesas"], conocimientos: ["Async / Await", "HTTP Status Codes"], complementarios: ["Postman Básico"] },
                    ]
                }
            ]
        },
        {
            titulo: "BLOQUE 3: INFRAESTRUCTURA",
            cursos: [
                { 
                    id: 301, 
                    nombre: "Seguridad de Redes", 
                    modulo: "Ciberseguridad Aplicada",
                    icon: <ShieldCheck />,
                    temario: [
                        { sem: 10, horas: "02", proyectos: "Configuración de Firewalls", operaciones: ["Definición de reglas de entrada", "Manejo de NAT"], conocimientos: ["Protocolos TCP/UDP", "Puertos Seguros"], complementarios: ["Monitoreo de tráfico"] },
                        { sem: 11, horas: "02", proyectos: "Gestión de VPNs", operaciones: ["Túneles de sitio a sitio", "Autenticación de usuarios"], conocimientos: ["Cifrado AES", "Protocolo IPsec"], complementarios: ["Certificados Digitales"] },
                    ]
                }
            ]
        }
    ];

    const abrirTemario = (curso) => {
        setCursoSeleccionado(curso);
        setModalAbierto(true);
    };

    if (!esProfesor) return <div className={styles.error}>Acceso denegado.</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Gestión de Cursos Asignados</h1>
                <p>Visualiza el temario y la programación académica por bloques.</p>
            </header>

            {bloquesData.map((bloque, idx) => (
                <section key={idx} className={styles.bloqueSection}>
                    <h2 className={styles.bloqueTitle}>{bloque.titulo}</h2>
                    <div className={styles.cursosGrid}>
                        {bloque.cursos.map((curso) => (
                            <div key={curso.id} className={styles.cursoCard}>
                                <div className={styles.cursoHeader}>
                                    <span className={styles.iconWrapper}>{curso.icon}</span>
                                    <h3>{curso.nombre}</h3>
                                </div>
                                <p className={styles.moduloTag}>Módulo: {curso.modulo}</p>
                                <div className={styles.acciones}>
                                    <button className={styles.btnContenido} onClick={() => abrirTemario(curso)}>
                                        <ClipboardList size={18} /> Ver Contenido Técnico
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* MODAL: HOJA DE PROGRAMACIÓN */}
            {modalAbierto && cursoSeleccionado && (
                <div className={styles.modalOverlay} onClick={() => setModalAbierto(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.btnClose} onClick={() => setModalAbierto(false)}><X /></button>
                        
                        <div className={styles.hojaHeader}>
                            <img src="/logo-instituto.png" alt="Logo" className={styles.logoHoja} />
                            <h2>PROGRAMA DE FORMACIÓN PROFESIONAL</h2>
                            <h3>HOJA DE PROGRAMACIÓN</h3>
                        </div>

                        <div className={styles.infoCurso}>
                            <p><strong>Curso:</strong> {cursoSeleccionado.nombre}</p>
                            <p><strong>Módulo Formativo:</strong> {cursoSeleccionado.modulo}</p>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.temarioTable}>
                                <thead>
                                    <tr>
                                        <th style={{width: '80px'}}>SEM</th>
                                        <th>PROYECTOS / TAREAS</th>
                                        <th>OPERACIONES</th>
                                        <th>CONOCIMIENTOS</th>
                                        <th>COMPLEMENTARIOS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursoSeleccionado.temario?.map((item, i) => (
                                        <tr key={i}>
                                            <td className={styles.centerText}>
                                                <strong>{item.sem}</strong>
                                                <br/>
                                                <span>({item.horas} h)</span>
                                            </td>
                                            <td className={styles.boldText}>{item.proyectos}</td>
                                            <td>
                                                <ul>{item.operaciones.map((op, j) => <li key={j}>{op}</li>)}</ul>
                                            </td>
                                            <td>
                                                <ol>{item.conocimientos.map((con, j) => <li key={j}>{con}</li>)}</ol>
                                            </td>
                                            <td>
                                                <ul className={styles.smallList}>{item.complementarios.map((comp, j) => <li key={j}>{comp}</li>)}</ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CursosAsignados;