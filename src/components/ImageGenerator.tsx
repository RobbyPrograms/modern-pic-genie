import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RunwareService } from '@/lib/runware';

interface ImageGeneratorProps {
  apiKey: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ apiKey }) => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState('1024');
  const [height, setHeight] = useState('1024');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const runwareService = new RunwareService(apiKey);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await runwareService.generateImage({
        positivePrompt: prompt,
        width: parseInt(width),
        height: parseInt(height),
      });
      setGeneratedImage(result.imageURL);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image saved successfully!');
    } catch (error) {
      toast.error('Failed to save image');
      console.error('Save error:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Enter your prompt</Label>
          <Input
            id="prompt"
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="64"
              max="2048"
              step="64"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="64"
              max="2048"
              step="64"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {generatedImage ? (
          <div className="relative rounded-lg overflow-hidden bg-muted aspect-square w-full">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-muted aspect-square w-full flex items-center justify-center">
            <p className="text-muted-foreground">
              Your generated image will appear here
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={handleGenerate}
            className="flex-1"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
          {generatedImage && (
            <Button
              onClick={handleSave}
              variant="secondary"
              className="flex-1"
            >
              Save Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;