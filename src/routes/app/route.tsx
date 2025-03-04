import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <header className="flex p-6">
          <div className="mr-auto">Logo</div>
          <nav aria-label="main navigation">
            <ul className="flex gap-10">
              <li>
                <span className="inline-flex items-center justify-center gap-2 rounded-md border font-medium px-4 py-1.5">
                  <Link to="/app/login">Login</Link>
                </span>
              </li>
              <li>
                <Button>
                  <Link to="/app/register">Logout</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </header>
        <main className="px-6">
          <Outlet />
        </main>
        <footer className="p-6">
          <p>Footer</p>
        </footer>
      </div>
    </>
  );
}
