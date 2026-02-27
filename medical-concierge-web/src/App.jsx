import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Specialists from './pages/Specialists';
import About from './pages/About';
import AiAssistant from './pages/AiAssistant';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="specialists" element={<Specialists />} />
            <Route path="about" element={<About />} />
          </Route>
          {/* AiAssistant gets its own route without the MainLayout as it has its own dedicated shell */}
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
