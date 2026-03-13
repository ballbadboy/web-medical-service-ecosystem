import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'en';
            const texts = {
                en: { title: 'Something went wrong', desc: 'We apologize for the inconvenience. Please try refreshing the page.', btn: 'Refresh Page' },
                th: { title: 'เกิดข้อผิดพลาด', desc: 'ขออภัยในความไม่สะดวก กรุณาลองรีเฟรชหน้า', btn: 'รีเฟรชหน้า' },
                cn: { title: '出现错误', desc: '对此造成的不便深表歉意，请尝试刷新页面。', btn: '刷新页面' },
            };
            const t = texts[lang] || texts.en;

            return (
                <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-8">
                    <div className="text-center max-w-md">
                        <span className="material-symbols-outlined text-6xl text-red-400 mb-4 block">error</span>
                        <h1 className="text-2xl font-bold text-text-main dark:text-white mb-3">{t.title}</h1>
                        <p className="text-text-muted dark:text-slate-400 mb-6">
                            {t.desc}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">refresh</span>
                            {t.btn}
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
