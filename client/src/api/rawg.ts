/**
 * RAWG Video Games Database API
 * Docs: https://api.rawg.io/docs/#tag/games
 *
 * Query parameters are added to the URL after a "?" in the form:
 *   key=value&otherKey=otherValue
 * Only include a parameter if you want to use it (e.g. for filtering or pagination).
 */

const BASE_URL = 'https://api.rawg.io/api';

function getApiKey(): string {
  const key = import.meta.env.VITE_RAWG_API_KEY;
  if (!key) {
    throw new Error(
      'Missing VITE_RAWG_API_KEY. Add it to your .env file. Get a key at https://rawg.io/apidocs'
    );
  }
  return key;
}

/**
 * Builds a URL with query parameters from an object.
 * Example: buildUrl("/games", { page: 1, page_size: 20 })
 *   → "https://api.rawg.io/api/games?key=xxx&page=1&page_size=20"
 */
function buildUrl(
  path: string,
  params: Record<string, string | number | undefined> = {}
): string {
  const searchParams = new URLSearchParams();

  searchParams.set('key', getApiKey());

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return `${BASE_URL}${path}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Common query parameters for GET /games (from API docs):
 *
 * - page         : Page number (1-based). Affects which slice of results you get.
 * - page_size    : How many results per page (default varies; you might use 20).
 * - search       : Search by name (e.g. "zelda").
 * - genres       : Filter by genre slug (e.g. "action", "rpg"). Comma-separated for multiple.
 * - platforms    : Filter by platform IDs (e.g. 4 = PC). Comma-separated for multiple.
 * - dates        : Release date range, format "YYYY-MM-DD,YYYY-MM-DD".
 * - ordering     : Sort order, e.g. "-released" (newest), "name", "-rating".
 *
 * Including a parameter in the object below means we send it in the request;
 * omitting it or passing undefined means the API uses its default (no filter).
 */
type GamesListParams = {
  page?: number;
  page_size?: number;
  search?: string;
  genres?: string;
  platforms?: string;
  dates?: string;
  ordering?: string;
};

interface RawgGame {
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

interface GamesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
}

/**
 * GET /games — list games with optional filters and pagination.
 */
async function fetchGames(
  params: GamesListParams = {}
): Promise<GamesListResponse> {
  const url = buildUrl('/games', params);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * GET /games/{id} — single game details.
 */
async function fetchGameById(id: string | number): Promise<RawgGame> {
  const url = buildUrl(`/games/${id}`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Game trailer/movie from GET /games/{id}/movies
 * Docs: https://rawg.readme.io/reference/get-a-list-of-games-trailers
 */
interface RawgGameMovie {
  id: number;
  name: string;
  preview: string; // thumbnail image URL
  data: Record<string, string>; // e.g. { "480": "https://...", "max": "https://..." } for video URLs
}

/**
 * GET /games/{id}/movies — list of trailers/preview videos for a game.
 * Use the same game id as fetchGameById. Returns an array (may be empty if no trailers).
 */
async function fetchGameTrailers(
  gameId: string | number
): Promise<RawgGameMovie[]> {
  const url = buildUrl(`/games/${gameId}/movies`);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return Array.isArray(json.results) ? json.results : [];
}

// Satisfies noUnusedLocals while this file has no exports (restore exports to use from app).
void fetchGames;
void fetchGameById;
void fetchGameTrailers;
