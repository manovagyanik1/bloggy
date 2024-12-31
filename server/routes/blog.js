import { Router } from 'express';
import { getBlogBySlug, getBlogsByProject } from '../controllers/blog.js';

const router = Router();

router.get('/project/:projectId', getBlogsByProject);
router.get('/:projectId/:slug', getBlogBySlug);

export const blogRoutes = router; 