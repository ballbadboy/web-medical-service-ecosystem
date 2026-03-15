import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import SeoHead from '../components/SeoHead';

// ── Avatars (no external URLs) ───────────────────────────────────────────────
const AIAvatar = ({ className = 'w-10 h-10' }) => (
    <div className={`${className} rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white dark:border-slate-700`}>
        <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>support_agent</span>
    </div>
);

const UserAvatar = ({ className = 'w-10 h-10' }) => (
    <div className={`${className} rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white dark:border-slate-700 text-white font-bold text-sm`}>
        You
    </div>
);

// ── AI Response bank ─────────────────────────────────────────────────────────
const aiResponses = {
    appointment: {
        text: 'I can arrange that for you right away. We have availability as early as this Friday with Dr. Priya Sharma, our leading cardiologist at Bangkok Heart Institute. Shall I schedule a 30-minute tele-consultation first to review your records?',
        suggestions: ['📂 Upload Medical Records', '💰 Get Cost Estimate', '🏥 Our Partner Hospitals'],
    },
    transport: {
        text: 'Our VIP Ground Transport package includes: private sedan from Suvarnabhumi Airport, a dedicated patient escort, and all local hospital transfers. A representative will be at arrivals holding your name card. Shall I add this to your care package?',
        suggestions: ['📅 Book Appointment', '🏨 Hotel Accommodation', '💰 View Transport Pricing'],
    },
    records: {
        text: 'Please upload your documents using the 📎 attachment button below. Our team will review and translate them within 12 hours. We accept DICOM scans, lab reports, discharge summaries — any format works.',
        suggestions: ['📅 Book Appointment', '🩺 Talk to a Specialist', '💰 Get Cost Estimate'],
    },
    opinion: {
        text: 'A second opinion is always a wise step. Our process takes 3–5 business days: ① Document collection & translation → ② Specialist review panel → ③ Detailed written report delivered to you. Ready to begin?',
        suggestions: ['📂 Upload Records Now', '📅 Schedule Consultation', '💰 View Pricing'],
    },
    cost: {
        text: 'Our pricing is fully transparent. Typical ranges:\n• Cardiac procedures: $20,000–$35,000\n• Orthopedic surgery: $12,000–$20,000\n• Stem Cell Therapy: $10,000–$18,000\n• Dental from: $3,000\n\nAll-inclusive VIP packages available. Would you like a personalised estimate?',
        suggestions: ['📅 Book Consultation', '📂 Upload Records', '🚕 Add Transport Package'],
    },
    specialist: {
        text: 'We partner with over 200 certified specialists across Bangkok\'s top JCI-accredited hospitals. I can match you to the ideal doctor based on your condition, language preference, and schedule. Which specialty are you looking for?',
        suggestions: ['❤️ Cardiology', '🦴 Orthopedics', '🧬 Stem Cell Therapy', '😁 Dental'],
    },
    cardiac: {
        text: 'Our cardiac care team includes some of Southeast Asia\'s most respected cardiologists, with success rates exceeding 97%. Bangkok Heart Institute and Bumrungrad International Hospital are among our premier partners. Would you like to meet our cardiac specialists?',
        suggestions: ['👨‍⚕️ Meet Cardiologists', '📅 Book Consultation', '💰 Cardiac Cost Estimate'],
    },
    orthopedic: {
        text: 'Our orthopedic surgeons specialise in joint replacement, sports injuries, and spine procedures, using the latest robotic-assisted surgical technology. What specific condition are you dealing with — knee, hip, spine, or other?',
        suggestions: ['📅 Book Consultation', '📂 Upload X-rays / MRI', '💰 Get Cost Estimate'],
    },
    stemcell: {
        text: 'Our stem cell therapy programmes are conducted under rigorous clinical protocols for autoimmune conditions, orthopedic degeneration, and rejuvenation. A preliminary medical evaluation is required before treatment begins. Shall I schedule one?',
        suggestions: ['📅 Schedule Evaluation', '📂 Upload Medical History', '💰 Therapy Pricing'],
    },
    dental: {
        text: 'Our dental partners offer world-class procedures at a fraction of Western prices:\n• Implants from $800\n• All-on-4 from $8,000\n• Veneers from $300/tooth\n\nAll dentists are internationally certified. Would you like a free photo consultation?',
        suggestions: ['📷 Free Photo Consult', '📅 Book Appointment', '💰 Full Dental Price List'],
    },
    visa: {
        text: 'We provide full medical visa support — invitation letters from partner hospitals, document preparation, and appointment scheduling. Thailand\'s medical visa allows stays up to 90 days. Shall I start the process for you?',
        suggestions: ['📄 Start Visa Process', '📅 Book Appointment', '🚕 Airport Transfer'],
    },
    hotel: {
        text: 'We partner with recovery-friendly hotels near Bangkok\'s major hospitals, offering patient packages with adapted rooms, meal delivery, and daily housekeeping. Options from comfortable 3-star to luxury 5-star. Shall I check availability for your dates?',
        suggestions: ['🏨 Check Availability', '📅 Book Appointment', '🚕 Transport Package'],
    },
    default: [
        { text: 'Thank you for reaching out. I\'m reviewing your information to connect you with the most suitable specialist. Is there anything specific about your medical history or current symptoms you\'d like to share?', suggestions: ['📅 Book Appointment', '💰 Cost Estimate', '🩺 Find a Specialist'] },
        { text: 'I understand your concern. Our team has extensive experience in this area. Would you like me to arrange a tele-consultation with one of our top specialists this week?', suggestions: ['📅 Book Consultation', '📂 Upload Records', '💰 View Pricing'] },
        { text: 'Based on what you\'ve described, I recommend a comprehensive evaluation. I can coordinate all pre-arrival documentation, including translation of your medical records. Shall I proceed?', suggestions: ['✅ Yes, Proceed', '📂 Upload Records', '💰 Get Estimate'] },
        { text: 'We have several highly qualified specialists available. I can have a preliminary assessment ready within 24 hours. Would you prefer a video consultation or an in-person visit in Bangkok?', suggestions: ['💻 Video Consult', '✈️ Visit Bangkok', '💰 View Pricing'] },
        { text: 'Our concierge team will prepare a personalised care package including airport transfer, specialist appointment, and post-care coordination. Would you like a detailed cost breakdown?', suggestions: ['💰 Cost Breakdown', '📅 Book Now', '🚕 Transport Info'] },
    ],
};

