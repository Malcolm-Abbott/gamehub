# `GameGenres` component (genre chip row)

**Location:** `client/src/Pages/Game/GameGenres.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Lucide **`ShapesIcon`**  
**Purpose:** Display **`genres`** from **`RawgGameDetail`** as a **horizontal wrap row** of gradient-text chips beside a pink category icon.

Composed by **`RightHalf`** — see [`righthalf.md`](./righthalf.md).

---

## 1. Props

```tsx
type GameGenresProps = {
  genres: { id: number; name: string; slug: string }[];
};
```

---

## 2. Visual structure

```txt
GameGenres
└── div.flex.gap-2
    ├── ShapesIcon
    └── ul.flex.flex-wrap.flex-1.gap-2
        └── li × N
            └── span (gradient text)
```

**ASCII**

```txt
◇  [ Action ] [ RPG ] [ Open World ]
     ↑ flex-wrap continues on next line if needed
```

---

## 3. Mapping logic

```tsx
{genres?.map((genre) => (
  <li key={genre.id} className="…">
    <span className="bg-gradient-to-br from-purple-700/80 to-blue-600/80 bg-clip-text text-transparent font-bold">
      {genre.name}
    </span>
  </li>
))}
```

Optional chaining on **`genres?.map`** avoids errors if **`genres`** is missing (parent typically passes **`[]`**).

---

## 4. Reference JSX

```tsx
export function GameGenres({ genres }: GameGenresProps) {
  return (
    <div className="flex gap-2">
      <ShapesIcon className="w-8 h-8 text-pink-300/80 my-auto" aria-hidden="true" focusable="false" />
      <ul className="flex flex-wrap flex-1 gap-2 cursor-default">
        {genres?.map((genre) => (
          <li
            key={genre.id}
            className="sm:text-lg font-medium bg-pink-700/10 border border-purple-500/50 rounded-md px-3 py-1"
          >
            <span className="bg-gradient-to-br from-purple-700/80 to-blue-600/80 bg-clip-text text-transparent font-bold">
              {genre.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5. Tailwind — layout row

| Element | Classes | Effect |
|---------|---------|--------|
| Wrapper | `flex gap-2` | Icon + list side by side. |
| **`ShapesIcon`** | `w-8 h-8 text-pink-300/80 my-auto` | Fixed icon size; vertical center. |
| **`ul`** | `flex flex-wrap flex-1 gap-2 cursor-default` | Chips wrap; **not** a link list (`cursor-default`). |

---

## 6. Tailwind — chips (`li`)

| Classes | Effect |
|---------|--------|
| `sm:text-lg` | **Mobile-first:** larger chip text from **`sm`** up (aligned with **`GamePlatforms`**). |
| `font-medium` | On **`li`**; inner **`span`** uses **`font-bold`** for the gradient label. |
| `bg-pink-700/10` | Soft pink wash. |
| `border border-purple-500/50` | Purple outline. |
| `rounded-md px-3 py-1` | Compact pill shape. |

---

## 7. Gradient text (`span`)

| Classes | Effect |
|---------|--------|
| `bg-gradient-to-br from-purple-700/80 to-blue-600/80` | Diagonal fill. |
| `bg-clip-text text-transparent` | Clip gradient to glyphs. |

---

## 8. Related docs

- Platform chips (same layout pattern): [`gameplatforms.md`](./gameplatforms.md)
- Parent: [`righthalf.md`](./righthalf.md)
