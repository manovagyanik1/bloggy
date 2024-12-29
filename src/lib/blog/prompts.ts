import { BlogTheme } from '../types/theme';

interface PromptParams {
  title: string;
  seoKeywords: string[];
  generateSections: string[];
  ignoreSections: string[];
  customPrompt?: string;
  theme: BlogTheme;
}
const websiteName = "Clipy";
const url = "https://clipy.online/";
const webappContext = `Clipy is a cloud-powered screen recording platform that simplifies professional screen recording, cloud storage, and instant sharing. 
 It offers powerful features for seamless screen recording, allowing users to capture their screens effortlessly. The platform integrates cloud storage, enabling users to save their recordings securely and access them from anywhere. Additionally, Clipy provides instant sharing capabilities, making it easy to share recordings with others quickly. This combination of features makes Clipy a valuable tool for professionals seeking an efficient and user-friendly screen recording solution.`
const preparedContext = `Learn about website ${websiteName} url: ${url} ${webappContext}`

export function createInitialPrompt(params: PromptParams): string {
  return `
    ${preparedContext}
    Generate a blog article in clean HTML format compatible with TipTap editor.
    
    Use only these HTML elements:
    - <h1>, <h2>, <h3> for headings
    - <p> for paragraphs
    - <ul>, <ol>, <li> for lists
    - <blockquote> for quotes
    - <img> for images
    - <strong>, <em> for text formatting
    
    Do not include:
    - <!DOCTYPE>, <html>, <head>, or <body> tags
    - Div containers or spans
    - Custom classes or styles
    
    Requirements:
    - Title: ${params.title}
    - SEO Keywords: ${params.seoKeywords.join(", ")}
    - Word Count: 2000-4000 words
    
    Content Structure:
    - Create SEO-optimized headings
    - Include these sections: ${params.generateSections.length > 0 ? params.generateSections.join(", ") : "Introduction, Main Content"}
    - Skip these sections: ${params.ignoreSections.join(", ")}
    
    Important:
    - Make the content comprehensive and detailed
    - Aim for the higher end of the word count range
    
    ${params.customPrompt ? `Special Instructions: ${params.customPrompt}` : ""}
    
    Return only the clean HTML content.
  `;
}

export function createContinuationPrompt(params: PromptParams & {
  previousContent: string;
}): string {
  return `
    ${preparedContext}
    Continue the following blog article in clean HTML format compatible with TipTap editor.
    
    Use only these HTML elements:
    - <h1>, <h2>, <h3> for headings
    - <p> for paragraphs
    - <ul>, <ol>, <li> for lists
    - <blockquote> for quotes
    - <img> for images
    - <strong>, <em> for text formatting
    
    Do not include:
    - <!DOCTYPE>, <html>, <head>, or <body> tags
    - Div containers or spans
    - Custom classes or styles
    
    Context:
    - Title: ${params.title}
    - SEO Keywords: ${params.seoKeywords.join(", ")}
    - Previous content: ${params.previousContent}
    
    Content Structure:
    - Continue naturally from the previous content
    - Maintain consistent heading hierarchy
    - Include these sections if not covered: ${params.generateSections.length > 0 ? params.generateSections.join(", ") : "continue with relevant sections"}
    - Skip these sections: ${params.ignoreSections.join(", ")}
    
    Important:
    - Make the content comprehensive and detailed
    - Aim for 1000-2000 additional words
    - Maintain consistent tone and style with previous content
    - Ensure smooth transition from previous content
    - Use SEO keywords naturally throughout the text
    
    ${params.customPrompt ? `Special Instructions: ${params.customPrompt}` : ""}
    
    Return only the clean HTML content without any markdown or code blocks.
    Do not repeat content that was already covered.
  `;
}

interface RegenerationPromptParams {
  preceding: string;
  selected: string;
  succeeding: string;
  additionalPrompt: string;
}

export function createRegenerationPrompt(params: RegenerationPromptParams): string {
  return `
    ${preparedContext}
    I have a blog post section that needs to be rewritten.
    
    Context before the section:
    ${params.preceding}
    
    Section to rewrite:
    ${params.selected}
    
    Context after the section:
    ${params.succeeding}
    
    Additional instructions:
    ${params.additionalPrompt}
    
    Please rewrite the section while maintaining consistency with the surrounding context.
    Return only the rewritten section, without any additional formatting or explanations.
  `;
}