# `GameCard`: styled game tile with genre and platform badges

This note walks through how **`GameCard`** is built in **`GameCard.tsx`**: Tailwind layering on the card shell, image, typography, and the favorite affordance; where **`game`** and **`genre`** come from; and how **platforms** are taken from the RAWG-shaped **`RawgGame`** object, filtered, and rendered as compact labels.

---

## Where this lives

| Piece | Role |
|--------|------|
| **`GameCard.tsx`** | Presentational component: one **`<li>`** card with image, title, genre line, platform chips, and a heart button. |
| **`Genres.tsx`** | Page: loads games for the route’s genre id, resolves the genre **name** for the section title and for each card, maps **`games`** → **`GameCard`**. |
| **`api/games.ts`** | Defines **`RawgGame`** (including optional **`platforms`**). |
| **`api/genres.ts`** | **`fetchGamesByGenre`** returns a **`GamesListResponse`** whose **`results`** are **`RawgGame[]`**. |

**Composition (current):**

```
Genres
├── BackToHome
├── SectionTitle  (genre name from API)
└── ul (grid)
    └── GameCard  (per game) → li
        ├── div (aspect-square) → img
        ├── div (meta: title + row)
        └── button (heart, absolute)
```

---

## Data flow — from route to props

1. **`useParams()`** in **`Genres`** reads **`genreId`** from the URL.
2. **`useEffect`** runs when **`genreId`** changes. It **`Promise.all`**:
   - **`fetchGamesByGenre(Number(genreId))`** → RAWG **`/games?genres={id}`** → **`games.results`** stored in state.
   - **`fetchGameGenres()`** → list of genres → **`find`** by id → **`setGenre(genreById.name)`** for the human-readable label.
3. The page renders **`games.map((game) => <GameCard key={game.id} game={game} genre={genre ?? ""} />)`**.
4. **`GameCard`** does **not** fetch data: it receives **`game: RawgGame`** and **`genre: string`** already resolved upstream.

**`RawgGame` fields used here:**

| Field | Use in `GameCard` |
|--------|-------------------|
| **`id`** | React **`key`** on the parent **`Genres`** list (not inside **`GameCard`**). |
| **`name`** | **`alt`** on the image and visible **title**. |
| **`background_image`** | **`src`**, with **`?? ""`** if null. |
| **`platforms`** | Optional array of **`{ platform: { id, name, slug } }`** — filtered and mapped to badges. |

---

## Platforms — where they come from and how they render

**Source:** Each **`RawgGame`** from the games list endpoint can include a **`platforms`** array (same shape as in **`RawgGame`** in **`games.ts`**). No separate “platforms API” call runs inside **`GameCard`**; platforms ride along on the game object.

**Selection logic (in JSX):**

1. **`game?.platforms?.filter(...)`** — safely handles missing **`platforms`** (renders **no** badges).
2. **Keep only** entries whose **`platform.platform.name`** is exactly one of:
   - **`"PC"`**
   - **`"PlayStation 5"`**
   - **`"Xbox Series S/X"`**
3. **`.map`** over the filtered list to render one **`<h4>`** per platform, keyed by **`platform.platform.id`**.

**Display names:** RAWG uses long names; the UI shortens them for space:

| RAWG `platform.platform.name` | Shown text |
|-------------------------------|------------|
| **`PlayStation 5`** | **`PS5`** |
| **`Xbox Series S/X`** | **`XBOX`** |
| **`PC`** | **`PC`** (unchanged) |

**Layout:** A row **`flex justify-between`** splits **genre** (left, **`basis-1/2`**) and **platforms** (right, **`basis-1/2 flex justify-end gap-1`**). Multiple platforms appear as sibling chips with **`gap-1`**.

---

## How to read the Tailwind on the card (outside → in)

