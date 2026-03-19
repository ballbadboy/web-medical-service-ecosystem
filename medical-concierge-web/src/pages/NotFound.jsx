import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
    const { t } = useLanguage();

    return (
        <>
            <SeoHead title={t('notFoundHeading')} description={t('notFoundDesc')} />
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-lg">
                    <span className="material-symbols-outlined text-8xl text-primary/30 mb-6 block">explore_off</span>
                    <h1 className="text-6xl font-black text-primary mb-4">{t('notFoundTitle')}</h1>
                    <h2 className="text-2xl font-bold text-text-main dark:text-white mb-3">{t('notFoundHeading')}</h2>
                    <p className="text-text-muted dark:text-slate-400 mb-8">
                        {t('notFoundDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">home</span>
                            {t('notFoundHome')}
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">medical_services</span>
                            {t('services')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
