import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VersionsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Version 0 vs Version 1</h1>
        <p className="text-xl text-muted-foreground mb-4">
          This is not just about code. It's about mindset: from hacking HTML like it's 2010 (v0) to building with AI and modern tools (v1).
        </p>
        <div className="flex justify-center gap-8 text-lg">
          <div className="text-muted-foreground">
            <span className="font-semibold">v0</span> – 3 hours, brute force, manual code.
          </div>
          <div className="text-primary">
            <span className="font-semibold">v1</span> – 10 minutes, AI-assisted, beautiful.
          </div>
        </div>
      </section>

      {/* Version Comparison */}
      <section className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Version 0 */}
        <Card className="border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Version Zero</CardTitle>
              <Badge variant="outline">3-hour attempt</Badge>
            </div>
            <p className="text-muted-foreground">My rough, manual approach</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <a 
                href="https://dscdng.github.io/tanuki-zero-max-one/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors mr-2 text-sm"
              >
                View Live v0
              </a>
              <a 
                href="https://github.com/DScdng/tanuki-zero-max-one" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors text-sm"
              >
                GitHub Repo
              </a>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-semibold mb-2">The Struggle:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Hand-coded HTML/CSS from scratch</li>
                <li>• Vanilla JavaScript event listeners</li>
                <li>• Manual responsive design debugging</li>
                <li>• Color palette picked by trial and error</li>
                <li>• No component reusability</li>
              </ul>
            </div>
            
            <div className="bg-secondary p-4 rounded-md">
              <h4 className="font-semibold mb-2">The Result:</h4>
              <p className="text-sm text-muted-foreground">
                Functional but clunky. Like GitLab's transparency - it works, 
                but there are better ways to do it.
              </p>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-md">
              <p className="text-sm italic text-muted-foreground">
                "This looks like a 2010 website and I'm not sure why the buttons don't work on mobile." 
                - Future me, probably
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Version 1 */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-primary">Version One</CardTitle>
              <Badge className="bg-primary">AI-assisted via Cursor</Badge>
            </div>
            <p className="text-muted-foreground">The PostHog way: smart tools, better results</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-md">
              <h4 className="font-semibold mb-2 text-primary">The Power-Up:</h4>
              <ul className="text-sm space-y-1">
                <li>• React + TypeScript for type safety</li>
                <li>• Tailwind CSS with design system</li>
                <li>• Shadcn/ui components for consistency</li>
                <li>• AI-assisted development with Cursor</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>
            
            <div className="bg-secondary p-4 rounded-md">
              <h4 className="font-semibold mb-2">The Result:</h4>
              <p className="text-sm">
                <strong>Clean, maintainable, and scalable.</strong> Like PostHog's approach to everything - 
                transparent about using the best tools available.
              </p>
            </div>

            <div className="text-center p-4 bg-primary/5 rounded-md border border-primary/20">
              <p className="text-sm italic text-primary">
                "This actually looks professional and the transparency meter works on every device!" 
                - Current me, very pleased
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* The Lesson */}
      <section className="max-w-3xl mx-auto text-center">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">The 0→1 Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              Version 0 was about proving I <em>could</em> build it. 
              Version 1 is about proving I <em>should</em> build it, and build it right.
            </p>
            <p className="text-muted-foreground mt-4">
              Just like how PostHog doesn't reinvent every wheel - they use the best tools 
              and are transparent about it. That's the real competitive advantage.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default VersionsPage;