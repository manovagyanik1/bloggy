import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { blogRoutes } from './routes/blog.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blog', blogRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 