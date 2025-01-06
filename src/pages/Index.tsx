import { useState } from 'react';
import ImageGenerator from '@/components/ImageGenerator';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      setIsKeySet(true);
    }
  };

  if (!isKeySet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-secondary">AI Image Generator</h1>
            <p className="text-muted-foreground">
              Please enter your Runware API key to continue. You can get one at{' '}
              <a 
                href="https://runware.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                runware.ai
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Runware API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <Button onClick={handleSetApiKey} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
          AI Image Generator
        </h1>
        <ImageGenerator apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Index;