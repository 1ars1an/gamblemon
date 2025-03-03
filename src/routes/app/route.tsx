import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';

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
                <Link to="/app/login">Login</Link>
              </li>
              <li>
                <Link to="/app/register">Logout</Link>
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
