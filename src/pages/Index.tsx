import ImageGenerator from "@/components/ImageGenerator";

export default function Index() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-8">AI Image Generator</h1>
        <ImageGenerator />
      </div>
    </main>
  );
}