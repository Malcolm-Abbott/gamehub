# Home (`/`) — data & logic

## Summary

The home page is the app entry point: **genre** and **platform** entry tiles (mostly static navigation) plus one or more **featured** game lists loaded from the RAWG API via `fetchGames` in `client/src/api/rawg.ts`.

---

## Data sources


| Source                           | Use on Home                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| **RAWG**                         | Featured (and optional secondary) game grids via `GET /games` → `fetchGames`               |
| **App constants**                | Genre cards: display labels + route slugs that match RAWG `genres` filter                  |
| **App constants**                | Platform cards: display labels + RAWG platform IDs (or slugs mapped to IDs on navigate)    |
| **Favorites (when implemented)** | Context + `localStorage` — optional heart state on featured cards; no extra API for toggle |


---

## UI blocks → data mapping


| Block                                                                      | Data                                             | How it is obtained                                                                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Genre cards** (e.g. Shooters, Racing, Sports, RPG, Strategy, Simulation) | Title, styling, link to `/genre/:genreName`      | **Static config** array. `:genreName` should be the RAWG genre **slug** passed later to `fetchGames({ genres: slug })`.                                |
| **Platform cards** (e.g. PC, PS5, Xbox)                                    | Title, link to `/platform/:platformName`         | **Static config**. RAWG expects `platforms` as **comma-separated platform IDs** in `fetchGames`; document ID mapping (e.g. PC = `4` per API examples). |
| **Featured games**                                                         | `id`, `name`, `background_image`, `rating`, etc. | `fetchGames` with e.g. `ordering: '-rating'` or `'-released'`, `page_size: 8–12`.                                                                      |
| **Search** (if in header)                                                  | Dropdown results                                 | Usually **global**, not Home-only: debounced `fetchGames({ search, page_size: 5 })` → navigate to `/game/:gameId` on select.                           |


---

## Fetches


| When                | Function     | Suggested params                         | Notes                     |
| ------------------- | ------------ | ---------------------------------------- | ------------------------- |
| Mount               | `fetchGames` | `ordering: '-rating'`, `page_size: 12`   | Primary featured row      |
| Optional second row | `fetchGames` | `ordering: '-released'`, `page_size: 12` | “New releases” or similar |


Genre and platform **tiles** do not require a Home fetch unless you add live counts (extra `fetchGames` per tile with `page_size: 1` — heavier; optional).

---

## State (conceptual)

- `featuredGames` — `RawgGame[]` from `GamesListResponse.results`
- `loading` / `error` — for async grid(s)
- Optional: second list state if you use two rows

Types: reuse `RawgGame` and `GamesListResponse` from `client/src/api/rawg.ts`.

---

## Errors & environment

- `VITE_RAWG_API_KEY` is required; missing key throws in `getApiKey()` before any request.
- On non-OK HTTP: `fetchGames` throws — surface a message and optional retry in the UI.
- Empty `results`: uncommon for broad list queries; still handle for robustness.

---

## Navigation contract

- **Genre:** `/genre/:genreName` — param = RAWG genre slug used in `genres` query on the genre page.
- **Platform:** `/platform/:platformName` — define whether the param is a **slug** (map to IDs on that page) or encodes IDs; keep consistent with `App` routes when added.
- **Game card:** `/game/:gameId` — `gameId` matches RAWG `RawgGame.id` for `fetchGameById` on the detail page.

---

## Out of scope on Home

- Full game detail, description, and **trailers** — loaded on `/game/:gameId` via `fetchGameById` and `fetchGameTrailers`.
- Paginated genre/platform catalogs — those routes own `fetchGames` with `genres` / `platforms` and `page`.

---

## Related code

- API: `client/src/api/rawg.ts` — `fetchGames`, `GamesListParams`, `RawgGame`
- Route: `client/src/App.tsx` — index route → `Home`
- Page stub: `client/src/Pages/Home/Home.tsx`

