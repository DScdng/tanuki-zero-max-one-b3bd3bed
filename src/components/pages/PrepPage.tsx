import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import hedgehogMeltingMacbook from "@/assets/hedgehog-melting-macbook.webp";
import postHogLocalhost from "@/assets/posthog-localhost-clean.png";

const PrepPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Final Prep for PostHog Superday</h1>
        <p className="text-xl text-muted-foreground">Tomorrow's the big day! 🚀</p>
      </div>

      {/* Funny hedgehog image at the top */}
      <div className="flex justify-center">
        <img 
          src={hedgehogMeltingMacbook} 
          alt="PostHog hedgehog spitting fire and melting a MacBook" 
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Superday Preparation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Just wrapped up my final prep for tomorrow's PostHog Superday. I'm still not 100% sure what the task will be, but I'm ready for anything (I think?).
          </p>
          
          <p>
            I've cloned the HogFlix demo, connected it to a fresh project in the PostHog app, and accepted the invite to the official HogFlix org from the PostHog team. That'll likely be the base for the demo, but just in case, I went full nerd mode and set up the full PostHog dev environment locally.
          </p>
          
          <p>
            Let's just say, my ancient MacBook wasn't happy. It spent 30+ minutes trying to load PostHog in the browser like it was preparing for liftoff. But hey, it's running now, and I can officially say I've followed the "Developing PostHog locally" handbook to the letter.
          </p>

          <p>
            Could I have spent more time actually playing with PostHog's features instead of doing all this? Probably. But the challenge was too tempting.
          </p>

          <p>
            Time to give the MacBook some rest before the final boss battle.
          </p>
          
          <p className="font-semibold text-primary">
            Let's do this. See you tomorrow. 🦔
          </p>
        </CardContent>
      </Card>

      {/* PostHog localhost screenshot */}
      <Card>
        <CardHeader>
          <CardTitle>PostHog Running Locally 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <img 
              src={postHogLocalhost} 
              alt="PostHog running locally on localhost:8000" 
              className="max-w-full rounded-lg shadow-lg border"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            PostHog successfully running in DEBUG mode on localhost:8000
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrepPage;