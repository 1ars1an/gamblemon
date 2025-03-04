import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import axios, { AxiosInstance } from 'axios';
import { useAuth } from '../../../auth';
import api from '../../../lib/api';

const apiGuard = ({ context }) => {
  async function getCards(api: AxiosInstance) {
    try {
      const response = await api.get('/cards/');
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        context.auth.logout(); // 🔥 Logout the user when refresh fails
      }
    }
  }
  const response = getCards(api);
};

export const Route = createFileRoute('/app/user/cards')({
  component: RouteComponent,
  beforeLoad: apiGuard,
});

function RouteComponent() {
  return <h1>CSADS</h1>;
}
