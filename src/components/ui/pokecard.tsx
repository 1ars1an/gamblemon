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

  // Scaled values
  const scaledAttack = attack * speed;
  const scaledDefense = defense * speed;

  return (
    <Card className="min-w-[150px] max-w-[350px] w-full relative">
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
      <CardFooter className="block relative pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <StatBar value={hp} color="bg-red-500" />
            <StatBar value={scaledAttack} color="bg-green-500" />
            <StatBar value={scaledDefense} color="bg-blue-500" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
