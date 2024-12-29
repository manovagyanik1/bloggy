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
  };
  layout: {
    container: string;
    sectionSpacing: string;
    imageSpacing: string;
  };
}