import React from 'react';

import { createFileRoute, redirect } from '@tanstack/react-router';

import { Pokemon } from './cards';

import { PokeCard } from '../../../components/ui/pokecard';

import { Trash } from 'lucide-react';

import { Button } from '../../../components/ui/button';

import { SelectForm } from '../../../components/ui/selectform';

import axios, { AxiosInstance } from 'axios';
import api from '../../../lib/api';
import { AppRouteContext } from '../../../main';
import { useAuth } from '../../../auth';

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

const updateCard = async ({
  apiId,
  body,
  auth,
}: {
  apiId: number;
  body: Record<string, any>;
  auth: ReturnType<typeof useAuth>;
}) => {
  console.log(body);
  try {
    const response = await api.patch(`/cards/${apiId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response; // make sure to return something
  } catch (error) {
    console.error('API Error:', error);

    // check if error.response exists before accessing status
    const status = error.response?.status;

    if ([401, 400].includes(status)) {
      console.log('unauthorized or bad request, logging out...');
      await auth.logout();
    }

    return null; // return null instead of throwing
  }
};

export const Route = createFileRoute('/app/user/$cardId')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return apiGuard({ params, context });
  },
});

const borderStyles: string[] = ['basic', 'glitter', 'glitch'];

const rarities: string[] = [
  'common',
  'silver',
  'gold',
  'cny',
  'sakura',
];

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

  const auth = useAuth();

  return (
    <div className="px-80 grid grid-cols-2 gap-4 justify-items-center">
      <PokeCard
        pokemon={extractedCard}
        key={extractedCard.pokeId}
      ></PokeCard>
      <div className="flex flex-col gap-8">
        <span>
          <Button className="w-full">
            <Trash />
          </Button>
        </span>
        <span>
          <SelectForm
            formType={'border'}
            options={borderStyles}
            formSubmit={(body: Record<string, any>) =>
              updateCard({ apiId: extractedCard.apiId, body, auth })
            }
          ></SelectForm>
        </span>
        <span>
          <SelectForm
            formType={'rarity'}
            options={rarities}
            formSubmit={(body: Record<string, any>) =>
              updateCard({ apiId: extractedCard.apiId, body, auth })
            }
          ></SelectForm>
        </span>
      </div>
    </div>
  );
}
