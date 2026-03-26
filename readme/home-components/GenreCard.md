# `GenreCard`: building a styled navigation card

This note walks through how **`GenreCard`** is built in **`GenresHome.tsx`**: why it is a **`Link`**, how the Tailwind classes layer from layout to hover effects, and a mental model you can reuse for other clickable cards.

---

## Where this lives

| Piece | Role |
|--------|------|
| **`GenresHome.tsx`** | Section: `SectionTitle` + grid of genre cards. |
| **`GenreCard`** | Local function component: one card, implemented as a **`Link`** with utility classes for look and feel. |

**Composition (current):**

```
GenresHome
├── SectionTitle  ("Browse by Genre")
└── div (grid)
    └── GenreCard  → <Link to="..." className="..." />
```

---

## Why a `Link` instead of `<a>` or `<div onClick>`?

The app uses **React Router**. A **`Link`** from `react-router-dom`:

- Navigates **client-side** (no full page reload for in-app routes).
- Renders a real **`<a href="...">`** in the DOM, so it stays **keyboard-accessible**, **right-click → open in new tab** works, and screen readers treat it as a link.

Styling applies to the **same element** that handles navigation: one component, one `className` string, predictable behavior.

---

## How to read the `className` string (order of thinking)

Treat the classes as **layers**, not a random bag. Read **outside → in**: interaction area, then box model, then paint, then motion.

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Role & future child styling   group                      │
│ 2. Positioning for overlays      relative                   │
│ 3. Shape & aspect                aspect-square rounded-2xl   │
│ 4. Clipping                       overflow-hidden             │
│ 5. Fill (background)              bg-gradient-to-br …         │
│ 6. Edge                           border …                  │
│ 7. Hover polish                   hover:… transition …       │
└─────────────────────────────────────────────────────────────┘
```

Below, each layer is spelled out in the same order they appear in code.

---

## Layer 1 — `group`

| Class | What it does |
|--------|----------------|
| **`group`** | Marks this element as a **named hover/focus root** for children. Descendants can use **`group-hover:…`** so that hovering **anywhere on the card** can change text, icons, or overlays—even before you add those children. |

The card is empty today, but **`group`** is already there so you can add inner content later without restructuring.

---

## Layer 2 — `relative`

| Class | What it does |
|--------|----------------|
| **`relative`** | `position: relative`. Gives this box a **positioning context** so absolutely positioned children (badges, gradients, icons in a corner) align to the card, not the viewport. |

---

## Layer 3 — `aspect-square` + `rounded-2xl`

| Class | What it does |
|--------|----------------|
| **`aspect-square`** | Keeps **width and height equal** (1:1). In a CSS grid, width often comes from the column; height follows so every card stays the same silhouette. |
| **`rounded-2xl`** | Large **border radius** so the card reads as a soft tile, not a sharp rectangle. |

---

## Layer 4 — `overflow-hidden`

| Class | What it does |
|--------|----------------|
| **`overflow-hidden`** | Clips anything that sticks past the rounded box (images, pseudo-elements, scaled children). Without it, **corners can look wrong** when inner content or effects extend past the curve. |

---

## Layer 5 — gradient background

| Class | What it does |
|--------|----------------|
| **`bg-gradient-to-br`** | Linear gradient toward **bottom-right**. |
| **`from-slate-800`** | Gradient **start** color. |
| **`to-slate-900`** | Gradient **end** color—slightly darker for depth. |

Together: a **dark slate panel** that still feels dimensional, not flat gray.

---

## Layer 6 — border

| Class | What it does |
|--------|----------------|
| **`border`** | Default **1px** border on all sides. |
| **`border-slate-700/50`** | Color **slate-700** at **50% opacity** (`/50`). Soft edge that does not overpower the gradient. |
| **`hover:border-purple-500/50`** | On hover, border shifts toward **purple** at 50% opacity—subtle **accent** tied to the home theme (see `SectionTitle` / hero purples). |

---

## Layer 7 — transitions and hover motion

| Class | What it does |
|--------|----------------|
| **`transition-all`** | Animate properties that Tailwind’s transition plugin covers when they change (border, transform, shadow, etc.). |
| **`duration-300`** | **300ms**—long enough to feel smooth, short enough to feel snappy. |
| **`hover:scale-105`** | Slight **zoom** on hover (105%). |
| **`hover:shadow-xl`** | Stronger **elevation** shadow on hover. |
| **`hover:shadow-purple-500/20`** | Shadow with a **purple tint** at 20% opacity so the lift reads as **on-brand**, not neutral gray only. |

**Intuition:** default state = calm tile; hover = slightly larger, brighter edge, colored glow—**feedback** that the whole card is interactive.

---

## Full reference: one line, full class list

For copy-paste comparison with the source file, the **`Link`** uses:

```txt
group relative aspect-square rounded-2xl overflow-hidden
bg-gradient-to-br from-slate-800 to-slate-900
border border-slate-700/50 hover:border-purple-500/50
transition-all duration-300
hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20
```

(Line breaks here are for reading only; in TSX it is a single `className` string.)

---

## File reference

- **`client/src/Pages/Home/GenresHome.tsx`** — exports **`GenresHome`**, defines **`GenreCard`** (local), uses **`Link`** from **`react-router-dom`** with **`to={`/genres/${genre.id}`}`** to route into the genre page.

---

## Skills you can carry to other cards

1. **Pick the right interactive primitive** — Router app → **`Link`** for in-app navigation; keep semantics and a11y for free.
2. **Layer Tailwind** — interaction root (`group`) → layout (`relative`, `aspect-*`) → clip (`overflow-hidden`) → paint (gradient, border) → motion (`transition`, `hover:*`).
3. **Use opacity modifiers** — `slate-700/50`, `purple-500/20` keep borders and shadows **soft** and tunable without new CSS variables.
4. **Reserve `group` early** — if the card will get labels or icons, **`group` + `group-hover:`** on children avoid “only the text is hoverable” bugs.

When **`GenreCard`** accepts props (`to`, `title`, `children`, image URL), keep the **same class string** on the **`Link`** and pass **data** as props—structure stays stable as content grows.
