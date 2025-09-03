import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PROMPT_CATEGORIES, PROMPT_TECHNIQUES, CONTEXT_EXAMPLES, TONE_EXAMPLES, FORMAT_EXAMPLES } from '../constants';
import { PromptTemplate, ModelParameters } from '../types';
import { ChevronDownIcon } from '../components/icons/Icons';
import useLocalStorage from '../hooks/useLocalStorage';

const PromptBuilder: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const initialPrompt = {
    role: '',
    task: '',
    context: '',
    tone: '',
    format: '',
  };
  const [promptData, setPromptData] = useState(initialPrompt);
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  
  const [modelParameters, setModelParameters] = useLocalStorage<ModelParameters>('modelParameters', {
    temperature: 0.7,
    maxTokens: 2048,
  });

  const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModelParameters({ ...modelParameters, [name]: parseFloat(value) });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromptData((prev) => ({ ...prev, [name]: value }));
  };
  
  const applyTemplate = (template: PromptTemplate) => {
    const translatedPrompt = {
      role: t(template.prompt.role, { lng: i18n.language, entity: '{...}' }),
      task: t(template.prompt.task, { lng: i18n.language, entity: '{...}' }),
      context: t(template.prompt.context),
      tone: t(template.prompt.tone),
      format: t(template.prompt.format),
    }
    setPromptData(translatedPrompt);
    setSelectedTemplate(template);
    setActiveTechnique(null);
  };

  const handleTechniqueClick = (techniqueKey: string) => {
    if (activeTechnique === techniqueKey) {
      setActiveTechnique(null);
    } else {
      setActiveTechnique(techniqueKey);
    }
  };

  const generatedPrompt = useMemo(() => {
    const basePrompt = t('promptBuilder.basePrompt', {
      role: promptData.role || t('promptBuilder.placeholdersInPrompt.role'),
      task: promptData.task || t('promptBuilder.placeholdersInPrompt.task'),
      context: promptData.context || t('promptBuilder.placeholdersInPrompt.context'),
      tone: promptData.tone || t('promptBuilder.placeholdersInPrompt.tone'),
      format: promptData.format || t('promptBuilder.placeholdersInPrompt.format'),
    }).replace(/\s+/g, ' ').trim();

    const selectedTechnique = PROMPT_TECHNIQUES.find(t => t.name === activeTechnique);
      
    if (selectedTechnique) {
        // Just append the technique description/template, don't replace the prompt
        return `${basePrompt}${t(selectedTechnique.template)}`;
    }
    
    return basePrompt;

  }, [promptData, activeTechnique, t]);

  const completionPercentage = useMemo(() => {
    const fields = Object.values(promptData);
    const filledFields = fields.filter(value => value.trim() !== '').length;
    return (fields.length > 0) ? (filledFields / fields.length) * 100 : 0;
  }, [promptData]);

  const currentContextExamples = selectedTemplate?.contextExamples || CONTEXT_EXAMPLES;
  const currentToneExamples = selectedTemplate?.toneExamples || TONE_EXAMPLES;
  const currentFormatExamples = selectedTemplate?.formatExamples || FORMAT_EXAMPLES;

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="h-full flex flex-col gap-8 p-1 animate-fade-in-up overflow-y-auto">
      <header>
        <h1 className="text-3xl font-bold text-white">{t('promptBuilder.title')}</h1>
        <p className="text-nexus-text mt-1">{t('promptBuilder.description')}</p>
      </header>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{t('promptBuilder.advancedTechniques')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {PROMPT_TECHNIQUES.map((technique, index) => (
            <div 
              key={technique.name} 
              onClick={() => handleTechniqueClick(technique.name)} 
              className={`relative bg-nexus-dark/70 p-4 rounded-lg cursor-pointer hover:-translate-y-1 transition-all duration-300 transform animate-fade-in-up btn-gradient-border ${activeTechnique === technique.name ? 'ring-2 ring-nexus-primary' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-2xl">{technique.icon}</span>
              <h4 className="font-bold mt-2 text-white text-sm">{t(technique.name)}</h4>
              <p className="text-xs text-gray-400 mt-1">{t(technique.description)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-nexus-primary to-nexus-secondary h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${completionPercentage}%` }}>
        </div>
        <p className="text-xs text-right mt-1 text-gray-400">{t('promptBuilder.completion', { percentage: Math.round(completionPercentage) })}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="bg-nexus-dark/50 p-6 rounded-lg space-y-4 backdrop-blur-sm border border-white/10">
          <InputGroup label={t('promptBuilder.labels.role')} name="role" value={promptData.role} onChange={handleChange} placeholder={t('promptBuilder.placeholders.role')} t={t} />
          <InputGroup label={t('promptBuilder.labels.task')} name="task" value={promptData.task} onChange={handleChange} placeholder={t('promptBuilder.placeholders.task')} isTextarea t={t} />
          <InputGroup label={t('promptBuilder.labels.context')} name="context" value={promptData.context} onChange={handleChange} placeholder={t('promptBuilder.placeholders.context')} isTextarea examples={currentContextExamples} t={t} />
          <InputGroup label={t('promptBuilder.labels.tone')} name="tone" value={promptData.tone} onChange={handleChange} placeholder={t('promptBuilder.placeholders.tone')} examples={currentToneExamples} t={t} />
          <InputGroup label={t('promptBuilder.labels.format')} name="format" value={promptData.format} onChange={handleChange} placeholder={t('promptBuilder.placeholders.format')} examples={currentFormatExamples} t={t} />
        
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">{t('settings.modelParams.title')}</h3>
            <div className="space-y-4">
               <SliderInput
                label={t('settings.modelParams.temperature')}
                name="temperature"
                value={modelParameters.temperature}
                onChange={handleParameterChange}
                min={0}
                max={1}
                step={0.1}
                description={t('settings.modelParams.temperatureDesc')}
              />
              <SliderInput
                label={t('settings.modelParams.maxTokens')}
                name="maxTokens"
                value={modelParameters.maxTokens}
                onChange={handleParameterChange}
                min={128}
                max={8192}
                step={128}
                description={t('settings.modelParams.maxTokensDesc')}
              />
            </div>
          </div>
        </div>

        <div className="bg-nexus-dark/50 p-6 rounded-lg flex flex-col backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">{t('promptBuilder.generatedPrompt')}</h3>
          <div className="bg-nexus-bg p-4 rounded-md text-nexus-text flex-1 whitespace-pre-wrap font-mono text-sm overflow-y-auto">
            {generatedPrompt}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{t('promptBuilder.templates')}</h2>
        <div className="space-y-2">
            {PROMPT_CATEGORIES.map(category => (
                <div key={category.name} className="bg-nexus-dark/50 rounded-lg overflow-hidden relative btn-gradient-border">
                    <button 
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-white hover:bg-white/5 transition-colors"
                    >
                        <span>{t(category.name)}</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openCategories.includes(category.name) ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`transition-all duration-500 ease-in-out grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${openCategories.includes(category.name) ? 'max-h-[1000px] p-4' : 'max-h-0'}`}>
                        {openCategories.includes(category.name) && category.templates.map((template, index) => (
                            <div 
                                key={template.name} 
                                onClick={() => applyTemplate(template)} 
                                className="relative bg-nexus-dark/70 p-4 rounded-lg cursor-pointer hover:-translate-y-1 transition-all duration-300 transform animate-fade-in-up btn-gradient-border"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span className="text-2xl">{template.icon}</span>
                                <h4 className="font-bold mt-2 text-white">{t(template.name)}</h4>
                                <p className="text-sm text-gray-400 mt-1">{t(template.description)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextarea?: boolean;
  examples?: string[];
  t: (key: string) => string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, placeholder, isTextarea = false, examples, t }) => {
  const commonProps = {
    name,
    value,
    onChange,
    placeholder,
    className: "w-full bg-nexus-bg border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-nexus-primary focus:border-nexus-primary outline-none transition-all duration-200 ease-in-out"
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-nexus-text mb-1">{label}</label>
      {isTextarea ? <textarea {...commonProps} rows={2} /> : <input type="text" {...commonProps} />}
      {examples && (
        <div className="flex flex-wrap gap-2 mt-2">
          {examples.map(exampleKey => (
            <button
              key={exampleKey}
              type="button"
              onClick={() => onChange({ target: { name, value: t(exampleKey) } } as React.ChangeEvent<HTMLInputElement>)}
              className="relative px-2 py-1 text-xs bg-nexus-dark/80 text-gray-300 rounded-full hover:bg-nexus-primary/50 hover:text-white transition-colors btn-gradient-border"
            >
              {t(exampleKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface SliderInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
  description: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, name, value, onChange, min, max, step, description }) => (
  <div>
    <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-nexus-text">{label}</label>
        <span className="text-sm font-mono text-white bg-nexus-bg px-2 py-1 rounded">{value}</span>
    </div>
    <input
      type="range"
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
    />
    <p className="text-xs text-gray-400 mt-1">{description}</p>
  </div>
);

export default PromptBuilder;