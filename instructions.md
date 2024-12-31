# Product Requirements Document (PRD): Blog Writing Platform

## Product Overview
The platform is a Medium-like blog writing tool that allows users to create, edit, and publish high-quality blog posts. The system integrates with OpenAI/Claude APIs for AI-assisted content generation, enabling users to write or generate content block by block. It also supports multimedia integration, including copy-pasting images directly into the editor.


Use vite with react and tailwindcss, lucid icon, shadcn.
ONLY implement the frontend, openapi and claude api token should be used in the frontend to send requests.

---

## Key Features

### 1. **User Authentication**
- **Login/Signup:** Email, Google, and social media login.
- **Profile Management:** Users can view and edit their profile details (e.g., bio, avatar, links).

#### User Stories:
1. As a user, I want to sign up using my email or Google account so that I can create an account quickly.
2. As a user, I want to log in securely with my credentials so that I can access my account.
3. As a user, I want to edit my profile information so that my blog posts display accurate details about me.

---

### 2. **Blog Creation and Editing**
- **Rich Text Editor:**
  - Support for headings, bold, italic, lists, blockquotes, code blocks, and hyperlinks.
  - Markdown support for advanced users.
- **AI-Assisted Writing:**
  - Users can generate content block-by-block using OpenAI/Claude APIs.
  - Option to input prompts for specific tone or style.
  - Inline editing of generated content.
- **Image Integration:**
  - Users can copy-paste images directly into the editor.
  - Drag-and-drop or upload from the device.
  - Auto-resizing and alt-text support.
- **Block Management:**
  - Add, reorder, or delete content blocks (text, images, code).
  - Option to switch between manual writing and AI generation per block.

#### User Stories:
1. As a user, I want to use a rich text editor with formatting options so that I can style my blog content.
2. As a user, I want to generate content for a specific block using AI so that I can save time while writing.
3. As a user, I want to edit the AI-generated text so that it matches my desired tone and style.
4. As a user, I want to drag and drop images into the editor so that I can enhance my blog visually.
5. As a user, I want to reorder content blocks so that I can organize my post structure.

---

### 3. **Publishing and Drafts**
- **Save Drafts:** Automatic and manual saving of posts.
- **Publish Options:**
  - Public: Visible to everyone.
  - Private: Accessible only via a link.
  - Scheduled Publishing: Set a future date and time for publication.

#### User Stories:
1. As a user, I want to save my blog as a draft so that I can continue editing it later.
2. As a user, I want to publish my blog as public so that it is visible to all readers.
3. As a user, I want to schedule a blog post for future publication so that I can plan my content release.

---

### 4. **SEO Tools**
- Meta title and description input.
- Real-time readability and keyword suggestions.
- AI-powered optimization for search engines.

#### User Stories:
1. As a user, I want to input meta titles and descriptions so that my blog performs better in search engines.
2. As a user, I want to receive keyword suggestions so that I can improve my blog’s visibility.
3. As a user, I want AI to optimize my content for SEO so that it ranks higher in search results.

---

### 5. **Content Organization**
- **Tags and Categories:** Users can tag posts and assign categories.
- **Content Library:**
  - View all drafts, published posts, and archived posts.
  - Search and filter functionality.

#### User Stories:
1. As a user, I want to tag my blog posts so that they are easily discoverable.
2. As a user, I want to view all my drafts and published posts in a content library so that I can manage them effectively.
3. As a user, I want to search and filter my posts so that I can find specific content quickly.

---

### 6. **Multimedia and Embeds**
- **Embed Support:** Integrate YouTube, Twitter, or other third-party embeds.
- **Gallery View:** Users can create image galleries within posts.

#### User Stories:
1. As a user, I want to embed YouTube videos in my blog so that I can provide richer content.
2. As a user, I want to create image galleries so that I can showcase multiple visuals in an organized manner.

---

### 7. **Collaboration Tools**
- Commenting and suggestions for shared drafts.
- Version control with the ability to revert changes.

#### User Stories:
1. As a user, I want others to comment on my draft so that I can get feedback before publishing.
2. As a user, I want to view version history so that I can revert to a previous version if needed.

---

### 8. **Analytics**
- Post analytics: Views, engagement, and read time.
- User dashboard showing overall performance.

#### User Stories:
1. As a user, I want to see how many people have viewed my blog so that I can measure its reach.
2. As a user, I want to view engagement metrics so that I can understand how my audience interacts with my content.

