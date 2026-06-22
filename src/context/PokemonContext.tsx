import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Pokemon } from "../types/pokemon";
import type { PokemonGenerationsResult } from "../types/PokemonGenerationsResult";
import type { PokemonGeneration } from "../types/PokemonGeneration";
import UseFetch from "../hooks/UseFetch";
import type { PokemonContextType } from "../types/PokemonContextType";

const PokemonContext = createContext<PokemonContextType>({} as PokemonContextType);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentGenIndex, setCurrentGenIndex] = useState(0);

  const { data: generation } = UseFetch<PokemonGenerationsResult>("https://pokeapi.co/api/v2/generation");
  const generations = generation?.results ?? [];
  /* const generations = useMemo(() => {
    console.log("Generations changed: ", generation);
    
  }, [generation]); */
  

  useEffect(() => {
    if (generations.length === 0) return;
    loadGeneration(generations[0].url, true);
  }, [generations]);

  async function loadGeneration(url: string, isFirst: boolean) {
    if (isFirst) setLoading(true); else setLoadingMore(true);

    const res = await fetch(url);
    const genData: PokemonGeneration = await res.json();

    const urls = genData.pokemon_species.map(({ url }) =>
      url.replace("pokemon-species", "pokemon")
    );

    const results = await Promise.all(
      urls.map(async (u) => {
        const r = await fetch(u);
        const poke = await r.json();
        return {
          id: poke.id,
          name: poke.name,
          types: poke.types.map((t: { type: { name: string } }) => t.type.name),
        } as Pokemon;
      })
    );

    //const sorted = results.toSorted((a, b) => a.id - b.id);
    setPokemons((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const novos = results.filter((p) => !existingIds.has(p.id));
      return [...prev, ...novos].toSorted((a, b) => a.id - b.id);
    });

    if (isFirst) setLoading(false); else setLoadingMore(false);
  }

  function loadNextGeneration() {
    const nextIndex = currentGenIndex + 1;
    if (nextIndex >= generations.length) return;
    setCurrentGenIndex(nextIndex);
    loadGeneration(generations[nextIndex].url, false);
  }

  function toggleFavorite(id: number) {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function clearFavorite() {
    setFavorites([]);
    localStorage.removeItem("favorites");
  }

  function registerPokemons(list: Pokemon[]) {
    setPokemons((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const novos = list.filter((p) => !existingIds.has(p.id));
      return novos.length > 0 ? [...prev, ...novos] : prev;
    });
  }

  return (
    <PokemonContext.Provider value={{ pokemons, generations, favorites, search, typeFilter, loading, loadingMore, currentGenIndex, setSearch, setTypeFilter, toggleFavorite, clearFavorite, registerPokemons, loadNextGeneration }}>
      {children}
    </PokemonContext.Provider>
  );
}

export { PokemonContext };