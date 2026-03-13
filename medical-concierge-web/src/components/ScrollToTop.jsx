import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on every route change — standard SPA fix */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default ScrollToTop;
