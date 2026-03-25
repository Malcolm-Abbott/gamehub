/** GET /genres — each item matches RAWG `Genre` */
import { getApiKey } from "./apiKey";
import { GamesListResponse } from "./games";

export interface RawgGenre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
  }
  
  /** GET /genres/{id} — RAWG `GenreSingle` (includes description) */
  export interface RawgGenreDetail extends RawgGenre {
    description: string;
  }
  
  export interface GenresListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawgGenre[];
  }
  
  export async function fetchGenre(genreId: number): Promise<RawgGenreDetail> {
    const url = new URL(`https://api.rawg.io/api/genres/${genreId}`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as RawgGenreDetail;
  }
  
  export async function fetchGameGenres(): Promise<GenresListResponse> {
    const url = new URL('https://api.rawg.io/api/genres');
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as GenresListResponse;
  }

  export async function fetchGamesByGenre(genreId: number): Promise<GamesListResponse> {
    const url = new URL(`https://api.rawg.io/api/games`);
    url.searchParams.set('key', getApiKey());
    url.searchParams.set('genres', genreId.toString());
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as GamesListResponse;
  }
  