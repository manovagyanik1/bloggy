import { BlogTheme } from '../types/theme';
import { getTheme } from '../themes';
import { callAI, AIProvider } from '../api/openai';
import {
  createInitialPrompt,
  createContinuationPrompt,
  createRegenerationPrompt,
  createFinalizePrompt,
} from './prompts';
import { Project } from '../types/project';

export interface GenerateBlogParams {
  title: string;
  seoKeywords: string[];
  ignoreSections: string[];
  generateSections: string[];
  apiProvider: AIProvider;
  customPrompt?: string;
  themeName?: string;
  project: Project;
}

export async function generateBlogHTML(params: GenerateBlogParams): Promise<string> {
  const theme = getTheme(params.themeName);
  const prompt = createInitialPrompt({
    ...params,
    theme,
    project: params.project,
  });

  const content = await callAI(prompt, params.apiProvider);

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
    theme,
    project: params.project,
  });

  const content = await callAI(prompt, params.apiProvider);

  return content;
}

export async function finalizeBlog(content: string, project: Project): Promise<unknown> {
  const prompt = createFinalizePrompt(content, project);

  const result = await callAI(prompt, 'deepseek');
  try {
    // Clean up the response to extract just the JSON part
    const jsonStr = result
      .replace(/```json\s*/, '') // Remove opening ```json
      .replace(/```\s*$/, '') // Remove closing ```
      .trim(); // Remove any extra whitespace

    return JSON.parse(jsonStr);
  } catch (error: unknown) {
    console.error('AI Response:', result, error); // Log the raw response for debugging
    throw new Error('Failed to parse AI response for blog finalization. Please try again.');
  }
}

export function wrapContent(content: string, theme: BlogTheme): string {
  // Remove outer div if present
  const cleanContent = content.replace(/<html[^>]*>([\s\S]*)<\/html>/i, '$1').trim();

  // content comes as ```html\n and \n``` so we need to remove them
  const htmlContent = cleanContent.replace(/```html\n|\n```/g, '');

  return `
    <div class="${theme.layout.container}" style="background-color: ${theme.colors.background}; color: ${theme.colors.text}">
      ${htmlContent}
    </div>
  `;
}

interface RegenerateSectionParams extends Pick<GenerateBlogParams, 'apiProvider'> {
  preceding: string;
  selected: string;
  succeeding: string;
  additionalPrompt: string;
  project: Project;
}

export async function regenerateSection(params: RegenerateSectionParams): Promise<string> {
  const prompt = createRegenerationPrompt(params);

  const content = await callAI(prompt, params.apiProvider);

  return content;
}
