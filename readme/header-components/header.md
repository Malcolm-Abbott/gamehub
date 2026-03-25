## Header layout – detailed guide

### 1. Big picture

- **Header component**: `Header.tsx` wraps the visual header bar and uses `Outlet` so that all pages render beneath a persistent header.
- **Navigation bar**: `NavLinks.tsx` is the horizontal flex container that holds the left-side quick links (logo, brand, nav items) and the right-side search input + mobile menu.
- **Sub‑components**: `QuickLinks.tsx` (logo + GameHub + quick nav) and `InputAndMenu.tsx` (search input + hamburger menu) keep the layout modular.

The overall effect is: a dark gradient header on top of a darker gradient page background, with a glossy gradient “GH” monogram on the circular badge, brand text, quick links, and a search bar that only appears on medium+ screens.

---

### 2. Header structure and flexbox

**File**: `src/Components/Header.tsx`

The header itself is very simple: it only cares about the visual bar and global layout.

- **Header wrapper**:
  - `<header className="sticky top-0 z-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50 py-4">`
  - `sticky top-0` keeps the header stuck to the top of the viewport while scrolling; `z-20` ensures it stays above the main page content.
  - Inside it renders `<NavLinks />`.
  - Below the header, page content is wrapped in `<div className="content-container"><Outlet /></div>` so it shares the same max-width and padding as the nav (see **Uniform container** below).

So structurally:

- **Header** (visual bar)
  - **NavLinks** (horizontal layout inside the bar, uses `content-container`)
- **div.content-container** → **Outlet** (page content; same container for alignment)

---

### 3. Nav bar layout (`NavLinks.tsx`)

**File**: `src/Components/NavLinks.tsx`

**Uniform container:** The nav and the outlet wrapper both use the class **`content-container`** (defined in `src/index.css` as `@apply w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16`). That keeps the header content and every page’s content aligned: same max-width, same horizontal padding at each breakpoint. The header bar stays full-width; only the nav (and the div wrapping the Outlet) are constrained.

Core JSX:

- Root element:
  - `<nav className="content-container flex items-center justify-between">`
  - **`content-container`**: applies `w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16` (see `index.css`).
  - **`flex`**: turns the `<nav>` into a flex container.
  - **`items-center`**: vertically centers children (QuickLinks on the left, InputAndMenu on the right).
  - **`justify-between`**: pushes the left and right groups to opposite sides.

Children:

- `<QuickLinks />` (left side)
- `<InputAndMenu />` (right side)

This splits the header into two main columns, flexed horizontally and spaced using `justify-between`.

---

### 4. Quick links: GH logo, GameHub text, and nav items

**File**: `src/Components/QuickLinks.tsx`

Top-level container (two flex children so the logo stays at start and nav links spread in the remaining space):

- Outer: `<div className="flex items-center lg:basis-1/2">`
  - **No main-axis alignment** on the parent (defaults to `flex-start`), so the first child sits at the start.
  - **`lg:basis-1/2`**: on large screens, this whole left side takes half of the nav width.
- **First child**: logo + GameHub group — no `flex-grow`, so it stays at the start and aligns with page content.
- **Second child**: wrapper `<div className="hidden lg:flex flex-1 justify-evenly items-center">`
  - **`flex-1`**: takes the remaining width of the row (after the first child).
  - **`justify-evenly`**: spreads the Home and Favorites links evenly inside that remaining space.
  - **`hidden lg:flex`**: wrapper (and thus the nav links) only visible on large screens and up.

#### 4.1 GH logo next to GameHub text (first flex child)

Inner group:

- `<div className="flex items-center gap-2">`
  - First child of the QuickLinks row; holds GH logo and GameHub text side by side.

**GH logo pill:**

- Structure:
  - `Link` wrapper: `<Link to="/" className="group">`
  - Inner logo `div`:
    - `w-10 h-10 lg:w-12 lg:h-12`: circular size; grows on large screens.
    - `rounded-full`: makes it a circle.
    - `bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500`: diagonal gradient from blue to purple to pink.
    - `flex items-center justify-center`: center the "GH" text.
    - `shadow-lg`: soft drop shadow.
    - `group-hover:shadow-purple-500/50`: when the parent `Link` (with class `group`) is hovered, the shadow becomes a purple glow.
    - `transition-all duration-300`: smooth 300ms transition for all animatable properties.
    - `group-hover:scale-110`: scales the circle up slightly on hover, creating a pop effect.
  - Inner text (monogram):
    - `<span className="bg-gradient-to-r from-purple-900/80 to-blue-800/80 bg-clip-text text-transparent font-bold text-lg lg:text-xl">GH</span>`
    - **Glossy gradient letters**: left‑to‑right gradient from deep purple to blue at 80% opacity (`from-purple-900/80 to-blue-800/80`), with **`bg-clip-text`** and **`text-transparent`** so the fill is the gradient (same pattern as the GameHub wordmark below—reusable for any “gradient text” look). Against the bright blue–purple–pink badge, the darker translucent gradient reads as a rich, glassy / embossed monogram instead of flat white.
    - **`font-bold`** and responsive size **`text-lg lg:text-xl`** match visual weight with the rest of the header.

