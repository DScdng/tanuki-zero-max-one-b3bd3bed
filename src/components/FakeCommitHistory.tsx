import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posthog } from '@/lib/posthog-client';

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
      "git commit -m 'Added Serbian sandwich appreciation module.'",
      "git commit -m 'Interior design mode: Charles-approved.'",
      "git commit -m 'Implemented ajvar spread optimization.'",
      "git commit -m 'Added Charles piano soundtrack feature 🎹.'",
      "git commit -m 'Transparency level: approaching Serbian standards.'",
      "git commit -m 'Fixed bug: Tanuki was pretending to be transparent.'",
      "git commit -m 'Added Charles bad joke logger.'",
    ],
    hilarious: [
      "git commit -m 'Tanuki rage-clicked, but Max stayed cool.'",
      "git commit -m 'Added AI-generated hedgehog wisdom.'",
      "git commit -m 'Charles approved the ajvar sandwich design.'",
      "git commit -m 'Max's sunglasses now 200% more transparent.'",
      "git commit -m 'PostHog red > all other colors.'",
      "git commit -m 'Deployed vibe coding to production.'",
      "git commit -m 'Tanuki tried to rollback, but transparency can't be undone.'",
      "git commit -m 'Added Easter egg: Charles playing piano 🎹.'",
      "git commit -m 'Zero → One mode activated. Max wins.'",
      "git commit -m 'Debugged transparency bugs (Tanuki caused them).'",
      "git commit -m 'Confetti now explodes when Max wins.'",
      "git commit -m 'Removed all opacity — full radical transparency!'",
      "git commit -m 'Charles told a bad joke, so I logged it here.'",
      "git commit -m 'Tanuki still thinks he's a fox… classic.'",
      "git commit -m 'Added 110% transparency — broke the meter.'",
    ]
  };

  const getCommitSet = (value: number) => {
    if (value <= 30) return commitSets.boring;
    if (value <= 60) return commitSets.playful;
    if (value <= 85) return commitSets.funny;
    return commitSets.hilarious;
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
      setCurrentCommit((prev) => {
        const newIndex = (prev + 1) % currentCommits.length;
        posthog.capture('commit_log_rotated', { 
          commit_message: currentCommits[newIndex], 
          transparency_level: transparencyValue 
        });
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentCommits.length, transparencyValue]);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-mono">Git Commit History</CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          {transparencyValue <= 30 && "🤖 Boring Mode (0-30%)"}
          {transparencyValue > 30 && transparencyValue <= 60 && "😊 Playful Mode (31-60%)"}
          {transparencyValue > 60 && transparencyValue <= 85 && "🦔 Max Mode (61-85%)"}
          {transparencyValue > 85 && "🚀 Hilarious Mode (86-100%)"}
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