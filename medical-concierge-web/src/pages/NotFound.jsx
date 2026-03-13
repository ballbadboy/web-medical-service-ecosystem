import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const NotFound = () => (
    <>
        <SeoHead title="Page Not Found" description="The page you are looking for does not exist." />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <span className="material-symbols-outlined text-8xl text-primary/30 mb-6 block">explore_off</span>
                <h1 className="text-6xl font-black text-primary mb-4">404</h1>
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-3">Page Not Found</h2>
                <p className="text-text-muted dark:text-slate-400 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">home</span>
                        Back to Home
                    </Link>
                    <Link
                        to="/ai-assistant"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">support_agent</span>
                        Ask AI Assistant
                    </Link>
                </div>
            </div>
        </div>
    </>
);

export default NotFound;
