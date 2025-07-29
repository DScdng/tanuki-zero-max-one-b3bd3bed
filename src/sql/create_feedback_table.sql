-- Create feedback_submissions table
CREATE TABLE IF NOT EXISTS feedback_submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  sandwich_type TEXT NOT NULL,
  feedback TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback
CREATE POLICY "Anyone can insert feedback" ON feedback_submissions
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to read feedback (you can restrict this later)
CREATE POLICY "Anyone can read feedback" ON feedback_submissions
  FOR SELECT 
  USING (true);