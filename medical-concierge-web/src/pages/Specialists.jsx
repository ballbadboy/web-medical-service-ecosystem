import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const specialistsData = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        title: 'Cardiologist & Interventional Specialist',
        hospital: 'Bangkok Heart Institute',
        experience: '22 Years',
        languages: ['English', 'Thai', 'Hindi'],
        rating: 4.9,
        reviews: 312,
        specialties: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia'],
        avatar: 'PS',
        avatarColor: 'from-blue-500 to-cyan-400',
        available: true,
    },
    {
        id: 2,
        name: 'Dr. Chen Wei',
        title: 'Orthopedic Surgeon',
        hospital: 'Bumrungrad International Hospital',
        experience: '18 Years',
        languages: ['English', 'Chinese', 'Thai'],
        rating: 4.8,
        reviews: 289,
        specialties: ['Joint Replacement', 'Spine Surgery', 'Sports Medicine'],
        avatar: 'CW',
        avatarColor: 'from-emerald-500 to-teal-400',
        available: true,
    },
    {
        id: 3,
        name: 'Dr. Ananya Suwanporn',
        title: 'Oncologist & Cancer Specialist',
        hospital: 'Samitivej Oncology Center',
        experience: '15 Years',
        languages: ['English', 'Thai', 'Japanese'],
        rating: 4.9,
        reviews: 198,
        specialties: ['Breast Cancer', 'Lung Cancer', 'Immunotherapy'],
        avatar: 'AS',
        avatarColor: 'from-purple-500 to-pink-400',
        available: false,
    },
    {
        id: 4,
        name: 'Dr. Michael Torres',
        title: 'Neurosurgeon',
        hospital: 'MedPark Hospital',
        experience: '20 Years',
        languages: ['English', 'Spanish', 'Thai'],
        rating: 4.7,
        reviews: 245,
        specialties: ['Brain Tumor', 'Epilepsy Surgery', 'Deep Brain Stimulation'],
        avatar: 'MT',
        avatarColor: 'from-orange-500 to-amber-400',
        available: true,
    },
    {
        id: 5,
        name: 'Dr. Fatima Al-Hassan',
        title: 'Stem Cell & Regenerative Medicine',
        hospital: 'Advanced Cell Therapy Center',
        experience: '12 Years',
        languages: ['English', 'Arabic', 'French'],
        rating: 4.8,
        reviews: 157,
        specialties: ['Stem Cell Therapy', 'Regenerative Medicine', 'Anti-Aging'],
        avatar: 'FA',
        avatarColor: 'from-rose-500 to-red-400',
        available: true,
    },
    {
        id: 6,
        name: 'Dr. Somchai Pittayaporn',
        title: 'Plastic & Reconstructive Surgeon',
        hospital: 'KTOP Clinic Bangkok',
        experience: '16 Years',
        languages: ['English', 'Thai', 'Korean'],
        rating: 4.9,
        reviews: 421,
        specialties: ['Facial Reconstruction', 'Body Contouring', 'Rhinoplasty'],
        avatar: 'SP',
        avatarColor: 'from-indigo-500 to-violet-400',
        available: true,
    },
];

const filterKeys = ['All Specialties', 'Cardiology', 'Orthopedics', 'Oncology', 'Neurology', 'Stem Cell', 'Cosmetic'];

