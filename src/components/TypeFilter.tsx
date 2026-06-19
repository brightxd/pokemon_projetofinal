import { usePokemon } from "../context/PokemonContext";
import "./TypeFilter.css";

const TYPES = [
  "fire", "water", "grass", "electric", "psychic", "ice",
  "dragon", "dark", "fairy", "normal", "fighting", "flying",
  "poison", "ground", "rock", "bug", "ghost", "steel",
];

export default function TypeFilter() {
  const { typeFilter, setTypeFilter } = usePokemon();

  return (
    <div className="type-filter">
      <button
        className={`filter-btn ${typeFilter === "" ? "active" : ""}`}
        onClick={() => setTypeFilter("")}
      >
        Todos
      </button>
      {TYPES.map((type) => (
        <button
          key={type}
          className={`filter-btn type-${type} ${typeFilter === type ? "active" : ""}`}
          onClick={() => setTypeFilter(typeFilter === type ? "" : type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
