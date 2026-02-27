import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import CostEstimator from '../components/CostEstimator';

const Services = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <>
            {/* Hero Section */}
            <div className="layout-container flex flex-col items-center justify-center px-4 py-16 sm:px-10 lg:px-40 bg-white dark:bg-surface-dark">
                <div className="layout-content-container flex max-w-[960px] flex-col gap-6 text-center">
                    <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl">
                        {t('servicesHeroTitle')}
                    </h1>
                    <p className="mx-auto max-w-[720px] text-text-muted dark:text-slate-400 text-lg font-normal leading-relaxed">
                        {t('servicesHeroDesc')}
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <button onClick={() => navigate('/ai-assistant')} className="flex items-center justify-center rounded-lg bg-primary h-12 px-6 text-white text-base font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/20">
                            {t('exploreServices')}
                        </button>
                        <button onClick={() => navigate('/specialists')} className="flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-12 px-6 text-text-main dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            {t('viewDoctors')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Service Pillars Grid */}
            <div className="bg-background-light dark:bg-background-dark py-16 px-4 sm:px-10 lg:px-40">
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-12">
                        <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                            {t('specializedCareLabel')}
                        </h2>
                        <p className="mt-4 max-w-[720px] text-text-muted dark:text-slate-400 text-base leading-normal">
                            {t('specializedCareDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1: Specialist Coordination */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">stethoscope</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s1Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s1Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Card 2: Second Opinion */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s2Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s2Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Card 3: Advanced Therapies */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">biotech</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s3Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s3Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Card 4: Post-Surgery Nursing */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">medical_information</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s4Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s4Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Card 5: VIP Logistics */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s5Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s5Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Card 6: Concierge Support */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">support_agent</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-text-main dark:text-white text-xl font-bold leading-tight">{t('s6Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{t('s6Desc')}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <a className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary group-hover:gap-2 transition-all" href="#">
                                    {t('learnMore')} <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cost Estimator Section */}
            <div className="bg-white dark:bg-surface-dark py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                            {t('planJourneyTitle')}
                        </h2>
                        <p className="mt-4 max-w-[720px] mx-auto text-text-muted dark:text-slate-400 text-base leading-normal">
                            {t('planJourneyDesc')}
                        </p>
                    </div>
                    <CostEstimator />
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-background-light dark:bg-background-dark py-20 px-4 sm:px-10 lg:px-40">
                <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 rounded-2xl bg-primary/5 p-10 text-center md:p-16 border border-primary/10">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-text-main dark:text-white text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                            {t('servicesCtaTitle')}
                        </h2>
                        <p className="mx-auto max-w-[600px] text-text-muted dark:text-slate-400 text-lg font-normal leading-relaxed">
                            {t('servicesCtaDesc')}
                        </p>
                    </div>
                    <div className="flex flex-col w-full sm:flex-row justify-center gap-4">
                        <button onClick={() => navigate('/ai-assistant')} className="flex items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 h-12 px-8 text-white text-base font-bold hover:bg-secondary transition-colors w-full sm:w-auto">
                            {t('contactSupport')}
                        </button>
                        <button onClick={() => navigate('/about')} className="flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-primary/20 h-12 px-8 text-primary text-base font-bold hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto">
                            {t('learnAboutUs')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