function getAiResponse(userText) {
    const lower = userText.toLowerCase();
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) return aiResponses.appointment;
    if (lower.includes('transport') || lower.includes('airport') || lower.includes('transfer') || lower.includes('pickup')) return aiResponses.transport;
    if (lower.includes('record') || lower.includes('document') || lower.includes('upload') || lower.includes('file')) return aiResponses.records;
    if (lower.includes('second opinion') || lower.includes('opinion')) return aiResponses.opinion;
    if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('estimate') || lower.includes('fee')) return aiResponses.cost;
    if (lower.includes('specialist') || lower.includes('doctor') || lower.includes('physician')) return aiResponses.specialist;
    if (lower.includes('cardiac') || lower.includes('heart') || lower.includes('cardiolog') || lower.includes('angiogram')) return aiResponses.cardiac;
    if (lower.includes('orthopedic') || lower.includes('knee') || lower.includes('hip') || lower.includes('joint') || lower.includes('spine')) return aiResponses.orthopedic;
    if (lower.includes('stem cell') || lower.includes('stemcell') || lower.includes('regenerative')) return aiResponses.stemcell;
    if (lower.includes('dental') || lower.includes('teeth') || lower.includes('tooth') || lower.includes('implant') || lower.includes('veneer')) return aiResponses.dental;
    if (lower.includes('visa') || lower.includes('travel') || lower.includes('passport')) return aiResponses.visa;
    if (lower.includes('hotel') || lower.includes('accommodation') || lower.includes('stay') || lower.includes('room')) return aiResponses.hotel;
    const pool = aiResponses.default;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ── Initial conversation ─────────────────────────────────────────────────────
const makeInitialMessages = (t) => [
    {
        id: 1,
        type: 'ai',
        time: '10:00 AM',
        text: null,
        jsx: (
            <>
                <p>{t('aiGreeting')} 👋</p>
                <p className="mt-2">{t('aiWelcomeMsg')}</p>
                <p className="mt-2 text-slate-400 dark:text-slate-300 text-xs">{t('aiHelpIntro')}</p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5 text-slate-400 dark:text-slate-300 text-xs">
                    <li>{t('aiHelpItem1')}</li>
                    <li>{t('aiHelpItem2')}</li>
                    <li>{t('aiHelpItem3')}</li>
                    <li>{t('aiHelpItem4')}</li>
                    <li>{t('aiHelpItem5')}</li>
                </ul>
            </>
        ),
        suggestions: [`📅 ${t('aiSuggestion1')}`, `🩺 ${t('aiSuggestion2')}`, `🚕 ${t('aiSuggestion3')}`, `📂 ${t('aiSuggestion4')}`, '💰 Cost Estimate'],
    },
    {
        id: 2,
        type: 'user',
        time: '10:05 AM',
        text: "I'm looking for a second opinion on a cardiac procedure. I have my angiogram results ready.",
    },
    {
        id: 3,
        type: 'ai',
        time: '10:06 AM',
        text: aiResponses.opinion.text,
        suggestions: aiResponses.opinion.suggestions,
    },
];

