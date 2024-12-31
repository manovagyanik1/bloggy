-- Add slug column to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN slug TEXT NOT NULL DEFAULT '/';

-- Update existing blog posts to use seo_metadata.slug
UPDATE blog_posts
SET slug = COALESCE(
  (seo_metadata->>'slug')::TEXT,
  '/'
);

-- Create index for slug lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Add unique constraint for slug within a project
ALTER TABLE blog_posts
ADD CONSTRAINT unique_slug_per_project UNIQUE (project_id, slug);

-- Add comment
COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly version of the blog post title';

-- Rollback SQL:
-- ALTER TABLE blog_posts DROP CONSTRAINT unique_slug_per_project;
-- DROP INDEX idx_blog_posts_slug;
-- ALTER TABLE blog_posts DROP COLUMN slug; 