export interface AIRequestBody {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  max_tokens: number;
}

export interface AIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export type AIProvider = 'openai' | 'deepseek' | 'claude';

export async function callAI(prompt: string, provider: AIProvider = 'deepseek'): Promise<string> {
  const apiKey = {
    openai: import.meta.env.VITE_OPENAI_API_KEY,
    deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
    claude: import.meta.env.VITE_CLAUDE_API_KEY,
  }[provider];

  if (!apiKey) {
    throw new Error(`${provider} API key not found`);
  }

  const endpoints = {
    openai: 'https://api.openai.com/v1/chat/completions',
    deepseek: 'https://api.deepseek.com/chat/completions',
    claude: 'https://api.anthropic.com/v1/messages',
  };

  const models = {
    openai: 'gpt-3.5-turbo',
    deepseek: 'deepseek-chat',
    claude: 'claude-3-opus-20240229',
  };

  const requestBody: AIRequestBody = {
    model: models[provider],
    messages: [
      {
        role: 'system',
        content: 'You are a professional blog writer who creates SEO-optimized content.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: provider === 'claude' ? `Bearer ${apiKey}` : `Bearer ${apiKey}`,
  };

  const response = await fetch(endpoints[provider], {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`${provider} API request failed: ${response.statusText}`);
  }

  const result: AIResponse = await response.json();
  return result.choices[0].message.content;
}
