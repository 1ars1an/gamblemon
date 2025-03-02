import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/basedsn/login"!</div>;
}
