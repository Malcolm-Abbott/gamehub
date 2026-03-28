# `WatchTrailerTitle` component (trailer section heading)

**Location:** `client/src/Pages/Game/WatchTrailerTitle.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Lucide **`PlayIcon`**  
**Purpose:** Single row: **purple play icon** + **`h2`** “Watch Trailer”, used as the **header** above the **`Trailer`** player inside the trailer card on **`LeftHalf`**.

See [`lefthalf.md`](./lefthalf.md) and [`trailer.md`](./trailer.md).

---

## 1. Props

None — the component is **static** (no props).

---

## 2. Visual structure

```txt
WatchTrailerTitle
└── div.flex.items-center.gap-4
    ├── PlayIcon
    └── h2
```

**ASCII**

```txt
▶  Watch Trailer
```

---

## 3. Reference JSX

```tsx
export function WatchTrailerTitle() {
  return (
    <div className="flex items-center gap-4">
      <PlayIcon className="w-6 h-6 text-purple-400" />
      <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Watch Trailer</h2>
    </div>
  );
}
```

---

## 4. Tailwind reference

| Element | Classes | Effect |
|---------|---------|--------|
| Wrapper | `flex items-center gap-4` | Icon and title aligned on one row with comfortable spacing. |
| **`PlayIcon`** | `w-6 h-6 text-purple-400` | Fixed size; theme purple. |
| **`h2`** | `text-2xl sm:text-3xl font-bold text-white/90` | **Same section title scale** as Description / Visit Official in **`RightHalf`** (see [`righthalf.md`](./righthalf.md), [`visitofficial.md`](./visitofficial.md)). |

---

## 5. Accessibility

- The section name is carried by the **`h2`**; the play icon is visual reinforcement alongside that heading.

---

## 6. Related docs

- Parent card composition: [`lefthalf.md`](./lefthalf.md)
- Video player: [`trailer.md`](./trailer.md)
