import { Link } from "react-router-dom";
import "./Navbar.css";
import type { PokemonGenerations } from "../types/PokemonGenerationsResult";
import converterNumerosRomanos from "../converterNumerosRomanos";
import { TYPES } from "./TypeFilter";
import { usePokemon } from "../hooks/usePokemon";

export default function Navbar() {
  const { generations, search, setSearch, typeFilter, setTypeFilter, favorites } = usePokemon();
  
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">Pokédex</Link>
        <ul className="navbar-menu">
          <li className="dropdown">
            <span className="navbar-link dropdown-trigger">Generations </span>
            <ul className="dropdown-menu">
              {generations.map((generation: PokemonGenerations) => {
                const id = generation.url.split('/').findLast(Boolean);
                const generationName = converterNumerosRomanos(generation.name.split('-', 2)[1]);
                return <li key={generation.name}>
                  <Link key={`${id}-${generation.name}`} to={`/generation/${id}`}>Generation {generationName}</Link>
                </li>
            })}
            </ul>
          </li>
        </ul>
        <ul className="navbar-menu">
          <li className="dropdown">
            <span className="navbar-link dropdown-trigger">Types</span>
            <ul className="dropdown-menu">
              <li key={"todos"}>
                <button 
                  className={`dropdown-btn ${typeFilter === "" ? "active" : ""}`} 
                  onClick={() => setTypeFilter("")}
                >
                  Todos</button></li>
              {TYPES.map(type => {
                const initial = type.slice(0, 1);
                const newTypeName = type.replace(initial, initial.toUpperCase());
                return <li key={type}>
                  <button
                    className={`dropdown-btn ${typeFilter === type ? "active" : ""}`}
                    onClick={() => setTypeFilter(typeFilter === type ? "" : type) }
                  >{newTypeName}</button>
                </li>}
                )
              }
            </ul>
          </li>
        </ul>
        <input
          className="navbar-search"
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/favorites" className="navbar-link">
          Favoritos {favorites.length > 0 && `(${favorites.length})`}
        </Link>
        
      </nav>
    </div>
  );
}
