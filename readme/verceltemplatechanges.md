# Vercel template changes: SPA routing on refresh (`404: NOT_FOUND`)

This guide is for **maintainers of the base `frontend-template` repository** (or any fork with the same layout: Vite + React in **`client/`**, Vercel **Root Directory** set to **`client`**). It documents how to fix the issue where **Vercel returns a platform `404: NOT_FOUND`** when users **refresh** or **open a deep link** to a client-side route (for example `/games/123`), even though in-app navigation works.

For the full Vercel deployment walkthrough, see [`verceldeploy.md`](./verceldeploy.md).

---

## 1. Why this happens

- The app uses **React Router** with **`BrowserRouter`**. Routes like `/games/:id` exist only **in the browser** after JavaScript loads.
- **Vercel** serves **static files** from the build output (`dist/`). There is **no** real file at `/games/123`.
- When **Root Directory** is set to **`client`**, Vercel treats **`client/`** as the project root. Configuration in **`vercel.json`** is read from **that** directory.
- A **`vercel.json` sitting only at the repository root** does **not** apply the same way for that deployment. Without a **rewrite** rule, a request to `/games/123` never receives **`index.html`**, so the **edge** returns **`404: NOT_FOUND`** before your SPA runs.

---

## 2. What to add to the template

Add a new file **`client/vercel.json`** (next to `client/package.json`) with the following contents:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**What this does**

- For paths that **do not** match a real static file (JS, CSS, images under `assets/`, etc.), Vercel **serves `/index.html`** instead.
- The SPA loads, React Router reads the URL, and the correct page renders. **Refresh** and **direct links** work.

---

## 3. Step-by-step (base template repo)

1. Open the **template** repository locally (or a branch reserved for template updates).
2. Confirm the layout still has **`client/`** as the Vite app and that [`verceldeploy.md`](./verceldeploy.md) still recommends **Root Directory = `client`** on Vercel (see section 4.3 there).
3. Create **`client/vercel.json`** with the JSON in **section 2** above (exactly one `rewrites` array; no need to duplicate the legacy `builds` block from the repo root unless you rely on it for a different deploy mode).
4. **Optional but recommended** — update **section 1** of [`verceldeploy.md`](./verceldeploy.md) (“What this template already provides”): under **Vercel-compatible build setup** or **repository layout**, add a bullet such as:
   - **`client/vercel.json`** – SPA **rewrite** rules so deep links and refresh work when **Root Directory** is **`client`**.
5. **Optional — root `vercel.json`:** If the template keeps a **`vercel.json` at the repository root** (for example with legacy `"builds"`), you may keep **`rewrites`** there **for projects that deploy with the repo root as the Vercel root**. It does **not** replace **`client/vercel.json`** for the **Root Directory = `client`** flow. Avoid duplicating conflicting rules; when in doubt, **`client/vercel.json`** is the file that fixes the common case.
6. Run a local production build from **`client/`** to ensure nothing breaks:

   ```bash
   cd client
   npm run build
   ```

7. Commit and push the template:

   ```bash
   git add client/vercel.json readme/verceldeploy.md readme/verceltemplatechanges.md   # include whichever docs you changed
   git commit -m "Add client/vercel.json SPA rewrites for Vercel when Root Directory is client"
   git push origin main
   ```

8. Tag or announce the template change if other repos copy from it; downstream projects can merge or copy **`client/vercel.json`** the same way.

---

## 4. How to verify after deploy

1. Deploy a project that uses **Root Directory = `client`** and includes **`client/vercel.json`**.
2. In the browser, navigate to a **non-root** route (anything other than `/`).
3. **Refresh the page** (F5 or Ctrl+R / Cmd+R).
4. **Expected:** the app loads for that route.
5. **Failure:** Vercel’s generic **`404: NOT_FOUND`** page with an **ID** (for example `pdx1::...`) — re-check that **`client/vercel.json`** is present on the deployed branch and that **Root Directory** is **`client`**.

---

## 5. Downstream repos (already created from the template)

Projects created **before** this file existed should **add the same `client/vercel.json`** (or merge from the updated template), then redeploy. No change to **Environment Variables** is required for rewrites alone.
