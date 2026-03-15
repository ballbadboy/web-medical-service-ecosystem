import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const team = [
    { name: 'Dr. Sakchai Lertpanit', role: 'Founder & Chief Medical Officer', initials: 'SL', bg: 'bg-primary' },
    { name: 'Nantaka Worasilp', role: 'Chief Operations Officer', initials: 'NW', bg: 'bg-emerald-600' },
    { name: 'James Morrison', role: 'Head of International Relations', initials: 'JM', bg: 'bg-amber-600' },
    { name: 'Dr. Mei Lin Chen', role: 'Director of Quality & Accreditation', initials: 'MC', bg: 'bg-violet-600' },
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
            <section className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                    <div>
                        <p className="section-label mb-3">{t('ourStory')}</p>
                        <h1 className="text-display-xl text-text-main dark:text-white mb-6">
                            {t('aboutTitle1')} <br /><span className="text-primary">{t('aboutTitle2')}</span>
                        </h1>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed mb-4 font-body">
                            {t('aboutDesc1')}
                        </p>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body">
                            {t('aboutDesc2')}
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lift bg-text-main flex items-center justify-center">
                        <div className="text-center text-white p-10 relative z-10">
                            <span className="material-symbols-outlined text-6xl mb-3 block text-white/30" aria-hidden="true">medical_services</span>
                            <p className="text-3xl font-display">{t('estYear')}</p>
                            <p className="text-white/50 mt-1 font-body text-sm">{t('estCity')}</p>
                        </div>
                        <div className="absolute bottom-6 left-6 bg-white/10 border border-white/15 rounded-xl p-4 text-white">
                            <p className="font-bold text-lg font-body">{t('yearsExcellence')}</p>
                            <p className="text-white/60 text-sm font-body">{t('trustedPatients')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-text-main py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <span className="material-symbols-outlined text-white/40 text-2xl">{s.icon}</span>
                                </div>
                                <p className="text-white text-3xl md:text-4xl font-display mb-1 tabular-nums">{s.value}</p>
                                <p className="text-slate-400 text-sm font-body">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-background-light dark:bg-background-dark py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="section-label mb-3">{t('ourMission')}</p>
                        <h2 className="text-display-md text-text-main dark:text-white mb-6">{t('whyWeExist')}</h2>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body">
                            {t('missionDesc')}
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {values.map((v) => (
                            <div key={v.title} className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark flex gap-5 card-hover">
                                <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/8 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-xl">{v.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-main dark:text-white mb-1.5 font-body">{v.title}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed font-body">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team — solid color avatars, no gradients */}
            <section className="bg-surface-light dark:bg-surface-dark py-20 md:py-28 border-t border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="text-center mb-14">
                        <p className="section-label mb-3">{t('peopleBehind')}</p>
                        <h2 className="text-display-md text-text-main dark:text-white">{t('leadershipTeam')}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className={`w-20 h-20 rounded-2xl ${member.bg} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-soft font-body`}>
                                    {member.initials}
                                </div>
                                <h3 className="font-bold text-text-main dark:text-white font-body">{member.name}</h3>
                                <p className="text-text-muted dark:text-slate-400 text-sm mt-1 font-body">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="bg-background-light dark:bg-background-dark py-14 border-t border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10 text-center">
                    <p className="text-text-muted dark:text-slate-400 text-xs uppercase tracking-widest font-bold mb-8 font-body">{t('partnersLabel')}</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                        {['JCI Accredited', 'ISO 9001:2015', 'TEMOS Certified', 'MTQUA Partner', 'WHO Aligned'].map((badge) => (
                            <div key={badge} className="flex items-center gap-2 text-text-muted dark:text-slate-400 font-semibold text-sm font-body">
                                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                <span>{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-text-main py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#about-grid)" />
                    </svg>
                </div>
                <div className="mx-auto max-w-3xl text-center relative z-10">
                    <h2 className="text-display-md text-white mb-4">{t('aboutCtaTitle')}</h2>
                    <p className="text-slate-300 text-lg mb-10 font-body">{t('aboutCtaDesc')}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link to="/services" className="w-full sm:w-auto min-w-[180px] h-12 flex items-center justify-center bg-white text-text-main rounded-lg font-bold hover:bg-slate-50 transition-colors duration-200 ease-out-quart shadow-medium font-body">
                            {t('exploreServices')}
                        </Link>
                        <Link to="/specialists" className="w-full sm:w-auto min-w-[180px] h-12 flex items-center justify-center border-2 border-white/25 text-white rounded-lg font-bold hover:bg-white/10 transition-colors duration-200 ease-out-quart font-body">
                            {t('meetSpecialists')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
