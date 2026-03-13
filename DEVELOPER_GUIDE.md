# Developer Guide — Bio Connext Medical Tourism Platform

> **Version:** 2.0.0
> **Stack:** React 19 + Vite 7 + Tailwind CSS v3
> **Repository:** https://github.com/ballbadboy/web-medical-service-ecosystem
> **Live site:** https://bio.techdev.in.th/
> **Domain:** bio.techdev.in.th
> **Brand:** Bio Connext

---

## 1. Project Structure

```
Bioconnext Web/
├── DEVELOPER_GUIDE.md              ← This file
├── app-ready-to-use.html           ← Legacy single-file build (deprecated)
├── medical-concierge-web/          ← Main application source
│   ├── api/                        ← Vercel serverless API routes
│   │   ├── chat.js                 ←   Claude AI proxy (POST /api/chat)
│   │   ├── contact.js              ←   Contact form handler (POST /api/contact)
│   │   └── booking.js              ←   Booking handler (POST /api/booking)
│   ├── public/
│   │   ├── data/
│   │   │   ├── specialists.json    ←   Doctor data (fetched by useSpecialists hook)
│   │   │   └── pricing.json        ←   Pricing data (fetched by usePricing hook)
│   │   ├── robots.txt              ←   AI crawler permissions (GPTBot, ClaudeBot, etc.)
│   │   ├── sitemap.xml             ←   Multilingual sitemap with hreflang
│   │   ├── llms.txt                ←   AI-readable site description
│   │   ├── og-image.svg            ←   Social sharing image (source)
│   │   ├── og-image.png            ←   Social sharing image (generated)
│   │   ├── _redirects              ←   Netlify SPA fallback
│   │   └── vercel.json             ←   Vercel SPA rewrite rules
│   ├── scripts/
│   │   ├── prerender.mjs           ←   Post-build: generates static HTML per route
│   │   └── generate-og-image.mjs   ←   Generates og-image.png from SVG
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookingModal.jsx     ←   Booking form modal with validation
│   │   │   ├── CostEstimator.jsx    ←   Cost calculator widget
│   │   │   ├── ErrorBoundary.jsx    ←   React error boundary with recovery UI
│   │   │   ├── ScrollToTop.jsx      ←   Scrolls to top on route change
│   │   │   └── SeoHead.jsx          ←   Dynamic per-page meta/title/OG tags
│   │   ├── contexts/
│   │   │   ├── LanguageContext.jsx   ←   i18n: all translations (EN/TH/CN) + persistence
│   │   │   └── ThemeContext.jsx      ←   Shared dark mode state + persistence
│   │   ├── hooks/
│   │   │   ├── useChat.js           ←   Chat state + API call + fallback
│   │   │   ├── usePricing.js        ←   Fetches pricing.json
│   │   │   └── useSpecialists.js    ←   Fetches specialists.json
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx       ←   Navbar + Footer (ARIA, a11y, responsive)
│   │   ├── pages/
│   │   │   ├── Home.jsx             ←   Landing page + FAQ section
│   │   │   ├── Services.jsx         ←   Medical services catalog
│   │   │   ├── Specialists.jsx      ←   Doctor directory + booking
│   │   │   ├── About.jsx            ←   About page
│   │   │   ├── AiAssistant.jsx      ←   AI chat interface (full-page)
│   │   │   └── NotFound.jsx         ←   404 page
│   │   ├── App.jsx                  ←   BrowserRouter + routes + providers
│   │   └── main.jsx                 ←   Entry point + prerender event
│   ├── index.html                   ←   HTML shell with JSON-LD schemas + OG tags
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── (other reference folders)
```

---

## 2. Local Development

### Requirements
- Node.js 18+
- npm 9+

### Install & Run

```bash
cd medical-concierge-web
npm install
npm run dev
# Open http://localhost:5173
```

### Build for Production

```bash
# Standard build
npm run build

# Build with SEO prerendering (generates static HTML for each route)
npm run build:seo
```

> `build:seo` runs `vite build` then `node scripts/prerender.mjs` which uses Puppeteer to visit each route and save rendered HTML.

---

## 3. Routing

Uses **BrowserRouter** (real URLs, SEO-friendly). Defined in `src/App.jsx`:

| URL | Page | Layout |
|-----|------|--------|
| `/` | `Home.jsx` | MainLayout (navbar + footer) |
| `/services` | `Services.jsx` | MainLayout |
| `/specialists` | `Specialists.jsx` | MainLayout |
| `/about` | `About.jsx` | MainLayout |
| `/ai-assistant` | `AiAssistant.jsx` | Standalone (full-page chat) |
| `*` | `NotFound.jsx` | MainLayout |

### SPA Fallback

