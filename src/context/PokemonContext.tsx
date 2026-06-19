import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Pokemon } from "../types/pokemon";

type PokemonContextType = {
  pokemons: Pokemon[];
  favorites: number[];
  search: string;
  typeFilter: string;
  loading: boolean;
  setSearch: (value: string) => void;
  setTypeFilter: (value: string) => void;
  toggleFavorite: (id: number) => void;
  clearFavorite:() => void;
};

const PokemonContext = createContext<PokemonContextType>({} as PokemonContextType);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();

      const detailed = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const res = await fetch(item.url);
          const poke = await res.json();
          return {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t: { type: { name: string } }) => t.type.name),
          } as Pokemon;
        })
      );

      setPokemons(detailed);
      setLoading(false);
    }

    fetchPokemons();
  }, []);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function clearFavorite(){
    setFavorites([]);
  }

  return (
    <PokemonContext.Provider value={{ pokemons, favorites, search, typeFilter, loading, setSearch, setTypeFilter, toggleFavorite, clearFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
