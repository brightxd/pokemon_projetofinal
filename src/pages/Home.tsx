import { usePokemon } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import TypeFilter from "../components/TypeFilter";
import "./Home.css";

export default function Home() {
  const { pokemons, search, typeFilter, loading } = usePokemon();

  const filtered = pokemons
    .filter((p) => p.name.includes(search.toLowerCase()))
    .filter((p) => typeFilter === "" || p.types.includes(typeFilter));

  if (loading) {
    return <p className="loading">Carregando...</p>;
  }

  return (
    <main className="home">
      <TypeFilter />
      <div className="grid">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
}
