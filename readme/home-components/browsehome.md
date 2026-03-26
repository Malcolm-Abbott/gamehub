# `SectionTitle` component structure

This note documents the current implementation of `SectionTitle` with a focus on TypeScript props, JSX structure, and Tailwind class usage.

---

## File location

- `client/src/Pages/Home/SectionTitle.tsx`

---

## TypeScript API

```ts
type SectionTitleProps = {
  icon: React.ReactNode;
  title: string;
  addClass?: string;
  genre?: RawgGenre;
}
```

- `icon`: render slot for any JSX passed from parent (typically a Lucide icon element).
- `title`: heading text shown in the gradient title span.
- `addClass`: optional extra utility classes appended to the `h2`.
- `genre`: optional object used to render the secondary "Games Found" row.

`RawgGenre` is imported as a type from `../../api/genres`, which keeps the prop shape aligned with API data.

---

## React / JSX structure

The component returns a vertical stack:

1. Root `<section className="flex flex-col">`
2. `<h2>` containing:
   - icon node (`{icon}`)
   - title `<span>` with gradient text classes
3. Conditional `<p>` rendered only when `genre` exists:
   - nested `<span>` for gradient number
   - static label text: `Games Found`

The conditional branch is:

```tsx
{genre ? (
  <p>...</p>
) : null}
```

This keeps the metadata row out of the DOM when genre data is not available.

---

## Tailwind class breakdown

### Root container

- `flex flex-col`: vertical flow for heading row then optional metadata row.

### Heading (`h2`)

- `flex`: icon and title are aligned on one flex row.
- `flex-wrap`: allows icon/title content to wrap on narrow widths.
- `items-center`: vertical alignment of icon and text.
- `gap-3`: consistent spacing between icon and title.
- `text-2xl lg:text-3xl`: base heading size across breakpoints.
- `font-bold`: heading weight.
- `leading-normal lg:leading-[1.2]`: line-height tuned for large text and descenders.
- `${addClass ?? ""}`: extends styling from parent contexts.

### Title text (`span`)

- `bg-gradient-to-r from-blue-400 to-purple-400`: gradient background source.
- `bg-clip-text text-transparent`: clips gradient into text glyphs.
- `pb-1`: small visual buffer at the bottom of glyphs.

### Metadata row (`p`)

- `text-slate-400 text-lg font-medium`: subdued secondary text styling.

### Metadata number (`p > span`)

- `bg-gradient-to-t from-purple-400 to-blue-400 bg-clip-text text-transparent`: gradient number treatment.
- `font-bold`: emphasis for numeric count.

---

## Usage pattern from parent components

Parents pass an instantiated icon element and title text:

```tsx
<SectionTitle
  icon={<Gamepad2Icon className="w-10 h-10 text-purple-400 lg:w-16 lg:h-16" aria-hidden="true" focusable="false" />}
  title={genre?.name ?? ""}
  addClass="text-3xl lg:text-5xl"
  genre={genre}
/>
```

This keeps `SectionTitle` presentational while allowing each page/section to control icon choice and size overrides.

---

## Home spacing model

Home layout uses two independent spacing layers:

- **Page-level section spacing** in `Home.tsx`:
  - `div className="flex flex-col gap-12 lg:gap-16"`
  - Controls vertical distance between `Hero`, `GenresHome`, `PlatformsHome`, and `FeaturedHome`.
- **Section-level internal spacing** in each section component:
  - `section className="flex flex-col gap-4 lg:gap-6"`
  - Controls distance between `SectionTitle` and that section's own card/content grid.

This separation lets you increase room between major sections without creating oversized gaps between titles and their immediate content.
