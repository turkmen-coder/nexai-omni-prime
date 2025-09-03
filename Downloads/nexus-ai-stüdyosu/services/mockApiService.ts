import i18n from '../i18n';

export const streamMockResponse = async (
  onChunk: (chunk: string) => void,
  onError: (error: string) => void
) => {
  const mockText = i18n.t('chat.mockResponse');
  const words = mockText.split(" ");
  
  try {
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      onChunk(words[i] + " ");
    }
  } catch (error) {
    console.error("Mock API error:", error);
    onError(i18n.t('errors.mockApiUnknown'));
  }
};