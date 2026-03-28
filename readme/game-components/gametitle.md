# `GameTitle` component (game name + favorites affordance)

**Location:** `client/src/Pages/Game/GameTitle.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Lucide **`HeartIcon`**  
**Purpose:** Single row with the game **`h1`** and a **heart** button (visual placeholder for “add to favorites”; no **`onClick`** handler in current source).

Used by **`RightHalf`** (see [`righthalf.md`](./righthalf.md)).

---

## 1. Props

```tsx
type GameTitleProps = {
  name: string;
};
```

---

## 2. Visual structure

```txt
GameTitle
└── div.flex.justify-between
    ├── h1 (responsive display size)
    └── button (heart)
```

**ASCII**

```txt
┌────────────────────────────────────────────┐
│  Game Name Here                    [ ♥ ]   │
└────────────────────────────────────────────
```

---

## 3. Reference JSX

```tsx
export function GameTitle({ name }: GameTitleProps) {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl sm:text-5xl font-bold text-white/90">
        {name || "Game Name Not Found"}
      </h1>
      <button
        className="group p-3 md:p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl hover:shadow-sm hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
        type="button"
        aria-label={`Add ${name} to favorites`}
      >
        <HeartIcon
          className="w-6 h-6 text-purple-400 my-auto group-hover:text-purple-600/ transition-colors duration-200"
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </div>
  );
}
```

---

## 4. Tailwind — `h1`

| Classes | Effect |
|---------|--------|
| `text-4xl sm:text-5xl` | **Mobile-first:** base size, steps up at **`sm`**. |
| `font-bold text-white/90` | Weight and softened white. |

---

## 5. Tailwind — `button`

| Classes | Effect |
|---------|--------|
| `group` | Enables **`group-hover:`** on the icon. |
| `p-3 md:p-4` | Larger hit area from **`md`**. |
| `bg-slate-800 hover:bg-slate-700` | Filled chip; darkens on hover. |
| `rounded-2xl` | Rounded rectangle control. |
| `hover:shadow-sm hover:shadow-purple-500/40` | Subtle purple-tinted shadow. |
| `hover:scale-105` | Slight grow on hover. |
| `transition-all duration-200` | Smooth hover feedback. |

---

## 6. Accessibility

- **`button type="button"`** — avoids accidental form submission.
- **`aria-label`** on the button describes favorites intent.
- **`HeartIcon`** — **`aria-hidden`** + **`focusable="false"`** so the label names the control.

---

## 7. Related docs

- Parent: [`righthalf.md`](./righthalf.md)
