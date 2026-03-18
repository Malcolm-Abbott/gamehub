## Vercel Deployment Guide

This project template is set up to work smoothly with Vercel for deploying React + Vite front-end applications. Use this guide as a **linear walkthrough** from a blank machine to a deployed app. It explains:

- **Section 1** – What this template already provides for Vercel.
- **Section 2** – What you still need to provide yourself.
- **Section 3** – How to create a new project from this template (your own repo).
- **Section 4** – How to connect that repo to Vercel and deploy.
- **Section 5** – Baseline install instructions for Node, npm, Git, and Vercel (prerequisites).
- **Section 6** – A quick end-to-end checklist to confirm you’ve done everything.
 - **Section 7** – An alternative deployment method using the Vercel CLI (for terminal users).

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
> In the command examples below, any angle-bracket text like `<you>`, `<your-username>`, `<project-name>`, or `<new-repo-name>` is a placeholder.
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

## 1. What this template already provides

- **Frontend structure**
  - `client/` directory containing a **Vite + React + TypeScript** app.
  - Standard `npm` scripts in `client/package.json`:
    - **`npm run dev`** – local development server.
    - **`npm run build`** – production build.
    - **`npm run preview`** – preview built app locally.

- **Vercel-compatible build setup**
  - Vite defaults that Vercel understands out of the box.
  - Production builds output to `client/dist/`.
  - No machine-specific paths or secrets are hard-coded.

- **Repository layout**
  - Repo root (this folder)
  - `client/` – actual front-end app that Vercel should build and deploy.

When you create a new repo from this template, Vercel can deploy it by pointing the **Root Directory** at `client`.

---

## 2. What you still need to provide

These items are **not** part of the template and must be supplied by each user.  

If you already have **Node.js + npm**, **Git**, and a **Vercel account** set up and working, you can skip ahead to **section 3**.

If you don’t already have them set up, see **section 5** (“Baseline installation instructions”) for step-by-step help:
- Node.js and npm → section **5.1**
- Git → section **5.2**
- Vercel account → section **5.3**

- **Node.js and npm installation**
  - You must have a working Node.js LTS (for example Node 18+ or 20+/24+) installed on your machine.
  - To verify they’re available in your terminal, open a new terminal window and run:
    ```bash
    node -v
    npm -v
    ```
    If both commands print version numbers (and not “command not found” or an error), Node and npm are correctly installed and available. If either command fails, follow the **“5.1. Install Node.js and npm (Windows)”** instructions below (or the equivalent for your OS) before continuing.

- **Your own Vercel account and project settings**
  - A personal (or team) account on Vercel.
  - A Vercel project connected to **your** GitHub repository created from this template.
  - Any framework/project settings inside Vercel (Root Directory, build command, etc.).

- **Secrets / environment variables (if needed)**
  - Any API keys, tokens, or other sensitive values needed by your app.
  - These should be set in **Vercel → Project → Settings → Environment Variables**, not committed to the repo.

---

## 3. Create a new project from this template

To start a fresh project (for example `GameHub`) using this template:

1. On GitHub, open the `frontend-template` repository.
2. Click **“Use this template” → “Create a new repository”**.
3. Choose a repository name for your new project (e.g. `GameHub`) and create the repo.
4. On your machine, choose a parent folder for your GitHub projects (for example `C:/Users/<you>/Github`), then in a terminal run:

   ```bash
   cd C:/Users/<you>/Github
   git clone https://github.com/<your-username>/<new-repo-name>.git
   cd <new-repo-name>           # e.g. cd GameHub
   ```

5. Install dependencies and verify the app runs locally:

   ```bash
   npm install                  # optional root tooling, if used

   cd client
   npm install
   npm run dev
   ```

After this, you have a standalone project repo (e.g. `GameHub`) that was created from the `frontend-template` and can be used independently.

---

## 4. Deploy this template on Vercel

Before you connect anything to Vercel, make sure your code is actually on GitHub:

1. Create your own GitHub repository using this template (see section 3).
2. From your local project folder, commit and push your code:

   ```bash
   git add .
   git commit -m "Initial commit from template"
   git push origin main
   ```

At this point, your code should live in a GitHub repo like `https://github.com/<your-username>/<your-project-name>`. The next steps show how to hook that repo up to Vercel.

### 4.1. Prepare the project locally

In your terminal:

```bash
cd /path/to/your/repo          # e.g. C:/Users/<you>/Github/GameHub
npm install                    # if you have a package.json at the root and want tooling there (optional)

cd client
npm install                    # install frontend dependencies
npm run dev                    # optional: confirm it runs locally
```

If `npm run dev` works and you can open the local URL in a browser (usually `http://localhost:5173`), you are ready to deploy.

### 4.2. Connect GitHub repo to Vercel

1. Go to `https://vercel.com` and log in.
2. Click **“Add New…” → “Project”**.
3. Choose **“Import Git Repository”**.
4. Select the GitHub repo you created from this template.

### 4.3. Configure Vercel project settings

On the Vercel project setup screen:

- **Root Directory**
  - Click **“Edit”** next to the root directory (if prompted).
  - Set it to: **`client`**
  - This tells Vercel that your actual front-end app lives in the `client` folder.

