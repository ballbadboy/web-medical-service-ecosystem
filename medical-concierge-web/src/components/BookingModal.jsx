import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const specialties = [
    'Cardiology',
    'Orthopedics',
    'Oncology',
    'Neurosurgery',
    'Stem Cell & Regenerative Medicine',
    'Plastic & Reconstructive Surgery',
    'Dental',
    'Other',
];

const BookingModal = ({ isOpen, onClose, prefillSpecialist = '' }) => {
    const { t } = useLanguage();
    const modalRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        preferredDate: '',
        notes: '',
    });

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setSubmitted(false);
            setErrors({});
            setFormData({
                name: '',
                email: '',
                phone: '',
                specialty: '',
                preferredDate: '',
                notes: prefillSpecialist ? `Requesting consultation with ${prefillSpecialist}` : '',
            });
        }
    }, [isOpen, prefillSpecialist]);

    // Trap focus & close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback((e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    }, [onClose]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.specialty) newErrors.specialty = 'Please select a specialty';
        if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log('Booking submitted:', formData);
        setSubmitted(true);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
            >
                {/* Header */}
                <div className="bg-primary p-5 rounded-t-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white text-[24px]">calendar_month</span>
                        <div>
                            <h2 className="text-lg font-bold text-white">{t('bookConsultation')}</h2>
                            <p className="text-white/70 text-xs">Fill in your details and we will contact you</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined !text-[36px]">check_circle</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">Thank you!</h3>
                            <p className="text-text-muted dark:text-slate-400 mb-6">
                                We'll contact you within 24 hours.
                            </p>
                            <button
                                onClick={onClose}
                                className="h-10 px-6 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
                            >
                                {t('aiClose')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="booking-name" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="booking-name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="booking-email" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="booking-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="booking-phone" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="booking-phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                    placeholder="+1 234 567 890"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            {/* Specialty */}
                            <div>
                                <label htmlFor="booking-specialty" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Condition / Specialty <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="booking-specialty"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${errors.specialty ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                >
                                    <option value="">Select a specialty...</option>
                                    {specialties.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
                            </div>

                            {/* Preferred Date */}
                            <div>
                                <label htmlFor="booking-date" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Preferred Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="booking-date"
                                    name="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full h-10 px-3 rounded-lg border text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${errors.preferredDate ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                />
                                {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="booking-notes" className="block text-sm font-semibold text-text-main dark:text-white mb-1">
                                    Additional Notes
                                </label>
                                <textarea
                                    id="booking-notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Any additional information about your condition..."
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-text-main dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {t('ceBack')}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-10 rounded-lg bg-primary hover:bg-secondary text-white font-bold text-sm transition-colors shadow-md shadow-primary/20"
                                >
                                    {t('bookConsultation')}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
