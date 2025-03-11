import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import { StatBar } from './statbar';

import { Pokemon } from '../../routes/app/user/cards';

export function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  // Extract stats
  const hp = pokemon.stats.find((s) => s.stat === 'hp')?.val ?? 0;
  const attack =
    pokemon.stats.find((s) => s.stat === 'attack')?.val ?? 0;
  const defense =
    pokemon.stats.find((s) => s.stat === 'defense')?.val ?? 0;
  const speed =
    pokemon.stats.find((s) => s.stat === 'speed')?.val ?? 1;

  // scaled values (weighted ratio) - speed provides 30% boost
  const scaledAttack = attack * 0.7 + speed * 0.3;
  const scaledDefense = defense * 0.7 + speed * 0.3;

  const maxStatValue = 200; // Adjust based on highest possible Pokémon stat

  const normalizedAttack = (scaledAttack / maxStatValue) * 100;
  const normalizedDefense = (scaledDefense / maxStatValue) * 100;

  return (
    <Card
      className={`min-w-[150px] max-w-[350px] w-full border-${pokemon.borderStyle}-custom`}
    >
      <CardHeader>
        <CardTitle>{pokemon.pokemon}</CardTitle>
        <CardDescription>{pokemon.type.join(', ')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="flex justify-center gap-8">
          <Avatar className="size-20">
            <AvatarImage
              src={
                pokemon.isShiny
                  ? pokemon.spriteUrl
                  : pokemon.shinySpriteUrl
              }
            />
            <AvatarFallback>AVT</AvatarFallback>
          </Avatar>
          <Avatar className="size-20">
            <AvatarImage src=".png" />
            <AvatarFallback>{pokemon.exp}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <CardFooter className="block pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <StatBar value={hp} color="bg-red-500" />
            <StatBar value={normalizedAttack} color="bg-green-500" />
            <StatBar value={normalizedDefense} color="bg-blue-500" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
