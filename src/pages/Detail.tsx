import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Detail.css";
import { usePokemon } from "../hooks/usePokemon";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { pokemons, favorites, toggleFavorite } = usePokemon();

  const [pokemon, setPokemon] = useState(pokemons.find((p) => p.id === Number(id)) ?? null);


  useEffect(() => {
    if (pokemon) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => r.json())
      .then((poke) => setPokemon({
        id: poke.id,
        name: poke.name,
        types: poke.types.map((t: { type: { name: string } }) => t.type.name),
      }));
  }, [id]);

  if (!pokemon) {
    return <p className="loading">Pokémon não encontrado.</p>;
  }

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <main className="detail">
      <Link to="/" className="back-link">← Voltar</Link>
      <div className="detail-card">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <span className="detail-number">#{String(pokemon.id).padStart(3, "0")}</span>
        <h2 className="detail-name">{pokemon.name}</h2>
        <div className="detail-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type type-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <button className="detail-fav-btn" onClick={() => toggleFavorite(pokemon.id)}>
          {isFavorite ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
        </button>
      </div>
    </main>
  );
}
