import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const faqData = useMemo(() => [
        { q: t('faq1Q'), a: t('faq1A') },
        { q: t('faq2Q'), a: t('faq2A') },
        { q: t('faq3Q'), a: t('faq3A') },
        { q: t('faq4Q'), a: t('faq4A') },
        { q: t('faq5Q'), a: t('faq5A') },
    ], [t]);

    const journeySteps = [
        { icon: 'calendar_month', num: '01', titleKey: 'step1Title', descKey: 'step1Desc' },
        { icon: 'medical_services', num: '02', titleKey: 'step2Title', descKey: 'step2Desc' },
        { icon: 'home_health', num: '03', titleKey: 'step3Title', descKey: 'step3Desc' },
    ];

    const benefits = [
        { icon: 'flight_land', titleKey: 'airportMeetTitle', descKey: 'airportMeetDesc' },
        { icon: 'translate', titleKey: 'medicalInterpTitle', descKey: 'medicalInterpDesc' },
        { icon: 'local_taxi', titleKey: 'vipTransportTitle', descKey: 'vipTransportDesc' },
        { icon: 'credit_card', titleKey: 'insuranceLiaisonTitle', descKey: 'insuranceLiaisonDesc' },
    ];

    return (
        <>
            <SeoHead
                title="Premium Medical Tourism in Thailand"
                description="Thailand's premier medical concierge service. JCI-accredited hospitals, 50+ specialist doctors, VIP transport, medical interpretation. Serving 10,000+ patients from 45+ countries."
            />

            {/* Hero Section */}
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-6 md:py-10">
                    <div
                        className="relative overflow-hidden rounded-2xl md:rounded-3xl min-h-[560px] flex flex-col justify-end p-6 md:p-12 lg:p-16 bg-cover bg-center"
                        style={{ backgroundImage: 'linear-gradient(180deg, rgba(12,20,32,0) 0%, rgba(12,20,32,0.15) 35%, rgba(12,20,32,0.75) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDksQzb8LXTa-7PiGJ46GacOCcbHs6QqNOr4lrXF5NCs9oXr_2ybKDobcfNkBnHCxZMiOH7ZResuo3rjhpSZd6Di6-bO9_zaguIyNQJma6ViG1jluZuXsjwZRAJ2SbXzSMuFxjcNafQgPphg3-Alyi33W-F6v-FALsfveO0I_G3jT7mFFejHzvLmDhRKednQlXDd9CvFVP3rQ2s3YQdhvpI6HBKo2tNndhjrRhUhHPku-GYy2JmZ6-j3KOwJlINY8eg4BIKEd-wSyA")' }}
                    >
                        <div className="relative z-10 max-w-2xl flex flex-col gap-5 opacity-0 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{t('premiumCare')}</span>
                            </div>
                            <div className="flex flex-col gap-3 text-left">
                                <h1 className="text-white text-display-xl font-display leading-tight drop-shadow-sm">
                                    {t('heroTitle1')} <br /><span className="text-white/85">{t('heroTitle2')}</span>
                                </h1>
                                <p className="text-slate-200 text-base md:text-lg font-body font-medium leading-relaxed max-w-xl">
                                    {t('heroSubtitle')}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-1">
                                <button onClick={() => navigate('/ai-assistant')} className="btn-primary shadow-lg shadow-primary/25">
                                    {t('heroBtn1')}
                                </button>
                                <button onClick={() => navigate('/services')} className="inline-flex items-center justify-center rounded-lg h-12 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all duration-200 ease-out-quart">
                                    {t('heroBtn2')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Journey Section */}
            <section className="py-20 md:py-28 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-14">
                        <div className="flex-1 space-y-3">
                            <p className="section-label">{t('journeyLabel')}</p>
                            <h2 className="text-display-lg text-text-main dark:text-white">
                                {t('journeyTitle')}
                            </h2>
                            <p className="text-text-muted dark:text-slate-400 text-lg max-w-2xl leading-relaxed font-body">
                                {t('journeyDesc')}
                            </p>
                        </div>
                        <button onClick={() => navigate('/services')} className="btn-ghost gap-2 group">
                            <span>{t('viewFullJourney')}</span>
                            <span className="material-symbols-outlined transition-transform duration-200 ease-out-quart group-hover:translate-x-1">arrow_forward</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {journeySteps.map((step, i) => (
                            <div
                                key={step.num}
                                className={`group relative flex flex-col gap-4 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-7 card-hover opacity-0 animate-fade-in-up`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ease-out-quart">
                                        <span className="material-symbols-outlined">{step.icon}</span>
                                    </div>
                                    <span className="text-border-light dark:text-border-dark font-display text-4xl">{step.num}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-bold text-text-main dark:text-white font-body">{t(step.titleKey)}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed font-body">
                                        {t(step.descKey)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Patient Services Section */}
            <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="flex flex-col gap-12 lg:flex-row lg:items-center">

                        <div className="w-full lg:w-1/2 relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lift relative">
                                <img
                                    alt="Private luxury medical transport vehicle interior"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrD5kUFcW7z1niixaHKtXyIvc63OEuiOoGwkX34rRtqdzuqcvmwkc_OMgsRau1CicwXU_kXfCPtniy71DiFjrBCideHAox5-MIsKSXqnh6XEiHZ3C2VjeAsox7HwCS-3I0Hro_1rL6cUYnIgWHbnI4T6ureiWQWY7eo8cbCinMIewnqUK9nuDua2fBXbimP_LI3bAsi9Up1-BFvIvHprBZyuW8D961pvYQwUcJPTkoZlHMdnkkiEDYJQr4569l65LYlzqFCIOTGYM"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="material-symbols-outlined text-accent text-xl">stars</span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-accent">{t('whiteGlove')}</span>
                                    </div>
                                    <p className="text-lg font-bold font-body">{t('priorityTransfer')}</p>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="hidden md:flex absolute -bottom-5 -right-5 bg-surface-light dark:bg-surface-dark-alt p-4 rounded-xl shadow-medium border border-border-light dark:border-border-dark max-w-xs items-center gap-4">
                                <div className="size-11 rounded-full bg-green-50 dark:bg-green-900/20 text-success flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main dark:text-white font-body">{t('jciAccred')}</p>
                                    <p className="text-xs text-text-muted dark:text-slate-400">{t('jciStandard')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 lg:pl-12 flex flex-col gap-8">
                            <div>
                                <p className="section-label mb-2">{t('exclusiveBenefits')}</p>
                                <h2 className="text-display-lg text-text-main dark:text-white mb-4">
                                    {t('intlPatientsTitle')}
                                </h2>
                                <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body">
                                    {t('intlPatientsDesc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {benefits.map((b) => (
                                    <div key={b.titleKey} className="flex gap-4">
                                        <div className="shrink-0 text-primary mt-0.5">
                                            <span className="material-symbols-outlined text-2xl">{b.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main dark:text-white mb-1 font-body">{t(b.titleKey)}</h4>
                                            <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">{t(b.descKey)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2">
                                <button onClick={() => navigate('/services')} className="btn-secondary border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary">
                                    {t('viewPackages')}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 md:py-28 bg-background-light dark:bg-background-dark" aria-labelledby="faq-heading">
                <div className="mx-auto max-w-3xl px-4 md:px-10">
                    <div className="text-center mb-14">
                        <p className="section-label mb-2">FAQ</p>
                        <h2 id="faq-heading" className="text-display-lg text-text-main dark:text-white">
                            {t('faqTitle')}
                        </h2>
                        <p className="text-text-muted dark:text-slate-400 text-lg mt-4 font-body">
                            {t('faqSubtitle')}
                        </p>
                    </div>
                    <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                        {faqData.map((faq, i) => (
                            <div
                                key={i}
                                className="border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark overflow-hidden card-hover"
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                    aria-expanded={openFaq === i}
                                    aria-controls={`faq-answer-${i}`}
                                >
                                    <span className="font-bold text-text-main dark:text-white pr-4 font-body group-hover:text-primary transition-colors duration-200" itemProp="name">{faq.q}</span>
                                    <span className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ease-out-quart ${openFaq === i ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${i}`}
                                    className={`grid transition-all duration-300 ease-out-quart ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                    hidden={openFaq !== i}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-text-muted dark:text-slate-400 leading-relaxed font-body" itemProp="text">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-text-main relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
                    <h2 className="text-display-lg text-white mb-6">
                        {t('homeCtaTitle')}
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-body">
                        {t('homeCtaDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => navigate('/ai-assistant')} className="w-full sm:w-auto min-w-[200px] h-14 bg-white text-text-main rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors duration-200 ease-out-quart shadow-medium font-body">
                            {t('homeCtaBtn1')}
                        </button>
                        <button onClick={() => navigate('/specialists')} className="w-full sm:w-auto min-w-[200px] h-14 border-2 border-white/25 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-200 ease-out-quart font-body">
                            {t('homeCtaBtn2')}
                        </button>
                    </div>
                    <p className="mt-8 text-slate-400 text-sm font-body">
                        {t('homeCtaNote')}
                    </p>
                </div>
            </section>
        </>
    );
};

export default Home;