Since BrowserRouter uses real paths, the server must serve `index.html` for all routes:
- **Vercel:** `public/vercel.json` handles rewrites
- **Netlify:** `public/_redirects` (`/* /index.html 200`)
- **Nginx:** Add `try_files $uri /index.html;`

---

## 4. Architecture Overview

### Provider Hierarchy (App.jsx)

```
ErrorBoundary
  └── ThemeProvider        ← dark mode state (localStorage)
        └── LanguageProvider  ← i18n state (localStorage)
              └── BrowserRouter
                    ├── ScrollToTop
                    └── Routes
```

### Key Patterns

| Pattern | Where | Purpose |
|---------|-------|---------|
| **Context Providers** | ThemeContext, LanguageContext | Shared state across all pages |
| **Custom Hooks** | useChat, useSpecialists, usePricing | Data fetching with loading/error states |
| **SeoHead component** | Each page | Dynamic `<title>`, meta description, OG tags |
| **ErrorBoundary** | App root | Catches React errors, shows recovery UI |
| **ScrollToTop** | Router level | Scrolls to top on navigation |

---

## 5. Multi-language (i18n)

All text strings are in **`src/contexts/LanguageContext.jsx`**.

### Supported Languages

| Code | Language | Flag |
|------|----------|------|
| `en` | English (default) | :gb: |
| `th` | Thai | :th: |
| `cn` | Chinese (Simplified) | :cn: |

Language selection persists to `localStorage` and updates `document.documentElement.lang`.

### Adding a Translation Key

1. Add in all 3 languages in `LanguageContext.jsx`:
```js
en: { myNewKey: 'Hello World' },
th: { myNewKey: 'สวัสดีโลก' },
cn: { myNewKey: '你好世界' },
```

2. Use in component:
```jsx
const { t } = useLanguage();
return <h1>{t('myNewKey')}</h1>;
```

---

## 6. Styling

- **Framework:** Tailwind CSS v3
- **Dark mode:** Class-based (`dark:` prefix), shared via ThemeContext
- **Theme persists** to localStorage

### Custom Color Tokens (tailwind.config.js)

