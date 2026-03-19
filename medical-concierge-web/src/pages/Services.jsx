import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import CostEstimator from '../components/CostEstimator';
import SeoHead from '../components/SeoHead';

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const services = [
        { icon: 'stethoscope', titleKey: 's1Title', descKey: 's1Desc', accent: 'bg-blue-50 dark:bg-blue-900/15 text-blue-600' },
        { icon: 'assignment_turned_in', titleKey: 's2Title', descKey: 's2Desc', accent: 'bg-emerald-50 dark:bg-emerald-900/15 text-emerald-600' },
        { icon: 'biotech', titleKey: 's3Title', descKey: 's3Desc', accent: 'bg-violet-50 dark:bg-violet-900/15 text-violet-600' },
        { icon: 'medical_information', titleKey: 's4Title', descKey: 's4Desc', accent: 'bg-amber-50 dark:bg-amber-900/15 text-amber-600' },
        { icon: 'flight_takeoff', titleKey: 's5Title', descKey: 's5Desc', accent: 'bg-sky-50 dark:bg-sky-900/15 text-sky-600' },
        { icon: 'support_agent', titleKey: 's6Title', descKey: 's6Desc', accent: 'bg-rose-50 dark:bg-rose-900/15 text-rose-600' },
    ];

    return (
        <>
            <SeoHead
                title="Medical Services & Cost Estimator"
                description="Explore our medical concierge services: specialist coordination, second opinions, advanced therapies, post-surgery nursing, VIP logistics, and 24/7 support. Get instant cost estimates for procedures in Thailand."
            />

            {/* Hero Section */}
            <section className="px-4 py-20 md:py-24 sm:px-10 lg:px-20 bg-surface-light dark:bg-surface-dark">
                <div className="flex max-w-[960px] mx-auto flex-col gap-5 text-center">
                    <p className="section-label">{t('servicesHeroTitle') ? '' : ''}{/* Label comes from title */}</p>
                    <h1 className="text-text-main dark:text-white text-display-xl">
                        {t('servicesHeroTitle')}
                    </h1>
                    <p className="mx-auto max-w-[640px] text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body">
                        {t('servicesHeroDesc')}
                    </p>
                    <div className="flex justify-center gap-3 pt-4">
                        <button onClick={() => document.getElementById('service-pillars')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
                            {t('exploreServices')}
                        </button>
                        <button onClick={() => navigate('/specialists')} className="btn-secondary">
                            {t('viewDoctors')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Service Pillars — varied accent colors break the identical-card pattern */}
            <section id="service-pillars" className="bg-background-light dark:bg-background-dark py-20 px-4 sm:px-10 lg:px-20">
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-14">
                        <p className="section-label mb-2">{t('specializedCareLabel') ? '' : ''}</p>
                        <h2 className="text-text-main dark:text-white text-display-md">
                            {t('specializedCareLabel')}
                        </h2>
                        <p className="mt-3 max-w-[640px] text-text-muted dark:text-slate-400 text-base leading-relaxed font-body">
                            {t('specializedCareDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((svc, i) => (
                            <div
                                key={svc.titleKey}
                                className="group flex flex-col gap-4 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 card-hover opacity-0 animate-fade-in-up"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className={`flex size-11 items-center justify-center rounded-xl ${svc.accent} transition-colors duration-300`}>
                                    <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-text-main dark:text-white text-lg font-bold font-body">{t(svc.titleKey)}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed font-body">{t(svc.descKey)}</p>
                                </div>
                                <div className="mt-auto pt-3">
                                    <button
                                        onClick={() => navigate('/specialists')}
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded font-body group/link"
                                    >
                                        {t('learnMore')}
                                        <span className="material-symbols-outlined text-base transition-transform duration-200 ease-out-quart group-hover/link:translate-x-0.5">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost Estimator Section */}
            <section className="bg-surface-light dark:bg-surface-dark py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-text-main dark:text-white text-display-md">
                            {t('planJourneyTitle')}
                        </h2>
                        <p className="mt-3 max-w-[640px] mx-auto text-text-muted dark:text-slate-400 text-base leading-relaxed font-body">
                            {t('planJourneyDesc')}
                        </p>
                    </div>
                    <CostEstimator />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-background-light dark:bg-background-dark py-20 px-4 sm:px-10 lg:px-20">
                <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 rounded-2xl bg-text-main p-10 text-center md:p-16">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-white text-display-md">
                            {t('servicesCtaTitle')}
                        </h2>
                        <p className="mx-auto max-w-[560px] text-slate-300 text-lg leading-relaxed font-body">
                            {t('servicesCtaDesc')}
                        </p>
                    </div>
                    <div className="flex flex-col w-full sm:flex-row justify-center gap-3">
                        <button onClick={() => navigate('/specialists')} className="w-full sm:w-auto h-12 px-8 bg-white text-text-main rounded-lg font-bold hover:bg-slate-50 transition-colors duration-200 ease-out-quart shadow-medium font-body">
                            {t('contactSupport')}
                        </button>
                        <button onClick={() => navigate('/about')} className="w-full sm:w-auto h-12 px-8 border-2 border-white/25 text-white rounded-lg font-bold hover:bg-white/10 transition-colors duration-200 ease-out-quart font-body">
                            {t('learnAboutUs')}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
