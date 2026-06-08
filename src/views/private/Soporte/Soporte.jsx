import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext.tsx';
import styles from './Soporte.module.scss';
import { Send, User, MessageSquare, AlertCircle, Clock } from 'lucide-react';

const DEFAULT_MESSAGES = [
    {
        id: '1',
        senderEmail: 'alumno.pedro@ccip.edu.pe',
        senderRole: 'Alumno',
        category: 'Certificados',
        subject: 'Demora en la firma de mi certificado SIGA',
        message: 'Hola, finalicé mi curso de SIGA hace una semana y aún figura en estado de aprobación de firma. Agradecería su ayuda.',
        priority: 'high',
        status: 'pending',
        date: '07/06/2026',
        reply: null
    },
    {
        id: '2',
        senderEmail: 'profesor.ramon@ccip.edu.pe',
        senderRole: 'Profesor',
        category: 'Soporte Técnico',
        subject: 'Error al registrar asistencia del 5 de Junio',
        message: 'Estimado administrador, no puedo guardar la asistencia de la sesión del 5 de Junio en el grupo de Invierte.pe. Me sale un error 500.',
        priority: 'medium',
        status: 'replied',
        date: '06/06/2026',
        reply: 'Estimado Ramón, el error fue solucionado por el área de sistemas. Ya puedes intentar registrar la asistencia nuevamente. Saludos.'
    }
];

