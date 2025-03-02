import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-20">Hello "/basedsn/register"!</div>;
}
