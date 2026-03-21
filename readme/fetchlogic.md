# Fetch logic (API helpers)

This project uses the same small pattern for most RAWG API calls. It keeps URLs explicit, handles HTTP failures early, and types the JSON body.

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

---

## Related: config errors

`getApiKey()` in `client/src/api/apiKey.ts` may **throw** before any `fetch` if the env var is missing. That’s separate from HTTP `res.ok` — it fails fast when the client can’t authenticate.

---

## Summary checklist

- [ ] `const url = new URL(...)`
- [ ] `url.searchParams.set(...)` as needed
- [ ] `const res = await fetch(url)`
- [ ] If `!res.ok`, throw `new Error(...)` including `res.status` and `res.statusText`
- [ ] `return (await res.json()) as ...` or parse to a variable and map/normalize
