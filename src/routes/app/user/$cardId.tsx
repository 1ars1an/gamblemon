import React from 'react';

import { createFileRoute, redirect } from '@tanstack/react-router';

import { Pokemon } from './cards';

import { PokeCard } from '../../../components/ui/pokecard';

import axios, { AxiosInstance } from 'axios';
import api from '../../../lib/api';
import { AppRouteContext } from '../../../main';

const apiGuard = async ({
  context,
  params,
}: {
  context: AppRouteContext;
  params: { cardId: string };
}) => {
  async function getCards(api: AxiosInstance) {
    try {
      const response = await api.get(`/cards/${params.cardId}`);
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
  return response.data;
};

export const Route = createFileRoute('/app/user/$cardId')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return apiGuard({ params, context });
  },
});

function RouteComponent() {
  const card = Route.useLoaderData();
  const extractedCard: Pokemon = {
    owner: card.owner,
    apiId: card.id,
    pokeId: card.pokemon.poke_id,
    pokemon: card.pokemon.name,
    exp: card.pokemon.base_experience,
    type: card.pokemon.type.map((type: any) => type.name),
    spriteUrl: card.pokemon.get_sprite_url.front,
    shinySpriteUrl: card.pokemon.get_sprite_url.front_shiny,
    stats: card.pokemon.stats
      .filter(
        (stat: any) =>
          stat.stat.name !== 'special-attack' &&
          stat.stat.name !== 'special-defense'
      )
      .map((stat: any) => ({
        stat: stat.stat.name,
        val: stat.base_stat,
      })), // Extract base stats
    isShiny: card.is_shiny,
    borderStyle: card.border_style,
    rarity: card.rarity,
  };

  return (
    <div className="px-80 grid grid-cols-2 gap-4 justify-items-center">
      <PokeCard
        pokemon={extractedCard}
        key={extractedCard.pokeId}
      ></PokeCard>
      <div>Hi</div>
    </div>
  );
}
