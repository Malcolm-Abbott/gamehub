# `PlatformCard`: building a text-forward navigation card

This note walks through how **`PlatformCard`** is built in **`PlatformsHome.tsx`**: why it is a **`Link`**, how the Tailwind classes layer from flex layout to hover effects, which **`RawgPlatform`** fields reach the UI, and how that differs from the image-heavy **`GenreCard`** on the home page.

---

## Where this lives

| Piece | Role |
|--------|------|
| **`PlatformsHome.tsx`** | Section wrapper with local spacing: `SectionTitle` + grid of three platform cards (static fixtures). |
| **`PlatformCard`** | Local function component: one card, implemented as a **`Link`** with utility classes for look and feel. |

**Composition (current):**

```
PlatformsHome
└── section (flex flex-col gap-4 lg:gap-6)
    ├── SectionTitle  ("Browse by Platform", TrophyIcon)
    └── div (grid)
        ├── PlatformCard(platform=pc)
        ├── PlatformCard(platform=ps5)
        └── PlatformCard(platform=xboxSeriesXs)
            └── Link → /platforms/:id
                └── div
                    ├── h3  (platform name)
                    └── p   (games_count)
```

The section wrapper keeps title-to-grid spacing local to `PlatformsHome`, separate from page-level section spacing in `Home.tsx`.

---

## Why a `Link` instead of `<a>` or `<div onClick>`?

The app uses **React Router**. A **`Link`** from `react-router-dom`:

- Navigates **client-side** (no full page reload for in-app routes).
- Renders a real **`<a href="...">`** in the DOM, so it stays **keyboard-accessible**, **right-click → open in new tab** works, and screen readers treat it as a link.

The **`to`** value is **`/platforms/${platform.id}`** — the card uses the numeric **`id`** from RAWG for routing; **`slug`** is available on the type but not used in the path here.

---

## Data: what `RawgPlatform` supplies

**Type** (see **`client/src/api/platform.ts`** — `RawgPlatform`):

| Field | On the card? | Role |
|--------|----------------|------|
| **`id`** | Used, not shown | Drives **`Link`** → **`/platforms/${platform.id}`**. |
| **`name`** | Shown | **`h3`** — primary label (e.g. `"PC"`, `"PlayStation 5"`). |
| **`games_count`** | Shown | **`p`** — copy **`{platform.games_count} games available`**. |
| **`slug`** | Not used here | Useful for URLs elsewhere; home cards use **`id`** in the path. |
| **`image_background`**, **`image`** | Not used | Genre cards use background images; platform cards are **text-only** on the home row. |
| **`year_start`**, **`year_end`** | Not used | Metadata; optional on fixtures. |
| **`description`** | Not used | Long HTML/text for detail pages, not the card. |

**Static fixtures** passed into **`PlatformsHome`** today:

| Export | `id` | Typical `name` |
|--------|------|----------------|
| **`pc`** | `4` | `"PC"` |
| **`ps5`** | `187` | `"PlayStation 5"` |
| **`xboxSeriesXs`** | `186` | `"Xbox Series S/X"` |

Each object is a full **`RawgPlatform`** shape (including **`games_count`**, **`image_background`**, etc.); the card only **renders** **`name`** and **`games_count`** plus **`id`** for the route.

**Props surface:**

```ts
type PlatformCardProps = {
    platform: RawgPlatform;
};
```

---

## Grid around the card (parent, not `PlatformCard`)

The **`PlatformsHome`** wrapper uses:

| Class | What it does |
|--------|----------------|
| **`section.flex.flex-col.gap-4.lg:gap-6`** | Local vertical rhythm inside this section: title above cards with controlled spacing. |
| **`grid grid-cols-1 sm:grid-cols-3`** | One column on small screens; **three columns** from the `sm` breakpoint up so PC / PS5 / Xbox sit side by side. |
| **`gap-4`** | Consistent spacing between cards (matches other home sections’ rhythm). |

Unlike **`GenresHome`**, this grid does **not** use **`aspect-square`** on children — card **height** comes from **padding + text**, not a fixed aspect ratio.

---

## How to read the `className` string (order of thinking)

Treat the classes as **layers**, not a random bag. For this card, read **role → flex box → fill → edge → motion** (no `relative` / overlay stack like **`GenreCard`**).

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Role & child hover            group                      │
│ 2. Fill (background)              bg-gradient-to-br …         │
│ 3. Shape & clip                  rounded-2xl overflow-hidden│
│ 4. Edge                           border …                  │
│ 5. Hover polish                   hover:… transition …       │
│ 6. Inner spacing & centering      px-8 py-6 flex …         │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — `group`

| Class | What it does |
|--------|----------------|
| **`group`** | Hover root for **`group-hover:text-purple-400`** on the **title** (`h3`) so the headline shifts accent when hovering **anywhere** on the card. |

---

## Layer 2 — gradient background

