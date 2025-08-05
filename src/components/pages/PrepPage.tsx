import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import hedgehogMeltingMacbook from "@/assets/hedgehog-melting-macbook.webp";

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
            Just finished my final prep for the PostHog superday tomorrow, where I am still not sure what the tasks will be. 
            I cloned the HogFlix demo and connected it to a new project in the PostHog app, and also joined the invitation 
            to a HogFlix organization sent by the PostHog team.
          </p>
          
          <p>
            I believe I'll do a demo with PostHog and the HogFlix demo, but just in case I've made a setup of the local 
            dev environment for PostHog itself which took... ermm... a few hours. My old MacBook Pro is melting down 
            and was loading the app in the browser on its own for 30 minutes haha.
          </p>
          
          <p>
            But here we are! I can follow the PostHog developing locally part of the handbook... so far! 
            Here I'll stop so I can have my MacBook spared for tomorrow's challenges.
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
              src="/lovable-uploads/6d23ff2d-facd-45cc-a7e4-c757243004d7.png" 
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