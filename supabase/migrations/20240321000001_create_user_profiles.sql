-- Cleanup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP TABLE IF EXISTS user_profiles;

-- Create updated_at function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  website TEXT,
  company TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE LOG 'TRIGGER DEBUG - START ---------------';
  RAISE LOG 'User ID: %', NEW.id;
  RAISE LOG 'Email: %', NEW.email;
  RAISE LOG 'Raw Metadata: %', NEW.raw_user_meta_data;
  
  BEGIN
    INSERT INTO user_profiles (
      id,
      full_name,
      avatar_url,
      email,
      bio
    )
    VALUES (
      NEW.id,
      COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        'Anonymous User'
      ),
      COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
      ),
      NEW.email,
      'Welcome to Bloggy!'
    );
    
    RAISE LOG 'TRIGGER DEBUG - Profile created successfully';
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'TRIGGER DEBUG - ERROR: %', SQLERRM;
    RAISE LOG 'TRIGGER DEBUG - DETAIL: %', SQLSTATE;
  END;
  
  RAISE LOG 'TRIGGER DEBUG - END -----------------';
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create updated_at trigger
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add indexes
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

-- Insert profiles for existing users
INSERT INTO user_profiles (id, full_name, avatar_url, email, bio)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'Anonymous User'),
  COALESCE(raw_user_meta_data->>'avatar_url', raw_user_meta_data->>'picture'),
  email,
  'Welcome to Bloggy!'
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM user_profiles p WHERE p.id = u.id
); 