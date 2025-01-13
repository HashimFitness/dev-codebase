import OpenAI from 'openai';

export const sendMessageToOpenAI = async (
  chatHistory: { sender: string; text: string }[],
  userMessage: string
): Promise<string> => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // In production, use a backend API proxy
  });

  const formattedMessages = chatHistory.map((msg) => ({
    role: msg.sender.toLowerCase() === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  formattedMessages.push({ role: 'user', content: userMessage });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: formattedMessages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || 'Sorry, I could not process your request.';
};
