import React from 'react';
import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import axios, { AxiosInstance } from 'axios';
import api from '../../../lib/api';

const apiGuard = async ({ context }) => {
  async function getCards(api: AxiosInstance) {
    try {
      const response = await api.get('/cards/');
      return response; // make sure to return something
    } catch (error) {
      console.error('API Error:', error);

      // check if error.response exists before accessing status
      const status = error.response?.status;

      if ([401, 400].includes(status)) {
        console.log('unauthorized or bad request, logging out...');
        await context.auth.logout();
      }

      return null; // return null instead of throwing
    }
  }

  const response = await getCards(api);
  if (!response) {
    console.log('api call failed, handling gracefully...');
    // instead of throwing an error, handle failure smoothly
    throw redirect({
      to: '/app/login',
    });
  }

  console.log('API call succeeded:', response.data);
};

export const Route = createFileRoute('/app/user/cards')({
  component: RouteComponent,
  beforeLoad: apiGuard,
});

function RouteComponent() {
  return <h1>CSADS</h1>;
}
