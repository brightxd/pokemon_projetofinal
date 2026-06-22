export type PokemonGeneration = {
    abilities: {
        name: string;
        url: string
    }[];
    id: number;
    main_region: {
        name: string;
        url: string
    };
    moves: {
        name: string;
        url: string
    }[];
    name: string;
    names: {
        language: {
            name: string;
            url: string
        };
        name: string
    };
    pokemon_species: {
        name: string;
        url: string
    }[];
    types: {
        name: string;
        url: string
    };
    version_groups: {
        name: string;
        url: string
    }
}