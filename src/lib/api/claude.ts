import { ClaudeRequestBody, ClaudeResponse } from '../types/api';

export async function callClaude(prompt: string): Promise<string> {
  const url = 'https://api.anthropic.com/v1/claude';
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

  if (!apiKey) {
    throw new Error('Claude API key not found');
  }

  const requestBody: ClaudeRequestBody = {
    model: 'claude-v1',
    prompt: prompt,
    max_tokens: 3000,
    temperature: 0.7,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Claude API request failed: ${response.statusText}`);
  }

  const result: ClaudeResponse = await response.json();
  return result.completion;
}
