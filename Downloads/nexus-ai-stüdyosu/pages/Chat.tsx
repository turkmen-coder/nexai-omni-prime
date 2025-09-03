
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ModelProvider, ChatMessage, ApiKeys, ModelParameters } from '../types';
import ChatMessageComponent from '../components/ChatMessage';
import { streamChatResponse } from '../services/geminiService';
import { streamMockResponse } from '../services/mockApiService';
import useLocalStorage from '../hooks/useLocalStorage';

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useLocalStorage<ModelProvider>('selectedProvider', ModelProvider.Gemini);
  const [apiKeys] = useLocalStorage<ApiKeys>('apiKeys', { openai: '', claude: '' });
  const [modelParameters] = useLocalStorage<ModelParameters>('modelParameters', { temperature: 0.7, maxTokens: 2048 });
  const [testMode] = useLocalStorage<boolean>('testMode', false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      provider: selectedProvider,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessagePlaceholder: ChatMessage = {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      provider: testMode ? ModelProvider.Test : selectedProvider,
      isLoading: true,
    };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    const providerToUse = testMode ? ModelProvider.Test : selectedProvider;

    const onChunk = (chunk: string) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === aiMessageId
                    ? { ...msg, text: msg.text + chunk, isLoading: true }
                    : msg
            )
        );
    };

    const onComplete = () => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === aiMessageId ? { ...msg, isLoading: false } : msg
            )
        );
        setIsLoading(false);
    };

    const onError = (error: string) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === aiMessageId
                    ? { ...msg, text: `${t('chat.errorPrefix')}: ${error}`, isLoading: false }
                    : msg
            )
        );
        setIsLoading(false);
    };

    try {
        switch (providerToUse) {
            case ModelProvider.Gemini:
                await streamChatResponse([...messages, userMessage], modelParameters, onChunk, onError);
                break;
            case ModelProvider.OpenAI:
            case ModelProvider.Claude:
            case ModelProvider.Test:
                await streamMockResponse(onChunk, onError);
                break;
            default:
                onError(t("chat.unknownProvider"));
        }
    } catch (e) {
        onError(e instanceof Error ? e.message : String(e));
    } finally {
        onComplete();
    }
    
  }, [input, isLoading, selectedProvider, testMode, messages, modelParameters, t]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const ProviderButton: React.FC<{ provider: ModelProvider }> = ({ provider }) => (
    <button
      onClick={() => setSelectedProvider(provider)}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 btn-gradient-border ${
        selectedProvider === provider
          ? 'bg-nexus-primary text-white scale-105'
          : 'bg-nexus-dark text-gray-300 hover:bg-nexus-dark/70'
      }`}
    >
      {provider}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-nexus-dark/50 rounded-lg border border-white/10 animate-fade-in-up">
      <div className="p-4 border-b border-white/10 flex justify-center items-center gap-2">
        {(Object.keys(ModelProvider) as Array<keyof typeof ModelProvider>).map(key => (
            key !== 'Test' && <ProviderButton key={key} provider={ModelProvider[key]} />
        ))}
        {testMode && <div className="px-3 py-1 text-xs font-bold text-yellow-300 bg-yellow-900/50 rounded-full">{t('chat.testMode')}</div>}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map(msg => (
          <ChatMessageComponent key={msg.id} message={msg} />
        ))}
         <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.placeholder', { provider: selectedProvider })}
            className="w-full bg-nexus-bg border border-gray-600 rounded-lg p-3 pr-20 resize-none focus:ring-2 focus:ring-nexus-primary focus:border-nexus-primary outline-none transition-all duration-200 ease-in-out"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-nexus-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-nexus-primary/80 transition-colors btn-gradient-border"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;