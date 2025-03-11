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
import { Link } from '@tanstack/react-router';

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

  const maxStatValue = 100; // Adjust based on highest possible Pokémon stat

  const normalizedAttack = (scaledAttack / maxStatValue) * 100;
  const normalizedDefense = (scaledDefense / maxStatValue) * 100;

  // FRONT: Full card
  const FrontFace = () => (
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

  // BACK: Just a single image
  const BackFace = () => (
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

  return (
    // 3D perspective container (must be in normal flow to work with the grid)
    <Link
      to={`/app/user/cards/${pokemon.pokeId}`}
      className="group relative min-w-[150px] max-w-[350px] w-full"
      style={{ perspective: '1000px' }}
    >
      {/* The element that flips on hover */}
      <div
        className="
          relative w-full
          transition-transform duration-700
          [transform-style:preserve-3d]
          group-hover:rotate-y-180
        "
      >
        {/* FRONT FACE (in normal flow, defines container height) */}
        <div className="backface-hidden">
          <FrontFace />
        </div>

        {/* BACK FACE (absolutely positioned, rotated) */}
        <div
          className="
            absolute top-0 left-0 w-full h-full
            rotate-y-180
            backface-hidden
          "
        >
          <BackFace />
        </div>
      </div>
    </Link>
  );
}