- **Framework Preset**
  - Vercel should auto-detect **Vite** or **React**.
  - If not, choose **Vite** manually.

- **Build & Output Settings** (normally auto-detected)
  - **Build Command**: `npm run build`
  - **Install Command**: `npm install`
  - **Output Directory**: `dist`

- **Environment Variables (if needed)**
  - If your app uses runtime configuration (API keys, URLs, etc.), add them here.
  - Example:
    - `VITE_API_BASE_URL = https://api.example.com`

When everything looks correct, click **“Deploy”**.

### 4.4. Verify the deployment

Once the build finishes:

1. Vercel will give you a **preview URL**.
2. Open it in your browser to confirm the app loads.
3. You can later assign a custom domain in **Project → Settings → Domains**.

---

## 5. Baseline installation instructions

This section gives minimal, practical instructions for setting up prerequisites on a fresh machine.

You only need to follow the subsections below for tools you **don’t already have installed** and working. If `node`, `npm`, `git`, and your Vercel account are already set up (their commands work and you can log in), you can skip to **section 6**.

### 5.1. Install Node.js and npm (Windows)

1. Go to `https://nodejs.org/en`.
2. Download the **LTS (Long-Term Support)** installer for Windows (64-bit).
3. Run the installer:
   - Keep defaults.
   - Ensure **“Add to PATH”** remains checked.
4. After installation, open a new terminal and verify:

   ```bash
   node -v
   npm -v
   ```

   Both commands should print version numbers (e.g. `v24.14.0`, `11.x.x`).

> **Note for Windows PowerShell users**
>
> If you see an error like:
>
> `npm : File 'C:\Program Files\nodejs\npm.ps1' cannot be loaded because running scripts is disabled on this system.`
>
> this is a PowerShell **execution policy** issue, not a problem with Node itself. You can either:
>
> - Run these `node` / `npm` commands from **Git Bash** or **Command Prompt** instead, or
> - (Advanced) Relax the execution policy for your user by running, in an elevated PowerShell:
>
>   ```powershell
>   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
>   ```
>
> Adjusting the execution policy is a system security setting. If you’re not comfortable changing it, just use Git Bash or Command Prompt for `node` / `npm` instead.

> On macOS or Linux, you can also use a version manager like `nvm`, but the essential requirement is the same: `node` and `npm` must work in your shell.

### 5.2. Install Git

1. Go to `https://git-scm.com/downloads`.
2. Download and run the installer for your OS.
3. After installation, verify:

   ```bash
   git --version
   ```

   You should see a version number.

### 5.3. Set up a Vercel account

1. Visit `https://vercel.com`.
2. Sign up with **GitHub** (recommended) or another login method.
3. Authorize Vercel to access your GitHub repositories when prompted.

---

## 6. Quick checklist for new users

For any new project created from this template:

1. **Clone the repo from GitHub.**
2. **Ensure Node.js and npm are installed** (see section 5.1).
3. In the repo root:
   - Optionally run `npm install` if you add root tooling.
4. In `client/`:
   - Run `npm install`.
   - Run `npm run dev` to verify locally.
5. On Vercel:
   - Create a project from your GitHub repo.
   - Set **Root Directory = `client`**.
   - Ensure **Build Command = `npm run build`**, **Output Directory = `dist`**.
   - Add any required **environment variables**.
6. Click **Deploy** and open the generated URL.

With these steps, this template should be reusable for you (and others) as a straightforward starting point for Vercel-hosted front-end projects.

---

## 7. Alternative: Deploy with the Vercel CLI

The main instructions in this guide use Vercel’s GitHub integration (section 4), where Vercel deploys your app based on what is in your GitHub repository. As an alternative, you can deploy directly from your local machine using the **Vercel CLI**, which deploys whatever is in your local folder at the moment you run it.

### 7.1. One-time setup for the Vercel CLI

On any machine where you want to deploy from the terminal:

```bash
npm install -g vercel
vercel login
```

`vercel login` will open a browser window so you can sign in and link the CLI to your Vercel account.

### 7.2. First-time setup for this project

From your project’s `client/` folder:

```bash
cd /path/to/your/repo/client
vercel
```

The CLI will ask a few questions the first time:

- Which scope (personal or team) to use.
- Whether to create a new Vercel project or link to an existing one.

Once this is done, that local folder is linked to a Vercel project. Future runs of `vercel` in the same folder usually skip these questions and just build + deploy.

### 7.3. How this differs from the Git-based flow

- **Source of truth**
  - Git-based flow (section 4): Vercel deploys from **your GitHub repo**.
  - CLI flow (this section): Vercel deploys from **your local `client/` directory**.

- **Deploy trigger**
  - Git-based flow: `git push` to the configured branch (for example `main`) triggers a new deploy.
  - CLI flow: running `vercel` in the project folder triggers a new deploy.

- **When you might prefer each**
  - Use the Git-based flow (section 4) for normal/team workflows, automatic preview deployments, and a clear history of what is deployed.
  - Use the CLI flow (this section) if you prefer working from the terminal or want to quickly deploy local changes that are not yet committed or pushed to GitHub.

