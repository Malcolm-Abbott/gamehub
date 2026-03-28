# `VisitOfficial` component (official website heading + external link)

**Location:** `client/src/Pages/Game/VisitOfficial.tsx`  
**Stack:** React + TypeScript + Tailwind CSS + Lucide **`ExternalLinkIcon`**  
**Purpose:** Section **heading** (“Visit Official Website”) and a **gradient-styled external anchor** that opens the game’s **`website`** in a new tab. Intended to be wrapped by **`GameSectionPanel`** in **`RightHalf`** (see [`gamesectionpanel.md`](./gamesectionpanel.md), [`righthalf.md`](./righthalf.md)).

---

## 1. Props

```tsx
type VisitOfficialProps = {
  website: string;
  name: string;
};
```

| Prop | Use |
|------|-----|
| `website` | **`href`** on the anchor (fallback **`"#"`** handled upstream). |
| `name` | **`aria-label`** context for screen readers. |

---

## 2. Visual structure

```txt
VisitOfficial
├── h2 "Visit Official Website"
└── a (gradient button, inline-flex row)
    ├── span (URL line-clamp, gradient text)
    └── ExternalLinkIcon
```

**ASCII**

```txt
Visit Official Website

╭──────────────────────────────╮  ← self-start: does not stretch full panel width
│ https://example.com      ↗   │
╰──────────────────────────────╯
```

---

## 3. Security and semantics

```tsx
<a
  href={website ?? "#"}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Visit ${name ?? "Game Name Not Found"} official website`}
  className="…"
>
```

- **`rel="noopener noreferrer"`** with **`target="_blank"`** — typical external-link hardening.
- **`aria-label`** — descriptive name when the visible text is a long URL.

---

## 4. Reference JSX

```tsx
export function VisitOfficial({ website, name }: VisitOfficialProps) {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-white/90">Visit Official Website</h2>
      <a
        href={website ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name ?? "Game Name Not Found"} official website`}
        className="group flex items-center self-start gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-slate-800 rounded-xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 transition-all duration-200 hover:shadow-md hover:shadow-slate-400/15 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-900/90 hover:to-purple-900/90"
      >
        <span className="line-clamp-1 text-sm sm:text-base bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold tracking-wide group-hover:text-blue-600/80 group-hover:from-blue-400/80 group-hover:to-purple-400/80 transition-colors duration-200">
          {website || "Website Not Found"}
        </span>
        <ExternalLinkIcon
          className="w-6 h-6 text-blue-400 my-auto group-hover:text-blue-600 transition-colors duration-200"
          aria-hidden="true"
          focusable="false"
        />
      </a>
    </>
  );
}
```

---

## 5. Layout note — `self-start`

The parent **`GameSectionPanel`** is **`flex flex-col`** with default **stretch**. **`self-start`** on the anchor keeps the control **only as wide as its content** (plus padding), instead of a full-width bar.

---

## 6. Tailwind — `h2`

| Classes | Effect |
|---------|--------|
| `text-2xl sm:text-3xl` | Matches **Description** section title and **`WatchTrailerTitle`** (see [`righthalf.md`](./righthalf.md), [`watchtrailertitle.md`](./watchtrailertitle.md)). |
| `font-bold text-white/90` | Weight and softened white. |

---

## 7. Tailwind — anchor (`a`)

| Classes | Effect |
|---------|--------|
| `group` | Coordinates hover styles on **`span`** and icon. |
| `flex items-center self-start gap-2` | Horizontal row; **does not** stretch full column width. |
| `px-3 py-2 sm:px-6 sm:py-3` | **Mobile-first padding**; roomier from **`sm`**. |
| `bg-slate-800` + `bg-gradient-to-br from-blue-900/80 to-purple-900/80` | Dark base + blue/purple overlay (stacked gradient). |
| `rounded-xl` | Rounded control. |
| `hover:shadow-md hover:shadow-slate-400/15 hover:scale-105` | Lift + glow on hover. |
| `hover:from-blue-900/90 hover:to-purple-900/90` | Slightly stronger gradient on hover. |

---

## 8. Tailwind — URL `span`

| Classes | Effect |
|---------|--------|
| `line-clamp-1` | Single-line ellipsis for long URLs. |
| `text-sm sm:text-base` | Responsive body size. |
| `bg-gradient-to-r from-purple-400 to-blue-400` + `bg-clip-text text-transparent` | Gradient “ink.” |
| `group-hover:…` | Swap gradient direction on hover (paired with **`group`**). |

---

## 9. Related docs

- Panel wrapper: [`gamesectionpanel.md`](./gamesectionpanel.md)
- Parent column: [`righthalf.md`](./righthalf.md)
