import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const team = [
    { name: 'Dr. Sakchai Lertpanit', role: 'Founder & Chief Medical Officer', initials: 'SL', color: 'from-primary to-blue-400' },
    { name: 'Nantaka Worasilp', role: 'Chief Operations Officer', initials: 'NW', color: 'from-emerald-500 to-teal-400' },
    { name: 'James Morrison', role: 'Head of International Relations', initials: 'JM', color: 'from-amber-500 to-orange-400' },
    { name: 'Dr. Mei Lin Chen', role: 'Director of Quality & Accreditation', initials: 'MC', color: 'from-purple-500 to-pink-400' },
];

const About = () => {
    const { t } = useLanguage();

    const stats = [
        { icon: 'groups', value: '10,000+', label: t('patientsServed') },
        { icon: 'public', value: '45+', label: t('countriesReached') },
        { icon: 'verified', value: '50+', label: t('specialistPartners') },
        { icon: 'star', value: '4.9/5', label: t('averageRating') },
    ];

    const values = [
        { icon: 'favorite', title: t('v1Title'), desc: t('v1Desc') },
        { icon: 'transparency', title: t('v2Title'), desc: t('v2Desc') },
        { icon: 'diversity_3', title: t('v3Title'), desc: t('v3Desc') },
        { icon: 'science', title: t('v4Title'), desc: t('v4Desc') },
    ];

    return (
        <>
            <SeoHead
                title="About Us — Our Story & Mission"
                description="Founded in 2015 in Bangkok, Bio Connext has served 10,000+ patients from 45+ countries. JCI-accredited, ISO 9001:2015 certified. Meet our leadership team and learn our mission."
            />
            {/* Hero */}
            <div className="bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{t('ourStory')}</p>
                        <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight mb-6">
                            {t('aboutTitle1')} <br /><span className="text-primary">{t('aboutTitle2')}</span>
                        </h1>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed mb-6">
                            {t('aboutDesc1')}
                        </p>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed">
                            {t('aboutDesc2')}
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="w-full h-full bg-gradient-to-br from-primary/80 to-secondary/90 flex items-center justify-center">
                            <div className="text-center text-white p-10">
                                <span className="material-symbols-outlined text-7xl mb-4 block opacity-80">medical_services</span>
                                <p className="text-2xl font-black">{t('estYear')}</p>
                                <p className="text-white/70 mt-1">{t('estCity')}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white">
                            <p className="font-bold text-lg">{t('yearsExcellence')}</p>
                            <p className="text-white/70 text-sm">{t('trustedPatients')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-primary py-14">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <span className="material-symbols-outlined text-white/70 text-3xl">{s.icon}</span>
                                </div>
                                <p className="text-white text-4xl font-black mb-1">{s.value}</p>
                                <p className="text-white/70 text-sm font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission */}
            <div className="bg-background-light dark:bg-background-dark py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{t('ourMission')}</p>
                        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-6">{t('whyWeExist')}</h2>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed">
                            {t('missionDesc')}
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex gap-5 hover:shadow-md transition-shadow">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-main dark:text-white mb-2">{v.title}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="bg-white dark:bg-surface-dark py-16 md:py-24 border-t border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="text-center mb-14">
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{t('peopleBehind')}</p>
                        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white">{t('leadershipTeam')}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="text-center group">
                                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                                    {member.initials}
                                </div>
                                <h3 className="font-bold text-text-main dark:text-white">{member.name}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Accreditations */}
            <div className="bg-background-light dark:bg-background-dark py-14 border-t border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 md:px-10 text-center">
                    <p className="text-text-muted dark:text-slate-400 text-sm uppercase tracking-widest font-bold mb-8">{t('partnersLabel')}</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        {['JCI Accredited', 'ISO 9001:2015', 'TEMOS Certified', 'MTQUA Partner', 'WHO Aligned'].map((badge) => (
                            <div key={badge} className="flex items-center gap-2 text-text-muted dark:text-slate-400 font-semibold">
                                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                <span>{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-primary py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <svg fill="white" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" fill="none" r="80" stroke="currentColor" strokeWidth="20"></circle>
                        <circle cx="100" cy="100" fill="none" r="40" stroke="currentColor" strokeWidth="20"></circle>
                    </svg>
                </div>
                <div className="mx-auto max-w-3xl text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('aboutCtaTitle')}</h2>
                    <p className="text-white/80 text-lg mb-10">{t('aboutCtaDesc')}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/services" className="w-full sm:w-auto min-w-[180px] h-12 flex items-center justify-center bg-white text-primary rounded-lg font-bold text-base hover:bg-slate-100 transition-colors shadow-xl">
                            {t('exploreServices')}
                        </Link>
                        <Link to="/specialists" className="w-full sm:w-auto min-w-[180px] h-12 flex items-center justify-center bg-transparent border-2 border-white/40 text-white rounded-lg font-bold text-base hover:bg-white/10 transition-colors">
                            {t('meetSpecialists')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
