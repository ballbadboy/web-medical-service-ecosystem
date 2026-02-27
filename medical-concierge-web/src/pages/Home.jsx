import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-6 md:py-10">
                    <div
                        className="relative overflow-hidden rounded-2xl md:rounded-3xl min-h-[560px] flex flex-col justify-end p-6 md:p-12 lg:p-16 bg-cover bg-center group"
                        style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDksQzb8LXTa-7PiGJ46GacOCcbHs6QqNOr4lrXF5NCs9oXr_2ybKDobcfNkBnHCxZMiOH7ZResuo3rjhpSZd6Di6-bO9_zaguIyNQJma6ViG1jluZuXsjwZRAJ2SbXzSMuFxjcNafQgPphg3-Alyi33W-F6v-FALsfveO0I_G3jT7mFFejHzvLmDhRKednQlXDd9CvFVP3rQ2s3YQdhvpI6HBKo2tNndhjrRhUhHPku-GYy2JmZ6-j3KOwJlINY8eg4BIKEd-wSyA")' }}
                    >
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
                        <div className="relative z-10 max-w-2xl flex flex-col gap-6 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 w-fit">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">{t('premiumCare')}</span>
                            </div>
                            <div className="flex flex-col gap-3 text-left">
                                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                                    {t('heroTitle1')} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">{t('heroTitle2')}</span>
                                </h1>
                                <h2 className="text-slate-100 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-xl drop-shadow-sm">
                                    {t('heroSubtitle')}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <button onClick={() => navigate('/ai-assistant')} className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-secondary transition-all text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5">
                                    {t('heroBtn1')}
                                </button>
                                <button onClick={() => navigate('/services')} className="flex items-center justify-center rounded-lg h-12 px-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-base font-bold transition-all hover:shadow-lg">
                                    {t('heroBtn2')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Journey Section */}
            <div className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="flex flex-col md:flex-row gap-12 items-start md:items-end mb-12">
                        <div className="flex-1 space-y-4">
                            <h3 className="text-primary font-bold tracking-wider uppercase text-sm">{t('journeyLabel')}</h3>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white leading-tight">
                                {t('journeyTitle')}
                            </h2>
                            <p className="text-text-muted dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
                                {t('journeyDesc')}
                            </p>
                        </div>
                        <button onClick={() => navigate('/services')} className="flex-none flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group">
                            <span>{t('viewFullJourney')}</span>
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Step 1 */}
                        <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-text-main dark:text-white">{t('step1Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">
                                    {t('step1Desc')}
                                </p>
                            </div>
                            <div className="absolute top-6 right-6 text-slate-200 dark:text-slate-800 font-black text-6xl -z-10 opacity-50">01</div>
                        </div>

                        {/* Step 2 */}
                        <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">medical_services</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-text-main dark:text-white">{t('step2Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">
                                    {t('step2Desc')}
                                </p>
                            </div>
                            <div className="absolute top-6 right-6 text-slate-200 dark:text-slate-800 font-black text-6xl -z-10 opacity-50">02</div>
                        </div>

                        {/* Step 3 */}
                        <div className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">home_health</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-text-main dark:text-white">{t('step3Title')}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">
                                    {t('step3Desc')}
                                </p>
                            </div>
                            <div className="absolute top-6 right-6 text-slate-200 dark:text-slate-800 font-black text-6xl -z-10 opacity-50">03</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* International Patient Services Section */}
            <div className="py-16 bg-white dark:bg-surface-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="flex flex-col gap-12 lg:flex-row lg:items-center">

                        <div className="w-full lg:w-1/2 relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                <img
                                    alt="Private luxury medical transport vehicle interior"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrD5kUFcW7z1niixaHKtXyIvc63OEuiOoGwkX34rRtqdzuqcvmwkc_OMgsRau1CicwXU_kXfCPtniy71DiFjrBCideHAox5-MIsKSXqnh6XEiHZ3C2VjeAsox7HwCS-3I0Hro_1rL6cUYnIgWHbnI4T6ureiWQWY7eo8cbCinMIewnqUK9nuDua2fBXbimP_LI3bAsi9Up1-BFvIvHprBZyuW8D961pvYQwUcJPTkoZlHMdnkkiEDYJQr4569l65LYlzqFCIOTGYM"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-accent">stars</span>
                                        <span className="text-sm font-bold uppercase tracking-wider text-accent">{t('whiteGlove')}</span>
                                    </div>
                                    <p className="text-xl font-bold">{t('priorityTransfer')}</p>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="hidden md:flex absolute -bottom-6 -right-6 bg-surface-light dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-xs items-center gap-4">
                                <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-text-main dark:text-white">{t('jciAccred')}</p>
                                    <p className="text-xs text-text-muted dark:text-slate-400">{t('jciStandard')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col gap-8">
                            <div>
                                <h3 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">{t('exclusiveBenefits')}</h3>
                                <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white leading-tight mb-4">
                                    {t('intlPatientsTitle')}
                                </h2>
                                <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed">
                                    {t('intlPatientsDesc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                                <div className="flex gap-4">
                                    <div className="shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-3xl">flight_land</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white mb-1">{t('airportMeetTitle')}</h4>
                                        <p className="text-sm text-text-muted dark:text-slate-400">{t('airportMeetDesc')}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-3xl">translate</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white mb-1">{t('medicalInterpTitle')}</h4>
                                        <p className="text-sm text-text-muted dark:text-slate-400">{t('medicalInterpDesc')}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-3xl">local_taxi</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white mb-1">{t('vipTransportTitle')}</h4>
                                        <p className="text-sm text-text-muted dark:text-slate-400">{t('vipTransportDesc')}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="shrink-0 text-primary">
                                        <span className="material-symbols-outlined text-3xl">credit_card</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white mb-1">{t('insuranceLiaisonTitle')}</h4>
                                        <p className="text-sm text-text-muted dark:text-slate-400">{t('insuranceLiaisonDesc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button onClick={() => navigate('/services')} className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-surface-light dark:bg-slate-800 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-base font-bold w-fit">
                                    {t('viewPackages')}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <svg fill="white" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" strokeWidth="20"></circle>
                        <circle cx="100" cy="100" fill="none" r="40" stroke="currentColor" strokeWidth="20"></circle>
                    </svg>
                </div>
                <div className="absolute bottom-0 left-0 p-8 opacity-10">
                    <svg fill="white" height="150" viewBox="0 0 150 150" width="150" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="none" height="100" stroke="currentColor" strokeWidth="15" width="100" x="25" y="25"></rect>
                    </svg>
                </div>

                <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {t('homeCtaTitle')}
                    </h2>
                    <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('homeCtaDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => navigate('/ai-assistant')} className="w-full sm:w-auto min-w-[200px] h-14 bg-white text-primary rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
                            {t('homeCtaBtn1')}
                        </button>
                        <button onClick={() => navigate('/specialists')} className="w-full sm:w-auto min-w-[200px] h-14 bg-primary border-2 border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors">
                            {t('homeCtaBtn2')}
                        </button>
                    </div>
                    <p className="mt-8 text-white/70 text-sm">
                        {t('homeCtaNote')}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Home;
