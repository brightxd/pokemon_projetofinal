import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";
import "./App.css";
import Gen2 from "./pages/Gen2";

export default function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/Gen2" element={<Gen2/>}></Route>
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}