The root is a **`<li>`** with **`group`** so children can use **`group-hover:`**. Think in layers: **box + interaction**, then **media**, then **text block**, then **floating control**.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Interactive root          group relative … my-auto        │
│ 2. Shape & clip              rounded-2xl overflow-hidden     │
│ 3. Fill & edge               gradient, border, hover border │
│ 4. Motion                    transition, scale, shadow       │
│ 5. Image stage               aspect-square + img object-cover  │
│ 6. Footer content            padding, flex column, title row │
│ 7. Favorite                  absolute button top-right       │
└─────────────────────────────────────────────────────────────┘
```

Below, the main regions match the order they appear in the TSX.

---

## Root **`<li>`** — card shell

| Class / group | What it does |
|----------------|--------------|
| **`group`** | Hover/focus root for **`group-hover:`** on the image, title, genre span, platform text, and heart icon. |
| **`relative`** | Positioning context for the **absolutely positioned** favorite button. |
| **`rounded-2xl`** | Large radius on the whole card. |
| **`overflow-hidden`** | Clips the image and inner content to the rounded rect. |
| **`bg-gradient-to-br from-slate-800 to-slate-900`** | Dark slate gradient (same family as **`GenreCard`**). |
| **`border border-slate-700/50`** | Soft edge; **`hover:border-purple-500/50`** on hover. |
| **`transition-all duration-300`** | Smooth changes for border/transform/shadow on the shell. |
| **`hover:scale-105`** · **`hover:shadow-xl`** · **`hover:shadow-purple-500/20`** | Slight lift and purple-tinted shadow on hover—aligned with the home purple accent. |
| **`my-auto`** | Vertical centering assist when the card sits in a grid row with uneven content. |

---

## Image block

| Element | Classes | What it does |
|---------|---------|--------------|
| Wrapper **`div`** | **`aspect-square overflow-hidden`** | Square crop below the card’s top; width follows the grid column. |
| **`img`** | **`w-full h-full object-cover`** | Fills the square; crops proportionally. |
| **`img`** | **`group-hover:scale-110 transition-transform duration-300`** | Subtle zoom on card hover (nested motion inside the card’s **`group`**). |
| **`alt`** | **`game.name`** | Accessible label. |
| **`src`** | **`game?.background_image ?? ""`** | Fallback to empty string if the API omits art. |

---

## Title and meta row

| Element | Notable classes | What it does |
|---------|-----------------|----------------|
| **`h3`** | **`line-clamp-1 group-hover:line-clamp-none`** | One line by default; expands to full title on hover. |
| **`h3`** | **`group-hover:text-purple-400`** | Title shifts accent on hover. |
| Genre **`span`** | **`group-hover:bg-gradient-to-br from-purple-700/80 to-blue-600/80`** + **`bg-clip-text`** + **`text-transparent`** | On hover, genre label reads as a gradient fill. |
| Row **`div`** | **`flex justify-between`** | Genre left, platforms right. |
| Platform **`h4`** | **`bg-slate-700/50 rounded-md px-2 py-1`** | Chip look; **`group-hover:`** variants add purple border/background emphasis. |
| Platform inner **`span`** | Same gradient text trick as genre | Chips match the genre hover treatment. |

---

## Favorite button

| Class | What it does |
|--------|--------------|
| **`absolute top-2 right-2`** | Pins the control to the top-right of the **`relative`** **`li`**. |
| **`p-2`** · **`rounded-full`** | Circular hit target. |
| **`bg-slate-900/70`** | Semi-opaque plate over the artwork. |
| **`hover:bg-slate-900`** · **`hover:shadow-sm`** · **`hover:shadow-purple-500/60`** · **`hover:scale-105`** | Local hover feedback on the button. |
| **`HeartIcon`** | **`group-hover:text-purple-400`** ties the icon to card hover. |

The button has **no **`onClick`** handler** in the current source—it is visual only unless wired later.

---

## Full reference: root **`className`** (one line)

For copy-paste comparison with the source file, the **`li`** uses:

```txt
group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900
border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300
hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 my-auto
```

(Line breaks here are for reading only; in TSX it is a single **`className`** string.)

---

## File reference

- **`client/src/shared-components/GameCard.tsx`** — **`GameCard`** component.
- **`client/src/Pages/Genres/Genres.tsx`** — Fetches games and genre name; renders the grid of **`GameCard`** instances.
- **`client/src/api/games.ts`** — **`RawgGame`** type.
- **`client/src/api/genres.ts`** — **`fetchGamesByGenre`**, **`fetchGameGenres`**.

---

## Patterns you can reuse

1. **`group` on the card** — One hover root drives image zoom, title, genre gradient, platform chips, and icon—no per-child pointer tracking.
2. **Platforms from the game payload** — Filter/map in the view keeps **`GameCard`** free of extra requests; adjust the allowlist or labels in one place.
3. **Optional chaining on `platforms`** — **`game?.platforms?.filter`** avoids runtime errors when RAWG omits the array.
4. **Short labels for chips** — Map long API strings to **`PS5`** / **`XBOX`** so the **`basis-1/2`** row stays readable on small widths.

When **`GameCard`** gains navigation or favorites behavior, keep the **presentational** class structure on the **`li`** and add **behavior** via props or wrapper components without duplicating the Tailwind layers.
