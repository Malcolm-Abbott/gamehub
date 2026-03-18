## Template Creation Guide

This guide documents **how the `frontend-template` repository itself was created** and turned into a reusable GitHub template. It is meant for learning and for future you, so you can repeat the process (or adapt it) without having to remember every Git command or sequence.

We will assume the project folder was named `frontend-template` from the start, and that everything below happened in order inside that folder. (In reality, this grew out of an earlier project, but those details are not important for re‑creating the template.)

Use this guide together with:

- `readme/reposetup.md` – how to build a repo **like this one** from scratch.
- `readme/verceldeploy.md` – how to deploy a project created from this template to Vercel.

This file focuses specifically on **how the template repo itself was created and turned into a GitHub template**.

> ---
>
> **Which terminal/shell can I use?**
>
> All the commands in this guide will work from common terminals:
>
> - On **Windows**: PowerShell, Command Prompt, or Git Bash
> - On **macOS**: Terminal (bash/zsh)
> - On **Linux**: your usual shell (bash, zsh, etc.)
>
> If a command fails in one terminal, try closing it and using another (for example, Git Bash on Windows) before troubleshooting further.
>
> ---
>
> **Important: don’t type the `<...>` placeholders**
>
> In this guide, any angle-bracket text like `<you>`, `<your-username>`, `<project-name>`, or `<new-repo-name>` is a placeholder.
>
> Replace it with your own value, and do **not** include the `<` or `>` characters.
>
> Tip: `<you>` is your Windows username. For example, `C:/Users/<you>/Github` might look like `C:/Users/Sam/Github`.
>
> Example (placeholder format you must replace):
>
> ```bash
> cd C:/Users/<you>/Github
> git clone https://github.com/<your-username>/<new-repo-name>.git
> cd <new-repo-name>
> ```
>
> Example (this template’s real values):
>
> ```bash
> cd C:/Users/Sam/Github
> git clone https://github.com/Malcolm-Abbott/frontend-template.git
> cd frontend-template
> ```

---

## 1. Goal of the template

Before creating the repo, the goal was:

- To have a **reusable frontend template** that:
  - Uses **Vite 7** with **React + TypeScript**.
  - Uses **Tailwind CSS 4** with the official Vite plugin.
  - Has a clear, documented structure:
    - `client/` – the actual app.
    - `readme/` – detailed guides (`reposetup.md`, `verceldeploy.md`, this file).
    - Root tooling (ESLint, Prettier, Stylelint, Markuplint, etc.).
  - Is wired to GitHub and marked as a **template repository**, so new projects can be created from it with a few clicks.

The rest of this guide explains how that goal was turned into an actual GitHub template repository.

---

## 2. Prerequisites and local folder layout

Before doing any Git work, the following were already in place:

- **Tools installed**
  - Node.js + npm (LTS) – checked with:
    ```bash
    node -v
    npm -v
    ```
  - Git – checked with:
    ```bash
    git --version
    ```
  - A GitHub account.

- **Base projects directory on disk**
  - Chosen to be:
    ```text
    C:/Users/<you>/Github
    ```
  - The idea is that every project (including `frontend-template` and future apps) lives as a subfolder of this `Github` directory.

- **Template folder name**
  - The local folder for the template was named:
    ```text
    C:/Users/<you>/Github/frontend-template
    ```

All of the Git commands in this guide assume you are working inside that `frontend-template` folder.

---

## 3. Put the app code in place

Before turning this folder into a Git repository, the actual application code and documentation were created inside `frontend-template/`. The goal was to end up with a structure like:

```text
C:/Users/<you>/Github/frontend-template/
  client/          # Vite + React + TS app
  readme/          # Documentation for setup and deployment
  (root config files: package.json, .eslintrc, .prettierrc, .gitignore, etc.)
```

### 3.1. Create the Vite + React + TypeScript app in `client/`

From inside the `frontend-template` folder:

```bash
cd C:/Users/<you>/Github/frontend-template
npm create vite@7 client -- --template react-ts
```

- This creates a `client` folder.
- It uses the **React + TypeScript** starter template automatically (no interactive prompts).

Then install dependencies and confirm it runs:

```bash
cd client
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) to verify the starter app works, then stop the dev server with `Ctrl + C`.

### 3.2. Add documentation and tooling files

Back in the repo root:

```bash
cd C:/Users/<you>/Github/frontend-template
mkdir readme
```

Inside `readme/`, the following files were created and populated:

- `reposetup.md` – how to recreate this kind of repo from scratch.
- `verceldeploy.md` – how to deploy projects from this template to Vercel.
- `templatecreation.md` – this file, explaining how the template itself was created.

At the root of `frontend-template/`, the config and tooling files were also added.

If you are creating this template on a machine that does *not* have those tooling files already available, use the manual workflow below to generate them from scratch.

### 3.2.1. (If you start from scratch) Set up root tooling manually

This subsection exists for the “I don’t have pre-created tooling files” situation. The goal is to create:

- A root `package.json` (so `npm` can install and run tooling)
- Tooling config files:
  - `.eslintrc` (ESLint)
  - `.prettierrc` (Prettier)
  - `.stylelintrc` (Stylelint)
  - `.markuplintrc` (Markuplint)

#### Step 1: Create the root `package.json`

From the repo root:

```bash
cd C:/Users/<you>/Github/frontend-template
npm init -y
```

This generates a basic `package.json` plus (after installs) a `package-lock.json`.

#### Step 2: Install the tooling packages

Install the tools needed for linting/formatting. (You can treat this as “getting the dependencies in place”.)

```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  prettier eslint-config-prettier \
  stylelint stylelint-config-recommended stylelint-config-standard \
  markuplint \
  typescript
```

#### Step 3: Generate the config files

Prefer running each tool’s initializer so you don’t have to invent configs by hand.

1. ESLint config:

   ```bash
   npx @eslint/config init
   ```

2. Stylelint config:

   ```bash
   npx stylelint --init
   ```

3. Markuplint config:

   ```bash
   npx markuplint --init
   ```

4. Prettier config:

   Prettier is simplest to add manually. Create a `.prettierrc` at the repo root and paste the following JSON into that file (do NOT put this into `package.json` — this exact JSON should live only in `.prettierrc`):

```json
{
  "singleQuote": true,
  "bracketSameLine": true
}
```

After this step you should have these files at the repo root:

```text
frontend-template/
  package.json
  package-lock.json
  .eslintrc
  .prettierrc
  .stylelintrc
  .markuplintrc
```

#### Step 4: Add explicit scripts to `package.json` (so users see what to run)

Open your root `package.json` and add a `"scripts"` section like this:

```json
{
  "scripts": {
    "lint:js": "eslint . --ext js,jsx,ts,tsx",
    "lint:css": "stylelint \"**/*.{css,scss}\"",
    "lint:html": "markuplint \"**/*.html\"",
    "format": "prettier --write ."
  }
}
```

Notes:

- The intended script names are `lint:css` and `lint:html` (not `linkt:css` / `linkt:html`).
- Running these commands later is always done from the repo root (`frontend-template/`), unless a command explicitly says otherwise.

Now you can run:

```bash
npm run lint:js
npm run lint:css
npm run lint:html
npm run format
```

Once the `client/` app, `readme/` docs, and root tooling files/configs are in place, the folder was ready to be turned into a Git repository.

---

## 4. Initialize the local Git repository

With the `frontend-template` folder created and the app code in place, the first step was to turn it into a Git repository and make an initial commit.

From:

```bash
cd C:/Users/<you>/Github/frontend-template
```

these steps were run:

1. **Initialize Git**

   ```bash
   git init
   ```

2. **Check what Git sees**

   ```bash
   git status
   ```

   At this point, `git status` showed all files (for example `client/`, `readme/`, config files) as **untracked**.

3. **Stage everything**

   ```bash
   git add .
   ```

4. **Create the first commit**

   ```bash
   git commit -m "Initial commit: frontend template"
   ```

After this, `git status` showed:

- Clean working tree.
- One commit in the local repository with all the starting files.

---

## 5. Create the matching GitHub repository

Next, a remote home for the template was needed on GitHub.

1. In a browser, go to `https://github.com` and log in.
2. Click **“+” → “New repository”**.
3. Fill in:
   - **Repository name**: `frontend-template`.
   - **Description**: something like “Frontend template (Vite 7 + React + TS + Tailwind 4)”.
   - **Visibility**: Public or Private.
   - **Initialize options**: either leave unchecked (no README, no .gitignore) or accept a basic README – the local repo will be pushed over it.
4. Click **“Create repository”**.

GitHub then showed the URL for the new repository, for example:

```text
https://github.com/<your-username>/frontend-template.git
```

This URL is what was used as the `origin` remote in the next step.

---

## 6. Connect local repo to GitHub and push

With the local Git repo and the empty GitHub repo ready, the next step was to link them and push the local commits up to GitHub.

From inside:

```bash
cd C:/Users/<you>/Github/frontend-template
```

the following commands were run:

1. **Ensure the main branch is named `main`**

   ```bash
   git branch -M main
   ```

   - This renames the current branch to `main` if it was not already.

2. **Add the `origin` remote pointing at GitHub**

   ```bash
   git remote add origin https://github.com/<your-username>/frontend-template.git
   ```

   - This tells the local repo “`origin` is the GitHub repo at that URL.”