---

## Technology Stack

### Frontend
- **Framework:** React with TypeScript.
- **UI Library:** Tailwind CSS, antd
- **State Management:** Redux Toolkit or Context API.
- **Text Editor:** tiptap


### AI Integration
- **APIs:** OpenAI/Claude API for content generation.
- **Middleware:** Custom middleware to handle API interactions and prompt enhancements.

### Deployment
- **Hosting:** Vercel for deployment.
- **CI/CD:** GitHub Actions.

---

## Non-Functional Requirements

1. **Performance:**
   - API response time for AI content generation must be under 3 seconds.
   - The editor should handle up to 10MB of media uploads without lag.

2. **Scalability:**
   - Backend should support concurrent users with efficient handling of AI requests.
   - Scalable storage for growing multimedia content.

3. **Security:**
   - Ensure secure API interactions with OpenAI/Claude.
   - Implement rate-limiting to prevent abuse of AI generation features.
   - GDPR compliance for user data.

4. **Usability:**
   - The interface should be intuitive, with a minimal learning curve.
   - Provide tooltips and an onboarding guide for new users.

---

#Doc

Examples to generate blog posts:

Code examples:

```async function generateBlogHTML({
  title,
  seoKeywords = [],
  ignoreSections = [],
  generateSections = [],
  apiProvider = "openai", // Options: "openai" or "claude"
  customPrompt = "",
  theme = {
    name: "default",
    colors: {
      primary: "#1a202c",
      secondary: "#2d3748",
      background: "#f7fafc",
      text: "#2d3748",
    },
    fonts: {
      heading: "font-sans text-3xl font-bold",
      subheading: "font-sans text-xl font-semibold",
      body: "font-sans text-base",
      caption: "font-sans text-sm text-gray-500",
    },
    layout: {
      container: "max-w-4xl mx-auto px-4",
      sectionSpacing: "my-8",
      imageSpacing: "my-4",
    },
  },
}) {
  const basePrompt = `
    Generate a detailed blog article with the following requirements:
    - Title: ${title}
    - SEO Keywords: ${seoKeywords.length > 0 ? seoKeywords.join(", ") : "None"}
    - Word Count: 1000-3000 words
    - Super SEO-friendly with optimized headings, subheadings, and semantic HTML structure.
    - Include the following sections: ${generateSections.length > 0 ? generateSections.join(", ") : "Introduction, Body, Conclusion, FAQ, Table"}
    - Do not include these sections: ${ignoreSections.length > 0 ? ignoreSections.join(", ") : "None"}
    - Every section should have a unique meta tag attribute (e.g., bloggy-id="section-name").
    - Add placeholders for images where relevant.
    - Follow this theme structure:
      Theme Name: ${theme.name}
      Colors: ${JSON.stringify(theme.colors)}
      Fonts: ${JSON.stringify(theme.fonts)}
      Layout: ${JSON.stringify(theme.layout)}
    ${customPrompt ? `- Additional Instructions: ${customPrompt}` : ""}
  `;

  const response = await callAPI(apiProvider, basePrompt);
  const htmlContent = responseToHTML(response);

  return htmlContent;

  // Helper Function: API Call
  async function callAPI(provider, prompt) {
    const url =
      provider === "openai"
        ? "https://api.openai.com/v1/completions"
        : "https://api.anthropic.com/v1/claude";

    const apiKey = provider === "openai" ? "YOUR_OPENAI_API_KEY" : "YOUR_CLAUDE_API_KEY";

    const requestBody =
      provider === "openai"
        ? {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 3000,
            temperature: 0.7,
          }
        : {
            model: "claude-v1",
            prompt: prompt,
            max_tokens: 3000,
            temperature: 0.7,
          };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    return result.choices ? result.choices[0].text : result.completion;
  }

  // Helper Function: Convert Response to HTML
  function responseToHTML(content) {
    const sections = content.split("\n\n").map((section, index) => {
      const id = `section-${index}`;
      return `
        <div bloggy-id="${id}" class="${theme.layout.sectionSpacing}">
          ${section}
        </div>
      `;
    });

    return `
      <div class="${theme.layout.container}" style="background-color: ${theme.colors.background}; color: ${theme.colors.text}">
        ${sections.join("\n")}
      </div>
    `;
  }
}

```

