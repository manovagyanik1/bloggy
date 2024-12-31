import { Router } from 'express';
import { getBlogById, getBlogsByProject } from '../controllers/blog.js';

const router = Router();

router.get('/project/:project_id', getBlogsByProject);
router.get('/:id', getBlogById);

export const blogRoutes = router; 