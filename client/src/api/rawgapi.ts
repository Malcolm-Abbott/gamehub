/**
 * RAWG API — fresh module for simple, readable fetch usage.
 * Docs: https://api.rawg.io/docs/#tag/games
 */

export function getApiKey(): string {
  const key = import.meta.env.VITE_RAWG_API_KEY;
  if (!key) {
    throw new Error(
      'Missing VITE_RAWG_API_KEY. Add it to your .env file. Get a key at https://rawg.io/apidocs'
    );
  }
  return key;
}

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

export async function fetchGameGenres() {
  const url = new URL('https://api.rawg.io/api/genres');
  url.searchParams.set('key', getApiKey());
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

