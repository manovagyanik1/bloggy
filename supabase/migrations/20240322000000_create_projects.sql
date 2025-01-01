-- Cleanup
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TABLE IF EXISTS projects CASCADE;

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  theme JSONB NOT NULL DEFAULT '{
    "name": "default",
    "colors": {
      "primary": "#4F46E5",
      "secondary": "#6B7280",
      "background": "#FFFFFF",
      "text": "#111827"
    },
    "fonts": {
      "heading": "Inter",
      "subheading": "Inter",
      "body": "Inter",
      "caption": "Inter"
    },
    "layout": {
      "container": "max-w-4xl",
      "sectionSpacing": "space-y-8",
      "imageSpacing": "space-y-4"
    }
  }',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own projects" ON projects
  FOR SELECT USING (
    user_id = auth.uid()
  );

CREATE POLICY "Users can create their own projects" ON projects
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
  );

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (
    user_id = auth.uid()
  );

CREATE POLICY "Users can delete their own projects" ON projects
  FOR DELETE USING (
    user_id = auth.uid()
  );

-- Add indexes
CREATE INDEX projects_user_id_idx ON projects(user_id);
CREATE INDEX projects_created_at_idx ON projects(created_at);
CREATE UNIQUE INDEX projects_slug_idx ON projects(slug);

-- Add trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 