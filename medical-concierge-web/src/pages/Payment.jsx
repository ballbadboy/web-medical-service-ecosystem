import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const Payment = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const planId = params.get('plan');
    const planName = params.get('name') || '';
    const planPrice = Number(params.get('price')) || 0;

    const [method, setMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '', holder: '' });

    const bookingRef = useMemo(() => 'BC-' + Math.random().toString(36).substring(2, 8).toUpperCase(), []);

    // Format card number with spaces
    const formatCardNumber = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    const formatExpiry = (val) => {
        const clean = val.replace(/\D/g, '').substring(0, 4);
        return clean.length > 2 ? clean.substring(0, 2) + '/' + clean.substring(2) : clean;
    };

    const handlePay = () => {
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
        }, 2000);
    };

    const isCardValid = cardForm.number.replace(/\s/g, '').length === 16 && cardForm.expiry.length === 5 && cardForm.cvc.length >= 3 && cardForm.holder.length > 1;

    // No plan selected
    if (!planId) {
        return (
            <>
                <SeoHead title="Payment" description="Complete your Bio Connext booking." />
                <div className="min-h-[60vh] flex items-center justify-center px-5">
                    <div className="text-center max-w-md">
                        <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">shopping_cart</span>
                        <h1 className="text-2xl font-bold text-text-main dark:text-white mb-2">{t('paymentNoPlan')}</h1>
                        <p className="text-text-muted dark:text-slate-400 mb-6 font-body">{t('paymentNoPlanDesc')}</p>
                        <button onClick={() => navigate('/pricing')} className="btn-primary">{t('paymentGoToPricing')}</button>
                    </div>
                </div>
            </>
        );
    }

    // Success state
    if (success) {
        return (
            <>
                <SeoHead title="Payment Successful" description="Your booking has been confirmed." />
                <div className="min-h-[70vh] flex items-center justify-center px-5">
                    <div className="text-center max-w-md opacity-0 animate-fade-in-up">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined !text-[40px]">check_circle</span>
                        </div>
                        <h1 className="text-2xl font-bold text-text-main dark:text-white mb-2">{t('paymentSuccess')}</h1>
                        <p className="text-text-muted dark:text-slate-400 mb-2 font-body">{t('paymentSuccessDesc')}</p>
                        <p className="text-sm text-primary font-bold mb-8 font-body">Ref: {bookingRef}</p>
                        <button onClick={() => navigate('/')} className="btn-primary gap-2">
                            <span className="material-symbols-outlined text-lg">home</span>
                            {t('paymentBackHome')}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const methods = [
        { id: 'card', icon: 'credit_card', label: t('paymentCreditCard') },
        { id: 'promptpay', icon: 'qr_code_2', label: t('paymentPromptPay') },
        { id: 'bank', icon: 'account_balance', label: t('paymentBankTransfer') },
    ];

    return (
        <>
            <SeoHead title="Payment" description="Complete your Bio Connext booking." />

            <section className="py-12 md:py-20 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-5xl px-5 md:px-10">
                    <h1 className="text-display-md text-text-main dark:text-white mb-10">{t('paymentTitle')}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* ── Payment Methods ── */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Method tabs */}
                            <div className="flex gap-2">
                                {methods.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMethod(m.id)}
                                        className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${
                                            method === m.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-muted dark:text-slate-400 hover:border-primary/40'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{m.icon}</span>
                                        <span className="text-center leading-tight">{m.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Card form */}
                            {method === 'card' && (
                                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 space-y-4 opacity-0 animate-fade-in-up">
                                    <div>
                                        <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5 font-body">{t('paymentCardNumber')}</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="4242 4242 4242 4242"
                                                value={cardForm.number}
                                                onChange={(e) => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })}
                                                className="w-full h-11 pl-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-body text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary tabular-nums"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-xl">credit_card</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5 font-body">{t('paymentExpiry')}</label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="MM/YY"
                                                value={cardForm.expiry}
                                                onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                                                className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-body text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary tabular-nums"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5 font-body">{t('paymentCvc')}</label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="123"
                                                maxLength={4}
                                                value={cardForm.cvc}
                                                onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                                                className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-body text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary tabular-nums"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text-main dark:text-white mb-1.5 font-body">{t('paymentCardHolder')}</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={cardForm.holder}
                                            onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })}
                                            className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-body text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={handlePay}
                                        disabled={!isCardValid || processing}
                                        className={`w-full h-12 rounded-lg font-bold text-sm transition-colors duration-200 mt-2 flex items-center justify-center gap-2 ${
                                            isCardValid && !processing
                                                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {processing ? (
                                            <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> {t('paymentProcessing')}</>
                                        ) : (
                                            <><span className="material-symbols-outlined text-lg">lock</span> {t('paymentPayNow')} — ${planPrice.toLocaleString()}</>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* PromptPay QR */}
                            {method === 'promptpay' && (
                                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 text-center opacity-0 animate-fade-in-up">
                                    <div className="inline-flex flex-col items-center">
                                        {/* QR Code placeholder using SVG pattern */}
                                        <div className="w-56 h-56 bg-white rounded-xl p-4 mb-5 flex items-center justify-center border border-slate-200">
                                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                                {/* Simulated QR pattern */}
                                                <rect width="200" height="200" fill="white"/>
                                                {/* Corner squares */}
                                                <rect x="10" y="10" width="50" height="50" fill="none" stroke="#1a2033" strokeWidth="6"/>
                                                <rect x="20" y="20" width="30" height="30" fill="#1a2033"/>
                                                <rect x="140" y="10" width="50" height="50" fill="none" stroke="#1a2033" strokeWidth="6"/>
                                                <rect x="150" y="20" width="30" height="30" fill="#1a2033"/>
                                                <rect x="10" y="140" width="50" height="50" fill="none" stroke="#1a2033" strokeWidth="6"/>
                                                <rect x="20" y="150" width="30" height="30" fill="#1a2033"/>
                                                {/* Center data pattern */}
                                                {Array.from({ length: 8 }).map((_, row) =>
                                                    Array.from({ length: 8 }).map((_, col) => (
                                                        (row + col) % 3 !== 0 && (
                                                            <rect key={`${row}-${col}`} x={70 + col * 8} y={70 + row * 8} width="6" height="6" fill="#1a2033" rx="1"/>
                                                        )
                                                    ))
                                                )}
                                                {/* PromptPay logo area */}
                                                <rect x="80" y="88" width="40" height="24" fill="white"/>
                                                <text x="100" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2b7cee">PP</text>
                                            </svg>
                                        </div>
                                        <p className="font-bold text-text-main dark:text-white text-lg mb-1 font-body tabular-nums">
                                            ${planPrice.toLocaleString()} USD
                                        </p>
                                        <p className="text-text-muted dark:text-slate-400 text-sm font-body mb-1">{t('paymentScanQr')}</p>
                                        <p className="text-xs text-text-muted dark:text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            {t('paymentQrExpiry')}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handlePay}
                                            disabled={processing}
                                            className="w-full h-12 rounded-lg font-bold text-sm bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            {processing ? (
                                                <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> {t('paymentProcessing')}</>
                                            ) : (
                                                t('paymentPayNow')
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Bank Transfer */}
                            {method === 'bank' && (
                                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 opacity-0 animate-fade-in-up">
                                    <div className="space-y-4">
                                        {[
                                            { label: t('paymentBankName'), value: 'Bangkok Bank (BBL)' },
                                            { label: t('paymentBankAccount'), value: '123-4-56789-0', mono: true },
                                            { label: t('paymentBankHolder'), value: 'Bio Connext Co., Ltd.' },
                                            { label: t('paymentBankRef'), value: bookingRef, mono: true, accent: true },
                                            { label: t('paymentTotal'), value: `$${planPrice.toLocaleString()} USD`, mono: true, accent: true },
                                        ].map((row, i) => (
                                            <div key={i} className="flex items-center justify-between py-3 border-b border-border-light dark:border-border-dark last:border-0">
                                                <span className="text-sm text-text-muted dark:text-slate-400 font-body">{row.label}</span>
                                                <span className={`text-sm font-bold font-body ${row.accent ? 'text-primary' : 'text-text-main dark:text-white'} ${row.mono ? 'tabular-nums' : ''}`}>
                                                    {row.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl">
                                        <p className="text-sm text-text-muted dark:text-slate-300 leading-relaxed font-body flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">info</span>
                                            {t('paymentBankInstructions')}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handlePay}
                                        disabled={processing}
                                        className="w-full h-12 rounded-lg font-bold text-sm bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 transition-colors duration-200 mt-5 flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> {t('paymentProcessing')}</>
                                        ) : (
                                            t('paymentPayNow')
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Security note */}
                            <p className="text-xs text-text-muted dark:text-slate-500 text-center flex items-center justify-center gap-1.5 font-body">
                                <span className="material-symbols-outlined text-[14px] text-success">lock</span>
                                {t('paymentSecure')}
                            </p>
                        </div>

                        {/* ── Order Summary ── */}
                        <div className="lg:col-span-2">
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 sticky top-20">
                                <h3 className="font-bold text-text-main dark:text-white mb-5 font-body">{t('paymentOrderSummary')}</h3>

                                <div className="space-y-3 mb-5 pb-5 border-b border-border-light dark:border-border-dark">
                                    <div className="flex justify-between text-sm font-body">
                                        <span className="text-text-muted dark:text-slate-400">{t('paymentPlan')}</span>
                                        <span className="font-bold text-text-main dark:text-white">{planName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-body">
                                        <span className="text-text-muted dark:text-slate-400">Ref</span>
                                        <span className="font-bold text-primary tabular-nums">{bookingRef}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-text-main dark:text-white font-body">{t('paymentTotal')}</span>
                                    <span className="text-2xl font-black text-text-main dark:text-white font-body tabular-nums">${planPrice.toLocaleString()}</span>
                                </div>

                                {/* Plan badge */}
                                <div className={`mt-5 p-4 rounded-xl ${
                                    planId === 'vip' ? 'bg-accent/10 border border-accent/20' :
                                    planId === 'premium' ? 'bg-primary/5 border border-primary/10' :
                                    'bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark'
                                }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`material-symbols-outlined text-lg ${planId === 'vip' ? 'text-accent' : 'text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {planId === 'vip' ? 'diamond' : planId === 'premium' ? 'stars' : 'verified'}
                                        </span>
                                        <span className="text-sm font-bold text-text-main dark:text-white font-body">{planName}</span>
                                    </div>
                                    <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed font-body">
                                        {planId === 'vip' ? t('pricingVipDesc') : planId === 'premium' ? t('pricingPremiumDesc') : t('pricingBasicDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Payment;
