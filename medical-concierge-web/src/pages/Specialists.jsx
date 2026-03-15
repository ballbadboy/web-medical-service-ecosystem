import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';
import BookingModal from '../components/BookingModal';

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
        avatarColor: 'bg-blue-600',
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
        avatarColor: 'bg-emerald-600',
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
        avatarColor: 'bg-violet-600',
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
        avatarColor: 'bg-amber-600',
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
        avatarColor: 'bg-rose-600',
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
        avatarColor: 'bg-indigo-600',
        available: true,
    },
];

const filterKeys = ['All Specialties', 'Cardiology', 'Orthopedics', 'Oncology', 'Neurology', 'Stem Cell', 'Cosmetic'];

const filterMap = {
    'All Specialties': () => true,
    'Cardiology': (doc) => doc.title.toLowerCase().includes('cardiolog') || doc.specialties.some((s) => ['cardiac', 'coronary', 'arrhythmia', 'heart failure'].some((k) => s.toLowerCase().includes(k))),
    'Orthopedics': (doc) => doc.title.toLowerCase().includes('orthopedic') || doc.specialties.some((s) => ['joint', 'spine', 'orthopedic', 'sports medicine'].some((k) => s.toLowerCase().includes(k))),
    'Oncology': (doc) => doc.title.toLowerCase().includes('oncolog') || doc.specialties.some((s) => ['cancer', 'oncolog', 'immunotherapy', 'tumor'].some((k) => s.toLowerCase().includes(k))),
    'Neurology': (doc) => doc.title.toLowerCase().includes('neuro') || doc.specialties.some((s) => ['brain', 'epilepsy', 'neurology', 'deep brain'].some((k) => s.toLowerCase().includes(k))),
    'Stem Cell': (doc) => doc.title.toLowerCase().includes('stem cell') || doc.specialties.some((s) => ['stem cell', 'regenerative', 'anti-aging'].some((k) => s.toLowerCase().includes(k))),
    'Cosmetic': (doc) => doc.title.toLowerCase().includes('plastic') || doc.title.toLowerCase().includes('cosmetic') || doc.specialties.some((s) => ['facial', 'rhinoplasty', 'contouring', 'reconstruct'].some((k) => s.toLowerCase().includes(k))),
};

const Specialists = () => {
    const { t } = useLanguage();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Specialties');
    const [availableOnly, setAvailableOnly] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [bookingSpecialist, setBookingSpecialist] = useState('');

    const filterLabels = useMemo(() => ({
        'All Specialties': t('filterAll'),
        'Cardiology': t('filterCardiology'),
        'Orthopedics': t('filterOrthopedics'),
        'Oncology': t('filterOncology'),
        'Neurology': t('filterNeurology'),
        'Stem Cell': t('filterStemCell'),
        'Cosmetic': t('filterCosmetic'),
    }), [t]);

    const filtered = useMemo(() => specialistsData.filter((doc) => {
        const matchSearch =
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
        const matchAvail = availableOnly ? doc.available : true;
        const matchFilter = filterMap[activeFilter] ? filterMap[activeFilter](doc) : true;
        return matchSearch && matchAvail && matchFilter;
    }), [activeFilter, availableOnly, search]);

    return (
        <>
            <SeoHead
                title="Find Specialist Doctors in Thailand"
                description="Browse 50+ board-certified specialist doctors across cardiology, orthopedics, oncology, dental, and more. Filter by specialty, language, and availability at JCI-accredited hospitals in Bangkok."
            />
            {/* Hero */}
            <section className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-7xl px-4 md:px-10 py-16 md:py-24">
                    <div className="max-w-2xl">
                        <p className="section-label mb-3">{t('ourMedicalTeam')}</p>
                        <h1 className="text-display-xl text-text-main dark:text-white mb-4">
                            {t('specialistsHeroTitle')}
                        </h1>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed mb-8 font-body">
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
            </section>

            {/* Filters & Search */}
            <div className="bg-background-light dark:bg-background-dark py-6 border-b border-slate-200 dark:border-slate-700 sticky top-16 z-40">
                <div className="mx-auto max-w-7xl px-4 md:px-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:max-w-sm">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted text-xl" aria-hidden="true">search</span>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search specialists"
                            className="w-full pl-10 pr-4 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-main dark:text-white"
                        />
                    </div>

                    {/* Filter chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {filterKeys.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                aria-pressed={activeFilter === f}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${activeFilter === f
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white dark:bg-slate-800 text-text-muted dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {filterLabels[f] || f}
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
                                <div key={doc.id} className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col gap-5 card-hover group">
                                    {/* Avatar + Status */}
                                    <div className="flex items-start justify-between">
                                        <div className={`w-14 h-14 rounded-2xl ${doc.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-soft font-body`}>
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
                                        <button
                                            onClick={() => { setBookingSpecialist(doc.name); setBookingOpen(true); }}
                                            className={`flex-1 h-10 rounded-lg text-sm font-bold transition-colors ${doc.available
                                            ? 'bg-primary hover:bg-secondary text-white shadow-md shadow-primary/20'
                                            : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                                            }`}>
                                            {doc.available ? t('bookConsultation') : t('joinWaitlist')}
                                        </button>
                                        <Link to="/ai-assistant" className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary text-text-muted dark:text-slate-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Ask AI about ${doc.name}`}>
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
            <section className="bg-surface-light dark:bg-surface-dark py-20 px-4 border-t border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-display-md text-text-main dark:text-white mb-4">{t('specialistCtaTitle')}</h2>
                    <p className="text-text-muted dark:text-slate-400 mb-8 text-lg font-body">{t('specialistCtaDesc')}</p>
                    <Link to="/ai-assistant" className="btn-primary gap-2">
                        <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                        {t('askAiAssistant')}
                    </Link>
                </div>
            </section>

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                prefillSpecialist={bookingSpecialist}
            />
        </>
    );
};

export default Specialists;
