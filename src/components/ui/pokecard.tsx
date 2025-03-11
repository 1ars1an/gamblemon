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
      <CardFooter className="block relative px-12 pt-8">
        {/* HP Bar */}
        <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-red-500"
            style={{ width: `${Math.min(hp, 100)}%` }} // Capped at 100% for UI
          ></div>
        </div>
        {/* Attack Circle - Top Left */}
        <div className="absolute -bottom-20 left-2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-sm font-bold w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
          {pokemon.exp}
        </div>

        {/* Defense Circle - Top Right */}
        <div className="absolute -bottom-20 right-2 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-sm font-bold w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
          {pokemon.exp}
        </div>
      </CardFooter>
    </Card>
  );
}
