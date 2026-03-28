# `GamePlatforms` component (platform chip row)

**Location:** `client/src/Pages/Game/GamePlatforms.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Lucide **`MonitorIcon`**  
**Purpose:** Show **filtered** platform chips (PC, PS5, Xbox Series) from **`RawgGameDetail.platforms`**, with **short labels** for long names, beside a blue monitor icon.

Composed by **`RightHalf`** — see [`righthalf.md`](./righthalf.md).

---

## 1. Props

```tsx
type GamePlatformsProps = {
  platforms: { platform: { id: number; name: string; slug: string } }[];
};
```

---

## 2. Filter and display names

Only these **`platform.platform.name`** values are kept:

- **`"PC"`**
- **`"PlayStation 5"`**
- **`"Xbox Series S/X"`**

**Display mapping**

| RAWG name | Shown text |
|-----------|------------|
| `PlayStation 5` | **`PS5`** |
| `Xbox Series S/X` | **`XBOX`** |
| `PC` | **`PC`** |

```tsx
platform.platform.name === "PlayStation 5"
  ? "PS5"
  : platform.platform.name === "Xbox Series S/X"
    ? "XBOX"
    : platform.platform.name
```

---

## 3. Visual structure

```txt
GamePlatforms
└── div.flex.gap-2
    ├── MonitorIcon
    └── ul.flex.flex-wrap.flex-1.gap-2
        └── li × N (filtered)
            └── span (gradient text)
```

**ASCII**

```txt
🖥  [ PC ] [ PS5 ] [ XBOX ]
```

---

## 4. Reference JSX

```tsx
export function GamePlatforms({ platforms }: GamePlatformsProps) {
  return (
    <div className="flex gap-2">
      <MonitorIcon className="w-8 h-8 text-blue-300/80 my-auto" aria-hidden="true" focusable="false" />
      <ul className="flex flex-wrap flex-1 gap-2 cursor-default">
        {platforms
          ?.filter(
            (platform) =>
              platform.platform.name === "PC" ||
              platform.platform.name === "PlayStation 5" ||
              platform.platform.name === "Xbox Series S/X"
          )
          .map((platform) => (
            <li
              key={platform?.platform?.id}
              className="sm:text-lg font-medium bg-blue-600/10 border border-blue-600/50 rounded-md px-3 py-1"
            >
              <span className="bg-gradient-to-br to-purple-700/80 from-blue-600/80 bg-clip-text text-transparent font-bold">
                {platform.platform.name === "PlayStation 5"
                  ? "PS5"
                  : platform.platform.name === "Xbox Series S/X"
                    ? "XBOX"
                    : platform.platform.name}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
```

---

## 5. Parity with `GameGenres`

| Aspect | `GameGenres` | `GamePlatforms` |
|--------|----------------|-----------------|
| Row layout | `flex gap-2` + icon + `ul` | Same |
| **`ul`** | `flex flex-wrap flex-1 gap-2` | Same |
| **`li`** text size | `sm:text-lg` | `sm:text-lg` |
| **`li`** padding / radius | `rounded-md px-3 py-1` | Same |
| Chip color theme | Pink / purple border | Blue / blue border |
| Gradient on **`span`** | purple → blue | blue → purple (reverse diagonal) |

---

## 6. Tailwind — chips (`li`)

| Classes | Effect |
|---------|--------|
| `sm:text-lg` | Matches genre chips — larger text from **`sm`**. |
| `bg-blue-600/10` | Soft blue wash. |
| `border border-blue-600/50` | Blue outline. |

---

## 7. Related docs

- Genre chips: [`gamegenres.md`](./gamegenres.md), [`../shared-components/gamecard.md`](../shared-components/gamecard.md) (similar platform filter on cards)
- Parent: [`righthalf.md`](./righthalf.md)
