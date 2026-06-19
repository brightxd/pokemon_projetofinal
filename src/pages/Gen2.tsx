import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../types/pokemon";

export default function Gen2(){
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    async function fetchGen2() {
      const response = await fetch("https://pokeapi.co/api/v2/generation/2");
      const data = await response.json();

      const detailed = await Promise.all(
        data.pokemon_species.map(async (item: { name: string; url: string }) => {
          const id = item.url.split("/").filter(Boolean).pop();
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const poke = await res.json();
          return {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t: { type: { name: string } }) => t.type.name),
          } as Pokemon;
        })
      );

      setPokemons(detailed.sort((a, b) => a.id - b.id));
      setLoading(false);
    }
     fetchGen2();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <main className="home">
      <h2>Geração 2</h2>
      <div className="grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
}