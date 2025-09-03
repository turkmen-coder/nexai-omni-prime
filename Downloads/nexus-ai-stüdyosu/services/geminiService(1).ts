
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, ModelParameters } from '../types';
import i18n from '../i18n';

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const initializeGemini = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error(i18n.t('errors.geminiApiKey'));
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey });
    }
};

const getChatInstance = (modelParameters: ModelParameters) => {
    if (!ai) {
        initializeGemini();
    }
    // For simplicity, we create a new chat instance for each conversation stream.
    // A more advanced implementation might manage multiple chat histories.
    chat = ai!.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            temperature: modelParameters.temperature,
            // A simple mapping from a generic 'maxTokens' to Gemini's specific properties
            // Note: This is a simplification. Real implementation might need more nuanced logic.
            maxOutputTokens: modelParameters.maxTokens > 100 ? modelParameters.maxTokens : 2048,
            thinkingConfig: { thinkingBudget: modelParameters.maxTokens > 100 ? 100: undefined },
        }
    });
    return chat;
};


export const streamChatResponse = async (
    messages: ChatMessage[],
    modelParameters: ModelParameters,
    onChunk: (chunk: string) => void,
    onError: (error: string) => void
) => {
    try {
        const chatInstance = getChatInstance(modelParameters);
        const lastUserMessage = messages[messages.length - 1].text;
        
        const responseStream = await chatInstance.sendMessageStream({ message: lastUserMessage });

        for await (const chunk of responseStream) {
            onChunk(chunk.text);
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        onError(error instanceof Error ? error.message : i18n.t('errors.geminiUnknown'));
    }
};