# Developer Guide — Medical Concierge Web App

> **Version:** 1.0.0
> **Stack:** React 19 + Vite 7 + Tailwind CSS v3
> **Repository:** https://github.com/ballbadboy/web-medical-service-ecosystem
> **Live output:** `app-ready-to-use.html` (single-file, upload to any server)

---

## 1. Project Structure

```
web_medical_service_ecosystem_overview/
├── app-ready-to-use.html          ← Built output (deploy this to server)
├── medical-concierge-web/         ← Source code (edit this)
│   ├── src/
│   │   ├── contexts/
│   │   │   └── LanguageContext.jsx   ← ALL translation strings (EN/TH/CN)
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx        ← Navbar + Footer (shared layout)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Specialists.jsx
│   │   │   ├── About.jsx
│   │   │   └── AiAssistant.jsx
│   │   ├── components/
│   │   │   └── CostEstimator.jsx     ← Cost calculator widget
│   │   └── App.jsx                   ← Routes
│   ├── package.json
│   └── vite.config.js
└── DEVELOPER_GUIDE.md
```

---

## 2. Local Development

### Requirements
- Node.js 18+
- npm 9+

### Install dependencies
```bash
cd medical-concierge-web
npm install
```

### Run dev server (hot reload)
```bash
npm run dev
# Open http://localhost:5173
```

### Build for production
```bash
npm run build
# Output: medical-concierge-web/dist/index.html
```

### Copy build to deploy file
```bash
cp medical-concierge-web/dist/index.html app-ready-to-use.html
```

---

## 3. Routing

Routes are defined in `src/App.jsx`:

| URL | Page File |
|-----|-----------|
| `/` | `Home.jsx` |
| `/services` | `Services.jsx` |
| `/ai-assistant` | `AiAssistant.jsx` |
| `/specialists` | `Specialists.jsx` |
| `/about` | `About.jsx` |

> Uses `HashRouter` — so actual URLs are `/#/`, `/#/services`, etc.
> This allows the app to run without a server (open as file).

---

## 4. Multi-language (i18n)

All text strings are in one file:
**`src/contexts/LanguageContext.jsx`**

### Supported languages
| Code | Language |
|------|----------|
| `en` | English (default) |
| `th` | Thai |
| `cn` | Chinese (Simplified) |

### How to edit existing text

Find the key in `LanguageContext.jsx` and update the value for each language:

```js
// Example: change the hero title
en: {
    heroTitle1: 'World-Class Medical',   // ← edit here
},
th: {
    heroTitle1: 'บริการดูแลผู้ป่วย',      // ← and here
},
cn: {
    heroTitle1: '世界级医疗',              // ← and here
}
```

### How to add a new translation key

1. Add the key in all 3 languages inside `LanguageContext.jsx`:
```js
en: { myNewKey: 'Hello World' },
th: { myNewKey: 'สวัสดีโลก' },
cn: { myNewKey: '你好世界' },
```

2. Use it in any page component:
```jsx
import { useLanguage } from '../contexts/LanguageContext';

const MyPage = () => {
    const { t } = useLanguage();
    return <h1>{t('myNewKey')}</h1>;
};
```

---

## 5. Styling

- **Framework:** Tailwind CSS v3
- **Dark mode:** class-based (`dark:` prefix), toggled by button in navbar
- **Custom colors** (defined in `tailwind.config.js`):

| Token | Usage |
|-------|-------|
| `primary` | Brand color (blue) |
| `secondary` | Hover/accent color |
| `surface-light` / `surface-dark` | Card/navbar backgrounds |
| `background-light` / `background-dark` | Page backgrounds |
| `text-main` / `text-muted` | Text colors |

### Example usage
```jsx
<div className="bg-primary text-white dark:bg-surface-dark">
    Content
</div>
```

---

## 6. Adding a New Page

1. Create `src/pages/NewPage.jsx`:
```jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NewPage = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white dark:bg-surface-dark p-10">
            <h1 className="text-text-main dark:text-white text-3xl font-bold">
                {t('newPageTitle')}
            </h1>
        </div>
    );
};

export default NewPage;
```

2. Add route in `src/App.jsx`:
```jsx
import NewPage from './pages/NewPage';
// ...
<Route path="/new-page" element={<NewPage />} />
```

3. Add nav link in `src/layouts/MainLayout.jsx` (desktop + mobile menu).

4. Add translation key in `LanguageContext.jsx`.

---

## 7. Editing the Specialists List

The specialists data is in `src/pages/Specialists.jsx`, `specialistsData` array at the top of the file:

```js
const specialistsData = [
    {
        id: 1,
        name: 'Dr. Priya Sharma',
        title: 'Cardiologist & Interventional Specialist',
        hospital: 'Bangkok Heart Institute',
        experience: '22 Years',
        languages: ['English', 'Thai', 'Hindi'],
        rating: 4.9,
        reviews: 312,
        specialties: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia'],
        avatar: 'PS',          // 2-letter initials
        avatarColor: 'from-blue-500 to-cyan-400',  // Tailwind gradient
        available: true,       // true = Available, false = Booked
    },
    // ... add more doctors here
];
```

---

## 8. Deploy Workflow

### After making changes:

```bash
# 1. Build
npm --prefix medical-concierge-web run build

# 2. Copy to deploy file
cp medical-concierge-web/dist/index.html app-ready-to-use.html

# 3. Commit & push to GitHub
git add .
git commit -m "your update description"
git push origin main
```

### Deploy to server
Upload **`app-ready-to-use.html`** to the web server.
This is a **self-contained single file** — no Node.js, no build step needed on server.

---

## 9. Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.x | UI framework |
| react-dom | 19.x | DOM rendering |
| react-router-dom | 7.x | Client-side routing |
| vite | 7.x | Build tool / dev server |
| tailwindcss | 3.x | Utility CSS |
| vite-plugin-singlefile | latest | Inline all JS/CSS into one HTML file |

---

## 10. Notes for Server Deployment

- The app uses **HashRouter** (`/#/route`) — works on any static hosting, no server config needed
- The output `app-ready-to-use.html` is fully self-contained (no external dependencies at runtime)
- Google Fonts (Material Symbols) is loaded from CDN — requires internet connection on client
- No backend required — AI assistant chat is simulated (frontend only)
