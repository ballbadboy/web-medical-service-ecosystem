import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight SEO head manager for SPA.
 * Updates document title and meta description on route change.
 * For SPAs without SSR, this ensures browser tab titles are correct
 * and improves social sharing when crawlers execute JS.
 */
const SeoHead = ({ title, description }) => {
    const location = useLocation();
    const siteName = 'Bio Connext';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Premium Medical Tourism in Thailand`;

    useEffect(() => {
        document.title = fullTitle;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && description) {
            metaDesc.setAttribute('content', description);
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', fullTitle);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && description) ogDesc.setAttribute('content', description);

        // Update canonical based on hash route
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const path = location.pathname === '/' ? '' : location.pathname;
            canonical.setAttribute('href', `https://bio.techdev.in.th${path}`);
        }
    }, [fullTitle, description, location.pathname]);

    return null;
};

export default SeoHead;