3. **Push the local `main` branch to GitHub and set upstream**

   ```bash
   git push -u origin main
   ```

   - This sends the current local commits to the `main` branch on GitHub.
   - The `-u` flag sets up tracking so future `git push`/`git pull` commands know which remote branch to use by default.

4. **Verify everything is connected**

   ```bash
   git remote -v
   git status
   git branch -vv
   ```

   - `git remote -v` showed `origin` pointing at `https://github.com/<your-username>/frontend-template.git`.
   - `git status` reported:
     - `On branch main`
     - `Your branch is up to date with 'origin/main'.`
   - `git branch -vv` showed `main` tracking `origin/main`.

At this point:

- The local template repo and the GitHub repo were fully in sync.
- The initial commit(s) were visible on GitHub under `frontend-template`.

---

## 7. Mark the GitHub repo as a template

The next step was to tell GitHub that `frontend-template` should act as a **template repository** so new repos can be created from it.

On GitHub:

1. Open the `frontend-template` repository page.
2. Click **Settings**.
3. Under **General** (or in the main settings area), find the **Template repository** checkbox.
4. Check **“Template repository”**.

After this, the `frontend-template` repo showed a **“Use this template”** button near the top, which is how new projects are created from it.

---

## 8. Using the template to create a real project (example: GameHub)

Once `frontend-template` was marked as a template, it could be used to spin up real projects. The flow for a new project (for example `GameHub`) was:

### 7.1. Create a new repo from the template on GitHub

1. Go to the `frontend-template` repo on GitHub.
2. Click **“Use this template” → “Create a new repository”**.
3. Enter a new repository name, for example:
   - `GameHub`
4. Click **Create repository**.

GitHub created a new repo at:

```text
https://github.com/<your-username>/GameHub.git
```

with the same files and structure as `frontend-template`.

### 7.2. Clone the new project locally

Back on the local machine, from the base projects folder:

```bash
cd C:/Users/<you>/Github
git clone https://github.com/<your-username>/GameHub.git
cd GameHub
```

This created a new local folder:

```text
C:/Users/<you>/Github/GameHub
```

containing a copy of the template as a new, independent Git repository.

### 7.3. Install dependencies and run

From inside the new project:

```bash
npm install          # optional root tooling, if used

cd client
npm install
npm run dev
```

Opening the URL shown in the terminal (usually `http://localhost:5173`) confirmed that the app ran correctly in the new project.

From that point on:

- `C:/Users/<you>/Github/frontend-template` remained the reusable **template**.
- `C:/Users/<you>/Github/GameHub` became the actual **application project** based on that template.

---

## 9. Summary checklist for recreating this template

If you want to recreate a similar template in the future, you can follow this condensed checklist:

1. **Prepare tools and folders**
   - Install Node.js + npm and Git.
   - Choose a base folder like `C:/Users/<you>/Github`.
   - Create a new folder `frontend-template` inside it.

2. **Build the template app locally**
   - Create the app structure (for example with Vite 7 + React + TS + Tailwind 4) under `frontend-template/`:
     - `client/` app.
     - `readme/` docs.
     - Root tooling and config files.
   - If you need to create those root tooling files from scratch (instead of copying existing ones), follow **section 3.2.1**.

3. **Put the app code in place**
   - Under `frontend-template/`, create:
     - A `client/` app (for example via `npm create vite@7 client -- --template react-ts`).
     - A `readme/` folder with docs (`reposetup.md`, `verceldeploy.md`, `templatecreation.md`).
     - Root tooling and config files.

4. **Initialize Git and make an initial commit**
   - `cd C:/Users/<you>/Github/frontend-template`
   - `git init`
   - `git add .`
   - `git commit -m "Initial commit: frontend template"`

5. **Create the GitHub repo and connect it**
   - On GitHub, create a new repo named `frontend-template`.
   - Back locally:
     - `git branch -M main`
     - `git remote add origin https://github.com/<your-username>/frontend-template.git`
     - `git push -u origin main`

6. **Mark the repo as a template**
   - On GitHub: `frontend-template` → **Settings** → **Template repository** (check it).

7. **Use the template to create real projects**
   - On GitHub: `frontend-template` → **Use this template** → **Create a new repository** (e.g. `GameHub`).
   - Locally:
     - `cd C:/Users/<you>/Github`
     - `git clone https://github.com/<your-username>/GameHub.git`
     - `cd GameHub`
     - `npm install` (root, optional)
     - `cd client && npm install && npm run dev`

This is the process that produced your current `frontend-template` repository and then used it to create a real project. You can now refer back to this file any time you want to repeat or adapt that workflow.

