# `Game` page (route shell — fetch, grid, compose columns)

**Location:** `client/src/Pages/Game/Game.tsx`  
**Stack:** React + TypeScript + React Router + Tailwind CSS  
**Purpose:** Route component for **`/games/:gameId`**: load **`RawgGameDetail`** and trailer movies in parallel, handle loading/error/empty game, then render **`BackToHome`** and a **responsive two-column grid** with **`LeftHalf`** (image + trailer + mobile **`RightHalf`**) and desktop-only **`RightHalf`**.

---

## 1. Route params and data loading

```tsx
const { gameId } = useParams();
```

| State | Type | Role |
|--------|------|------|
| `game` | `RawgGameDetail \| undefined` | Full game payload from **`fetchGameById`**. |
| `trailer` | `RawgGameMovie[]` | Movies from **`fetchGameTrailers`** (passed as **`trailers`** to **`LeftHalf`**). |
| `isLoading` | `boolean` | Gates **`Loading`** UI. |
| `error` | `unknown` | On catch, shows **`Error`**. |

**Effect (pseudo):**

```tsx
useEffect(() => {
  async function load() {
    try {
      if (!gameId) return;
      const [game, trailer] = await Promise.all([
        fetchGameById(Number(gameId)),
        fetchGameTrailers(Number(gameId)),
      ]);
      setGame(game);
      setTrailer(trailer);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  load();
}, [gameId]);
```

---

## 2. Render branches

```txt
isLoading     →  <Loading />
error         →  <Error />
!game         →  <Error />
else          →  main layout (BackToHome + grid)
```

---

## 3. Visual layout (JSX tree)

```txt
Game
└── div.flex.flex-col.gap-6.lg:gap-8
    ├── BackToHome
    └── div.grid.grid-cols-1.lg:grid-cols-2
        ├── LeftHalf (game, trailers)
        └── div.hidden.lg:block
            └── RightHalf (game)
```

**ASCII — viewport behavior**

```txt
viewport < lg                         viewport ≥ lg
┌─────────────────────┐              ┌────────────────┬────────────────┐
│ BackToHome          │              │ BackToHome     │ (full width)   │
│ LeftHalf            │              ├────────────────┴────────────────┤
│   (includes          │              │ LeftHalf       │ RightHalf      │
│    RightHalf         │              │                │ (desktop only) │
│    under lg)         │              └────────────────┴────────────────┘
└─────────────────────┘
```

**Why `RightHalf` appears twice conceptually**

- **`LeftHalf`** embeds **`RightHalf`** inside **`lg:hidden`** so small screens still see title, genres, platforms, description, and website link.
- **`Game`** renders **`RightHalf`** again inside **`hidden lg:block`** for the **right column** at **`lg+`**.

See [`lefthalf.md`](./lefthalf.md) and [`righthalf.md`](./righthalf.md).

---

## 4. Reference JSX (success path)

```tsx
return (
  <div className="flex flex-col gap-6 lg:gap-8">
    <BackToHome />
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <LeftHalf game={game} trailers={trailer} />
      <div className="hidden lg:block">
        <RightHalf game={game} />
      </div>
    </div>
  </div>
);
```

---

## 5. Tailwind — outer shell

| Classes | Effect |
|---------|--------|
| `flex flex-col gap-6 lg:gap-8` | Vertical stack below the header layout; larger gap from **`lg`**. |
| `grid grid-cols-1 lg:grid-cols-2` | Single column on small screens; **two columns** from **`lg`**. |
| `hidden lg:block` | Right column wrapper: **no** desktop duplicate on narrow viewports. |

---

## 6. Related docs and files

| Topic | Doc / file |
|--------|------------|
| Left column + trailer | [`lefthalf.md`](./lefthalf.md), [`trailer.md`](./trailer.md) |
| Right column sections | [`righthalf.md`](./righthalf.md) |
| Back link | [`../shared-components/backtohome.md`](../shared-components/backtohome.md) |
| API types | `client/src/api/games.ts`, `client/src/api/trailers.ts` |
