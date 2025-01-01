const isProd = import.meta.env.PROD;

export const API_CONFIG = {
  BASE_URL: isProd ? '/api' : 'http://localhost:3000/api',
  ENDPOINTS: {
    BLOGS: {
      LIST: (projectId: string) => `/blog/project/${projectId}`,
      GET: (id: string) => `/blog/${id}`,
    }
  }
} as const;

export const getApiUrl = (path: string) => {
  return `${API_CONFIG.BASE_URL}${path}`;
};

export const API_ROUTES = {
  GET_PROJECT_BLOGS: (projectId: string) => 
    getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST(projectId)),
  GET_BLOG_BY_ID: (id: string) => 
    getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.GET(id))
} as const; 