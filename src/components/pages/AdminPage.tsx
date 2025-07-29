import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase, type FeedbackSubmission } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

const AdminPage = ({ onNavigate }: AdminPageProps) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setFeedbackList(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to load feedback submissions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg">Loading feedback submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🦔 Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Feedback submissions from the Transparency Fight Club
          </p>
          <Button 
            onClick={() => onNavigate('home')}
            variant="outline"
            className="mb-8"
          >
            ← Back to Home
          </Button>
        </section>

        {/* Stats */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">
                📊 Submission Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{feedbackList.length}</div>
                  <div className="text-sm text-muted-foreground">Total Submissions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {feedbackList.filter(f => f.name).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Named Submissions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {new Set(feedbackList.map(f => f.sandwich_type.toLowerCase())).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Unique Sandwiches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feedback List */}
        <section>
          <div className="space-y-4">
            {feedbackList.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No feedback submissions yet. 🦔
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share the disclaimer page to start collecting feedback!
                  </p>
                </CardContent>
              </Card>
            ) : (
              feedbackList.map((submission) => (
                <Card key={submission.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {submission.name || 'Anonymous'} 
                          <Badge variant="outline" className="ml-2">
                            {submission.sandwich_type}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(submission.created_at!)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {submission.feedback}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Refresh Button */}
        <section className="text-center">
          <Button 
            onClick={fetchFeedback}
            variant="outline"
            size="lg"
          >
            🔄 Refresh Feedback
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;