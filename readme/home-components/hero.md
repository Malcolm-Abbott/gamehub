# Hero section — CSS / styling notes

**Location:** `client/src/Pages/Home/Hero.tsx`  
**Stack:** React + Tailwind CSS (utility classes on JSX)  
**Icon:** `SparklesIcon` from `lucide-react`

---

## 1. Purpose

The hero is a full-width banner: gradient “glass” panel, subtle border, rounded corners, optional dot-pattern overlay, headline with icon, and supporting copy.

---

## 2. Outer container (`<div>`)

| Area | Classes | Effect |
|------|---------|--------|
| **Width** | `w-full` | Spans the full width of the parent. |
| **Background** | `bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30` | Left-to-right gradient; purple → blue → pink at ~30% opacity. |
| **Glass** | `backdrop-blur-sm` | Light blur of content behind the panel (frosted look; needs something behind it to show). |
| **Edge** | `border border-purple-500/20` | Thin purple border at ~20% opacity. |
| **Shape** | `rounded-3xl` | Large corner radius. |
| **Clip** | `overflow-hidden` | Clips children (keeps the overlay pattern inside rounded corners). |
| **Layout** | `relative` | Positions context for the absolutely positioned overlay. |
| **Flex** | `flex flex-col justify-center` | Vertical stack, content centered on the main axis. |
| **Spacing** | `p-4` … `px-6 lg:px-12 py-12 lg:py-16` | Base padding; larger horizontal/vertical padding from the `lg` breakpoint. |
| **Gaps** | `gap-3` | Space between heading and paragraph. |
| **Margin** | `mb-12 lg:mb-16` | Bottom margin below the hero (tighter on small screens). |

---

## 3. Decorative overlay (`<div>` — pattern)

| Area | Classes | Effect |
|------|---------|--------|
| **Position** | `absolute inset-0` | Covers the entire hero container. |
| **Strength** | `opacity-30` | Pattern at 30% opacity so it stays subtle. |
| **Pattern** | `bg-[url('data:image/svg+xml;base64,...')]` | Inline SVG (base64) as a repeating background texture (dot/grid motif). |

The heading and paragraph are earlier in the DOM than this overlay, so they paint above it by default. The overlay is the last child and sits underneath unless you add z-index.

---

## 4. Heading (`<h1>`)

| Area | Classes | Effect |
|------|---------|--------|
| **Type** | `text-4xl font-bold text-white` | Large, bold, white headline. |
| **Layout** | `flex items-center gap-2` | Icon + text in a row with a small gap. |

### Icon (`SparklesIcon`)

| Area | Classes | Effect |
|------|---------|--------|
| **Size** | `w-8 h-8` | 32×32 px. |
| **Color** | `text-purple-400` | Accent to match the purple in the gradient/border. |

### Inner span (title)

| Area | Classes | Effect |
|------|---------|--------|
| **Responsive size** | `text-4xl lg:text-6xl` | Larger on large screens when the title is wrapped inside this span. |
| **Weight** | `font-bold text-white` | Matches the main title emphasis. |

If the title text sits outside this span, the `h1`’s `text-4xl` applies to the visible line instead; move the copy into the span to use `lg:text-6xl` on the words.

---

## 5. Subtitle (`<p>`)

| Area | Classes | Effect |
|------|---------|--------|
| **Color** | `text-slate-300` | Muted body text on dark backgrounds. |
| **Responsive size** | `text-lg lg:text-xl` | Slightly larger on `lg+`. |
| **Width** | `max-w-2xl` | Keeps line length readable. |

---

## 6. Responsive breakpoints

Tailwind’s `lg` here is the **1024px** breakpoint (`min-width`).

- **`lg:px-12`**, **`lg:py-16`**, **`lg:mb-16`**, **`lg:text-6xl`**, **`lg:text-xl`**: apply at large viewports and up.

---

## 7. Dependencies / imports

- **`lucide-react`:** `SparklesIcon` for the hero icon.
- **Tailwind:** All visual styling is via `className` strings; there is no separate CSS file for this block.

---

## 8. Quick reference — main wrapper classes

For audits or refactors, the outer shell uses:

`w-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 p-4 rounded-3xl overflow-hidden relative flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-16 gap-3 mb-12 lg:mb-16`
