import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatMessage, ModelProvider } from '../types';
import { ClipboardIcon } from './icons/Icons';

interface ChatMessageProps {
  message: ChatMessage;
}

const providerStyles: Record<ModelProvider, { bg: string; text: string; border: string }> = {
  [ModelProvider.Gemini]: { bg: "bg-purple-500", text: "text-purple-300", border: "border-purple-500" },
  [ModelProvider.OpenAI]: { bg: "bg-green-500", text: "text-green-300", border: "border-green-500" },
  [ModelProvider.Claude]: { bg: "bg-yellow-500", text: "text-yellow-300", border: "border-yellow-500" },
  [ModelProvider.Test]: { bg: "bg-gray-500", text: "text-gray-300", border: "border-gray-500" },
};


const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const providerStyle = providerStyles[message.provider];
  const avatarText = message.provider.substring(0, 1);

  return (
    <div className={`flex items-start gap-4 my-4 animate-fade-in-up ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${providerStyle.bg} flex items-center justify-center font-bold text-white`}>
          {avatarText}
        </div>
      )}
      <div className={`max-w-xl p-4 rounded-lg relative group ${isUser ? 'bg-nexus-primary text-white' : 'bg-nexus-dark'}`}>
        {message.isLoading ? (
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
        ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        {!isUser && !message.isLoading && (
          <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleCopy} className="relative p-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white btn-gradient-border">
              <ClipboardIcon className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-gray-400">{t('common.copied')}</span>}
          </div>
        )}
      </div>
       {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white">
          {t('common.userInitial')}
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;