-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  notifications BOOLEAN DEFAULT true,
  darkMode BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'pt',
  currency TEXT DEFAULT 'EUR',
  timezone TEXT DEFAULT 'Europe/Lisbon',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (user_id)
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at(); 