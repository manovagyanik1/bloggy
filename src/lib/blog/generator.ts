import { BlogTheme } from '../types/theme';
import { getTheme } from '../themes';
import { callOpenAI } from '../api/openai';
import { callClaude } from '../api/claude';
import { createInitialPrompt, createContinuationPrompt } from './prompts';

export interface GenerateBlogParams {
  title: string;
  seoKeywords: string[];
  ignoreSections: string[];
  generateSections: string[];
  apiProvider: "openai" | "claude";
  customPrompt?: string;
  themeName?: string;
}

export async function generateBlogHTML(params: GenerateBlogParams): Promise<string> {
  const theme = getTheme(params.themeName);
  const prompt = createInitialPrompt({ ...params, theme });
  
  const content = await (params.apiProvider === "openai" 
    ? callOpenAI(prompt) 
    : callClaude(prompt));
    
  return wrapContent(content, theme);
}

export async function generateMoreContent(
  previousContent: string,
  params: GenerateBlogParams
): Promise<string> {
  const theme = getTheme(params.themeName);
  const prompt = createContinuationPrompt({
    ...params,
    previousContent,
    theme
  });
  
  const content = await (params.apiProvider === "openai" 
    ? callOpenAI(prompt) 
    : callClaude(prompt));
    
  return content;
}

export function wrapContent(content: string, theme: BlogTheme): string {
  // Remove outer div if present
  const cleanContent = content.replace(/<html[^>]*>([\s\S]*)<\/html>/i, '$1').trim();
  
  return `
    <div class="${theme.layout.container}" style="background-color: ${theme.colors.background}; color: ${theme.colors.text}">
      ${cleanContent}
    </div>
  `;
}