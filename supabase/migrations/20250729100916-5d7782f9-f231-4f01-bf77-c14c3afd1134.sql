-- Add missing columns to charlse's feedback table
ALTER TABLE "charlse's feedback" 
ADD COLUMN name TEXT,
ADD COLUMN sandwich_type TEXT NOT NULL DEFAULT '',
ADD COLUMN feedback TEXT NOT NULL DEFAULT '';

-- Enable Row Level Security if not already enabled
ALTER TABLE "charlse's feedback" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback
CREATE POLICY "Anyone can insert feedback" ON "charlse's feedback"
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to read feedback
CREATE POLICY "Anyone can read feedback" ON "charlse's feedback"
  FOR SELECT 
  USING (true);