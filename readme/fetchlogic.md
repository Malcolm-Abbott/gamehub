# Fetch logic (API helpers)

This project uses the same small pattern for most RAWG API calls: list and detail endpoints, optional **query filters** on `/games`, and one endpoint that **normalizes** a wrapped JSON shape. URLs stay explicit, HTTP failures are handled early, and types document the JSON body.

---

## The standard pattern

Inside an **`async` function** that returns **`Promise<YourType>`**:

1. **Build the URL** with the `URL` constructor (absolute base + path).
2. **Add query params** with `url.searchParams.set(...)` (e.g. API key).
3. **`fetch(url)`** and **`await`** the result into **`res`** (short for response).
4. **If the request failed at the HTTP layer**, `res.ok` is `false`. **Throw** a **`new Error(...)`** that includes **`res.status`** and **`res.statusText`** so failures are visible in logs and stack traces.
5. **Otherwise**, **`await res.json()`** and treat it as the right shape — usually with a **type assertion** `as YourType` (or assign to a typed variable).

Conceptually:

```ts
export async function fetchExample(): Promise<SomeResponse> {
  const url = new URL("https://api.rawg.io/api/...");
  url.searchParams.set("key", getApiKey());

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as SomeResponse;
}
```

---

## Why this shape

| Step | Purpose |
|------|--------|
| `new URL(...)` | Safe base URL + path; `searchParams` avoids manual `?` / `&` string bugs. |
| `res` | Short, consistent name for the `Response` object. |
| `!res.ok` + `throw` | `fetch` only rejects on *network* errors; **4xx/5xx still resolve** — you must check `ok` (or `status`) yourself. |
| `await res.json()` + `as Type` | Parse body once; assertion documents the expected contract (RAWG returns JSON). |

---

## Real examples from this codebase

### List endpoint — assert whole response

From `client/src/api/games.ts` / `genres.ts`:

```ts
const url = new URL(`https://api.rawg.io/api/games`);
url.searchParams.set("key", getApiKey());
const res = await fetch(url);
if (!res.ok) {
  throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
}
return (await res.json()) as GamesListResponse;
```

### Single resource by id/slug — same skeleton, different type

```ts
const url = new URL(`https://api.rawg.io/api/games/${slug}`);
url.searchParams.set("key", getApiKey());
const res = await fetch(url);
if (!res.ok) {
  throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
}
return (await res.json()) as RawgGame;
```

### Filtering the games list — extra `searchParams`

RAWG’s **`GET /games`** endpoint accepts many query parameters. In this codebase, filtered lists reuse the same URL and error handling as `fetchGames()`, and only add params after the API key.

| Query param (RAWG) | Set in code | Helper | File |
|--------------------|------------|--------|------|
| `genres` | `url.searchParams.set("genres", genreId.toString())` | `fetchGamesByGenre` | `client/src/api/genres.ts` |
| `platforms` | `url.searchParams.set("platforms", platformId.toString())` | `fetchGamesByPlatform` | `client/src/api/platform.ts` |

Example (same skeleton as the unfiltered list; only the extra `set` differs):

```ts
const url = new URL("https://api.rawg.io/api/games");
url.searchParams.set("key", getApiKey());
url.searchParams.set("genres", genreId.toString());
// or: url.searchParams.set("platforms", platformId.toString());

const res = await fetch(url);
if (!res.ok) {
  throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
}
return (await res.json()) as GamesListResponse;
```

You can add more filters later the same way (e.g. ordering, page size), as long as RAWG documents the parameter name.

### Game detail and trailers

| Need | Endpoint (conceptually) | Helper | File |
|------|-------------------------|--------|------|
| One game by **slug** or **numeric id** | `GET /games/{slug}` or `GET /games/{id}` | `fetchGameBySlug`, `fetchGameById` | `client/src/api/games.ts` |
| Trailers / movies | `GET /games/{id}/movies` | `fetchGameTrailers` | `client/src/api/trailers.ts` |

Detail requests use the same pattern as the single-resource example above. Trailers follow the **normalize after JSON** pattern in the next section (`results` → array).

### Supporting lists (not game lists)

| Need | Helper | File |
|------|--------|------|
| All genres | `fetchGameGenres` | `client/src/api/genres.ts` |
| One genre (includes `description`) | `fetchGenre` | `client/src/api/genres.ts` |
| All platforms | `fetchPlatforms` | `client/src/api/platform.ts` |
| One platform | `fetchPlatformById` | `client/src/api/platform.ts` |

`platform.ts` also exports small **static** `RawgPlatform` objects (e.g. PC, Xbox Series, PS5) for UI or defaults without a network call; they are not part of the fetch pattern itself.

---

## Variation: parse JSON, then normalize

Sometimes the API wraps data (e.g. `results`) or you need a safe default. You still **`await res.json()`** after the **`ok`** check; you only change what you **return**.

Example from `client/src/api/trailers.ts`:

```ts
const res = await fetch(url);
if (!res.ok) {
  throw new Error(`RAWG API error: ${res.status} ${res.statusText}`);
}
const json = await res.json();
return Array.isArray(json.results) ? json.results : [];
```

The **error-handling block is unchanged**; the difference is post-parse logic, not the fetch contract.

The same idea applies anywhere the response isn’t a single typed object at the top level — parse once, then pick `results` or apply defaults.

---

## Related: config errors

`getApiKey()` in `client/src/api/apiKey.ts` may **throw** before any `fetch` if the env var is missing. That’s separate from HTTP `res.ok` — it fails fast when the client can’t authenticate.

---

## Summary checklist

- [ ] `const url = new URL(...)`
- [ ] `url.searchParams.set("key", getApiKey())` (or ensure callers pass key another way RAWG accepts)
- [ ] For **filtered** `/games` lists: `searchParams.set` for `genres`, `platforms`, or other documented filters
- [ ] `const res = await fetch(url)`
- [ ] If `!res.ok`, throw `new Error(...)` including `res.status` and `res.statusText`
- [ ] `return (await res.json()) as ...` **or** `const json = await res.json()` then map / normalize (e.g. trailers `results`)
