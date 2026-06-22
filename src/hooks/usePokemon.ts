import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import type { PokemonContextType } from "../types/PokemonContextType";

export function usePokemon(): PokemonContextType {
  return useContext(PokemonContext);
}