# Frontend Template (Vite + React + TS)

A reusable frontend template using **Vite 7**, **React**, **TypeScript**, and **Tailwind CSS 4**, designed for quick setup and easy deployment to Vercel. Use it as a starting point for new projects rather than a finished app.

## Quick Start

1. Create your repository from this template on GitHub:
   - Open the `frontend-template` repo on GitHub.
   - Click **“Use this template”** → **“Create a new repository”**.
   - Choose a repository name (example: `GameHub`) and click **Create repository**.
   - Your repo name is your `<project-name>` (use whatever you chose here).
2. Pick a folder to host your GitHub projects, then clone your repo:
   - Example parent folder: `C:/Users/<you>/Github`
   - Open a terminal, then run:
     ```bash
     cd C:/Users/<you>/Github
     git clone https://github.com/<your-username>/<project-name>.git
     cd <project-name>
     ```
   - Replace placeholders like `<your-username>` and `<project-name>` with your own values (do not include the `<` or `>` characters).
3. Create the `client` app (only if needed):
   - This template normally includes a `client/` folder already.
   - After cloning, check whether you have a `client/` folder at the repo root:
     - If it exists, skip this step.
     - If it is missing (for example, if your repo structure doesn’t include `client/`), create it with:
     ```bash
     npm create vite@7 client -- --template react-ts
     ```
4. Install and run the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Then open `http://localhost:5173` in your browser.
5. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Initial setup (Vite + React + TS)"
   git push origin main
   ```
6. For detailed repo setup and deployment instructions, see:
   - `readme/reposetup.md`
   - `readme/verceldeploy.md`

## Included Packages

This template’s packages are split between the app in `client/` and some root-level tooling.

### Client (runtime) dependencies (`client/package.json`)

- `react`
- `react-dom`
- `react-router-dom`
- `tailwindcss`
- `@tailwindcss/vite`

### Client (dev/build tooling) (`client/package.json`)

- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `@types/react`
- `@types/react-dom`

### Template root tooling (linting/formatting) (`package.json`)

- `eslint`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`
- `prettier`
- `stylelint`
- `markuplint`
- `typescript`

Exact versions are in `client/package.json` and the root `package.json`.
