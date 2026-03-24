# `GenreCard` overlays: gradient scrim + label layer

This note explains the **two inner `div` elements** in **`GenreCard`** (`GenresHome.tsx`): how they sit on top of the background image, why there are **two** layers instead of one, and how the Tailwind classes map to **positioning**, **readability**, and **hover-linked text**.

---

## Where this lives

| Piece | Role |
|--------|------|
| **`GenresHome.tsx`** | Defines **`GenreCard`**: `Link` → `img` → overlay `div` → label `div`. |
| **First inner `div`** | Full-card **gradient scrim** (darkens toward the bottom so the title stays legible). |
| **Second inner `div`** | **Positioning box** for the genre name: flex layout, text at the bottom center. |

**Composition (inside the `Link`):**

```
GenreCard (Link — group, relative, overflow-hidden, …)
├── img           (fills card, scales on group-hover)
├── div           (absolute inset-0 — gradient scrim)
└── div           (absolute inset-0 — flex; contains <span> title)
```

**Why order matters in the DOM:** the `img` is painted first; each following sibling stacks **on top** in normal stacking order (no `z-index` needed). The scrim darkens the photo; the label `div` sits above the scrim so the text is never obscured by the gradient alone.

---

## Mental model: three stacked planes

Think of the card as **three layers** (bottom → top):

```
┌─────────────────────────────────────────┐
│ 3. Label plane   — name + hover color   │  ← second div (+ span)
├─────────────────────────────────────────┤
│ 2. Scrim plane   — gradient darkening   │  ← first div
├─────────────────────────────────────────┤
│ 1. Image plane   — RAWG artwork        │  ← img
└─────────────────────────────────────────┘
```

The parent **`Link`** already has **`relative`**, so both overlays use **`absolute inset-0`**: they **fill the same rectangle** as the card content box and align to the card’s edges (including inside the rounded corners, because of **`overflow-hidden`** on the `Link`).

---

## Overlay 1 — gradient scrim (`div`)

**Purpose:** keep the **genre name readable** on busy or bright images without a flat opaque bar. A **top-to-bottom** gradient adds most of the darkness **where the text sits** (bottom) and fades out toward the top so the artwork still reads.

### Classes, in reading order

```
┌────────────────────────────────────────────────────────────┐
│ 1. Pin to card        absolute inset-0                      │
│ 2. Paint gradient     bg-gradient-to-t … from … via … to … │
└────────────────────────────────────────────────────────────┘
```

| Class | What it does |
|--------|----------------|
| **`absolute`** | Takes the `div` out of normal flow and positions it relative to the nearest positioned ancestor — here, the **`Link`** (`relative`). |
| **`inset-0`** | Shorthand for **top/right/bottom/left: 0** — the scrim **covers the full card** (same footprint as the image). |
| **`bg-gradient-to-t`** | Linear gradient toward **top** — visually, color stops are measured **from bottom to top** (`from` = bottom edge, `to` = top edge). |
| **`from-slate-900`** | **Bottom** of the card: solid **slate-900** — strongest darkening behind the label. |
| **`via-slate-900/70`** | **Middle** band: same hue at **70% opacity** — softens the transition between heavy bottom and clear top. |
| **`to-transparent`** | **Top** of the card: fully transparent — the upper part of the art stays vivid. |

**Intuition:** the eye reads the **bottom** of the card as “where the title lives”; the gradient **anchors contrast there** without painting a solid rectangle across the whole tile.

---

## Overlay 2 — label container (`div`)

**Purpose:** place the **genre name** consistently at the **bottom center** with padding, independent of image aspect or how the scrim fades.

### Classes, in reading order

```
┌────────────────────────────────────────────────────────────┐
│ 1. Pin to card        absolute inset-0                      │
│ 2. Flex layout        flex items-end justify-center         │
│ 3. Breathing room     p-4                                   │
└────────────────────────────────────────────────────────────┘
```

| Class | What it does |
|--------|----------------|
| **`absolute`** + **`inset-0`** | Same full-card footprint as the scrim — this layer is a **transparent flex box** over the entire card, not a small strip at the bottom. |
| **`flex`** | Flexbox so **one child** (`<span>`) can be aligned with **`items-end`** / **`justify-center`** without guessing line height or using absolute positioning on the text. |
| **`items-end`** | Cross-axis (default column axis is vertical in a row flex — here main axis is horizontal, so **cross axis is vertical**): pushes content to the **bottom** of the flex container. |
| **`justify-center`** | Main axis: **horizontally centers** the label. |
| **`p-4`** | Padding on all sides — keeps the title **off the rounded edge** and matches spacing rhythm with the grid. |

**Why not put `flex` on the scrim `div`?** Mixing **background gradient** and **flex layout** on one element works, but splitting **scrim** vs **typography** keeps responsibilities clear: first `div` = **only** paint; second `div` = **only** layout. You can change gradient stops or swap the label alignment without tangling concerns.

---

## The `<span>` inside overlay 2 (context for the overlays)

The title is not a third overlay `div`; it’s inline text with classes that tie into the parent **`group`** on the `Link`:

| Class | What it does |
|--------|----------------|
| **`text-white`** | Base label color on top of the dark scrim. |
| **`font-bold`** + **`lg:text-lg`** | Emphasis and slightly larger type on large screens. |
| **`group-hover:text-purple-400`** | When the pointer is **anywhere on the card** (`group` on `Link`), the text shifts to **purple** — matches the border/shadow hover on the card. |
| **`transition-colors`** + **`duration-200`** | Smooth color change; slightly **shorter** than the image scale (`300ms`) so the UI feels snappy. |

**Intuition:** **`group`** on the `Link` means hover on the **image**, **scrim**, or **label** all count — the whole card feels like one control.

---

## Full reference: overlay lines (copy-paste)

For side-by-side comparison with the source:

```txt
<!-- Scrim -->
<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>

<!-- Label shell -->
<div className="absolute inset-0 flex items-end justify-center p-4">
  <span className="text-white font-bold lg:text-lg group-hover:text-purple-400 transition-colors duration-200">…</span>
</div>
```

---

## File reference

- **`client/src/Pages/Home/GenresHome.tsx`** — **`GenreCard`**: `Link` + `img` + two overlay `div`s as above.

Related: **`readme/home-components/GenreCard.md`** — outer `Link` layers (`group`, `relative`, gradient fill, border, hover scale/shadow).

---

## Skills you can carry elsewhere

1. **Stack with DOM order** — paint **image → scrim → UI** as siblings; use **`relative` on the parent** and **`absolute inset-0`** on overlays so you rarely need `z-index`.
2. **`bg-gradient-to-t` + `from` / `via` / `to`** — control **where** readability is needed (usually **bottom** for titles); **`via`** softens the band between opaque and clear.
3. **Full-size flex overlay** — **`inset-0` + `flex` + `items-end` + `justify-center`** centers a bottom-aligned label without a separate “footer” height.
4. **`group` + `group-hover:` on text** — one hover target (the card), consistent **accent** on image, border, and typography.

When **`GenreCard`** gains badges or icons, add them **after** the scrim (or give explicit **`z-index`** only if stacking gets ambiguous); keep the scrim as the **lowest** non-image layer so effects stay predictable.
