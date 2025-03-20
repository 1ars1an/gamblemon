import React from 'react';
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router';

import { PokeCard } from '../../../components/ui/pokecard';

import axios, { AxiosInstance } from 'axios';
import api from '../../../lib/api';
import { AppRouteContext } from '../../../main';

const apiGuard = async ({
  context,
}: {
  context: AppRouteContext;
}) => {
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
  return response.data;
};

export const Route = createFileRoute('/app/user/cards')({
  component: RouteComponent,
  loader: apiGuard,
  pendingComponent: () => <div>Loading</div>,
});

export interface Pokemon {
  owner: number;
  apiId: number;
  pokeId: number;
  pokemon: string;
  exp: number;
  type: string[];
  spriteUrl: string;
  shinySpriteUrl: string;
  stats: { val: number; stat: string }[];
  isShiny?: boolean;
  borderStyle: string;
  rarity: string;
}

function RouteComponent() {
  const cards = Route.useLoaderData();
  const extractedCards: Pokemon[] = cards.map((card: any) => {
    return {
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
  });

  console.log(extractedCards);

  return (
    <div className="grid grid-cols-3 gap-20 justify-items-center">
      {extractedCards.map((card: Pokemon) => {
        return <PokeCard pokemon={card} key={card.pokeId} />;
      })}
    </div>
  );
}
