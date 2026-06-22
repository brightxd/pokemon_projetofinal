import { usePokemon } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import converterNumerosRomanos from "../converterNumerosRomanos";
import "./Home.css";

export default function Home() {
  const { pokemons, search, typeFilter, loading, loadingMore, currentGenIndex, generations, loadNextGeneration } = usePokemon();

  const filtered = pokemons
    .filter((p) => p.name.includes(search.toLowerCase()))
    .filter((p) => typeFilter === "" || p.types.includes(typeFilter));

  const hasNextGen = currentGenIndex < generations.length - 1;

  if (loading) {
    return <p className="loading">Carregando...</p>;
  }

  return (
    <main className="home">
      <div className="grid">
        {filtered.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {hasNextGen && (
        <div className="load-more">
          <button className="load-more-btn" onClick={loadNextGeneration} disabled={loadingMore}>
            {loadingMore
              ? "Carregando..."
              : `Carregar Geração ${converterNumerosRomanos(generations[currentGenIndex + 1]?.name.split("-")[1])}`}
          </button>
        </div>
      )}
    </main>
  );
}
