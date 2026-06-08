import React, { useState, useEffect } from 'react';
import typeCourses from '@/data/type_courses.json';
import styles from './Promociones.module.scss';
import { Plus, Trash2, Calendar, Tag, Percent } from 'lucide-react';

export default function Promociones() {
    const [promociones, setPromociones] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const coursesList = typeCourses.cursos || [];

    // Cargar promociones de localStorage al iniciar
    useEffect(() => {
        const stored = localStorage.getItem('ccip_promociones');
        if (stored) {
            try {
                setPromociones(JSON.parse(stored));
            } catch (e) {
                console.error('Error al parsear promociones de localStorage', e);
            }
        }
    }, []);

    // Guardar promociones en localStorage
    const saveToLocalStorage = (updatedPromos) => {
        setPromociones(updatedPromos);
        localStorage.setItem('ccip_promociones', JSON.stringify(updatedPromos));
    };

    const handleCreatePromotion = (e) => {
        e.preventDefault();

        if (!selectedCourseId || !price || !startDate || !endDate) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        const course = coursesList.find(c => c.id === parseInt(selectedCourseId));
        if (!course) return;

        const newPromo = {
            id: Date.now().toString(),
            courseId: course.id,
            courseName: course.nombre,
            courseImage: course.imagen_url,
            originalPrice: course.precio?.monto || 80,
            promoPrice: parseFloat(price),
            startDate,
            endDate,
            description: description.trim() || `Descuento especial en el curso ${course.nombre}.`
        };

        const updatedPromos = [newPromo, ...promociones];
        saveToLocalStorage(updatedPromos);

        // Resetear formulario
        setSelectedCourseId('');
        setPrice('');
        setStartDate('');
        setEndDate('');
        setDescription('');

        setSuccessMessage('¡Promoción guardada y activa correctamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleDeletePromo = (id) => {
        const updated = promociones.filter(p => p.id !== id);
        saveToLocalStorage(updated);
    };

    const calculateDiscount = (original, promo) => {
        if (!original || original <= promo) return 0;
        return Math.round(((original - promo) / original) * 100);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    };

    return (
        <div className={styles.promocionesContainer}>
            <div className={styles.headerSection}>
                <h2>Gestión Dinámica de Promociones</h2>
                <p>Crea ofertas especiales para los cursos de la plataforma. Se mostrarán automáticamente en la página web pública.</p>
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

            <div className={styles.formCard}>
                <form onSubmit={handleCreatePromotion} className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label>Curso a aplicar *</label>
                        <select
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un curso...</option>
                            {coursesList.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.nombre} (Precio Reg: PEN {c.precio?.monto || 80})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Precio Promocional (PEN) *</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Ej. 60"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Duración de la Promoción *</label>
                        <div className={styles.dateRange}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '0.75rem', color: 'gray' }}>Fecha Inicio</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '0.75rem', color: 'gray' }}>Fecha Fin</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Detalle / Descripción de la Promoción</label>
                        <textarea
                            placeholder="Escribe los beneficios, qué incluye o alguna restricción..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className={styles.fullWidth}>
                        <button type="submit" className={styles.submitBtn}>
                            <Plus size={18} />
                            Guardar Promoción
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.previewSection}>
                <h3>Promociones Activas ({promociones.length})</h3>
                {promociones.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Percent size={40} style={{ color: '#d4af37', marginBottom: '8px' }} />
                        <p>No hay promociones activas registradas en este momento.</p>
                        <p style={{ fontSize: '0.85rem' }}>Utiliza el formulario de arriba para crear tu primera oferta.</p>
                    </div>
                ) : (
                    <div className={styles.promotionsGrid}>
                        {promociones.map((promo) => {
                            const discount = calculateDiscount(promo.originalPrice, promo.promoPrice);
                            return (
                                <div key={promo.id} className={styles.promoCard}>
                                    <div className={styles.promoImageWrapper}>
                                        <img src={promo.courseImage} alt={promo.courseName} />
                                        {discount > 0 && (
                                            <div className={styles.discountBadge}>
                                                -{discount}% OFF
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.promoBody}>
                                        <h4 className={styles.courseTitle}>{promo.courseName}</h4>
                                        <p className={styles.promoDesc}>{promo.description}</p>
                                        
                                        <div className={styles.priceSection}>
                                            <span className={styles.originalPrice}>Reg. S/ {promo.originalPrice}</span>
                                            <span className={styles.promoPrice}>S/ {promo.promoPrice}</span>
                                        </div>

                                        <div className={styles.dateRangeBadge}>
                                            <Calendar size={12} />
                                            <span>
                                                {formatDate(promo.startDate)} al {formatDate(promo.endDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.promoFooter}>
                                        <button 
                                            onClick={() => handleDeletePromo(promo.id)}
                                            className={styles.deleteBtn}
                                            title="Eliminar promoción"
                                        >
                                            <Trash2 size={16} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
