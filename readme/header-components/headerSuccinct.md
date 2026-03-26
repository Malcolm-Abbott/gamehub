## Header layout – succinct summary

### Structure

- **`Header`**: Renders the top bar plus page content. Outlet is wrapped in `<div className="content-container mb-8"><Outlet /></div>` so page content matches the nav’s width and padding and keeps consistent bottom spacing.
  - Header bar: `sticky top-0 z-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700/50 py-4 mb-8` (sticky at the top with z-20 so it stays above the page content).
- **`NavLinks`** inside header:
  - `<nav className="content-container flex items-center justify-between">`
  - Left: `QuickLinks` (logo, GameHub, Home, Favorites).
  - Right: `InputAndMenu` (search input + hamburger).
- **Uniform layout**: `content-container` in `index.css` is `@apply w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16`. Used on the nav and on the outlet wrapper so header and all pages share the same max-width and horizontal padding.

### Flexbox & breakpoints

- `flex items-center justify-between` on `<nav>`: horizontal layout, vertical centering.
- `QuickLinks`: outer `flex items-center lg:basis-1/2` (no justify — first child at start). First child: logo + GameHub. Second child: wrapper `hidden lg:flex flex-1 justify-evenly items-center` containing Home and Favorites links (flex-1 takes remaining width; justify-evenly spreads the two links).
- `InputAndMenu`: search wrapper `hidden md:block basis-1/2`; mobile menu is a labeled button (`aria-label="Open navigation menu"`) that contains the icon and is hidden at `lg`.
- Visibility:
  - **Mobile**: logo + menu only (search, GameHub text, quick links hidden).
  - **Tablet (`md`)**: GameHub text and search appear; menu still visible.
  - **Desktop (`lg`)**: full quick links appear; menu icon hides.

### GH logo & GameHub text

- Logo `div`:
  - `w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110`.
  - Inner `span` (**GH** monogram): `bg-gradient-to-r from-purple-900/80 to-blue-800/80 bg-clip-text text-transparent font-bold text-lg lg:text-xl` — glossy purple→blue gradient text (same `bg-clip-text` + `text-transparent` trick as GameHub; 80% opacity keeps it readable on the bright badge).
  - Wrapped in `Link` with `className="group"` for `group-hover` effects.
- GameHub text: outer `div` with `hidden md:block font-bold text-xl lg:text-2xl`; inner `span` with `bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`. `bg-clip-text` clips the gradient to the text shape; `text-transparent` makes the text fill transparent so the gradient shows through (both required). The span wrapper is required for the effect to apply reliably.

### Search icon positioning

- Wrapper: `<div className="relative">`.
- Icon:
  - `<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" focusable="false" />`
  - `absolute` inside `relative` parent + `top-1/2 -translate-y-1/2` centers vertically; `left-3` sets horizontal offset.
- Input:
  - `w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`.
  - `aria-label="Search games"` provides an explicit accessible name.
  - `pl-10` creates space so text doesn’t collide with the icon.

### Background colors

- **Body** (`index.css`):
  - `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950` + `min-h-screen`.
  - Very dark diagonal gradient for the overall page.
- **Header**:
  - `bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900`.
  - Slightly lighter horizontal gradient so the header stands out against the body.
- **GH logo**:
  - Badge: `bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500` (bright accent).
  - Letters: `bg-gradient-to-r from-purple-900/80 to-blue-800/80 bg-clip-text text-transparent` (glossy monogram on the badge).

### Hover & transition behavior

- GH logo:
  - `group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300`.
  - Smooth glow + scale on hover via `group` parent.
- Home / Favorites quick links: inside the QuickLinks second-child wrapper (`flex-1 justify-evenly`). `Link` to `/` and `Link` to `/favorites`, each with `flex items-center gap-2 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200`. Icon has `text-slate-300`, label div has `text-slate-300 font-medium`.
- Search input & menu icon:
  - Input: focus ring (`focus:ring-2 focus:ring-purple-500`) + `transition-all duration-200`.
  - Menu icon: `hover:text-white hover:bg-slate-700/50 transition-all duration-200`.
