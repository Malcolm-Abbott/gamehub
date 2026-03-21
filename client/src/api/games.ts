import { getApiKey } from "./apiKey";

export interface RawgGame {
    id: number;
    name: string;
    released: string | null;
    background_image: string | null;
    rating: number;
    rating_top: number;
    genres: { id: number; name: string; slug: string }[];
    platforms?: { platform: { id: number; name: string; slug: string } }[];
    short_screenshots?: { id: number; image: string }[];
  }
  
  export interface GamesListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawgGame[];
  }

  export async function fetchGames(): Promise<GamesListResponse> {
    const url = new URL(`https://api.rawg.io/api/games`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as GamesListResponse;
  }

  export async function fetchGameBySlug(slug: string): Promise<RawgGame> {
    const url = new URL(`https://api.rawg.io/api/games/${slug}`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as RawgGame;
  }

  export async function fetchGameById(id: number): Promise<RawgGame> {
    const url = new URL(`https://api.rawg.io/api/games/${id}`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as RawgGame;
  }