**GameHub text:**

- Outer `<div className="hidden md:block font-bold text-xl lg:text-2xl">`; inner `<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">GameHub</span>`.
  - **`hidden md:block`**: on the div — invisible on small screens; appears from the `md` breakpoint up.
  - **Font and size**: on the div — `font-bold text-xl lg:text-2xl`.
  - **Gradient text effect**: on the span — `bg-gradient-to-r from-blue-400 to-purple-400` (left‑to‑right gradient), `bg-clip-text` (paints the background only within the text shape), `text-transparent` (makes the text fill transparent so the gradient shows through; without it the text’s opaque color would hide the gradient). Both are required. Wrapping the text in a span is required for this effect to apply reliably. The **GH** monogram uses the same technique with a different palette (`from-purple-900/80 to-blue-800/80`) so it stays legible and glossy on the brighter circular badge.

#### 4.2 Home and Favorites quick links

- Wrapped in the second flex child (the wrapper with `flex-1 justify-evenly`). Two `Link`s: Home → `to="/"`, Favorites → `to="/favorites"`. Each `Link` has:
  - `flex items-center gap-2 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200`
  - Visibility is controlled by the wrapper (`hidden lg:flex`), so the links only show on large screens.
  - **Hover behavior**:
    - By default: icons and text are `text-slate-300` (muted gray).
    - On hover:
      - `hover:text-white`: text color turns white.
      - `hover:bg-slate-700/50`: semi‑transparent dark background pill appears.
      - `transition-all duration-200`: quick smooth fade for hover in/out.
  - Each contains:
    - An icon (`HomeIcon` or `HeartIcon`) with `className="text-slate-300"`.
    - A label `div` with `text-slate-300 font-medium`.

---

### 5. Search input and hamburger menu

**File**: `src/Components/InputAndMenu.tsx`

#### 5.1 Flex behavior and breakpoints

Wrapper:

- `<div className="hidden md:block basis-1/2">`
  - **`hidden md:block`**: search bar is hidden on small screens; appears starting at `md`.
  - **`basis-1/2`**: on medium+ screens, takes half of the nav width, balancing with the left side (`QuickLinks`).

Hamburger menu icon:

- `<MenuIcon className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 size-10" />`
  - **`lg:hidden`**: menu icon only shows on small and medium screens; disappears on large screens (where full nav is visible).
  - **Hover behavior**:
    - `hover:text-white`: icon turns white on hover.
    - `hover:bg-slate-700/50`: subtle pill background on hover.
    - `transition-all duration-200`: smooth in/out.

This combination gives:

- **Mobile**: no search bar, just logo/brand (limited) and a hamburger menu.
- **Tablet (md)**: search bar appears; hamburger still visible.
- **Desktop (lg)**: full quick links + search bar; hamburger disappears.

#### 5.2 Positioning the search icon inside the input

Structure:

- Outer `div`: `className="relative"`
  - Needed so that absolutely positioned children (the search icon) are positioned relative to this container.

**Search icon:**

- `<SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />`
  - **`absolute`**: icon is taken out of normal document flow and placed on top.
  - **`left-3`**: 0.75rem from the left side of the relative container.
  - **`top-1/2`** + **`-translate-y-1/2`**:
    - `top-1/2` moves the icon down to the vertical center line.
    - `-translate-y-1/2` shifts it up by half its own height, resulting in precise vertical centering.
  - **`text-slate-400`**: lighter gray color for an "icon inside input" look.

**Input element:**

- `<input className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" />`
  - **`w-full`**: takes up the full width of its parent.
  - **`pl-10`**: extra left padding so the text doesn’t overlap the icon (space for the icon + some margin).
  - **`pr-4` + `py-2.5`**: comfortable horizontal and vertical padding.
  - **Background and border**:
    - `bg-slate-700/50`: semi‑transparent dark background for a subtle glass feel.
    - `border border-slate-600`: thin border with a slightly lighter slate.
    - `rounded-xl`: pill‑like rounded corners.
  - **Text and placeholder**:
    - `text-white`: user input text in white.
    - `placeholder-slate-400`: placeholder in a mid‐gray.
  - **Focus state**:
    - `focus:outline-none`: removes default browser outline.
    - `focus:ring-2 focus:ring-purple-500`: adds a 2px purple focus ring.
    - `focus:border-transparent`: hides the border in favor of the ring.
  - **Transitions**:
    - `transition-all duration-200`: smooth focus/hover changes.

The combination of `relative` on the wrapper, `absolute` + centering utilities on the `SearchIcon`, and `pl-10` on the input gives a "search icon inside the left side of the input" effect.

---

### 6. Background colors and gradients

#### 6.1 Body background (page background)

**File**: `src/index.css`

```css
body {
  @apply m-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen;
  height: 100dvh;
}
```

