# Home page sections: `SectionTitle` and reusable patterns

This note describes how the **Home** page composes its layout, how **`SectionTitle`** provides a shared header for browse sections, and why **`React.ReactNode`** is a good fit for passing icons as props.

---

## Where this lives in the app

| Piece | Role |
|--------|------|
| **`Home.tsx`** | Top-level page: loading/error handling, vertical spacing, and ordered list of major blocks (`Hero`, then each browse section). |
| **`Hero.tsx`** | The primary visual banner at the top of the home route (includes the page’s main `h1`). |
| **`SectionTitle.tsx`** | Small presentational component: icon + styled title text for section headers. |
| **`GenresHome.tsx`**, **`PlatformsHome.tsx`**, **`FeaturedHome.tsx`** | Each section owns its header (via `SectionTitle`) and will own its body content (lists, carousels, data fetching) as you build them out. |

**Composition flow (mental model):**

```
Home
├── Hero
├── GenresHome     → SectionTitle + (future body)
├── PlatformsHome  → SectionTitle + (future body)
└── FeaturedHome   → SectionTitle + (future body)
```

---

## What `SectionTitle` does

`SectionTitle` is a **single place** to define how a section header looks:

- An **icon** on the left  
- A **title string** with the gradient text treatment  
- Semantic markup: it renders an **`h2`**, because the page already uses **`h1`** once in `Hero` (“Discover Amazing Games”). That keeps one clear heading outline for assistive tech and SEO.

Callers pass **what** to show (which icon, which words); `SectionTitle` does not know about genres vs platforms vs featured—it only knows how to render “icon + title” consistently.

---

## Props: `title` and `icon`

### `title: string`

Plain text for the section label, e.g. `"Browse by Genre"`. Simple, predictable, and easy to type-check.

### `icon: React.ReactNode`

The `icon` prop is typed as **`React.ReactNode`**. That means: *anything React can render* is allowed—not only strings or numbers, but also **elements**, **fragments**, and **components that produce output**.

#### Why not `string` for the icon?

Icons from libraries like **Lucide** are not strings; they are **React components**. You use them by writing JSX, e.g. `<Gamepad2Icon className="w-7 h-7" />`. That expression evaluates to a **React element**. If `icon` were only a `string`, you could not pass that element without extra machinery (like a map from names to components).

#### What `React.ReactNode` includes (intuition)

Roughly:

- `null` / `undefined` / booleans (often ignored when rendering)
- Strings and numbers
- React elements (what you get from `<SomeIcon />`)
- Arrays of the above
- Portals, etc.

So for `icon`, the practical meaning is: **“slot for whatever JSX you want next to the title,”** most often a Lucide icon with `className` for size and color.

#### How the parent passes a Lucide icon

The **parent** imports the icon component and **instantiates** it in JSX, then passes that element as the `icon` prop:

```tsx
<SectionTitle
  icon={<Gamepad2Icon className="w-7 h-7 text-purple-400" />}
  title="Browse by Genre"
/>
```

- **`Gamepad2Icon`** is a component (a function or class React can render).  
- **`<Gamepad2Icon ... />`** is an **element**: “please render this component with these props.”  
- That element is the value of `icon` inside `SectionTitle`.

Inside `SectionTitle`, **`{icon}`** in JSX means “render whatever was passed here,” same as `{children}` would for nested content.

#### Alternative: pass the component type instead of an element

Another valid pattern is to pass **`Icon` as a component** (e.g. `React.ComponentType<{ className?: string }>`) and let `SectionTitle` do `<Icon className="..." />`. That centralizes size classes but is slightly more abstract. Using **`React.ReactNode`** and passing **pre-built JSX** is often easier to read at the call site because you see the exact icon and classes in one place.

---

## File reference (current structure)

- **`client/src/Pages/Home/SectionTitle.tsx`** — defines `SectionTitleProps` and the `h2` layout.  
- **`client/src/Pages/Home/GenresHome.tsx`** — imports `Gamepad2Icon`, passes it into `SectionTitle` with `title="Browse by Genre"`.  
- **`client/src/Pages/Home/PlatformsHome.tsx`** — same pattern for the platform section.  
- **`client/src/Pages/Home/FeaturedHome.tsx`** — same pattern for featured games.  
- **`client/src/Pages/Home/Home.tsx`** — imports and renders `Hero`, then `GenresHome`, `PlatformsHome`, `FeaturedHome` in order.

---

## What to add next (without changing the pattern)

Each of **`GenresHome`**, **`PlatformsHome`**, and **`FeaturedHome`** can grow by:

1. Keeping **`SectionTitle`** at the top for a consistent header.  
2. Adding **siblings below** (or wrapping both in a `<section>`) for lists, grids, loading states, and API calls specific to that block.

`SectionTitle` stays small; **section files** stay responsible for **data and layout of the body**—a clear separation that scales as the app grows.
