
import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Studio from './pages/Studio';
import PromptBuilder from './pages/PromptBuilder';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t('app.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('app.description'));
    }
  }, [i18n.language, t]);

  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-nexus-bg overflow-hidden">
        <AnimatedBackground />
        <Sidebar />
        <main className="flex-1 flex flex-col z-10 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 h-full">
            <Routes>
              <Route path="/" element={<Studio />} />
              <Route path="/prompt-builder" element={<PromptBuilder />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;