| Token | Usage |
|-------|-------|
| `primary` | Brand color (blue #1e5baf) |
| `secondary` | Hover/accent color |
| `surface-light` / `surface-dark` | Card/navbar backgrounds |
| `background-light` / `background-dark` | Page backgrounds |
| `text-main` / `text-muted` | Text colors |

---

## 7. Backend API Routes

The `api/` directory contains **Vercel serverless functions** (auto-deployed as `/api/*` endpoints).

### POST /api/chat

AI-powered medical concierge chat using Claude API.

| Field | Type | Required |
|-------|------|----------|
| `message` | string | Yes |
| `language` | string | No (default: `en`) |
| `history` | array | No |

- Proxies to Claude API (`claude-sonnet-4-20250514`) with medical concierge system prompt
- Rate limited: 10 requests/min per IP
- Falls back to local keyword matching if API fails (see `useChat.js`)
- **Requires** `ANTHROPIC_API_KEY` environment variable on Vercel

### POST /api/contact

Contact form submission.

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `email` | string | Yes (validated) |
| `message` | string | Yes |
| `language` | string | No |

### POST /api/booking

Booking request with reference number generation.

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `email` | string | Yes |
| `phone` | string | Yes |
| `condition` | string | Yes |
| `preferredDate` | string | No (must be future) |

Returns booking reference in format `BC-XXXXXX`.

---

## 8. GEO (Generative Engine Optimization)

The site is optimized for AI search engines (ChatGPT, Claude, Perplexity, Google AI Overviews):

### What's Implemented

| Feature | File | Purpose |
|---------|------|---------|
| **robots.txt** | `public/robots.txt` | Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended |
| **llms.txt** | `public/llms.txt` | AI-readable site description (like robots.txt for LLMs) |
| **Sitemap** | `public/sitemap.xml` | Multilingual sitemap with hreflang (en/th/zh) |
| **JSON-LD Schemas** | `index.html` | MedicalBusiness, Organization, WebSite, BreadcrumbList, FAQPage |
| **OG Tags** | `index.html` + SeoHead | Open Graph + Twitter Card meta tags |
| **Prerendering** | `scripts/prerender.mjs` | Static HTML per route for crawlers that can't run JS |
| **FAQ Microdata** | `Home.jsx` | itemScope/itemProp attributes on FAQ section |
| **Canonical URLs** | SeoHead component | Per-page canonical URL |
| **Hreflang** | `index.html` | Language alternate links (en, th, zh, x-default) |

### JSON-LD Schemas in index.html

1. **MedicalBusiness + Organization** — Business info, contact, services, location
2. **WebSite + SearchAction** — Site search configuration
3. **BreadcrumbList** — Navigation structure
4. **FAQPage** — FAQ content for rich snippets

---

## 9. Components Reference

### BookingModal.jsx
- Modal overlay with form fields: name, email, phone, specialty, date, notes
- Client-side validation
- Accessible: `role="dialog"`, `aria-modal`, Escape key, click-outside close
- Accepts `prefillSpecialist` prop to pre-fill specialist name

### CostEstimator.jsx
- Interactive cost calculator for medical procedures
- Fetches pricing from `/data/pricing.json` via `usePricing` hook
- Shows "--" when no condition selected (not $0)

### SeoHead.jsx
- Updates `document.title`, meta description, OG tags, canonical URL
- Used on every page for per-page SEO

### ErrorBoundary.jsx
- Class component error boundary
- Shows recovery UI with refresh button on unhandled errors

---

## 10. Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel:
   - Framework: Vite
   - Root directory: `medical-concierge-web`
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Set environment variable:**
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
   This is required for the `/api/chat` endpoint to work.

3. **API routes** in `api/` directory are automatically deployed as serverless functions.

4. **SPA routing** is handled by `public/vercel.json`.

### Netlify (Alternative)

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `medical-concierge-web/dist`
4. SPA fallback handled by `public/_redirects`
5. Note: API routes (`api/`) won't work on Netlify — need Netlify Functions adaptation

### Prerendering for SEO

Run `npm run build:seo` locally to generate pre-rendered HTML for each route. This requires Puppeteer and creates static HTML files that AI crawlers can read without executing JavaScript.

```bash
cd medical-concierge-web
npm run build:seo
```

---

## 11. Environment Variables

| Variable | Required | Where | Purpose |
|----------|----------|-------|---------|
| `ANTHROPIC_API_KEY` | Yes (for AI chat) | Vercel env vars | Claude API key for /api/chat |

---

## 12. Adding a New Page

1. Create `src/pages/NewPage.jsx`:
```jsx
import { useLanguage } from '../contexts/LanguageContext';
import SeoHead from '../components/SeoHead';

const NewPage = () => {
    const { t } = useLanguage();
    return (
        <>
            <SeoHead title="New Page - Bio Connext" description="Page description" />
            <div className="bg-white dark:bg-surface-dark p-10">
                <h1 className="text-text-main dark:text-white text-3xl font-bold">
                    {t('newPageTitle')}
                </h1>
            </div>
        </>
    );
};

export default NewPage;
```

2. Add route in `src/App.jsx` inside the MainLayout Route group
3. Add nav links in `src/layouts/MainLayout.jsx` (desktop + mobile menu)
4. Add translation keys in `src/contexts/LanguageContext.jsx`
5. Add URL to `public/sitemap.xml`
6. Update BreadcrumbList JSON-LD in `index.html`

---

## 13. Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.x | UI framework |
| react-dom | 19.x | DOM rendering |
| react-router-dom | 7.x | Client-side routing (BrowserRouter) |
| vite | 7.x | Build tool / dev server |
| tailwindcss | 3.x | Utility CSS framework |
| puppeteer | latest | Prerendering for SEO (devDependency) |

---

## 14. What Was Changed (v1.0 → v2.0)

### Rebrand
- "Medical Concierge" → "Bio Connext"
- Domain: bio.techdev.in.th
- Email: contact@bio.techdev.in.th

### Routing
- HashRouter → BrowserRouter (SEO-friendly real URLs)
- Added SPA fallback configs for Vercel + Netlify

### New Components
- `BookingModal.jsx` — Booking form with validation
- `SeoHead.jsx` — Per-page SEO meta tags
- `ErrorBoundary.jsx` — Error recovery UI
- `ScrollToTop.jsx` — Scroll reset on navigation
- `NotFound.jsx` — 404 page

### New Contexts
- `ThemeContext.jsx` — Shared dark mode (was duplicated in MainLayout + AiAssistant)

### New Hooks
- `useChat.js` — Chat API integration with fallback
- `useSpecialists.js` — Doctor data from JSON
- `usePricing.js` — Pricing data from JSON

### Backend API
- `api/chat.js` — Claude AI proxy with rate limiting
- `api/contact.js` — Contact form handler
- `api/booking.js` — Booking handler with ref generation

### GEO/SEO
- robots.txt allowing AI crawlers
- llms.txt for AI discoverability
- Multilingual sitemap.xml with hreflang
- 5 JSON-LD schema blocks in index.html
- OG image (SVG + PNG)
- Prerender script for static HTML generation

### UX/UI Fixes
- Dead "Learn More" links → navigate to AI Assistant
- Dead "Book Consultation" buttons → BookingModal
- iOS Safari viewport fix (h-screen → h-[100dvh])
- Language persists to localStorage
- Dark mode synced across all pages via ThemeContext
- Mobile menu: body scroll lock + backdrop overlay
- ARIA roles, labels, and keyboard navigation
- Skip-to-content link for accessibility
- CostEstimator shows "--" instead of $0 when empty
- FAQ section with accordion on Home page
