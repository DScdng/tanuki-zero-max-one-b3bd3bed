import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { posthog } from '@/lib/posthog-client';
import { toast } from 'sonner';

interface PostHogSurveyProps {
  surveyId?: string;
  title?: string;
  description?: string;
}

const PostHogSurvey = ({ 
  surveyId = 'charles-feedback-survey',
  title = "Charles' Official Grade Station",
  description = "This is the official place to grade my transparency showdown! (Don't worry, it's powered by PostHog.)"
}: PostHogSurveyProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textFeedback, setTextFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);

  useEffect(() => {
    // Track survey impression
    posthog.capture('survey_viewed', {
      survey_id: surveyId,
      survey_type: 'charles_feedback',
      page: 'disclaimer'
    });
  }, [surveyId]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === 'feedback') {
      setShowTextInput(true);
    } else {
      setShowTextInput(false);
      // Don't auto-submit, wait for confirmation
    }
  };

  const submitSurvey = (response: string, text?: string) => {
    // Submit to PostHog
    posthog.capture('survey_response', {
      survey_id: surveyId,
      survey_type: 'charles_feedback',
      response: response,
      text_feedback: text || null,
      page: 'disclaimer',
      timestamp: new Date().toISOString()
    });

    // Track specific response types
    if (response === 'passed') {
      posthog.capture('charles_grade_survey', {
        grade: 'passed',
        method: 'posthog_survey'
      });
    } else if (response === 'not_yet') {
      posthog.capture('charles_grade_survey', {
        grade: 'not_yet',
        method: 'posthog_survey'
      });
    }

    setIsSubmitted(true);
    toast.success(getSuccessMessage(response));
  };

  const handleTextSubmit = () => {
    if (textFeedback.trim()) {
      submitSurvey('feedback', textFeedback);
    }
  };

  const getSuccessMessage = (response: string) => {
    switch (response) {
      case 'passed':
        return "🎉 Thanks Charles! Max is doing the hedgehog victory dance!";
      case 'not_yet':
        return "📚 Thanks for the feedback! Max will study harder for round 2.";
      case 'feedback':
        return "💬 Thanks for the detailed feedback! PostHog captured it perfectly.";
      default:
        return "✅ Response submitted via PostHog!";
    }
  };

  const resetSurvey = () => {
    setSelectedOption(null);
    setTextFeedback('');
    setIsSubmitted(false);
    setShowTextInput(false);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🦔</div>
          <h3 className="text-xl font-bold text-primary mb-2">
            Survey Completed!
          </h3>
          <p className="text-muted-foreground">
            Your response has been captured by PostHog and is now part of my analytics dashboard.
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            See? I really do know how to use PostHog features! 😉
          </p>
          <Button 
            onClick={resetSurvey}
            variant="outline"
            className="mt-4"
          >
            Submit Another Response
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-[#F54E00]/5 to-[#1D4AFF]/5 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-primary">
          {title}
        </CardTitle>
        <p className="text-muted-foreground">
          {description}
        </p>
        <div className="text-xs text-muted-foreground opacity-75 mt-2">
          Powered by PostHog Surveys 📊
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showTextInput && !selectedOption ? (
          <div className="grid gap-3">
            <Button
              onClick={() => handleOptionSelect('passed')}
              size="lg"
              className="text-lg py-6 bg-green-600 hover:bg-green-700 text-white"
            >
              👍 "You passed this round!"
            </Button>
            
            <Button
              onClick={() => handleOptionSelect('not_yet')}
              size="lg"
              variant="destructive"
              className="text-lg py-6"
            >
              👎 "Not yet, Max needs work."
            </Button>
            
            <Button
              onClick={() => handleOptionSelect('feedback')}
              size="lg"
              variant="outline"
              className="text-lg py-6 border-primary/30 hover:bg-primary/10"
            >
              💬 "I want to leave detailed feedback"
            </Button>
          </div>
        ) : !showTextInput && selectedOption ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <p className="text-lg font-medium">
                You selected: {selectedOption === 'passed' ? '👍 "You passed this round!"' : '👎 "Not yet, Max needs work."'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Confirm your response or change your mind.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => submitSurvey(selectedOption)}
                size="lg"
                className="flex-1"
              >
                Confirm & Submit
              </Button>
              <Button
                onClick={() => setSelectedOption(null)}
                variant="outline"
                size="lg"
              >
                Change Response
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Share your detailed thoughts:
              </label>
              <Textarea
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="Tell me what you really think about this transparency showdown..."
                className="mt-2 min-h-32"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleTextSubmit}
                disabled={!textFeedback.trim()}
                className="flex-1"
              >
                Submit Feedback
              </Button>
              <Button
                onClick={() => {
                  setShowTextInput(false);
                  setSelectedOption(null);
                }}
                variant="outline"
              >
                Back to Options
              </Button>
            </div>
          </div>
        )}

        <div className="text-center pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            All responses are captured and stored in PostHog, where I can analyze them alongside all other user interactions on this site.
          </p>
          <p className="text-xs text-primary/80 mt-1 font-medium">
            This is how I demonstrate real PostHog integration skills! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostHogSurvey;