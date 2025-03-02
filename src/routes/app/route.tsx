import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <nav className="">
        <ul className="flex gap-10">
          <Link to="/app/login">Login</Link>
          <li>
            <Link to="/app/register">Logout</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}
