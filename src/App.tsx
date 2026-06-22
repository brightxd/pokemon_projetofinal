import { HashRouter, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import "./App.css";
import Gen from "./pages/Gen";

export default function App() {
  return (
    <PokemonProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/generation/:id" element={<Gen/>}></Route>
        </Routes>
      </HashRouter>
    </PokemonProvider>
  );
}
