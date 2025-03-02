/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as AboutImport } from './routes/about';
import { Route as AppRouteImport } from './routes/app/route';
import { Route as IndexImport } from './routes/index';
import { Route as AppRegisterImport } from './routes/app/register';
import { Route as AppLoginImport } from './routes/app/login';

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any);

const AppRouteRoute = AppRouteImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AppRegisterRoute = AppRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AppRouteRoute,
} as any);

const AppLoginRoute = AppLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AppRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/app': {
      id: '/app';
      path: '/app';
      fullPath: '/app';
      preLoaderRoute: typeof AppRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/about': {
      id: '/about';
      path: '/about';
      fullPath: '/about';
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    '/app/login': {
      id: '/app/login';
      path: '/login';
      fullPath: '/app/login';
      preLoaderRoute: typeof AppLoginImport;
      parentRoute: typeof AppRouteImport;
    };
    '/app/register': {
      id: '/app/register';
      path: '/register';
      fullPath: '/app/register';
      preLoaderRoute: typeof AppRegisterImport;
      parentRoute: typeof AppRouteImport;
    };
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppLoginRoute: typeof AppLoginRoute;
  AppRegisterRoute: typeof AppRegisterRoute;
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppLoginRoute: AppLoginRoute,
  AppRegisterRoute: AppRegisterRoute,
};

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren
);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/app': typeof AppRouteRouteWithChildren;
  '/about': typeof AboutRoute;
  '/app/login': typeof AppLoginRoute;
  '/app/register': typeof AppRegisterRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/app': typeof AppRouteRouteWithChildren;
  '/about': typeof AboutRoute;
  '/app/login': typeof AppLoginRoute;
  '/app/register': typeof AppRegisterRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/app': typeof AppRouteRouteWithChildren;
  '/about': typeof AboutRoute;
  '/app/login': typeof AppLoginRoute;
  '/app/register': typeof AppRegisterRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/app' | '/about' | '/app/login' | '/app/register';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/app' | '/about' | '/app/login' | '/app/register';
  id:
    | '__root__'
    | '/'
    | '/app'
    | '/about'
    | '/app/login'
    | '/app/register';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AppRouteRoute: typeof AppRouteRouteWithChildren;
  AboutRoute: typeof AboutRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AboutRoute: AboutRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/app",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/app": {
      "filePath": "app/route.tsx",
      "children": [
        "/app/login",
        "/app/register"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/app/login": {
      "filePath": "app/login.tsx",
      "parent": "/app"
    },
    "/app/register": {
      "filePath": "app/register.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
