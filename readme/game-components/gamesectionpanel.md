# `GameSectionPanel` component (shared gradient card shell)

**Location:** `client/src/Pages/Game/GameSectionPanel.tsx`  
**Stack:** React + TypeScript + Tailwind CSS  
**Purpose:** **Presentational wrapper** — a single flex column with GameHub’s **slate gradient panel** styling (padding, border, radius). Children supply the actual headings and body (e.g. description + paragraph, or **`VisitOfficial`**).

---

## 1. Props

```tsx
type GameSectionPanelProps = {
  children: React.ReactNode;
};
```

---

## 2. Role in the tree

```txt
GameSectionPanel
└── div.flex.flex-col.gap-4 …   ← shell only
    └── {children}
```

**ASCII**

```txt
╭──────────────────────────────────╮
│  (children: h2 + content)        │
│                                  │
╰──────────────────────────────────╯
```

Because the shell uses **`flex flex-col`**, direct children **stretch** to full width by default. Narrow controls (e.g. an **`inline-flex`** or **`self-start`** link) opt out locally — see [`visitofficial.md`](./visitofficial.md).

---

## 3. Reference JSX

```tsx
export function GameSectionPanel({ children }: GameSectionPanelProps) {
  return (
    <div className="flex flex-col gap-4 px-6 py-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50">
      {children}
    </div>
  );
}
```

---

## 4. Tailwind reference

| Classes | Effect |
|---------|--------|
| `flex flex-col gap-4` | Vertical stack with consistent spacing between heading and body. |
| `px-6 py-8` | Panel padding. |
| `bg-gradient-to-br from-slate-800 to-slate-900` | Same diagonal slate treatment as other GameHub cards (compare [`lefthalf.md`](./lefthalf.md) trailer card). |
| `rounded-2xl border border-slate-700/50` | Rounded rect + soft edge. |

---

## 5. Related docs

| Usage | Doc |
|--------|-----|
| Description + website sections | [`righthalf.md`](./righthalf.md) |
| External link block | [`visitofficial.md`](./visitofficial.md) |
