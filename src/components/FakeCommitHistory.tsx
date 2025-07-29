import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FakeCommitHistory = () => {
  const commits = [
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
  ];

  const [currentCommit, setCurrentCommit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommit((prev) => (prev + 1) % commits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [commits.length]);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-mono">Git Commit History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary p-4 rounded-md font-mono text-sm">
          <div className="text-muted-foreground mb-2">Latest commits:</div>
          <div className="space-y-2">
            {commits.slice(currentCommit, currentCommit + 3).map((commit, index) => (
              <div key={index} className={`transition-all duration-500 ${index === 0 ? 'text-primary font-semibold' : 'text-foreground'}`}>
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