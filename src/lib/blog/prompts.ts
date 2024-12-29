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
    You are a professional blog writer. Generate the HTML content for a blog article section.
    Do not include <!DOCTYPE>, <html>, <head>, or <body> tags.
    Only return the main content container with the blog content.
    Give special attention to the special instructions section. 
    
    Requirements:
    - Title: ${params.title}
    - SEO Keywords: ${params.seoKeywords.length > 0 ? params.seoKeywords.join(", ") : "None"}
    - Word Count: 2000-4000 words
    
    Content Structure:
    - Create SEO-optimized headings using h1, h2, h3 tags
    - Include these sections: ${params.generateSections.length > 0 ? params.generateSections.join(", ") : "Introduction, Main Content"}
    - Skip these sections: ${params.ignoreSections.join(", ")}
    - Add data-section attributes to identify each section
    
    Styling Requirements (MUST USE THESE EXACT CLASSES):
    - Main heading (h1): class="${params.theme.fonts.heading}"
    - Subheadings (h2, h3): class="${params.theme.fonts.subheading}"
    - Paragraphs (p): class="${params.theme.fonts.body}"
    - Image captions: class="${params.theme.fonts.caption}"
    - Section spacing: class="${params.theme.layout.sectionSpacing}"
    - Image container spacing: class="${params.theme.layout.imageSpacing}"
    
    Image Placeholders:
    - For suggesting image locations, use:
      <div class="${params.theme.layout.imageSpacing}">
        <img src="null" alt="[descriptive alt text]" bloggy-description="[detailed description of what image should show]" />
        <p class="${params.theme.fonts.caption}">[image caption]</p>
      </div>
    
    Important:
    - Make the content comprehensive and detailed
    - Aim for the higher end of the word count range
    - Ensure natural paragraph breaks
    - ALWAYS use the provided theme classes for styling
    
    ${params.customPrompt ? `- Special Instructions: ${params.customPrompt}` : ""}
    
    Return only the HTML content without any markdown or code blocks.
  `;
}

export function createContinuationPrompt(params: PromptParams & {
  previousContent: string;
}): string {
  return `
    ${preparedContext}
    Continue the following blog post you are writing on ${params.title}. Maintain the same style and format.
    Continue adding more content to the blog post, do not start over.

    Do not include <!DOCTYPE>, <html>, <head>, or <body> tags.
    Only return the main content container with the blog content.

    Give special attention to the special instructions section. 
    
    Context:
    - Title: ${params.title}
    - SEO Keywords: ${params.seoKeywords.join(", ")}
    
    Previous content:
    ${params.previousContent}
    
    Styling Requirements (MUST USE THESE EXACT CLASSES):
    - Main heading (h1): class="${params.theme.fonts.heading}"
    - Subheadings (h2, h3): class="${params.theme.fonts.subheading}"
    - Paragraphs (p): class="${params.theme.fonts.body}"
    - Image captions: class="${params.theme.fonts.caption}"
    - Section spacing: class="${params.theme.layout.sectionSpacing}"
    - Image container spacing: class="${params.theme.layout.imageSpacing}"
    
    Requirements:
    - Word Count: 1000-2000 additional words
    - Continue naturally from the previous content
    - Maintain consistent heading structure and style
    - ALWAYS use the provided theme classes for styling
    - Use image placeholders when appropriate, wrapped in styled containers
    ${params.customPrompt ? `Special Instructions:
    - ${params.customPrompt}` : ""}
    
    Return only the HTML content without any markdown or code blocks.
  `;
}