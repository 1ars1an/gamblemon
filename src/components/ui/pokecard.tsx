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

import { FrontFace, BackFace } from './pokefaces';

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

  const linkToCard = pokemon.apiId.toString();

  return (
    // 3D perspective container (must be in normal flow to work with the grid)
    <Link
      to={`/app/user/$cardId`}
      params={{ cardId: linkToCard }}
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
          <FrontFace
            pokemon={pokemon}
            hp={hp}
            normalizedAttack={normalizedAttack}
            normalizedDefense={normalizedDefense}
          />
        </div>

        {/* BACK FACE (absolutely positioned, rotated) */}
        <div
          className="
            absolute top-0 left-0 w-full h-full
            rotate-y-180
            backface-hidden
          "
        >
          <BackFace pokemon={pokemon} />
        </div>
      </div>
    </Link>
  );
}
