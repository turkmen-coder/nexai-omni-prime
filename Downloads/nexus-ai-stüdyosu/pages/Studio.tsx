import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Studio: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up">
      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-nexus-neon-green to-nexus-neon-blue bg-clip-text text-transparent pb-2">
        {t('studio.title')}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-nexus-text max-w-2xl">
        {t('studio.description')}
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <div className="relative rounded-lg btn-gradient-border">
          <Link
            to="/prompt-builder"
            className="block px-8 py-4 bg-nexus-primary text-white font-semibold rounded-lg shadow-lg hover:bg-nexus-primary/80 transition-all duration-300 transform hover:scale-105"
          >
            {t('studio.launchBuilder')}
          </Link>
        </div>
        <div className="relative rounded-lg btn-gradient-border">
          <Link
            to="/chat"
            className="block px-8 py-4 bg-nexus-secondary text-white font-semibold rounded-lg shadow-lg hover:bg-nexus-secondary/80 transition-all duration-300 transform hover:scale-105"
          >
            {t('studio.startChat')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Studio;