import { useEffect, useState } from "react";
import { usePokemon } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import "./Favorites.css";

export default function Favorites() {
  const { pokemons, favorites, clearFavorite, registerPokemons } = usePokemon();
  const [favPokemons, setFavPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function resolveFavorites() {
      const resolved = await Promise.all(
        favorites.map(async (id) => {
          const found = pokemons.find((p) => p.id === id);
          if (found) return found;

          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const poke = await res.json();
          return {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t: { type: { name: string } }) => t.type.name),
          } as Pokemon;
        })
      );

      registerPokemons(resolved);
      setFavPokemons(resolved);
    }

    if (favorites.length > 0) resolveFavorites();
    else setFavPokemons([]);
  }, [favorites]);

  return (
    <main className="favorites">
      <h2 className="favorites-title">Favoritos</h2>
      {favPokemons.length === 0 ? (
        <p className="favorites-empty">
          Nenhum favorito ainda. <Link to="/">Explore a Pokédex!</Link>
        </p>
      ) : (
        <>
          <button onClick={clearFavorite} className="clear-btn">
            Limpar favoritos
          </button>
          <div className="grid">
            {favPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
