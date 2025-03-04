import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: LandingComponent,
});

function LandingComponent() {
  return <div>Hello "/app/"!</div>;
}
