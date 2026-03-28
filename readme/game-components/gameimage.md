# `GameImage` component (hero image frame)

**Location:** `client/src/Pages/Game/GameImage.tsx`  
**Stack:** React + TypeScript + Tailwind CSS  
**Purpose:** **Aspect-ratio frame** with rounded corners and border; inner **`img`** uses **`object-cover`** so artwork fills the box without distortion. Used in **`LeftHalf`** for the game’s **`background_image`**.

See [`lefthalf.md`](./lefthalf.md).

---

## 1. Props

```tsx
type GameImageProps = {
  src: string;
  alt: string;
};
```

| Prop | Typical source |
|------|----------------|
| `src` | `game.background_image` (may be empty). |
| `alt` | `game.name` |

---

## 2. Visual structure

```txt
GameImage
└── div (aspect + clip + border)
    └── img
```

**ASCII**

```txt
╭────────────────────────────────╮
│                                │
│   cover art (cropped to fit)   │
│                                │
╰────────────────────────────────╯
```

---

## 3. Reference JSX

```tsx
export function GameImage({ src, alt }: GameImageProps) {
  return (
    <div className="aspect-rectangle overflow-hidden rounded-2xl border border-slate-700/50">
      <img src={src || ""} alt={alt || ""} className="w-full h-full object-cover" />
    </div>
  );
}
```

---

## 4. Tailwind — wrapper `div`

| Classes | Effect |
|---------|--------|
| `aspect-rectangle` | **Custom aspect ratio** — ensure this token is defined in your Tailwind theme (e.g. `theme.extend.aspectRatio`) or replace with a standard token such as **`aspect-video`** / **`aspect-[16/9]`** if **`rectangle`** is not configured. |
| `overflow-hidden` | Clips the image to the rounded rect. |
| `rounded-2xl border border-slate-700/50` | Large radius + soft edge (aligned with other GameHub cards). |

---

## 5. Tailwind — `img`

| Classes | Effect |
|---------|--------|
| `w-full h-full` | Fills the aspect box. |
| `object-cover` | Scales and crops to cover; preserves aspect ratio. |

---

## 6. Related docs

- Parent: [`lefthalf.md`](./lefthalf.md)