// ── Emergency modal ──────────────────────────────────────────────────────────
const EmergencyModal = ({ onClose, t }) => {
    const closeBtnRef = useRef(null);

    useEffect(() => {
        setTimeout(() => closeBtnRef.current?.focus(), 50);
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="alertdialog"
            aria-modal="true"
            aria-label="Emergency Contacts"
        >
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-red-100 dark:border-red-900/30" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
                        <span className="material-symbols-outlined text-[28px]">emergency</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-red-600">{t('aiEmergencyTitle')}</h3>
                        <p className="text-xs text-text-secondary dark:text-slate-400">{t('aiEmergencyDesc')}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {[
                        { label: 'Concierge Hotline', number: '+66 2 123 4567', icon: 'support_agent' },
                        { label: 'Medical Emergency (TH)', number: '1669', icon: 'local_hospital' },
                        { label: 'Tourist Police', number: '1155', icon: 'local_police' },
                        { label: 'WhatsApp 24h', number: '+66 81 234 5678', icon: 'chat' },
                    ].map((c) => (
                        <a
                            key={c.label}
                            href={`tel:${c.number.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-red-500 text-[20px]">{c.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-text-secondary dark:text-slate-400">{c.label}</p>
                                <p className="font-bold text-text-main dark:text-white">{c.number}</p>
                            </div>
                            <span className="material-symbols-outlined text-red-400 text-[18px]">call</span>
                        </a>
                    ))}
                </div>
                <button ref={closeBtnRef} onClick={onClose} className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-text-main dark:text-white font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    {t('aiClose')}
                </button>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const AiAssistant = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const [messages, setMessages] = useState(() => makeInitialMessages(t));
    const [inputVal, setInputVal] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const langDropdownRef = useRef(null);
    const nextId = useRef(10);

    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭' },
        { code: 'cn', label: '中文', flag: '🇨🇳' },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Reset initial messages when language changes
    useEffect(() => {
        setMessages(makeInitialMessages(t));
    }, [language]);

    const addMessage = (msg) => {
        const id = nextId.current++;
        setMessages((prev) => [...prev, { id, ...msg }]);
        return id;
    };

    const sendUserMessage = (text) => {
        if (!text.trim() || isTyping) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage({ type: 'user', time: now, text: text.trim() });
        setInputVal('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        setIsTyping(true);
        setTimeout(() => {
            const response = getAiResponse(text);
            const aiNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage({ type: 'ai', time: aiNow, text: response.text, suggestions: response.suggestions });
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleSend = () => sendUserMessage(inputVal);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestion = (suggestion) => {
        const cleaned = suggestion.replace(/\p{Emoji}/gu, '').trim();
        sendUserMessage(cleaned);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        e.target.value = '';

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const ext = file.name.split('.').pop().toUpperCase();
        const size = file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

        addMessage({
            type: 'user',
            time: now,
            text: null,
            jsx: (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">description</span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{file.name}</p>
                        <p className="text-xs text-white/70">{ext} · {size}</p>
                    </div>
                </div>
            ),
        });

        setIsTyping(true);
        setTimeout(() => {
            const aiNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage({
                type: 'ai',
                time: aiNow,
                text: `Thank you — I've received your file "${file.name}". Our medical team will begin reviewing and translating it within 12 hours. You'll receive a summary report via email. Is there anything else you'd like to share before your consultation?`,
                suggestions: ['📅 Book Consultation', '💰 Get Cost Estimate', '🚕 Add Transport Package'],
            });
            setIsTyping(false);
        }, 1500);
    };

    const handleTextareaChange = (e) => {
        setInputVal(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
    };

    return (
        <div className="flex h-[100dvh] w-full bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white overflow-hidden">
            <SeoHead
                title="AI Medical Assistant — 24/7 Health Concierge"
                description="Get instant answers about medical procedures, costs, specialist availability, transport, and visa assistance. Our AI concierge helps plan your medical journey to Thailand."
            />

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dcm,.zip"
                onChange={handleFileSelect}
            />

            {/* Emergency Modal */}
            {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} t={t} />}

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* ── Sidebar ── */}
            <aside className={`fixed md:static inset-y-0 left-0 z-30 flex flex-col w-72 h-full bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex-shrink-0 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Sidebar Header */}
                <div className="p-5 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>medical_services</span>
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-text-main dark:text-white leading-tight">Bio Connext</h1>
                            <p className="text-xs text-text-secondary dark:text-slate-400">{t('aiBrandTagline')}</p>
                        </div>
                    </Link>
                    <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Sidebar Nav */}
                <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-5">
                    <button
                        onClick={() => { setMessages(makeInitialMessages(t)); setInputVal(''); setIsSidebarOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-3 bg-primary text-white rounded-xl hover:bg-secondary transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        <span className="text-sm font-semibold">{t('aiNewConsult')}</span>
                    </button>

                    <div className="flex flex-col gap-0.5">
                        <p className="px-4 text-xs font-semibold text-text-secondary dark:text-slate-500 uppercase tracking-wider mb-2">{t('aiMenuLabel')}</p>
                        {[
                            { icon: 'history', labelKey: 'aiRecentConsults' },
                            { icon: 'account_circle', labelKey: 'aiHealthProfile' },
                            { icon: 'folder_open', labelKey: 'aiMedRecords' },
                            { icon: 'calculate', labelKey: 'ceTitle', to: '/services' },
                            { icon: 'group', labelKey: 'aiViewSpecialists', to: '/specialists' },
                        ].map((item) =>
                            item.to ? (
                                <Link key={item.labelKey} to={item.to} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-main dark:text-slate-200 hover:bg-background-light dark:hover:bg-slate-800 transition-colors group">
                                    <span className="material-symbols-outlined text-[22px] text-text-secondary dark:text-slate-400 group-hover:text-primary transition-colors">{item.icon}</span>
                                    <span className="text-sm font-medium">{t(item.labelKey)}</span>
                                </Link>
                            ) : (
                                <button key={item.labelKey} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-text-main dark:text-slate-200 hover:bg-background-light dark:hover:bg-slate-800 transition-colors group w-full text-left">
                                    <span className="material-symbols-outlined text-[22px] text-text-secondary dark:text-slate-400 group-hover:text-primary transition-colors">{item.icon}</span>
                                    <span className="text-sm font-medium">{t(item.labelKey)}</span>
                                </button>
                            )
                        )}
                    </div>

                    <div className="flex flex-col gap-1 mt-auto">
                        <p className="px-4 text-xs font-semibold text-text-secondary dark:text-slate-500 uppercase tracking-wider mb-2">{t('aiRecentHistory')}</p>
                        <div className="px-4 py-2.5 border-l-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-r-lg">
                            <p className="text-sm font-semibold text-text-main dark:text-white truncate">{t('aiHistory1')}</p>
                            <p className="text-xs text-text-secondary dark:text-slate-400">{t('aiToday')}</p>
                        </div>
                        {['aiHistory2', 'aiHistory3'].map((key) => (
                            <div key={key} className="px-4 py-2.5 border-l-2 border-transparent hover:bg-background-light dark:hover:bg-slate-800 cursor-pointer rounded-r-lg transition-colors">
                                <p className="text-sm font-medium text-text-main dark:text-white truncate">{t(key)}</p>
                                <p className="text-xs text-text-secondary dark:text-slate-400">{t('aiYesterday')}</p>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-border-light dark:border-border-dark flex flex-col gap-1">
                    <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-text-main dark:text-slate-200 hover:bg-background-light dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[22px] text-text-secondary">home</span>
                        <span className="text-sm font-medium">{t('aiBackHome')}</span>
                    </Link>
                    <button
                        onClick={() => setShowEmergency(true)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                    >
                        <span className="material-symbols-outlined text-[22px]">emergency</span>
                        <span className="text-sm font-medium">{t('aiEmergencyContacts')}</span>
                    </button>
                </div>
            </aside>

            {/* ── Main Chat Area ── */}
            <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">

                {/* Chat Header */}
                <header className="flex-shrink-0 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden p-1.5 -ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar menu" aria-expanded={isSidebarOpen}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="relative">
                            <AIAvatar className="w-10 h-10" />
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-surface-light dark:border-surface-dark rounded-full" aria-hidden="true"></span>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-text-main dark:text-white leading-tight">{t('aiDrName')}</h2>
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                                {t('aiOnlineStatus')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-text-muted dark:text-slate-400"
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            <span className="material-symbols-outlined !text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        {/* Language Dropdown */}
                        <div className="relative hidden sm:block" ref={langDropdownRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center justify-center h-9 px-3 gap-1.5 rounded-lg bg-background-light dark:bg-slate-800 border border-border-light dark:border-slate-700 text-sm font-medium text-text-main dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">translate</span>
                                <span>{language.toUpperCase()}</span>
                                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            {isLangOpen && (
                                <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
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
                        <button
                            onClick={() => setShowEmergency(true)}
                            className="flex items-center justify-center h-9 px-4 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold border border-red-200 dark:border-red-900/40 transition-colors"
                        >
                            🚨 {t('aiEmergencyBtn')}
                        </button>
                    </div>
                </header>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5" role="log" aria-live="polite">
                    {/* Date pill */}
                    <div className="flex justify-center">
                        <span className="text-xs font-medium text-text-secondary dark:text-slate-500 bg-surface-light dark:bg-slate-800 px-3 py-1 rounded-full border border-border-light dark:border-slate-700 shadow-sm">
                            Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.type === 'user' ? 'flex-row-reverse self-end max-w-[85%]' : 'max-w-[85%]'}`}>
                            {msg.type === 'ai' ? <AIAvatar className="w-9 h-9 mb-1" /> : <UserAvatar className="w-9 h-9 mb-1" />}

                            <div className={`flex flex-col gap-1.5 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-baseline gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-xs font-bold text-text-main dark:text-white">
                                        {msg.type === 'ai' ? t('aiDrName') : t('aiYou')}
                                    </span>
                                    <span className="text-[10px] text-text-secondary dark:text-slate-500">{msg.time}</span>
                                </div>

                                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.type === 'ai'
                                    ? 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-slate-700 text-text-main dark:text-slate-200 rounded-bl-none shadow-sm'
                                    : 'bg-primary text-white rounded-br-none shadow-md'
                                }`}>
                                    {msg.jsx || <span>{msg.text}</span>}
                                </div>

                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-0.5 max-w-sm">
                                        {msg.suggestions.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSuggestion(s)}
                                                disabled={isTyping}
                                                className="px-3 py-1.5 bg-background-light dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed border border-border-light dark:border-slate-700 rounded-full text-xs font-medium transition-colors text-text-secondary dark:text-slate-300"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex items-end gap-3 max-w-[85%]" role="status" aria-live="polite" aria-label="AI is typing">
                            <AIAvatar className="w-9 h-9 mb-1" />
                            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark px-4 py-3 rounded-2xl rounded-bl-none shadow-soft flex gap-1.5 items-center">
                                {[0, 150, 300].map((delay) => (
                                    <div key={delay} className="w-2 h-2 bg-text-muted/50 rounded-full" style={{ animation: 'typingDot 1.4s ease-in-out infinite', animationDelay: `${delay}ms` }} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* ── Input Area ── */}
                <footer className="flex-shrink-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-4 sm:p-5">
                    <div className="max-w-4xl mx-auto flex flex-col gap-2">
                        <div className="flex items-end gap-2 bg-background-light dark:bg-slate-800 p-2 rounded-2xl border border-border-light dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-text-secondary dark:text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors self-end"
                                aria-label="Attach medical documents"
                            >
                                <span className="material-symbols-outlined text-[22px]">attach_file</span>
                            </button>

                            <textarea
                                ref={textareaRef}
                                value={inputVal}
                                onChange={handleTextareaChange}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                className="w-full bg-transparent border-none focus:ring-0 py-2 px-1 resize-none text-text-main dark:text-white placeholder-text-secondary dark:placeholder-slate-500 text-sm self-end"
                                aria-label="Type your message"
                                placeholder={t('aiTypePlaceholder')}
                                style={{ minHeight: '40px', maxHeight: '128px' }}
                            />

                            <button
                                onClick={handleSend}
                                disabled={!inputVal.trim() || isTyping}
                                className={`p-2.5 rounded-xl transition-colors self-end shadow-sm ${inputVal.trim() && !isTyping
                                    ? 'bg-primary hover:bg-secondary text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                                aria-label="Send message"
                            >
                                <span className="material-symbols-outlined text-[22px]">send</span>
                            </button>
                        </div>

                        <div className="flex justify-between items-center px-1">
                            <p className="text-[10px] text-text-secondary dark:text-slate-500 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">lock</span>
                                {t('aiEncryptedNote')}
                            </p>
                            <p className="text-[10px] text-text-secondary dark:text-slate-500">
                                {t('aiDisclaimerNote')}
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default AiAssistant;