| Class | What it does |
|--------|----------------|
| **`bg-gradient-to-br`** | Linear gradient toward **bottom-right**. |
| **`from-slate-800`** | Gradient **start** color. |
| **`to-slate-900`** | Gradient **end** — slightly darker for depth. |

Same **slate gradient language** as **`GenreCard`**, without a photo on top — the panel **is** the visual.

---

## Layer 3 — `rounded-2xl` + `overflow-hidden`

| Class | What it does |
|--------|----------------|
| **`rounded-2xl`** | Large **border radius** — soft tile consistent with other home cards. |
| **`overflow-hidden`** | Clips content to the rounded rect if anything overflows (defensive; mostly relevant if inner content grows). |

---

## Layer 4 — border

| Class | What it does |
|--------|----------------|
| **`border`** | **1px** border on all sides. |
| **`border-slate-700/50`** | **Slate-700** at **50% opacity** — soft edge on the gradient. |
| **`hover:border-purple-500/50`** | On hover, border shifts toward **purple** at 50% opacity — ties to **`SectionTitle`** / home **purple** accents. |

---

## Layer 5 — transitions and hover motion

| Class | What it does |
|--------|----------------|
| **`transition-all`** | Animates supported properties when state changes. |
| **`duration-300`** | **300ms** transitions. |
| **`hover:scale-105`** | Slight **zoom** on the whole **`Link`** (105%). |
| **`hover:shadow-xl`** | Stronger **elevation** shadow on hover. |
| **`hover:shadow-purple-500/20`** | **Purple-tinted** shadow at 20% opacity — on-brand lift. |

---

## Layer 6 — padding and flex centering

| Class | What it does |
|--------|----------------|
| **`px-8 py-6`** | Horizontal and vertical **padding** — gives the text block breathing room; height is **content-driven**. |
| **`flex`** | Flex container. |
| **`justify-center`** | Centers along the **main** axis (horizontal in default row flex). |
| **`items-center`** | Centers along the **cross** axis (vertical). |

The inner **`div`** wraps **`h3` + `p`**; centering keeps the label and subline **stacked and aligned** in the middle of the card.

---

## Inner typography (`h3` and `p`)

**Title — `h3`:**

| Class | What it does |
|--------|----------------|
| **`text-white`** | High-contrast label on dark slate. |
| **`text-xl lg:text-2xl`** | **Responsive scale** — larger title from the `lg` breakpoint. |
| **`font-bold`** | Strong hierarchy for the platform name. |
| **`group-hover:text-purple-400`** | Matches border/shadow **purple** on hover. |
| **`transition-colors duration-200`** | Slightly **faster** color transition (200ms) than the card’s 300ms motion — snappy text feedback. |
| **`text-center`** | Centered line. |
| **`mb-2`** | Space before the subline. |

**Subline — `p`:**

| Class | What it does |
|--------|----------------|
| **`text-slate-400`** | Muted secondary text for **`games_count`**. |
| **`text-sm`** | Smaller than the title. |
| **`font-semibold`** | Still legible; not as heavy as **`h3`**. |
| **`text-center`** | Aligns with the title. |

Content is **`platform.name`** and **`{platform.games_count} games available`** — raw number, no **locale** formatting in the template string.

---

## Full reference: `Link` + inner nodes

**`Link`** `className` (single string in source):

```txt
group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden
border border-slate-700/50 hover:border-purple-500/50
transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20
px-8 py-6 flex justify-center items-center
```

**`h3`:**

```txt
text-white text-xl lg:text-2xl font-bold group-hover:text-purple-400
transition-colors duration-200 text-center mb-2
```

**`p`:**

```txt
text-slate-400 text-sm font-semibold text-center
```

---

## File reference

- **`client/src/Pages/Home/PlatformsHome.tsx`** — exports **`PlatformsHome`**, defines **`PlatformCard`** (local), imports **`pc`**, **`ps5`**, **`xboxSeriesXs`** from **`../../api/platform`**.
- **`client/src/api/platform.ts`** — **`RawgPlatform`** interface and static **`RawgPlatform`** fixtures used as card data.

---

## Skills you can carry to other cards

1. **Same interactive primitive as genres** — **`Link`** for in-app routes; **`id`** in **`to`** matches API entities.
2. **Text-first vs image-first** — this card **reuses** the same **slate gradient + purple hover** vocabulary as **`GenreCard`**, but skips **`aspect-square`** and images in favor of **flex-centered typography**.
3. **Know what you render** — **`RawgPlatform`** has many fields; documenting **which** props hit the UI avoids assuming **`image_background`** appears on every card type.
4. **`group` on the `Link`** — title color can react to card hover without wrapping a separate hover target.

When **`PlatformCard`** is reused (e.g. fed from **`fetchPlatforms()`**), keep the **`className`** layers on the **`Link`** and pass **`RawgPlatform`** — only **`id`**, **`name`**, and **`games_count`** need to be correct for the current UI.
