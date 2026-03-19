import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const tiers = [
    {
        id: 'basic',
        nameKey: 'pricingBasicName',
        priceKey: 'pricingBasicPrice',
        descKey: 'pricingBasicDesc',
        priceNum: 2500,
        features: ['pricingBasicF1', 'pricingBasicF2', 'pricingBasicF3', 'pricingBasicF4', 'pricingBasicF5'],
        highlighted: false,
        accent: 'border-border-light dark:border-border-dark',
    },
    {
        id: 'premium',
        nameKey: 'pricingPremiumName',
        priceKey: 'pricingPremiumPrice',
        descKey: 'pricingPremiumDesc',
        priceNum: 5500,
        features: ['pricingPremiumF1', 'pricingPremiumF2', 'pricingPremiumF3', 'pricingPremiumF4', 'pricingPremiumF5', 'pricingPremiumF6', 'pricingPremiumF7'],
        highlighted: true,
        accent: 'border-primary ring-1 ring-primary/20',
    },
    {
        id: 'vip',
        nameKey: 'pricingVipName',
        priceKey: 'pricingVipPrice',
        descKey: 'pricingVipDesc',
        priceNum: 12000,
        features: ['pricingVipF1', 'pricingVipF2', 'pricingVipF3', 'pricingVipF4', 'pricingVipF5', 'pricingVipF6', 'pricingVipF7', 'pricingVipF8'],
        highlighted: false,
        accent: 'border-accent/40',
    },
];

const Pricing = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSelect = (tier) => {
        navigate(`/payment?plan=${tier.id}&name=${encodeURIComponent(t(tier.nameKey))}&price=${tier.priceNum}`);
    };

    return (
        <>
            <SeoHead
                title="Pricing — Medical Concierge Packages"
                description="Transparent pricing for Bio Connext medical concierge packages. Essential, Premium, and VIP tiers with clear pricing and included services."
            />

            {/* Hero */}
            <section className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 text-center">
                    <div className="divider-accent mx-auto mb-5" />
                    <h1 className="text-display-xl text-text-main dark:text-white mb-4">{t('pricingHeroTitle')}</h1>
                    <p className="text-text-muted dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-body">
                        {t('pricingHeroDesc')}
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-7xl px-5 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                        {tiers.map((tier, i) => (
                            <div
                                key={tier.id}
                                className={`relative flex flex-col rounded-2xl border-2 bg-surface-light dark:bg-surface-dark overflow-hidden opacity-0 animate-fade-in-up ${tier.accent} ${tier.highlighted ? 'md:-mt-4 md:mb-[-16px]' : ''}`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Popular badge */}
                                {tier.highlighted && (
                                    <div className="bg-primary text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
                                        {t('pricingMostPopular')}
                                    </div>
                                )}

                                <div className="p-7 md:p-8 flex flex-col flex-1">
                                    {/* Plan name */}
                                    <h3 className="text-lg font-bold text-text-main dark:text-white font-body">{t(tier.nameKey)}</h3>
                                    <p className="text-text-muted dark:text-slate-400 text-sm mt-1 mb-6 font-body">{t(tier.descKey)}</p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-8">
                                        <span className="text-4xl font-black text-text-main dark:text-white font-body">{t(tier.priceKey)}</span>
                                        <span className="text-text-muted dark:text-slate-400 text-sm font-body">/ {t('pricingPerPackage')}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {tier.features.map((fKey, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm font-body">
                                                <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {j === 0 && tier.id !== 'basic' ? 'arrow_upward' : 'check_circle'}
                                                </span>
                                                <span className={`${j === 0 && tier.id !== 'basic' ? 'font-bold text-primary' : 'text-text-muted dark:text-slate-300'}`}>
                                                    {t(fKey)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handleSelect(tier)}
                                        className={`w-full h-12 rounded-lg font-bold text-sm transition-colors duration-200 ease-out-quart ${
                                            tier.highlighted
                                                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                                : tier.id === 'vip'
                                                    ? 'bg-text-main text-white hover:bg-text-main/90 dark:bg-accent dark:text-text-main dark:hover:bg-accent-warm'
                                                    : 'bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark text-text-main dark:text-white hover:border-primary hover:text-primary'
                                        }`}
                                    >
                                        {tier.id === 'vip' ? t('pricingContactUs') : t('pricingSelectPlan')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Note */}
                    <div className="mt-12 mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-start gap-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-5 text-left">
                            <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">info</span>
                            <div>
                                <p className="font-bold text-text-main dark:text-white text-sm mb-1 font-body">{t('pricingNoteTitle')}</p>
                                <p className="text-text-muted dark:text-slate-400 text-sm leading-relaxed font-body">{t('pricingNoteDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Pricing;
