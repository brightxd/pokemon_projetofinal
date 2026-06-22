import type { Pokemon } from "./pokemon";
import type { PokemonGenerations } from "./PokemonGenerationsResult";

export type PokemonContextType = {
  pokemons: Pokemon[];
  favorites: number[];
  generations: PokemonGenerations[];
  search: string;
  typeFilter: string;
  loading: boolean;
  loadingMore: boolean;
  currentGenIndex: number;
  setSearch: (value: string) => void;
  setTypeFilter: (value: string) => void;
  toggleFavorite: (id: number) => void;
  clearFavorite: () => void;
  registerPokemons: (list: Pokemon[]) => void;
  loadNextGeneration: () => void;
};