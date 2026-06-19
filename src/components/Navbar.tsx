import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import "./Navbar.css";

export default function Navbar() {
  const { search, setSearch } = usePokemon();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Pokédex</Link>
      <input
        className="navbar-search"
        type="text"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/favorites" className="navbar-link">Favoritos</Link>
    </nav>
  );
}
