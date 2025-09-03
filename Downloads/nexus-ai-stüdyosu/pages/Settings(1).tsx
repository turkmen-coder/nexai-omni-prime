
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from '../hooks/useLocalStorage';
import { ApiKeys } from '../types';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const [apiKeys, setApiKeys] = useLocalStorage<ApiKeys>('apiKeys', {
    openai: '',
    claude: '',
  });

  const [testMode, setTestMode] = useLocalStorage<boolean>('testMode', false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showClaudeKey, setShowClaudeKey] = useState(false);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiKeys({ ...apiKeys, [name]: value });
  };

  const apiKeyStatus = (key: string) => {
    return key ? `✅ ${t('settings.apiKeys.statusSet')}` : `❌ ${t('settings.apiKeys.statusNotSet')}`;
  }
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="h-full flex flex-col gap-8 p-1 animate-fade-in-up overflow-y-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>
        <p className="text-nexus-text mt-1">{t('settings.description')}</p>
      </header>

      <div className="space-y-8 max-w-2xl">
        {/* Language Settings */}
        <SettingsCard title={t('settings.language.title')}>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => changeLanguage('tr')}
                    className={`relative px-4 py-2 font-semibold rounded-md transition-colors btn-gradient-border ${i18n.language === 'tr' ? 'bg-nexus-primary text-white' : 'bg-nexus-dark hover:bg-nexus-dark/70 text-white'}`}
                >
                    {t('settings.language.tr')}
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`relative px-4 py-2 font-semibold rounded-md transition-colors btn-gradient-border ${i18n.language === 'en' ? 'bg-nexus-primary text-white' : 'bg-nexus-dark hover:bg-nexus-dark/70 text-white'}`}
                >
                    {t('settings.language.en')}
                </button>
            </div>
        </SettingsCard>

        {/* Test Mode */}
        <SettingsCard title={t('settings.testMode.title')}>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-white">{t('settings.testMode.enable')}</h4>
                    <p className="text-sm text-gray-400">{t('settings.testMode.description')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={testMode} onChange={() => setTestMode(!testMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nexus-primary"></div>
                </label>
            </div>
        </SettingsCard>

        {/* API Keys */}
        <SettingsCard title={t('settings.apiKeys.title')}>
          <div className="space-y-4">
            <ApiKeyInput
              label={t('settings.apiKeys.gemini')}
              value={t('settings.apiKeys.geminiConfigured')}
              status={`✅ ${t('settings.apiKeys.geminiStatus')}`}
              disabled
            />
             <ApiKeyInput
              label={t('settings.apiKeys.openai')}
              name="openai"
              type={showOpenAIKey ? 'text' : 'password'}
              value={apiKeys.openai}
              onChange={handleApiKeyChange}
              status={apiKeyStatus(apiKeys.openai)}
              onToggleVisibility={() => setShowOpenAIKey(!showOpenAIKey)}
              showKey={showOpenAIKey}
            />
            <ApiKeyInput
              label={t('settings.apiKeys.claude')}
              name="claude"
              type={showClaudeKey ? 'text' : 'password'}
              value={apiKeys.claude}
              onChange={handleApiKeyChange}
              status={apiKeyStatus(apiKeys.claude)}
              onToggleVisibility={() => setShowClaudeKey(!showClaudeKey)}
              showKey={showClaudeKey}
            />
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-nexus-dark/50 p-6 rounded-lg backdrop-blur-sm border border-white/10">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

interface ApiKeyInputProps {
    label: string;
    name?: string;
    type?: string;
    value: string;
    status: string;
    disabled?: boolean;
    showKey?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleVisibility?: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ label, name, type = "text", value, status, disabled, showKey, onChange, onToggleVisibility }) => (
    <div>
        <label className="block text-sm font-medium text-nexus-text">{label}</label>
        <div className="flex items-center gap-2 mt-1">
            <div className="relative flex-grow">
                 <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full bg-nexus-bg border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-nexus-primary focus:border-nexus-primary outline-none transition-all duration-200 ease-in-out disabled:opacity-50"
                />
                {onToggleVisibility && 
                    <button onClick={onToggleVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 rounded-md">
                        {showKey ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                    </button>
                }
            </div>
            <span className={`text-sm ${status.startsWith("✅") ? 'text-green-400' : 'text-yellow-400'}`}>{status}</span>
        </div>
    </div>
);

export default Settings;