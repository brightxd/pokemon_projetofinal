import { Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import "./PokemonCard.css";
import { usePokemon } from "../hooks/usePokemon";

type Props = {
  readonly pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: Props) {
  const { favorites, toggleFavorite } = usePokemon();
  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="card">
      <Link to={`/pokemon/${pokemon.id}`} className="card-link">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <span className="card-number">#{String(pokemon.id).padStart(3, "0")}</span>
        <h3 className="card-name">{pokemon.name}</h3>
        <div className="card-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type type-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </Link>
      <button className="favorite-btn" onClick={() => toggleFavorite(pokemon.id)}>
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
