import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  console.log(isAuthenticated);

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
              {isAuthenticated && (
                <li>
                  <Button
                    onClick={() => {
                      logout();
                      navigate({ to: '/app' });
                    }}
                  >
                    Logout
                  </Button>
                </li>
              )}
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
