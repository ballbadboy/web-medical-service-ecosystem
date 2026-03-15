import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langDropdownRef = useRef(null);
    const { language, setLanguage, t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Lock body scroll when mobile menu is open & close on Escape
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        if (!isMenuOpen) return () => { document.body.style.overflow = ''; };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭' },
        { code: 'cn', label: '中文', flag: '🇨🇳' },
    ];

    const navLinkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive
            ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
            : 'hover:text-primary text-text-main dark:text-slate-300'
        }`;

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            {/* Skip to content link for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
                Skip to main content
            </a>
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800" role="banner">
                <div className="px-4 md:px-10 py-3 mx-auto max-w-7xl flex items-center justify-between whitespace-nowrap">
                    <Link to="/" className="flex items-center gap-3 text-text-main dark:text-white">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined !text-[32px]">medical_services</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Bio Connext</h2>
                    </Link>

                    <div className="hidden lg:flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-6 xl:gap-9" aria-label="Main navigation">
                            <NavLink className={navLinkClass} to="/services">{t('services')}</NavLink>
                            <NavLink className={navLinkClass} to="/ai-assistant">{t('aiAssistant')}</NavLink>
                            <NavLink className={navLinkClass} to="/specialists">{t('specialists')}</NavLink>
                            <NavLink className={navLinkClass} to="/about">{t('about')}</NavLink>

                            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>

                            {/* Language Dropdown */}
                            <div className="relative" ref={langDropdownRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="text-sm font-medium flex items-center gap-1.5 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
                                    aria-haspopup="listbox"
                                    aria-expanded={isLangOpen}
                                    aria-label={`Language: ${language.toUpperCase()}`}
                                >
                                    <span className="material-symbols-outlined !text-[18px]">language</span>
                                    {language.toUpperCase()}
                                    <span className={`material-symbols-outlined !text-[16px] transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                {isLangOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50" role="listbox">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                                role="option"
                                                aria-selected={language === lang.code}
                                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                                                    language === lang.code
                                                        ? 'bg-primary/5 text-primary font-bold'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-text-main dark:text-slate-200'
                                                }`}
                                            >
                                                <span className="text-base">{lang.flag}</span>
                                                {lang.label}
                                                {language === lang.code && (
                                                    <span className="ml-auto material-symbols-outlined !text-[16px] text-primary">check</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-muted dark:text-slate-300"
                                aria-label={isDark ? t('themeLight') : t('themeDark')}
                            >
                                <span className="material-symbols-outlined !text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                            </button>
                        </nav>
                        <button
                            onClick={() => navigate('/services')}
                            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-secondary transition-colors text-white text-sm font-bold shadow-lg shadow-primary/20">
                            <span className="truncate">{t('bookBtn')}</span>
                        </button>
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        {/* Dark Mode (mobile) */}
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-muted dark:text-slate-300"
                            aria-label={isDark ? t('themeLight') : t('themeDark')}
                        >
                            <span className="material-symbols-outlined !text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        <button
                            className="p-2 text-text-main dark:text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <>
                        <div className="lg:hidden fixed inset-0 top-14 bg-black/40 z-40" onClick={() => setIsMenuOpen(false)} />
                        <div className="lg:hidden absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 py-4 px-4 flex flex-col gap-2 shadow-xl z-50">
                            <NavLink className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-main dark:text-slate-200 hover:text-primary" to="/" onClick={() => setIsMenuOpen(false)}>{t('homeNav')}</NavLink>
                            <NavLink className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-main dark:text-slate-200 hover:text-primary" to="/services" onClick={() => setIsMenuOpen(false)}>{t('services')}</NavLink>
                            <NavLink className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-main dark:text-slate-200 hover:text-primary" to="/ai-assistant" onClick={() => setIsMenuOpen(false)}>{t('aiAssistant')}</NavLink>
                            <NavLink className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-main dark:text-slate-200 hover:text-primary" to="/specialists" onClick={() => setIsMenuOpen(false)}>{t('specialists')}</NavLink>
                            <NavLink className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-main dark:text-slate-200 hover:text-primary" to="/about" onClick={() => setIsMenuOpen(false)}>{t('about')}</NavLink>
                            <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                            <p className="text-xs font-bold text-text-muted dark:text-slate-500 uppercase tracking-wider px-3 mb-1">
                                <span className="material-symbols-outlined !text-[14px] align-middle mr-1">language</span>
                                {t('langLabel')}
                            </p>
                            <div className="flex gap-2 px-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }}
                                        className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                            language === lang.code
                                                ? 'bg-primary/10 text-primary border border-primary/30'
                                                : 'bg-slate-50 dark:bg-slate-800 text-text-muted dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        <span className="text-xl">{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => { navigate('/services'); setIsMenuOpen(false); }}
                                className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold mt-2">
                                {t('bookBtn')}
                            </button>
                        </div>
                    </>
                )}
            </header>

            <main id="main-content" className="flex-1 w-full bg-background-light dark:bg-background-dark" role="main">
                <Outlet />
            </main>

            <footer className="bg-text-main text-slate-400 py-14 border-t border-border-dark" role="contentinfo">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 text-white mb-4">
                                <span className="material-symbols-outlined text-primary">medical_services</span>
                                <span className="font-bold text-xl">Bio Connext</span>
                            </div>
                            <p className="text-sm max-w-xs mb-6 text-slate-300">
                                {t('footerDesc')}
                            </p>
                            <div className="flex gap-4">
                                <a className="text-slate-400 hover:text-white transition-colors" href="#" aria-label="Bio Connext on Facebook"><span className="material-symbols-outlined" aria-hidden="true">social_leaderboard</span></a>
                                <a className="text-slate-400 hover:text-white transition-colors" href="#" aria-label="Bio Connext on YouTube"><span className="material-symbols-outlined" aria-hidden="true">smart_display</span></a>
                                <a className="text-slate-400 hover:text-white transition-colors" href="#" aria-label="Bio Connext on Instagram"><span className="material-symbols-outlined" aria-hidden="true">photo_camera</span></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">{t('footerServices')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link className="hover:text-primary transition-colors" to="/services">{t('services')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/ai-assistant">{t('footerAiConcierge')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/specialists">{t('specialists')}</Link></li>
                                <li><Link className="hover:text-primary transition-colors" to="/about">{t('about')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">{t('footerContact')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">call</span>
                                    <a href="tel:+6621234567" className="hover:text-primary transition-colors">+66 2 123 4567</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">mail</span>
                                    <a href="mailto:contact@bio.techdev.in.th" className="hover:text-primary transition-colors">contact@bio.techdev.in.th</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    <span>Global HQ, Bangkok</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body">
                        <p>{t('footerCopyright')}</p>
                        <div className="flex gap-6">
                            <a className="hover:text-white transition-colors" href="#">{t('footerPrivacy')}</a>
                            <a className="hover:text-white transition-colors" href="#">{t('footerTerms')}</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
