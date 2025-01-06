import ImageGenerator from "@/components/ImageGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <ThemeToggle />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          Rolly Bot Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-8">
          Create unique images with AI
        </p>
        <ImageGenerator />
      </div>
    </main>
  );
}