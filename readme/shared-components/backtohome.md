# `BackToHome`: lightweight route return link

This note documents how **`BackToHome`** is structured in **`BackToHome.tsx`**: a compact, reusable navigation control that routes users back to the home page with a left-arrow affordance.

---

## Where this lives

| Piece | Role |
|--------|------|
| **`BackToHome.tsx`** | Shared presentational component that renders a single home navigation link. |
| **`Genres.tsx`** | Example usage: placed at the top of the genre page content stack. |

---

## Component structure

`BackToHome` returns one **React Router `Link`**:

- **Route target:** `/`
- **Visible text:** `Back to Home`
- **Decorative icon:** `ArrowLeftIcon` from Lucide

Current JSX shape:

```txt
BackToHome
└── Link (to="/", className="group ...")
    ├── ArrowLeftIcon (decorative, aria-hidden, focusable=false)
    └── "Back to Home"
```

---

## Why `Link` is the right primitive

Because this is an in-app route transition, `Link` from `react-router-dom` provides:

- Client-side navigation without full page reload.
- Native link semantics for keyboard/screen-reader users.
- Standard browser link behaviors (for example opening in a new tab).

---

## Tailwind class breakdown

Link classes:

```txt
group flex items-center gap-2 font-medium text-slate-400
hover:text-white transition-colors duration-200
```

- **`group`**: enables coordinated hover behavior for child elements.
- **`flex items-center gap-2`**: aligns icon and text in one horizontal row.
- **`font-medium`**: keeps the control readable without overpowering section headers.
- **`text-slate-400` -> `hover:text-white`**: muted default, clear interactive highlight on hover.
- **`transition-colors duration-200`**: quick, smooth text color transition.

Icon classes:

```txt
w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200
```

- **`w-5 h-5`**: fixed icon size for consistent rhythm beside the label.
- **`group-hover:-translate-x-1`**: subtle leftward nudge reinforces “go back”.
- **`transition-transform duration-200`**: smooth motion on hover.

---

## Accessibility details

- The control uses a semantic **link** with visible label text (`Back to Home`), so it already has a clear accessible name.
- `ArrowLeftIcon` is marked decorative:
  - **`aria-hidden="true"`**
  - **`focusable="false"`**

This keeps screen readers focused on the navigation label instead of announcing icon metadata.

---

## File reference

- **`client/src/shared-components/BackToHome.tsx`** — `BackToHome` component.
- **`client/src/Pages/Genres/Genres.tsx`** — current page-level usage example.
