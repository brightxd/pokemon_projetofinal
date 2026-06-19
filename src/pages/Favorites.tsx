import { usePokemon } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const { pokemons, favorites } = usePokemon();

  const favPokemons = pokemons.filter((p) => favorites.includes(p.id));

  return (
    <main className="favorites">
      <h2 className="favorites-title">Favoritos</h2>
      {favPokemons.length === 0 ? (
        <p className="favorites-empty">
          Nenhum favorito ainda. <Link to="/">Explore a Pokédex!</Link>
        </p>
      ) : (
        <div className="grid">
          {favPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}
