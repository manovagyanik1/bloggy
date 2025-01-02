import express from 'express';
import { 
  getBlogsByProject, 
  getBlogById, 
  getBlogBySlug,
  getBlogWithProjectInfoBySlug,
  saveBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  getProjectSitemap
} from '../controllers/blog.js';

const router = express.Router();

// Apply auth middleware to all routes
router.get('/project/:projectId', getBlogsByProject);
router.get('/blog/:id', getBlogById);
router.get('/project/:projectId/sitemap.xml', getProjectSitemap);
router.get('/project/:projectId/slug/:slug', getBlogBySlug);
router.get('/project/:projectId/blog/:slug', getBlogWithProjectInfoBySlug);
router.post('/blog', saveBlogPost);
router.put('/blog/:id', updateBlogPost);
router.delete('/blog/:id', deleteBlogPost);

export const blogRoutes = router; 
export default blogRoutes;