- **`bg-gradient-to-br`**: gradient moves from top‑left to bottom‑right.
- **`from-slate-950 via-slate-900 to-slate-950`**:
  - Very dark slate (`slate-950`) at the start,
  - Slightly lighter slate (`slate-900`) in the middle,
  - Back to `slate-950` at the end.
- Overall effect: a deep, almost‑black background with a subtle softening in the middle, matching a dark gaming aesthetic without being flat.

#### 6.2 Header background

**File**: `src/Components/Header.tsx`

```tsx
<header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50 py-4">
```

- **`bg-gradient-to-r`**: gradient runs left‑to‑right.
- **`from-slate-900 via-slate-800 to-slate-900`**:
  - Slightly lighter than the body.
  - Middle (`via-slate-800`) is lighter still, which makes the center of the header pop compared to the body.
- **`shadow-xl`**: prominent drop shadow that separates the header from the page.
- **`border-b border-slate-700/50`**:
  - Thin semi‑transparent border at the bottom, adding an extra separation line.

#### 6.3 GH logo: badge background and monogram text

**File**: `src/Components/QuickLinks.tsx`

**Circular badge** (container):

```tsx
<div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
```

- **`bg-gradient-to-br`**: diagonal gradient from top‑left to bottom‑right.
- **`from-blue-500 via-purple-500 to-pink-500`**:
  - Starts bright blue.
  - Moves through a strong purple.
  - Ends on a vivid pink.
- This gives the logo a neon "badge" feel that stands out over the darker header and body gradients.

**“GH” letters** (inside the badge):

```tsx
<span className="bg-gradient-to-r from-purple-900/80 to-blue-800/80 bg-clip-text text-transparent font-bold text-lg lg:text-xl">GH</span>
```

- **`from-purple-900/80 to-blue-800/80`**: deep purple → blue with 80% opacity so the letters feel glossy and slightly “inked” on the bright badge; opacity keeps the gradient from looking harsh.
- **`bg-clip-text` + `text-transparent`**: same gradient‑text recipe as the GameHub wordmark—only the letter shapes show the gradient.
- **Why not white?** Flat white works, but this treatment ties the monogram to the site’s purple/blue palette and adds depth you can reuse anywhere you need gradient type on a busy background.

---

### 7. Hover effects and transitions (especially GH logo)

#### 7.1 GH logo hover

Elements involved:

- Parent `Link`:
  - `className="group"`
- Logo `div`:
  - `group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300`

How it works:

- `group` on the `Link` marks it as a hover group.
- On hover over the `Link`, any descendent with `group-hover:*` classes will update.
- `group-hover:shadow-purple-500/50`:
  - Shadow color shifts to a soft purple glow at 50% opacity.
- `group-hover:scale-110`:
  - Slight scale‑up (10% larger), making it feel interactive and clickable.
- `transition-all duration-300`:
  - Both the scale and shadow animate over 300ms for a smooth effect rather than a jarring snap.

Result: when you hover near the logo (anywhere over the `Link`), the circular badge gently pops out and glows purple; the gradient “GH” text scales with the badge and keeps the glossy purple‑to‑blue read at every size.

#### 7.2 Quick links hover

- For `Home` and `Favorites`:
  - `hover:text-white hover:bg-slate-700/50 transition-all duration-200`
  - Text becomes white and a semi‑transparent pill appears behind the row.
  - 200ms transition makes the effect responsive but not twitchy.

#### 7.3 Search input / menu icon feel

- Input:
  - `transition-all duration-200` combined with focus ring changes creates a softer focus/blur experience.
- Menu icon:
  - `hover:text-white hover:bg-slate-700/50 transition-all duration-200` mirrors the quick link hover feel, so all action elements behave consistently.

---

### 8. Breakpoints summary

- **Mobile (default)**:

  - Smallest padding: `px-6`.
  - `GameHub` text hidden (`hidden md:block`).
  - Quick links `Home` / `Favorites` hidden (`hidden lg:flex`).
  - Search bar hidden (`hidden md:block`).
  - Hamburger menu visible (`lg:hidden`).

- **Tablet (`md`)**:

  - `GameHub` text appears.
  - Search bar appears (`md:block`) and takes half the width.
  - Hamburger menu still visible.

- **Desktop (`lg` and up)**:
  - Nav width capped with `max-w-7xl`.
  - QuickLinks: outer row has `lg:basis-1/2` and no parent justify (first child at start). Second child wrapper has `flex-1 justify-evenly` so Home and Favorites spread evenly in the remaining space.
  - `Home` and `Favorites` quick links appear (inside the wrapper, which is `hidden lg:flex`).
  - Hamburger menu disappears (`lg:hidden`).
  - GH logo grows slightly (`lg:w-12 lg:h-12`, `lg:text-xl`) and GameHub text grows (`lg:text-2xl`).

This breakpoint strategy gives you:

- Very simple mobile header with logo + menu.
- Richer tablet view with search and brand text.
- Full desktop navigation with logo, brand, quick links, and search.
