const isProd = import.meta.env.PROD;

export const API_CONFIG = {
  BASE_URL: isProd ? '/api' : 'http://localhost:3000/api',
  ENDPOINTS: {
    BLOGS: {
      LIST: (projectId: string) => `/blog/project/${projectId}`,
      GET: (projectId: string, slug: string) => `/blog/${projectId}/${slug}`,
    }
  }
} as const;

export const PROJECT = {
  id: '4fc7eb1b-edbb-4a2f-b406-c53264e9f5fd',
  name: 'clipy',
  slug: 'clipy'
} as const;

export const getApiUrl = (path: string) => {
  return `${API_CONFIG.BASE_URL}${path}`;
};

// Update API_ROUTES to use the new configuration
export const API_ROUTES = {
  GET_PROJECT_BLOGS: (projectId: string) => 
    getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST(projectId)),
  GET_BLOG_BY_SLUG: (projectId: string, slug: string) => 
    getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.GET(projectId, slug))
} as const; 