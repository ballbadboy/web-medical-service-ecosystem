import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load page components
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Specialists = React.lazy(() => import('./pages/Specialists'));
const About = React.lazy(() => import('./pages/About'));
const AiAssistant = React.lazy(() => import('./pages/AiAssistant'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-primary animate-pulse">medical_services</span></div>}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="services" element={<Services />} />
                  <Route path="specialists" element={<Specialists />} />
                  <Route path="about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/ai-assistant" element={<AiAssistant />} />
              </Routes>
            </Suspense>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
