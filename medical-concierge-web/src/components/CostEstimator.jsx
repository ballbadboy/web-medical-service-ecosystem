import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const CostEstimator = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        condition: '',
        transport: false,
        postSurgeryCare: false,
        languageSupport: false
    });

    const basePrices = {
        'orthopedic': 15000,
        'cardiac': 25000,
        'cosmetic': 8000,
        'dental': 3000,
        'stemcell': 12000,
        'other': 5000
    };

    const calculateEstimate = () => {
        if (!formData.condition) return 0;

        let total = basePrices[formData.condition] || basePrices.other;
        if (formData.transport) total += 500; // Airport & local VIP transport
        if (formData.postSurgeryCare) total += 2000; // 1 week nursing care
        if (formData.languageSupport) total += 300; // Dedicated interpreter

        return total;
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 my-10 max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined">calculate</span>
                        {t('ceTitle')}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{t('ceDesc')}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-white/70 uppercase tracking-wider font-bold mb-1">{t('ceEstimatedCost')}</div>
                    <div className="text-3xl font-black">${calculateEstimate().toLocaleString()}</div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((num) => (
                        <div
                            key={num}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= num
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-700 text-slate-400'
                                }`}
                        >
                            {num}
                        </div>
                    ))}
                </div>

                {/* Step 1: Medical Needs */}
                {step === 1 && (
                    <div className="animate-fade-in-up">
                        <h4 className="text-lg font-bold text-text-main dark:text-white mb-4">{t('ceStep1Title')}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { id: 'orthopedic', icon: 'bone', label: t('ceOrthopedic') },
                                { id: 'cardiac', icon: 'ecg_heart', label: t('ceCardiac') },
                                { id: 'stemcell', icon: 'science', label: t('ceStemCell') },
                                { id: 'cosmetic', icon: 'face', label: t('ceCosmetic') },
                                { id: 'dental', icon: 'dentistry', label: t('ceDental') },
                                { id: 'other', icon: 'medical_services', label: t('ceOther') }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setFormData({ ...formData, condition: item.id })}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${formData.condition === item.id
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 text-text-main dark:text-white'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span className="font-semibold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Logistics & Care */}
                {step === 2 && (
                    <div className="animate-fade-in-up">
                        <h4 className="text-lg font-bold text-text-main dark:text-white mb-4">{t('ceStep2Title')}</h4>
                        <div className="space-y-4">
                            {/* Addon 1 */}
                            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.transport ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'
                                }`}>
                                <div className="mt-1">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={formData.transport}
                                        onChange={(e) => setFormData({ ...formData, transport: e.target.checked })}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-text-main dark:text-white">{t('ceTransportTitle')}</h5>
                                        <span className="text-primary font-bold">+$500</span>
                                    </div>
                                    <p className="text-sm text-text-muted dark:text-slate-400 mt-1">{t('ceTransportDesc')}</p>
                                </div>
                            </label>

                            {/* Addon 2 */}
                            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.postSurgeryCare ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'
                                }`}>
                                <div className="mt-1">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={formData.postSurgeryCare}
                                        onChange={(e) => setFormData({ ...formData, postSurgeryCare: e.target.checked })}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-text-main dark:text-white">{t('ceNursingTitle')}</h5>
                                        <span className="text-primary font-bold">+$2,000</span>
                                    </div>
                                    <p className="text-sm text-text-muted dark:text-slate-400 mt-1">{t('ceNursingDesc')}</p>
                                </div>
                            </label>

                            {/* Addon 3 */}
                            <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.languageSupport ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'
                                }`}>
                                <div className="mt-1">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={formData.languageSupport}
                                        onChange={(e) => setFormData({ ...formData, languageSupport: e.target.checked })}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-text-main dark:text-white">{t('ceInterpTitle')}</h5>
                                        <span className="text-primary font-bold">+$300</span>
                                    </div>
                                    <p className="text-sm text-text-muted dark:text-slate-400 mt-1">{t('ceInterpDesc')}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

                {/* Step 3: Summary */}
                {step === 3 && (
                    <div className="animate-fade-in-up text-center py-6">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined !text-[40px]">check_circle</span>
                        </div>
                        <h4 className="text-2xl font-black text-text-main dark:text-white mb-2">{t('ceStep3Title')}</h4>
                        <p className="text-text-muted dark:text-slate-400 mb-8 max-w-md mx-auto">
                            {t('ceStep3Desc')}
                        </p>
                        <button onClick={() => navigate('/ai-assistant')} className="h-12 px-8 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors shadow-lg">
                            {t('ceProceedBtn')}
                        </button>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handlePrev}
                        disabled={step === 1}
                        className={`px-6 h-10 rounded-lg font-bold transition-colors ${step === 1
                                ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                : 'text-text-main dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        {t('ceBack')}
                    </button>

                    {step < 3 && (
                        <button
                            onClick={handleNext}
                            disabled={step === 1 && !formData.condition}
                            className={`px-6 h-10 rounded-lg font-bold transition-colors shadow-md ${(step === 1 && !formData.condition)
                                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                    : 'bg-primary hover:bg-secondary text-white'
                                }`}
                        >
                            {t('ceContinue')}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CostEstimator;
