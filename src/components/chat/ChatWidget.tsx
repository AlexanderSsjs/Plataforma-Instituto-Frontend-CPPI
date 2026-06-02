import { useState, useCallback, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './ChatWidget.module.scss';
import apiClient from '../../services/Api/client';

const MAX_MESSAGE_LENGTH = 500;
const CLOSE_ANIMATION_TIME = 350;

interface Message {
    id: string;
    tipo: 'user' | 'bot';
    texto: string;
    fecha: number;
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [closing, setClosing] = useState(false);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [mensajes, setMensajes] = useState<Message[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const botTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const recognitionRef = useRef<any>(null);

    /* ==================================================
       ABRIR CHAT
    ================================================== */

    const abrirChat = useCallback(() => {
        setMounted(true);

        requestAnimationFrame(() => {
            setOpen(true);
        });
    }, []);

    /* ==================================================
        CERRAR CHAT
    ================================================== */

    const cerrarChat = useCallback(() => {
        setClosing(true);

        setTimeout(() => {
            setOpen(false);

            closeTimeoutRef.current = setTimeout(() => {
                setMounted(false);
                setClosing(false);
            }, CLOSE_ANIMATION_TIME);
        }, 50);
    }, []);

    /* ==================================================
        AUTO FOCUS
    ================================================== */

    useEffect(() => {
        if (open) {
            textareaRef.current?.focus();
        }
    }, [open]);

    /* ==================================================
       AUTO SCROLL
    ================================================== */

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [mensajes, isTyping]);

    /* ==================================================
       CLEANUP
    ================================================== */

    useEffect(() => {
        return () => {
            if (botTimeoutRef.current) {
                clearTimeout(botTimeoutRef.current);
            }

            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);
    /* ==================================================
   MICRÓFONO (WEB SPEECH API)
================================================== */

    const handleVoiceClick = useCallback(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Tu navegador no soporta reconocimiento de voz.');
            return;
        }

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onerror = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';

            for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript;
            }

            setInput(finalTranscript.trim());
        };

        recognition.start();
    }, [isListening]);

    /* ==================================================
       ENVIAR MENSAJE
    ================================================== */

    const enviarMensaje = useCallback(async () => {
        if (isTyping) return;

        const texto = input.replace(/\s+/g, ' ').trim().slice(0, MAX_MESSAGE_LENGTH);

        if (!texto) return;

        const historialBackend = mensajes.map((msg) => ({
            rol: msg.tipo === 'user' ? 'usuario' : 'asistente',
            texto: msg.texto,
        }));

        const mensajeUsuario: Message = {
            id: crypto.randomUUID(),
            tipo: 'user',
            texto,
            fecha: Date.now(),
        };

        setMensajes((prev) => [...prev, mensajeUsuario]);
        setInput('');
        setIsTyping(true);

        try {
            const { data } = await apiClient.post('/chat', {
                mensaje: texto,
                historial: historialBackend,
            });

            if (data.status === 'error') {
                throw new Error(data.message || 'Error al procesar la solicitud');
            }

            const respuestaBot: Message = {
                id: crypto.randomUUID(),
                tipo: 'bot',
                texto: data.respuesta,
                fecha: Date.now(),
            };

            setMensajes((prev) => [...prev, respuestaBot]);
        } catch (error: any) {
            console.error('Error al conectar con la API:', error);

            let mensaje =
                'El servicio no está disponible en este momento. Por favor, intenta nuevamente.';

            if (error.response?.status === 422) {
                mensaje = 'La solicitud contiene datos inválidos.';
            }

            if (error.response?.status === 429) {
                mensaje = 'Has enviado demasiadas solicitudes. Intenta más tarde.';
            }

            if (error.response?.status === 500) {
                mensaje = 'Ocurrió un error interno en el servidor.';
            }

            const mensajeError: Message = {
                id: crypto.randomUUID(),
                tipo: 'bot',
                texto: mensaje,
                fecha: Date.now(),
            };

            setMensajes((prev) => [...prev, mensajeError]);
        } finally {
            setIsTyping(false);
        }
    }, [input, isTyping, mensajes]);
    /* ==================================================
       ENTER
    ================================================== */

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensaje();
        }
    };

    /* ==================================================
        INPUT
    ================================================== */

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <div
            className={`
                ${styles.chatContainer}
                ${open ? styles.expanded : ''}
                ${closing ? styles.closing : ''}
            `}
        >
            <div className={styles.closeOverlay} />

            {!open && (
                <button type="button" className={styles.chatButton} onClick={abrirChat}>
                    🤖
                </button>
            )}

            {mounted && (
                <div className={styles.chatContent}>
                    <div className={styles.chatHeader}>
                        <div className={styles.chatHeaderLeft}>
                            <div className={styles.chatAvatar}>🤖</div>

                            <div className={styles.chatHeaderInfo}>
                                <h3>Astra</h3>
                                <div className={styles.chatStatus}>Disponible ahora</div>
                            </div>
                        </div>

                        <button type="button" className={styles.closeButton} onClick={cerrarChat}>
                            ✕
                        </button>
                    </div>

                    <div className={styles.chatBody}>
                        {mensajes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.welcome}>
                                    <div className={styles.welcomeIcon}>👋</div>
                                    <h4 className={styles.welcomeTitle}>¡Hola!</h4>
                                    <p className={styles.welcomeDescription}>
                                        Estoy aquí para ayudarte con información sobre carreras,
                                        matrícula y admisión.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.messageList}>
                                {mensajes.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`${styles.message} ${
                                            msg.tipo === 'user'
                                                ? styles.userMessage
                                                : styles.botMessage
                                        }`}
                                    >
                                        <ReactMarkdown>{msg.texto}</ReactMarkdown>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className={`${styles.message} ${styles.botMessage}`}>
                                        <div className={styles.typing}>
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    </div>
                                )}

                                <div ref={bottomRef} />
                            </div>
                        )}
                    </div>

                    <div className={styles.chatFooter}>
                        <div className={styles.inputWrapper}>
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={input}
                                maxLength={MAX_MESSAGE_LENGTH}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu consulta..."
                                className={styles.chatInput}
                            />

                            {/* 💡 LÓGICA DEL BOTÓN ALTERNABLE */}
                            <button
                                type="button"
                                className={`${styles.actionButton} ${
                                    isListening ? styles.listening : ''
                                }`}
                                onClick={input.trim() ? enviarMensaje : handleVoiceClick}
                                disabled={isTyping}
                                aria-label={
                                    input.trim()
                                        ? 'Enviar mensaje'
                                        : isListening
                                          ? 'Detener grabación'
                                          : 'Iniciar grabación'
                                }
                                title={
                                    input.trim()
                                        ? 'Enviar mensaje'
                                        : isListening
                                          ? 'Detener grabación'
                                          : 'Hablar'
                                }
                            >
                                {input.trim() ? (
                                    '➤'
                                ) : isListening ? (
                                    <span className={styles.recordingIcon}>●</span>
                                ) : (
                                    '🎙️'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
