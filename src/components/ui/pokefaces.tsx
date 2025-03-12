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

// FRONT: Full card
export const FrontFace = ({
  pokemon,
  hp,
  normalizedAttack,
  normalizedDefense,
}: {
  pokemon: Pokemon;
  hp: number;
  normalizedAttack: number;
  normalizedDefense: number;
}) => {
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
          <StatBar value={hp} color="bg-red-500" />
          <StatBar value={normalizedAttack} color="bg-green-500" />
          <StatBar value={normalizedDefense} color="bg-blue-500" />
        </div>
      </CardFooter>
    </Card>
  );
};

// BACK: Just a single image
export const BackFace = ({ pokemon }: { pokemon: Pokemon }) => (
  <Card
    className={`p-0 min-w-[150px] max-w-[350px] w-full h-full border-${pokemon.borderStyle}-custom overflow-hidden`}
  >
    <CardContent className="p-0 h-full w-full">
      <img
        src={`/${pokemon.rarity}.webp`}
        alt={`${pokemon.pokemon} card back`}
        className="object-cover w-full h-full"
      />
    </CardContent>
  </Card>
);
