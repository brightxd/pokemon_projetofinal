# Pokédex App

Uma Pokédex moderna e responsiva construída com React, TypeScript e Vite, consumindo dados da [PokéAPI](https://pokeapi.co/).

> **Live Demo:** [brightxd.github.io/pokemon_projetofinal](https://brightxd.github.io/pokemon_projetofinal/)

---

## Funcionalidades

- **Listagem de Pokémon** — exibe todos os Pokémon organizados por geração
- **Carregamento por geração** — carrega uma geração por vez com botão "Carregar mais"
- **Busca em tempo real** — filtra Pokémon pelo nome enquanto digita
- **Filtro por tipo** — filtra por tipo (Fogo, Água, Planta, Elétrico, Psíquico e outros 13 tipos)
- **Filtro por geração** — navega diretamente para uma geração específica pelo dropdown
- **Detalhes do Pokémon** — página dedicada com artwork em alta resolução e informações completas
- **Favoritos** — adiciona e remove Pokémon dos favoritos com ícone de estrela
- **Persistência de favoritos** — favoritos salvos no `localStorage`, mantidos entre sessões
- **Página de favoritos** — visualiza todos os favoritos e limpa a lista com um clique
- **Contador de favoritos** — exibe a quantidade de favoritos na barra de navegação

---

## Tech Stack

| Categoria        | Tecnologia                         |
|------------------|------------------------------------|
| UI               | React 19, TypeScript               |
| Roteamento       | React Router DOM 7                 |
| CSS-in-JS        | Emotion (React + Styled)           |
| Build / Dev      | Vite 8, HMR com Oxc compiler       |
| Linting          | ESLint 10 + TypeScript ESLint      |
| Deploy           | GitHub Pages via GitHub Actions    |
| Dados            | PokéAPI (REST, sem autenticação)   |

---

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.tsx        # Barra de navegação (busca, filtros, contador de favoritos)
│   ├── PokemonCard.tsx   # Card individual do Pokémon
│   └── TypeFilter.tsx    # Seletor de tipos
├── context/
│   └── PokemonContext.tsx # Estado global (Pokémon, favoritos, filtros, paginação)
├── hooks/
│   ├── useFetch.ts       # Hook genérico para requisições HTTP
│   └── usePokemon.ts     # Hook de acesso ao PokemonContext
├── pages/
│   ├── Home.tsx          # Grid principal com carregamento por geração
│   ├── Detail.tsx        # Página de detalhes do Pokémon
│   ├── Favorites.tsx     # Página de favoritos
│   └── Gen.tsx           # Visualização por geração
├── types/                # Definições TypeScript
│   ├── pokemon.ts
│   ├── PokemonContextType.ts
│   ├── PokemonGeneration.ts
│   └── PokemonGenerationsResult.ts
├── converterNumerosRomanos.ts  # Utilitário: número → numeral romano
├── App.tsx               # Configuração das rotas (HashRouter)
└── main.tsx              # Entry point
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

---

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/brightxd/pokemon_projetofinal.git
cd pokemon_projetofinal

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Scripts disponíveis

| Comando           | Descrição                                      |
|-------------------|------------------------------------------------|
| `npm run dev`     | Inicia o servidor de desenvolvimento com HMR   |
| `npm run build`   | Compila TypeScript e gera bundle de produção   |
| `npm run preview` | Pré-visualiza o build de produção localmente   |
| `npm run lint`    | Executa o ESLint nos arquivos `.ts` e `.tsx`   |

---

## Arquitetura

### Gerenciamento de Estado

O estado global é gerenciado via **React Context API** (`PokemonContext`). Ele centraliza:

- Lista de Pokémon carregados
- Lista de favoritos (com persistência em `localStorage`)
- Filtros ativos (busca por nome, tipo, geração)
- Estado de carregamento e índice de geração atual

### Fluxo de Dados

```
PokéAPI
  └─► PokemonContext (carrega gerações uma a uma)
        └─► Componentes (Home, PokemonCard, Navbar, ...)
              └─► localStorage (favoritos)
```

### Roteamento

Utiliza `HashRouter` para compatibilidade com GitHub Pages (sem servidor backend). Rotas com lazy loading:

| Rota                   | Página         |
|------------------------|----------------|
| `/`                    | Home           |
| `/pokemon/:id`         | Detalhes       |
| `/favorites`           | Favoritos      |
| `/gen/:id`             | Por Geração    |

---

## Deploy

O deploy é automático via **GitHub Actions** a cada push na branch `main`:

1. Instala dependências
2. Executa `npm run build`
3. Publica o conteúdo de `dist/` no GitHub Pages

O arquivo de workflow está em [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

---

## API Utilizada

[PokéAPI](https://pokeapi.co/) — API REST pública, sem autenticação necessária.

| Endpoint                        | Uso                                         |
|---------------------------------|---------------------------------------------|
| `GET /api/v2/generation`        | Lista todas as gerações disponíveis         |
| `GET /api/v2/generation/{id}`   | Retorna Pokémon de uma geração específica   |
| `GET /api/v2/pokemon/{id}`      | Dados completos de um Pokémon               |

---

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request
