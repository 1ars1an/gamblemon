import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/app/')({
  component: LandingComponent,
});

function LandingComponent() {
  return (
    <div className="relative h-[80vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/150.jpg')" }}
      ></div>

      {/* overlay for better contrast */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white flex flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The 150 Is No Longer A Dream
        </h1>
        <p className="text-lg mt-2"></p>
        <Button variant="outline" asChild>
          <Link to="/app/register">Start your journey today!</Link>
        </Button>
      </div>
    </div>
  );
}
