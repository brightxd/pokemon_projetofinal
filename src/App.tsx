import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import Navbar from "./components/Navbar";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Gen = lazy(() => import("./pages/Gen"));

export default function App() {
  return (
    <PokemonProvider>
      <HashRouter>
        <Navbar />
        <Suspense fallback={<p className="loading">Carregando...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/generation/:id" element={<Gen/>} />
          </Routes>
        </Suspense>
      </HashRouter>
    </PokemonProvider>
  );
}

