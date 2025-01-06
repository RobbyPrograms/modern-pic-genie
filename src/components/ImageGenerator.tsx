import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("512");
  const [height, setHeight] = useState("512");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async () => {
    try {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}`;
      setImageUrl(url);
      toast({
        title: "Image generated successfully!",
        description: "You can now save the image if you'd like.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error generating image",
        description: "Please try again with different parameters.",
      });
    }
  };

  const saveImage = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Image saved successfully!",
        description: "Check your downloads folder.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving image",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Enter your prompt</Label>
          <Input
            id="prompt"
            placeholder="A serene landscape with mountains..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              placeholder="512"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              placeholder="512"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={generateImage}
          disabled={!prompt}
        >
          Generate Image
        </Button>
      </div>

      {imageUrl && (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full h-auto"
            />
          </div>
          <Button 
            className="w-full"
            onClick={saveImage}
            variant="outline"
          >
            Save Image
          </Button>
        </div>
      )}
    </div>
  );
}