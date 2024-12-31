-- Drop the blogPosts table and related objects
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blogPosts;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS blogPosts;
DROP TABLE IF EXISTS projects; 