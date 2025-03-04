import React from 'react';
import {
  componentTypes,
  createFileRoute,
  Outlet,
  redirect,
  Link,
} from '@tanstack/react-router';

import { useAuth } from '../../../auth';
import { Button } from '@/components/ui/button';

const authGuard = ({ context }) => {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: '/app/login',
      search: {
        redirect: location.href,
      },
    });
  }
};

export const Route = createFileRoute('/app/user')({
  component: RouteComponent,
  beforeLoad: authGuard,
});

function RouteComponent() {
  return (
    <div className="grid">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Button asChild>
              <Link to="/app/user/cards">Cards</Link>
            </Button>
          </li>
          <li>
            {' '}
            <Button asChild>
              <Link to="/app/user/cards">Cards</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
      <div>Hi</div>
    </div>
  );
}
