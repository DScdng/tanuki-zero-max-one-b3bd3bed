import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FakeCommitHistoryProps {
  transparencyValue: number;
}

const FakeCommitHistory = ({ transparencyValue }: FakeCommitHistoryProps) => {
  const commitSets = {
    boring: [
      "git commit -m 'Updated index.html'",
      "git commit -m 'Changed background color'",
      "git commit -m 'Fixed minor bug'",
      "git commit -m 'Pushed version 0.1'",
      "git commit -m 'Added new styles'",
      "git commit -m 'Updated dependencies'",
      "git commit -m 'Removed unused code'",
      "git commit -m 'Modified config file'",
    ],
    playful: [
      "git commit -m 'Max is getting ready for transparency battle.'",
      "git commit -m 'Added cool sunglasses to Max.'",
      "git commit -m 'Tanuki looking nervous now.'",
      "git commit -m 'Improved transparency meter logic.'",
      "git commit -m 'Max flexing his hedgehog powers.'",
      "git commit -m 'Tanuki called for backup... denied.'",
      "git commit -m 'Added some PostHog magic.'",
      "git commit -m 'Transparency levels rising...'",
    ],
    funny: [
      "git commit -m 'Added Max's shades of transparency.'",
      "git commit -m 'Tanuki tried to merge... but Max won.'",
      "git commit -m 'Charles inspired me to read my first book in years.'",
      "git commit -m 'PostHog red is the new black.'",
      "git commit -m 'Zero to One: From Tanuki to Hedgehog.'",
      "git commit -m 'Transparency level: over 9000!'",
      "git commit -m 'Fixed bug: Tanuki was showing transparency.'",
      "git commit -m 'Added Serbian sandwich appreciation module.'",
      "git commit -m 'Interior design mode: Charles-approved.'",
      "git commit -m 'HogFlix > Netflix confirmed.'",
      "git commit -m 'Vibe coding achieved 0→1.'",
      "git commit -m 'Max is sunbathing, waiting for Superday.'",
    ]
  };

  const getCommitSet = (value: number) => {
    if (value <= 40) return commitSets.boring;
    if (value <= 70) return commitSets.playful;
    return commitSets.funny;
  };

  const [currentCommits, setCurrentCommits] = useState(getCommitSet(transparencyValue));
  const [currentCommit, setCurrentCommit] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  // Handle transparency value changes with fade animation
  useEffect(() => {
    const newCommits = getCommitSet(transparencyValue);
    if (newCommits !== currentCommits) {
      setCurrentCommits(newCommits);
      setCurrentCommit(0);
      setFadeKey(prev => prev + 1); // Force re-render with new key
    }
  }, [transparencyValue, currentCommits]);

  // Rotate commits every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommit((prev) => (prev + 1) % currentCommits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentCommits.length]);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-mono">Git Commit History</CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          {transparencyValue <= 40 && "🤖 Boring Mode (0-40%)"}
          {transparencyValue > 40 && transparencyValue <= 70 && "😊 Playful Mode (41-70%)"}
          {transparencyValue > 70 && "🦔 Max Mode (71-100%)"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary p-4 rounded-md font-mono text-sm">
          <div className="text-muted-foreground mb-2">Latest commits:</div>
          <div key={fadeKey} className="space-y-2 animate-fade-in">
            {currentCommits.slice(currentCommit, currentCommit + 3).map((commit, index) => (
              <div key={`${currentCommit}-${index}`} className={`transition-all duration-500 ${index === 0 ? 'text-primary font-semibold' : 'text-foreground'}`}>
                {commit}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Rotating every 3 seconds...
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FakeCommitHistory;