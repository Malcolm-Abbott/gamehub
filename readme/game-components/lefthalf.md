# `LeftHalf` component structure (Game page)

**Location:** `client/src/Pages/Game/LeftHalf.tsx`  
**Stack:** React + TypeScript + Tailwind CSS  
**Purpose:** Render the left column of the game detail page (hero image + trailer block with play overlay behavior).

---

## 1. Component role and prop contract

`LeftHalf` is a presentational/detail component that receives game/trailer data from `Game.tsx` and renders:

- A large game background image.
- A "Watch trailers" section title with icon.
- A `<video controls>` player with a conditional play overlay button.

### TypeScript interface

```tsx
interface LeftHalfProps {
    game: RawgGameDetail;
    trailers: RawgGameMovie[];
}
```

- **`game`**: supplies `background_image` and `name`.
- **`trailers`**: array source for trailer video URL and preview image.

---

## 2. High-level JSX structure

```txt
LeftHalf
└── div (column wrapper)
    ├── div (game hero image container)
    │   └── img (game background)
    └── div (trailer card)
        ├── div (section header: icon + title)
        └── div (video wrapper)
            ├── video (native controls)
            └── button (PlayIcon overlay; only when not playing)
```

---

## 3. React state and refs

The component uses one piece of state and one ref:

```tsx
const [isPlaying, setIsPlaying] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);
```

- **`isPlaying`** controls whether the overlay play button is rendered.
- **`videoRef`** gives imperative access to the video element (`play()`).

Playback events drive state:

```tsx
onPlay={() => setIsPlaying(true)}
onPause={() => setIsPlaying(false)}
onEnded={() => setIsPlaying(false)}
```

This keeps UI and actual media state aligned.

---

## 4. Trailer source and poster selection

Current fallback chain:

```tsx
<video
  src={trailers[0]?.data["max"] ?? trailers[0]?.data["480"]}
  poster={trailers[0]?.preview ?? ""}
  // ...
/>
```

- Prefers `max` trailer quality.
- Falls back to `480` quality if `max` is missing.
- Uses `preview` for poster fallback to empty string.

---

## 5. Play overlay behavior

The overlay button only appears when media is not currently playing:

```tsx
{!isPlaying && (
  <button
    type="button"
    className="play-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400 cursor-pointer"
    onClick={() => void videoRef.current?.play()}
    aria-label="Play trailer"
  >
    <PlayIcon className="w-8 h-8" aria-hidden="true" focusable="false" />
  </button>
)}
```

- **`void`** intentionally ignores the `play()` promise return value.
- **Button semantics** improve accessibility vs a plain clickable icon.
- **`aria-label`** gives an accessible control name.
- Icon is decorative (`aria-hidden`, `focusable="false"`).

---

## 6. Tailwind layout/styling breakdown

### Outer column

| Area | Classes | Effect |
|------|---------|--------|
| Layout | `flex flex-col gap-6 lg:gap-8` | Vertical stack with larger spacing on `lg+`. |

### Game image container

| Area | Classes | Effect |
|------|---------|--------|
| Frame | `aspect-rectangle overflow-hidden rounded-2xl border border-slate-700/50` | Fixed ratio frame, clipped corners, subtle border. |
| Image | `w-full h-full object-cover` | Full fill with crop behavior preserved. |

### Trailer card and header

| Area | Classes | Effect |
|------|---------|--------|
| Card shell | `p-4 flex flex-col gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50` | Dark gradient card with spacing and rounded border. |
| Header row | `flex items-center gap-4` | Icon and title aligned in one row. |
| Header icon | `w-6 h-6 text-purple-400` | Accent icon color/size. |
| Title | `text-2xl font-bold text-white` | Section heading emphasis. |

### Video wrapper

| Area | Classes | Effect |
|------|---------|--------|
| Wrapper | `relative aspect-video overflow-hidden rounded-2xl cursor-pointer border border-slate-700/50` | Positions overlay absolutely within a 16:9 clipped frame. |
| Video | `w-full h-full object-cover` | Video fills frame with cover behavior. |
| Overlay button | `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` | Centers play button over video. |

---

## 7. Accessibility details

- Interactive overlay uses a semantic **`<button type="button">`**.
- Explicit control label: **`aria-label="Play trailer"`**.
- Decorative icon is hidden from assistive tech.
- Native video controls retain built-in keyboard and screen-reader support.

---

## 8. Notes for future hardening

- Add explicit empty-state handling when `trailers` is empty.
- Add fallback UI when trailer URL or preview is missing/invalid.
- Optional: include a non-video placeholder panel with copy like "Trailer unavailable."

