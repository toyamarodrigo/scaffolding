// View - Dumb component for pure UI presentation
// Receives props from HomeContainer

import { Button } from "@/shared/components/ui/button";

export function HomeView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Microfrontend Template
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-lg text-center text-muted-foreground">
          This is a demonstration of our Container/View architecture.
          Business logic goes in containers/, UI presentation goes in views/.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🎯</Button>
        </div>
      </div>
    </div>
  );
}
