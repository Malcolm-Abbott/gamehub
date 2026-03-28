# `LeftHalf` component (Game page — left column)

**Location:** `client/src/Pages/Game/LeftHalf.tsx`  
**Stack:** React + TypeScript + Tailwind CSS  
**Purpose:** Compose the left column of the game detail page: hero image, responsive `RightHalf` slot, and the “Watch Trailer” card (title + `<Trailer />`).

---

## 1. Role and prop contract

`LeftHalf` is a **layout / composition** component. It receives **`game`** and **`trailers`** from `Game.tsx`, derives the first trailer’s **URL** and **poster**, and passes those primitives into **`Trailer`** so playback state stays encapsulated inside the trailer UI.

### TypeScript interface

```tsx
interface LeftHalfProps {
    game: RawgGameDetail;
    trailers: RawgGameMovie[];
}
```

| Prop | Source (typical) | Used for |
|------|------------------|----------|
| `game` | `fetchGameById` (`RawgGameDetail`) | `GameImage` (`background_image`, `name`) |
| `trailers` | `fetchGameTrailers` (`RawgGameMovie[]`) | Derive `trailerUrl` + `preview` for `Trailer` |

---

## 2. Visual component tree

Think of the page as a **vertical stack**; on large screens, `RightHalf` also appears in a **sibling column** in `Game.tsx` (see layout note below).

```txt
LeftHalf
└── div.flex.flex-col                    ← column wrapper (gap-6 / lg:gap-8)
    ├── GameImage                        ← hero / background art
    ├── div.lg:hidden                    ← mobile / tablet only
    │   └── RightHalf
    └── div (trailer card shell)
        ├── WatchTrailerTitle            ← icon + “Watch Trailer” heading
        └── Trailer                      ← 16:9 video + overlay (owns state)
```

### Responsive layout (where `RightHalf` lives)

`Game.tsx` places **`LeftHalf`** and **`RightHalf`** in a grid at `lg+`. Inside **`LeftHalf`**, **`RightHalf`** is rendered **only below `lg`** so small viewports still see metadata without an empty column.

```txt
viewport < lg                         viewport ≥ lg (simplified)
┌─────────────────────┐              ┌──────────────┬──────────────┐
│ GameImage           │              │ LeftHalf     │ RightHalf    │
│ RightHalf (here)    │              │ (no in-slot  │ (column)     │
│ Trailer card        │              │  RightHalf)  │              │
└─────────────────────┘              └──────────────┴──────────────┘
```

---

## 3. Data flow (parent → children)

`LeftHalf` does **not** own `isPlaying` or `videoRef` — those live inside **`Trailer`**. The parent only **normalizes API data** into strings the trailer block can consume.

```tsx
// Derived once per render from RAWG-shaped `trailers`
const trailerUrl = trailers[0]?.data["max"] ?? trailers[0]?.data["480"];
const preview = trailers[0]?.preview ?? "";
```

```txt
trailers: RawgGameMovie[]
        │
        ├─► trailers[0]?.data["max"] ?? trailers[0]?.data["480"]  ──► trailerUrl  ──► Trailer
        └─► trailers[0]?.preview ?? ""                              ──► preview   ──► Trailer
```

**Example** (shape only — URLs illustrative):

```tsx
<Trailer trailerUrl={trailerUrl} preview={preview} />
```

When there is no first movie or no `max`/`480` URL, `trailerUrl` is **falsy** at runtime; **`Trailer`** handles empty / unavailable UI internally (see [`trailer.md`](./trailer.md)).

---

## 4. File structure (split components)

| File | Responsibility |
|------|----------------|
| `LeftHalf.tsx` | Column layout, derive `trailerUrl` / `preview`, compose children |
| `GameImage.tsx` | Framed hero `img` (aspect + border + cover) — see [`gameimage.md`](./gameimage.md) |
| `WatchTrailerTitle.tsx` | Section heading row (Play icon + title) — see [`watchtrailertitle.md`](./watchtrailertitle.md) |
| `Trailer.tsx` | 16:9 area, `<video>`, placeholder, centered overlay (`group` + gradient play pill + `PlayIcon` on `sm+`), local state/ref — see [`trailer.md`](./trailer.md) |
| `RightHalf.tsx` | Right-column content (also mirrored under `lg` here) — see [`righthalf.md`](./righthalf.md) |

---

## 5. `LeftHalf` JSX (reference)

```tsx
export function LeftHalf({ game, trailers }: LeftHalfProps) {
    const trailerUrl = trailers[0]?.data["max"] ?? trailers[0]?.data["480"];
    const preview = trailers[0]?.preview ?? "";

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            <GameImage src={game?.background_image ?? ""} alt={game?.name} />
            <div className="lg:hidden">
                <RightHalf />
            </div>
            <div className="p-4 flex flex-col gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
                <WatchTrailerTitle />
                <Trailer trailerUrl={trailerUrl} preview={preview} />
            </div>
        </div>
    );
}
```

---

## 6. Tailwind — outer column + trailer card

### Column wrapper

| Classes | Effect |
|---------|--------|
| `flex flex-col gap-6 lg:gap-8` | Vertical stack; slightly larger gap from `lg` up. |

### Trailer card shell (wraps title + `Trailer`)

| Classes | Effect |
|---------|--------|
| `p-4 flex flex-col gap-4` | Padding; vertical stack of header + player. |
| `bg-gradient-to-br from-slate-800 to-slate-900` | Dark diagonal gradient (GameHub panel look). |
| `rounded-2xl border border-slate-700/50` | Rounded card with soft border. |

---

## 7. Accessibility & semantics

- **`GameImage`:** receives `alt={game?.name}` for the hero image.
- **Section title:** `WatchTrailerTitle` uses a real **`<h2>`** for the “Watch Trailer” heading (see that file).
- **Trailer controls:** overlay **`button`**, `aria-label`, and unavailable copy are implemented in **`Trailer`** (see [`trailer.md`](./trailer.md)).

---

## 8. Related docs

- **Trailer player behavior, overlay, Tailwind detail:** [`trailer.md`](./trailer.md)
- **Game route grid and data loading:** [`game.md`](./game.md)
- **Hero image component:** [`gameimage.md`](./gameimage.md)
- **“Watch Trailer” heading:** [`watchtrailertitle.md`](./watchtrailertitle.md)
- **Fetching games / trailers (API):** [`../fetchlogic.md`](../fetchlogic.md)
