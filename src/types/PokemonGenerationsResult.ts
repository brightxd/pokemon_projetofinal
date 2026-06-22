export type PokemonGenerations = {
    name: string;
    url: string;
}

export type PokemonGenerationsResult = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonGenerations[]
}