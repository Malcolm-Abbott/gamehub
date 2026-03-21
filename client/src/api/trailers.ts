import { getApiKey } from "./apiKey";

export interface RawgGameMovie {
    id: number;
    name: string;
    preview: string; // thumbnail image URL
    data: Record<string, string>; // e.g. { "480": "https://...", "max": "https://..." } for video URLs
  }
  
  /**
   * GET /games/{id}/movies — list of trailers/preview videos for a game.
   * Use the same game id as fetchGameById. Returns an array (may be empty if no trailers).
   */
  export async function fetchGameTrailers(
    gameId: string | number
  ): Promise<RawgGameMovie[]> {
    const url = new URL(`https://api.rawg.io/api/games/${gameId}/movies`);
    url.searchParams.set('key', getApiKey());
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
    }
  
    const json = await res.json();
    return Array.isArray(json.results) ? json.results : [];
  }