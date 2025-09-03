
export enum ModelProvider {
  Gemini = 'Gemini',
  OpenAI = 'OpenAI',
  Claude = 'Claude',
  Test = 'Test',
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  provider: ModelProvider;
  isLoading?: boolean;
}

export interface ApiKeys {
  openai: string;
  claude: string;
}

export interface ModelParameters {
    temperature: number;
    maxTokens: number;
}

export interface PromptTemplate {
    name: string;
    description: string;
    icon: string;
    prompt: {
        role: string;
        task: string;
        context: string;
        tone: string;
        format: string;
    };
    contextExamples?: string[];
    toneExamples?: string[];
    formatExamples?: string[];
}

export interface PromptCategory {
    name: string;
    templates: PromptTemplate[];
}


export interface PromptTechnique {
  name: string;
  description: string;
  icon: string;
  template: string;
  examplePrompt: {
    role: string;
    task: string;
    context: string;
    tone: string;
    format: string;
  };
}