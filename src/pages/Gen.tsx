import { useParams } from "react-router-dom";
import UseFetch from "../hooks/UseFetch";
import type { Pokemon } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import type { PokemonGeneration } from "../types/PokemonGeneration";
import { useEffect, useState } from "react";
import { usePokemon } from "../context/PokemonContext";

export default function Gen() {
    const { id } = useParams();

    const { search, typeFilter } = usePokemon();

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    const {data: generationData, loading: generationLoading, error: generationError} = UseFetch<PokemonGeneration>(`https://pokeapi.co/api/v2/generation/${id}`);

    useEffect(() => {
        if (!generationData) return;
        
        async function fetchGen() {
            const urls: string[] = generationData?.pokemon_species.map(({url}) => url.replace('pokemon-species', 'pokemon')) ?? [];

            async function fetchPokemon(url: string): Promise<Pokemon> {
                const res = await fetch(url);
                const json = await res.json();
                const { id, name, types} = json;
                return {
                    id,
                    name,
                    types: types.map((t: { type: { name: string}}) => t.type.name)
                };
            }

            const results: Pokemon[] = await Promise.all(urls.map(fetchPokemon));
            const sorted = results.toSorted((a, b) => a.id - b.id);
            setPokemons(sorted);
        }

        fetchGen();
    }, [generationData]);

    if (generationLoading) return (<p>Carregando a geração {id}...</p>);

    if (generationError) return (<p>Erro ao carregar a geração {id}: {generationError}</p>);

    if (generationData){
        
        const filtered = pokemons
            .filter((p) => p.name.includes(search.toLowerCase()))
            .filter((p) => typeFilter === "" || p.types.includes(typeFilter));

        return (
            <main className="home">
                <h2>Geração {id}</h2>
                <div className="grid">
                    {filtered.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
                </div>
            </main>
        );
    }
}