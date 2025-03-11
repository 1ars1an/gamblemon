import React from 'react';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/user/$cardId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/user/$cardId"!</div>;
}
