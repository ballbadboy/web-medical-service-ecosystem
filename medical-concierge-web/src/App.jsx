import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Specialists from './pages/Specialists';
import About from './pages/About';
import AiAssistant from './pages/AiAssistant';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
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
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