const Specialists = () => {
    const { t } = useLanguage();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Specialties');
    const [availableOnly, setAvailableOnly] = useState(false);

    const filtered = specialistsData.filter((doc) => {
        const matchSearch =
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
        const matchAvail = availableOnly ? doc.available : true;
        return matchSearch && matchAvail;
    });

    return (
        <>
            {/* Hero */}
            <div className="bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-14 md:py-20">
                    <div className="max-w-2xl">
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">{t('ourMedicalTeam')}</p>
                        <h1 className="text-4xl md:text-5xl font-black text-text-main dark:text-white leading-tight mb-4">
                            {t('specialistsHeroTitle')}
                        </h1>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed mb-8">
                            {t('specialistsHeroDesc')}
                        </p>
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                <span>{t('jciAccredited')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-xl">public</span>
                                <span>{t('langs15')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                                <span className="material-symbols-outlined text-primary text-xl">groups</span>
                                <span>{t('specialists50Plus')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-background-light dark:bg-background-dark py-6 border-b border-slate-200 dark:border-slate-700 sticky top-[65px] z-40">
                <div className="mx-auto max-w-7xl px-4 md:px-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:max-w-sm">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-xl">search</span>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-main dark:text-white"
                        />
                    </div>

                    {/* Filter chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {filterKeys.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activeFilter === f
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white dark:bg-slate-800 text-text-muted dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {f === 'All Specialties' ? t('filterAll') : f}
                            </button>
                        ))}
                        <label className="flex items-center gap-2 ml-2 cursor-pointer select-none text-sm text-text-muted dark:text-slate-400 font-medium">
                            <input
                                type="checkbox"
                                checked={availableOnly}
                                onChange={(e) => setAvailableOnly(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            {t('availableNow')}
                        </label>
                    </div>
                </div>
            </div>

            {/* Specialist Grid */}
            <div className="bg-background-light dark:bg-background-dark py-12">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-text-muted dark:text-slate-400">
                            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
                            <p className="text-lg font-semibold">{t('noSpecialistsFound')}</p>
                            <p className="text-sm mt-1">{t('adjustSearch')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((doc) => (
                                <div key={doc.id} className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-5 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                    {/* Avatar + Status */}
                                    <div className="flex items-start justify-between">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.avatarColor} flex items-center justify-center text-white font-black text-xl shadow-md`}>
                                            {doc.avatar}
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${doc.available
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                            {doc.available ? t('statusAvailable') : t('statusBooked')}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="font-black text-text-main dark:text-white text-lg leading-tight">{doc.name}</h3>
                                        <p className="text-primary text-sm font-semibold mt-0.5">{doc.title}</p>
                                        <p className="text-text-muted dark:text-slate-400 text-xs mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {doc.hospital}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            {doc.rating}
                                            <span className="text-text-muted dark:text-slate-400 font-normal text-xs">({doc.reviews})</span>
                                        </div>
                                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
                                        <div className="flex items-center gap-1 text-text-muted dark:text-slate-400">
                                            <span className="material-symbols-outlined text-[16px]">work_history</span>
                                            {doc.experience}
                                        </div>
                                    </div>

                                    {/* Specialties */}
                                    <div className="flex flex-wrap gap-2">
                                        {doc.specialties.map((s) => (
                                            <span key={s} className="px-2.5 py-1 bg-primary/5 text-primary rounded-full text-xs font-semibold">{s}</span>
                                        ))}
                                    </div>

                                    {/* Languages */}
                                    <div className="flex items-center gap-2 text-xs text-text-muted dark:text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">translate</span>
                                        {doc.languages.join(' · ')}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-auto pt-2">
                                        <button className={`flex-1 h-10 rounded-lg text-sm font-bold transition-colors ${doc.available
                                            ? 'bg-primary hover:bg-secondary text-white shadow-md shadow-primary/20'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                            }`} disabled={!doc.available}>
                                            {doc.available ? t('bookConsultation') : t('joinWaitlist')}
                                        </button>
                                        <Link to="/ai-assistant" className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary text-text-muted dark:text-slate-400 transition-colors" title="Ask AI about this doctor">
                                            <span className="material-symbols-outlined text-[20px]">chat</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-surface-dark py-16 px-4 border-t border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-text-main dark:text-white mb-4">{t('specialistCtaTitle')}</h2>
                    <p className="text-text-muted dark:text-slate-400 mb-8 text-lg">{t('specialistCtaDesc')}</p>
                    <Link to="/ai-assistant" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-secondary text-white rounded-lg font-bold transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                        {t('askAiAssistant')}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Specialists;