export default function Soporte() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [category, setCategory] = useState('Consultas de Cursos');
    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('medium');
    const [body, setBody] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // Para las respuestas del administrador
    const [adminReplies, setAdminReplies] = useState({});

    const isAdmin = user?.rol_id === 1 || user?.rol_id === 2; // Superuser (1) o Admin (2)

    useEffect(() => {
        const stored = localStorage.getItem('ccip_support_messages');
        if (stored) {
            try {
                setMessages(JSON.parse(stored));
            } catch (e) {
                console.error(e);
                setMessages(DEFAULT_MESSAGES);
            }
        } else {
            setMessages(DEFAULT_MESSAGES);
            localStorage.setItem('ccip_support_messages', JSON.stringify(DEFAULT_MESSAGES));
        }
    }, []);

    const saveMessages = (newMsgs) => {
        setMessages(newMsgs);
        localStorage.setItem('ccip_support_messages', JSON.stringify(newMsgs));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!subject.trim() || !body.trim()) {
            alert('Por favor complete el asunto y el mensaje.');
            return;
        }

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

        const roleStr = user?.rol_id === 1 || user?.rol_id === 2 
            ? 'Administrador' 
            : user?.rol_id === 4 
                ? 'Profesor' 
                : 'Alumno';

        const newMsg = {
            id: Date.now().toString(),
            senderEmail: user?.email || 'usuario@ccip.edu.pe',
            senderRole: roleStr,
            category,
            subject: subject.trim(),
            message: body.trim(),
            priority,
            status: 'pending',
            date: formattedDate,
            reply: null
        };

        const updated = [newMsg, ...messages];
        saveMessages(updated);

        // Reset form
        setSubject('');
        setBody('');
        setSuccessMessage('¡Tu mensaje ha sido enviado al administrador!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleAdminReplySubmit = (id) => {
        const replyText = adminReplies[id];
        if (!replyText || !replyText.trim()) return;

        const updated = messages.map(msg => {
            if (msg.id === id) {
                return {
                    ...msg,
                    status: 'replied',
                    reply: replyText.trim()
                };
            }
            return msg;
        });

        saveMessages(updated);
        setAdminReplies(prev => ({
            ...prev,
            [id]: ''
        }));
    };

    const handleReplyTextChange = (id, text) => {
        setAdminReplies(prev => ({
            ...prev,
            [id]: text
        }));
    };

    // Si es administrador, ve todos los mensajes.
    // Si es un usuario común, solo ve los mensajes que él mismo envió.
    const filteredMessages = isAdmin 
        ? messages 
        : messages.filter(msg => msg.senderEmail === user?.email);

    return (
        <div className={styles.soporteContainer}>
            <div className={styles.headerSection}>
                <h2>{isAdmin ? 'Buzón de Mensajes y Soporte' : 'Contacto con el Administrador'}</h2>
                <p>
                    {isAdmin 
                        ? 'Gestiona, lee y responde a las consultas y solicitudes enviadas por los alumnos y profesores.'
                        : 'Envía un mensaje rápido al equipo administrador para resolver dudas académicas, problemas de pagos o soporte técnico.'
                    }
                </p>
            </div>

            {successMessage && (
                <div style={{
                    background: '#10b981',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    textAlign: 'center',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {successMessage}
                </div>
            )}

            <div className={styles.soporteGrid}>
                {/* Panel Izquierdo: Formulario de envío (solo si no es admin) */}
                {!isAdmin ? (
                    <div className={styles.paneCard}>
                        <h3>Redactar Nuevo Mensaje</h3>
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className={styles.formGroup}>
                                <label>Categoría</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Consultas de Cursos">Consultas de Cursos</option>
                                    <option value="Certificados">Certificados</option>
                                    <option value="Soporte Técnico">Soporte Técnico</option>
                                    <option value="Pagos y Facturación">Pagos y Facturación</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Prioridad</label>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="low">Baja</option>
                                    <option value="medium">Media</option>
                                    <option value="high">Alta</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Asunto</label>
                                <input 
                                    type="text" 
                                    placeholder="Ej. Problema con el acceso al material"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Mensaje / Consulta</label>
                                <textarea 
                                    placeholder="Describe detalladamente tu consulta..."
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.sendBtn}>
                                <Send size={18} />
                                Enviar al Administrador
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className={styles.paneCard}>
                        <h3>Resumen del Buzón</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px' }}>
                                <span style={{ fontWeight: '600' }}>Pendientes de respuesta:</span>
                                <span style={{ color: '#d97706', fontWeight: 'bold' }}>
                                    {messages.filter(m => m.status === 'pending').length}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px' }}>
                                <span style={{ fontWeight: '600' }}>Mensajes totales:</span>
                                <span style={{ fontWeight: 'bold' }}>{messages.length}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Panel Derecho: Historial de mensajes */}
                <div className={styles.paneCard}>
                    <h3>{isAdmin ? 'Todos los Mensajes Recibidos' : 'Mis Mensajes Enviados'}</h3>

                    {filteredMessages.length === 0 ? (
                        <div className={styles.emptyState}>
                            <MessageSquare size={40} style={{ color: '#cbd5e1', marginBottom: '8px' }} />
                            <p>No tienes mensajes registrados.</p>
                        </div>
                    ) : (
                        <div className={styles.messagesList}>
                            {filteredMessages.map((msg) => (
                                <div key={msg.id} className={styles.messageItem}>
                                    <div className={styles.msgHeader}>
                                        <h4 className={styles.msgTitle}>{msg.subject}</h4>
                                        <div className={styles.msgBadges}>
                                            <span className={`${styles.badge} ${styles[msg.priority]}`}>
                                                {msg.priority === 'high' ? 'Alta' : msg.priority === 'medium' ? 'Media' : 'Baja'}
                                            </span>
                                            <span className={`${styles.badge} ${styles[msg.status]}`}>
                                                {msg.status === 'pending' ? 'Pendiente' : 'Respondido'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.msgMeta}>
                                        <span>
                                            <User size={12} />
                                            {msg.senderEmail} ({msg.senderRole})
                                        </span>
                                        <span>
                                            <Clock size={12} />
                                            {msg.date}
                                        </span>
                                        <span style={{ fontWeight: '600', color: 'var(--primary-500)' }}>
                                            {msg.category}
                                        </span>
                                    </div>

                                    <p className={styles.msgBody}>{msg.message}</p>

                                    {/* Mostrar respuesta si existe */}
                                    {msg.reply && (
                                        <div className={styles.replyArea}>
                                            <h4>Respuesta de la Administración:</h4>
                                            <p>{msg.reply}</p>
                                        </div>
                                    )}

                                    {/* Formulario de respuesta para el administrador (solo si no se ha respondido) */}
                                    {isAdmin && !msg.reply && (
                                        <div className={styles.adminReplyForm}>
                                            <input 
                                                type="text" 
                                                placeholder="Escribe tu respuesta aquí..."
                                                value={adminReplies[msg.id] || ''}
                                                onChange={(e) => handleReplyTextChange(msg.id, e.target.value)}
                                            />
                                            <button onClick={() => handleAdminReplySubmit(msg.id)}>
                                                Responder
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
