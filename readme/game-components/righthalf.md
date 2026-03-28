# `RightHalf` component (game detail — right column content)

**Location:** `client/src/Pages/Game/RightHalf.tsx`  
**Stack:** React + TypeScript + Tailwind CSS  
**Purpose:** Compose the **metadata column** for the game page: title row (**`GameTitle`**), **genre** and **platform** chip rows, **description** panel, and **official website** block (**`VisitOfficial`**), each wrapped in **`GameSectionPanel`** where appropriate.

For **where** this component mounts (desktop column vs mirrored under **`LeftHalf`** on small screens), see [`game.md`](./game.md).

---

## 1. Props

```tsx
type RightHalfProps = {
  game: RawgGameDetail;
};
```

| Prop | Use |
|------|-----|
| `game` | Source for **`name`**, **`genres`**, **`platforms`**, **`description_raw`**, **`website`**. |

---

## 2. Visual component tree

```txt
RightHalf
└── div.flex.flex-col.gap-6.lg:gap-8.lg:py-3.lg:px-8
    ├── GameTitle
    ├── GameGenres
    ├── GamePlatforms
    ├── GameSectionPanel
    │   ├── h2 "Description"
    │   └── p (line-clamped body)
    └── GameSectionPanel
        └── VisitOfficial
```

**ASCII (section order)**

```txt
┌──────────────────────────────┐
│ GameTitle (h1 + favorites)    │
├──────────────────────────────┤
│ ShapesIcon + genre chips      │
├──────────────────────────────┤
│ MonitorIcon + platform chips  │
├──────────────────────────────┤
│ [Panel] Description + text    │
├──────────────────────────────┤
│ [Panel] Visit Official + link │
└──────────────────────────────┘
```

---

## 3. Data passed to children

| Child | Props derived from `game` |
|--------|---------------------------|
| **`GameTitle`** | `name={game?.name ?? "Game Name Not Found"}` |
| **`GameGenres`** | `genres={game?.genres ?? []}` |
| **`GamePlatforms`** | `platforms={game?.platforms ?? []}` |
| **Description** | `game?.description_raw` |
| **`VisitOfficial`** | `website={game?.website ?? "#"}`, `name={game?.name ?? "Game Name Not Found"}` |

---

## 4. Reference JSX

```tsx
export function RightHalf({ game }: RightHalfProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 lg:py-3 lg:px-8">
      <GameTitle name={game?.name ?? "Game Name Not Found"} />
      <GameGenres genres={game?.genres ?? []} />
      <GamePlatforms platforms={game?.platforms ?? []} />
      <GameSectionPanel>
        <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Description</h2>
        <p className="line-clamp-4 leading-relaxed text-white/90 md:line-clamp-5">
          {game?.description_raw ?? "Game Description Not Found"}
        </p>
      </GameSectionPanel>
      <GameSectionPanel>
        <VisitOfficial
          website={game?.website ?? "#"}
          name={game?.name ?? "Game Name Not Found"}
        />
      </GameSectionPanel>
    </div>
  );
}
```

---

## 5. Tailwind — column wrapper

| Classes | Effect |
|---------|--------|
| `flex flex-col gap-6 lg:gap-8` | Vertical stack; larger gap from **`lg`**. |
| `lg:py-3 lg:px-8` | Extra padding only in the **desktop column** context. |

---

## 6. Section headings and description body

| Element | Notable classes | Notes |
|---------|-----------------|--------|
| **Description `h2`** | `text-2xl sm:text-3xl` | Matches section title scale used in **`VisitOfficial`** / **`WatchTrailerTitle`**. |
| **Description `p`** | `line-clamp-4` · `md:line-clamp-5` | Truncates long copy; **no** responsive **`text-*`** on the paragraph (inherits default size). |

---

## 7. Related docs

| Component | Doc |
|-----------|-----|
| Page grid | [`game.md`](./game.md) |
| Panel shell | [`gamesectionpanel.md`](./gamesectionpanel.md) |
| Title row | [`gametitle.md`](./gametitle.md) |
| Genres / platforms | [`gamegenres.md`](./gamegenres.md), [`gameplatforms.md`](./gameplatforms.md) |
| Website block | [`visitofficial.md`](./visitofficial.md) |
