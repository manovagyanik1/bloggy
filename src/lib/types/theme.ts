export interface BlogTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    subheading: string;
    body: string;
    caption: string;
    elements: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      p: string;
      ul: string;
      ol: string;
      li: string;
      blockquote: string;
      table: string;
      th: string;
      td: string;
      pre: string;
      code: string;
      a: string;
      img: string;
      hr: string;
    };
  };
  layout: {
    container: string;
    sectionSpacing: string;
    imageSpacing: string;
  };
}
