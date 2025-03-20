import React from 'react';
import {
  componentTypes,
  createFileRoute,
  Outlet,
  redirect,
  Link,
} from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const authGuard = ({ context }) => {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: '/app/login',
      search: `redirect=${encodeURIComponent(location.pathname + location.search)}`,
    });
  }
};

//encodeURIComponent(location.pathname + location.search) avoids breaking the URL,
// location.href is unnecessary as it gives fullBB URL
// string interpolation since tanstack router expects a string

export const Route = createFileRoute('/app/user')({
  component: RouteComponent,
  beforeLoad: authGuard,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <nav className="">
        <ul className="flex gap-4 justify-center">
          <li>
            <Button asChild>
              <Link to="/app/user/profile">Profile</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="/app/user/cards">Cards</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="/app/user/profile">Battle</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
