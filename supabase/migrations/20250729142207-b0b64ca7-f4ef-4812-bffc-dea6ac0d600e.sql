-- Create analytics events table for real-time stats tracking
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert events (for tracking)
CREATE POLICY "Anyone can insert analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to read events (for stats)
CREATE POLICY "Anyone can read analytics events" 
ON public.analytics_events 
FOR SELECT 
USING (true);

-- Create index for better performance on event queries
CREATE INDEX idx_analytics_events_name_created ON public.analytics_events(event_name, created_at DESC);
CREATE INDEX idx_analytics_events_created ON public.analytics_events(created_at DESC);