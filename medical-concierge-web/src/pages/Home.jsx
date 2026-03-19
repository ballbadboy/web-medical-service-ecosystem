import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

/* ── Animated counter ────────────────────────── */
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const counted = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !counted.current) {
                    counted.current = true;
                    const t0 = performance.now();
                    const tick = (now) => {
                        const p = Math.min((now - t0) / duration, 1);
                        setCount(Math.floor(end * (1 - Math.pow(1 - p, 4))));
                        if (p < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    return { ref, count };
};

/* ── Intersection reveal hook ────────────────── */
const useReveal = (threshold = 0.15) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, visible };
};

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const stat1 = useCountUp(10000, 2400);
    const stat2 = useCountUp(45, 1800);
    const stat3 = useCountUp(50, 1600);

    const heroReveal = useReveal(0.1);
    const journeyReveal = useReveal();
    const servicesReveal = useReveal();
    const trustReveal = useReveal();
    const testimonialReveal = useReveal();

    const faqData = useMemo(() => [
        { q: t('faq1Q'), a: t('faq1A') },
        { q: t('faq2Q'), a: t('faq2A') },
        { q: t('faq3Q'), a: t('faq3A') },
        { q: t('faq4Q'), a: t('faq4A') },
        { q: t('faq5Q'), a: t('faq5A') },
    ], [t]);

    const toggleFaq = useCallback((i) => setOpenFaq(prev => prev === i ? null : i), []);

    return (
        <>
            <SeoHead
                title="Premium Medical Tourism in Thailand"
                description="Thailand's premier medical concierge service. JCI-accredited hospitals, 50+ specialist doctors, VIP transport, medical interpretation. Serving 10,000+ patients from 45+ countries."
            />

            {/* ═══════════ HERO — full-bleed editorial ═══════════ */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDksQzb8LXTa-7PiGJ46GacOCcbHs6QqNOr4lrXF5NCs9oXr_2ybKDobcfNkBnHCxZMiOH7ZResuo3rjhpSZd6Di6-bO9_zaguIyNQJma6ViG1jluZuXsjwZRAJ2SbXzSMuFxjcNafQgPphg3-Alyi33W-F6v-FALsfveO0I_G3jT7mFFejHzvLmDhRKednQlXDd9CvFVP3rQ2s3YQdhvpI6HBKo2tNndhjrRhUhHPku-GYy2JmZ6-j3KOwJlINY8eg4BIKEd-wSyA"
                        alt="Modern hospital interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420] via-[#0c1420]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0c1420]/60 to-transparent" />
                </div>

                {/* Content */}
                <div
                    ref={heroReveal.ref}
                    className={`relative z-10 w-full transition-all duration-700 ease-out-expo ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="mx-auto max-w-7xl px-5 md:px-10 pb-20 md:pb-28">
                        <div className="max-w-2xl">
                            {/* Accent line */}
                            <div className="divider-accent mb-8" />

                            <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-5">{t('premiumCare')}</p>

                            <h1 className="text-white font-display leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.025em' }}>
                                {t('heroTitle1')}<br />
                                <span className="text-white/70">{t('heroTitle2')}</span>
                            </h1>

                            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg mb-10 font-body">
                                {t('heroSubtitle')}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <button onClick={() => navigate('/services')} className="h-13 px-8 bg-white text-text-main rounded-lg font-bold text-[15px] hover:bg-accent hover:text-white transition-colors duration-300 ease-out-quart">
                                    {t('heroBtn1')}
                                </button>
                                <button onClick={() => navigate('/specialists')} className="h-13 px-8 border border-white/25 text-white rounded-lg font-semibold text-[15px] hover:bg-white/10 transition-colors duration-300 ease-out-quart">
                                    {t('heroBtn2')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ STATS RIBBON — edge-to-edge ═══════════ */}
            <section ref={stat1.ref} className="relative z-20 bg-text-main border-t border-white/[0.06]">
                <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-14">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { val: stat1.count.toLocaleString() + '+', label: t('statPatients'), icon: 'groups' },
                            { val: stat2.count + '+', label: t('statCountries'), icon: 'public' },
                            { val: stat3.count + '+', label: t('statSpecialists'), icon: 'stethoscope' },
                            { val: '4.9', label: t('statRating'), icon: 'star', fill: true },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span
                                    className="material-symbols-outlined text-accent text-2xl shrink-0"
                                    style={s.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >{s.icon}</span>
                                <div>
                                    <div className="text-white text-2xl md:text-3xl font-black font-body tabular-nums leading-none">{s.val}</div>
                                    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ JOURNEY — timeline layout ═══════════ */}
            <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark overflow-hidden">
                <div
                    ref={journeyReveal.ref}
                    className={`mx-auto max-w-7xl px-5 md:px-10 transition-all duration-700 ease-out-expo ${journeyReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    {/* Left-aligned section header */}
                    <div className="max-w-xl mb-16 md:mb-20">
                        <div className="divider-accent mb-5" />
                        <p className="section-label mb-3">{t('journeyLabel')}</p>
                        <h2 className="text-display-lg text-text-main dark:text-white mb-4">
                            {t('journeyTitle')}
                        </h2>
                        <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body">
                            {t('journeyDesc')}
                        </p>
                    </div>

                    {/* Steps as horizontal timeline */}
                    <div className="relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-8 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-border-light dark:bg-border-dark" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                            {[
                                { icon: 'calendar_month', num: '01', titleKey: 'step1Title', descKey: 'step1Desc' },
                                { icon: 'medical_services', num: '02', titleKey: 'step2Title', descKey: 'step2Desc' },
                                { icon: 'home_health', num: '03', titleKey: 'step3Title', descKey: 'step3Desc' },
                            ].map((step, i) => (
                                <div
                                    key={step.num}
                                    className={`relative flex flex-col items-center text-center transition-all duration-500 ease-out-expo ${journeyReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${200 + i * 150}ms` }}
                                >
                                    {/* Step circle */}
                                    <div className="relative z-10 size-16 rounded-full bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-6 ring-4 ring-background-light dark:ring-background-dark">
                                        <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
                                    </div>
                                    <span className="text-accent font-black text-xs tracking-[0.2em] uppercase mb-3">{t('journeyLabel').split(' ')[0]} {step.num}</span>
                                    <h3 className="text-lg font-bold text-text-main dark:text-white font-body mb-2">{t(step.titleKey)}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed font-body max-w-xs">
                                        {t(step.descKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-14">
                        <button onClick={() => navigate('/services')} className="btn-ghost gap-2 group">
                            <span>{t('viewFullJourney')}</span>
                            <span className="material-symbols-outlined transition-transform duration-200 ease-out-quart group-hover:translate-x-1">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════ SERVICES — asymmetric editorial ═══════════ */}
            <section className="py-24 md:py-32 bg-surface-light dark:bg-surface-dark overflow-hidden">
                <div
                    ref={servicesReveal.ref}
                    className={`mx-auto max-w-7xl px-5 md:px-10 transition-all duration-700 ease-out-expo ${servicesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Image — offset position */}
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                                <img
                                    alt="Private luxury medical transport vehicle interior"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrD5kUFcW7z1niixaHKtXyIvc63OEuiOoGwkX34rRtqdzuqcvmwkc_OMgsRau1CicwXU_kXfCPtniy71DiFjrBCideHAox5-MIsKSXqnh6XEiHZ3C2VjeAsox7HwCS-3I0Hro_1rL6cUYnIgWHbnI4T6ureiWQWY7eo8cbCinMIewnqUK9nuDua2fBXbimP_LI3bAsi9Up1-BFvIvHprBZyuW8D961pvYQwUcJPTkoZlHMdnkkiEDYJQr4569l65LYlzqFCIOTGYM"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            {/* Floating accreditation badge */}
                            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-surface-light dark:bg-surface-dark px-5 py-3 rounded-xl shadow-lift border border-border-light dark:border-border-dark flex items-center gap-3">
                                <span className="material-symbols-outlined text-success text-xl">verified_user</span>
                                <div>
                                    <p className="text-xs font-black text-text-main dark:text-white">{t('jciAccred')}</p>
                                    <p className="text-[11px] text-text-muted dark:text-slate-400">{t('jciStandard')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content — staggered benefit blocks */}
                        <div className="lg:col-span-7">
                            <div className="divider-accent mb-5" />
                            <p className="section-label mb-3">{t('exclusiveBenefits')}</p>
                            <h2 className="text-display-lg text-text-main dark:text-white mb-4">
                                {t('intlPatientsTitle')}
                            </h2>
                            <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed font-body mb-10 max-w-lg">
                                {t('intlPatientsDesc')}
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: 'flight_land', titleKey: 'airportMeetTitle', descKey: 'airportMeetDesc' },
                                    { icon: 'translate', titleKey: 'medicalInterpTitle', descKey: 'medicalInterpDesc' },
                                    { icon: 'local_taxi', titleKey: 'vipTransportTitle', descKey: 'vipTransportDesc' },
                                    { icon: 'credit_card', titleKey: 'insuranceLiaisonTitle', descKey: 'insuranceLiaisonDesc' },
                                ].map((b, i) => (
                                    <div
                                        key={b.titleKey}
                                        className={`flex gap-5 items-start transition-all duration-500 ease-out-expo ${servicesReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                                        style={{ transitionDelay: `${300 + i * 100}ms` }}
                                    >
                                        <div className="shrink-0 size-10 rounded-lg bg-primary/8 dark:bg-primary/15 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">{b.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-main dark:text-white font-body mb-0.5">{t(b.titleKey)}</h4>
                                            <p className="text-sm text-text-muted dark:text-slate-400 leading-relaxed">{t(b.descKey)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <button onClick={() => navigate('/services')} className="btn-primary">
                                    {t('viewPackages')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ TRUST STRIP — scrolling logos ═══════════ */}
            <section
                ref={trustReveal.ref}
                className="py-16 bg-background-light dark:bg-background-dark border-y border-border-light dark:border-border-dark overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-5 md:px-10 mb-10 text-center">
                    <p className="section-label mb-2">{t('trustLabel')}</p>
                    <h2 className="text-display-md text-text-main dark:text-white">{t('trustTitle')}</h2>
                </div>

                {/* Marquee-style trust badges */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10" />

                    <div className="flex animate-marquee w-max">
                        {/* Repeat twice for seamless loop */}
                        {[...Array(2)].map((_, rep) => (
                            <div key={rep} className="flex items-center gap-16 px-8">
                                {[
                                    { icon: 'verified_user', title: t('trustJciTitle'), desc: t('trustJciDesc') },
                                    { icon: 'workspace_premium', title: t('trustIsoTitle'), desc: t('trustIsoDesc') },
                                    { icon: 'shield_with_heart', title: t('trustTemosTitle'), desc: t('trustTemosDesc') },
                                    { icon: 'verified_user', title: t('trustJciTitle'), desc: t('trustJciDesc') },
                                    { icon: 'workspace_premium', title: t('trustIsoTitle'), desc: t('trustIsoDesc') },
                                    { icon: 'shield_with_heart', title: t('trustTemosTitle'), desc: t('trustTemosDesc') },
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-4 shrink-0">
                                        <div className="size-12 rounded-xl bg-primary/8 dark:bg-primary/15 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-main dark:text-white text-sm whitespace-nowrap">{badge.title}</p>
                                            <p className="text-xs text-text-muted dark:text-slate-400 whitespace-nowrap">{badge.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TESTIMONIALS — featured quote layout ═══════════ */}
            <section className="py-24 md:py-32 bg-surface-light dark:bg-surface-dark overflow-hidden">
                <div
                    ref={testimonialReveal.ref}
                    className={`mx-auto max-w-7xl px-5 md:px-10 transition-all duration-700 ease-out-expo ${testimonialReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <div className="text-center mb-16">
                        <div className="divider-accent mx-auto mb-5" />
                        <p className="section-label mb-3">{t('testimonialsLabel')}</p>
                        <h2 className="text-display-lg text-text-main dark:text-white">{t('testimonialsTitle')}</h2>
                    </div>

                    {/* Featured testimonial + 2 smaller */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Featured — spans 3 cols */}
                        <div className="lg:col-span-3 bg-text-main rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <span key={j} className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    ))}
                                </div>
                                <blockquote className="text-white text-lg md:text-xl leading-relaxed font-body mb-8" style={{ fontStyle: 'normal' }}>
                                    &ldquo;{t('testimonial1Text')}&rdquo;
                                </blockquote>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">JM</div>
                                <div>
                                    <p className="text-white font-bold text-sm">{t('testimonial1Name')}</p>
                                    <p className="text-slate-400 text-xs flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                                        {t('testimonial1Location')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Secondary testimonials — stacked in 2 cols */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {[
                                { nameKey: 'testimonial2Name', locKey: 'testimonial2Location', textKey: 'testimonial2Text', color: 'bg-rose-600', initials: 'YT' },
                                { nameKey: 'testimonial3Name', locKey: 'testimonial3Location', textKey: 'testimonial3Text', color: 'bg-emerald-600', initials: 'SA' },
                            ].map((tm, i) => (
                                <div
                                    key={tm.nameKey}
                                    className={`flex-1 rounded-2xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-6 flex flex-col justify-between transition-all duration-500 ease-out-expo ${testimonialReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${300 + i * 150}ms` }}
                                >
                                    <div>
                                        <div className="flex gap-0.5 mb-4">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <span key={j} className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            ))}
                                        </div>
                                        <p className="text-text-muted dark:text-slate-300 text-sm leading-relaxed font-body mb-5">
                                            &ldquo;{t(tm.textKey)}&rdquo;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${tm.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                            {tm.initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-main dark:text-white">{t(tm.nameKey)}</p>
                                            <p className="text-xs text-text-muted dark:text-slate-400">{t(tm.locKey)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ FAQ ═══════════ */}
            <section className="py-24 md:py-28 bg-background-light dark:bg-background-dark" aria-labelledby="faq-heading">
                <div className="mx-auto max-w-3xl px-5 md:px-10">
                    <div className="text-center mb-14">
                        <div className="divider-accent mx-auto mb-5" />
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
                                className="border border-border-light dark:border-border-dark rounded-xl overflow-hidden"
                                itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group bg-surface-light dark:bg-surface-dark"
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
                                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                                    hidden={openFaq !== i}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-text-muted dark:text-slate-400 leading-relaxed font-body bg-surface-light dark:bg-surface-dark" itemProp="text">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA — dramatic dark ═══════════ */}
            <section className="relative py-28 md:py-36 bg-text-main overflow-hidden">
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
                    <svg width="100%" height="100%"><defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
                </div>
                {/* Gold accent line at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-accent" />

                <div className="mx-auto max-w-3xl px-5 text-center relative z-10">
                    <h2 className="text-white mb-6 font-display leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
                        {t('homeCtaTitle')}
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-body">
                        {t('homeCtaDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => navigate('/services')} className="w-full sm:w-auto min-w-[200px] h-14 bg-white text-text-main rounded-lg font-bold text-base hover:bg-accent hover:text-white transition-colors duration-300 ease-out-quart font-body">
                            {t('homeCtaBtn1')}
                        </button>
                        <button onClick={() => navigate('/specialists')} className="w-full sm:w-auto min-w-[200px] h-14 border border-white/20 text-white rounded-lg font-bold text-base hover:bg-white/10 transition-colors duration-300 ease-out-quart font-body">
                            {t('homeCtaBtn2')}
                        </button>
                    </div>
                    <p className="mt-10 text-slate-500 text-sm font-body tracking-wide">
                        {t('homeCtaNote')}
                    </p>
                </div>
            </section>
        </>
    );
};

export default Home;
