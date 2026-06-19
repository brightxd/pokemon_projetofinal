import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import "./Navbar.css";

export default function Navbar() {
  const { search, setSearch } = usePokemon();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Pokédex</Link>
      <Link to='/Gen2' className='navbar-link'>Gen 2</Link>
      <Link to='/Gen3' className="navbar-link">Gen 3</Link>
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
