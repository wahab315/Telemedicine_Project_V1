# Telemedicine monorepo plan

> **Status:** Phase 1 is applied. Phase 2 waits until backend work is requested.  
> **Do this when asked:** follow Phase 2 only when backend work is requested.  
> **Product root:** `/home/wahab315/Desktop/telemedicine`  
> **Apps:** `frontend/` (Next.js, exists) and `backend/` (Express, empty folder, future).

---

## 0. Requirement check

| Requirement | How this plan meets it |
|---|---|
| One product folder holds the frontend and the backend | Keep `frontend/` and `backend/` as siblings under `telemedicine/`. |
| Frontend stays Next.js | `frontend/` is unchanged except the monorepo root setting in `next.config.js`. |
| Backend will be Node.js + Express, later | No Express app in Phase 1. Phase 2 adds it and attaches it to the same root scripts. |
| Root `package.json` controls both apps | The root file has `dev:frontend`, `dev:backend`, `build:frontend`, `build:backend`, `start:frontend`, and `start:backend` from the first commit of that file. |
| Frontend work continues before the API exists | `npm run dev`, `npm run build`, and `npm run start` run the frontend until `backend/package.json` exists. After that, `npm run dev` starts both servers. |
| `nexacore/` is a reference, not this product | It stays out of `workspaces`. |

Checked against the folders on disk: `frontend/` is Next.js 16.3.7 on npm, `backend/` is empty, `nexacore/` is a separate git repo (`Nexa-Core-V1`), and there is no `package.json` at the product root yet.

---

## 1. Decision

Use **npm workspaces**.

The root `package.json` lists the app folders. `npm install` at the product root installs every app. Root scripts start each app with `npm run <script> -w <package-name>`.

This matches the repo as it is:

- The frontend already has an npm lockfile. Node on this machine is `v24.21.0` and npm is `11.19.0`.
- There are two apps and no shared library, so Turborepo or Nx would add a task runner before there is anything for it to orchestrate.
- pnpm and Yarn would replace the existing npm lockfile. pnpm is installed on the machine and stays unused.
- Folder names stay `frontend/` and `backend/`. Workspaces accept those paths. The frontend plan, git repo, and imports already assume `frontend/`.

`concurrently` is added in Phase 2 so one `npm run dev` can run Next.js and Express in the same terminal. npm runs workspace scripts one after another, so `npm run dev --workspaces` would leave Express waiting until the Next process exits.

Official references:

- [npm workspaces](https://docs.npmjs.com/cli/v12/using-npm/workspaces)
- [Turborepo repository structure](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository) — Turborepo sits on top of workspaces. It is a later option, not the first step.

---

## 2. Target layout

```text
telemedicine/
├── package.json              # controls frontend and backend
├── package-lock.json         # the only lockfile
├── node_modules/             # created by npm install at this folder
├── MONOREPO_PLAN.md
├── frontend/                 # Next.js, own package.json
├── backend/                  # Express, own package.json in Phase 2
├── ui_plan/                  # docs, not a workspace
└── nexacore/                 # separate repo, not a workspace
```

No `packages/` folder until both apps import the same module.

---

## 3. Root `package.json`

### Phase 1 — add this file now

`backend/` has no `package.json`, so it cannot be listed in `workspaces` yet. npm refuses to install if a workspace path has no `package.json`. The backend commands are still on the root file, so this is the control surface for both apps.

```json
{
  "name": "telemedicine",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "frontend"
  ],
  "scripts": {
    "dev": "npm run dev:frontend",
    "dev:frontend": "npm run dev -w telemedicine-frontend",
    "dev:backend": "echo \"Backend package is not created yet. Follow Phase 2 in MONOREPO_PLAN.md.\" && exit 1",
    "build": "npm run build:frontend",
    "build:frontend": "npm run build -w telemedicine-frontend",
    "build:backend": "echo \"Backend package is not created yet. Follow Phase 2 in MONOREPO_PLAN.md.\" && exit 1",
    "start": "npm run start:frontend",
    "start:frontend": "npm run start -w telemedicine-frontend",
    "start:backend": "echo \"Backend package is not created yet. Follow Phase 2 in MONOREPO_PLAN.md.\" && exit 1",
    "lint": "npm run lint -w telemedicine-frontend",
    "lint:fix": "npm run lint:fix -w telemedicine-frontend",
    "format": "npm run format -w telemedicine-frontend",
    "format:check": "npm run format:check -w telemedicine-frontend"
  }
}
```

`private: true` keeps the root package off the npm registry.

`frontend/package.json` keeps the name `telemedicine-frontend` and keeps Next, React, and the rest of its dependencies. The root file does not list `next` or `express`.

### Phase 2 — replace the root scripts when the API package exists

Add `"backend"` to `workspaces`, add `concurrently` (current release: 10.0.5), and point the backend scripts at `telemedicine-backend`.

```json
{
  "name": "telemedicine",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "frontend",
    "backend"
  ],
  "scripts": {
    "dev": "concurrently -n web,api -c cyan,magenta \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "npm run dev -w telemedicine-frontend",
    "dev:backend": "npm run dev -w telemedicine-backend",
    "build": "npm run build:frontend && npm run build -w telemedicine-backend --if-present",
    "build:frontend": "npm run build -w telemedicine-frontend",
    "build:backend": "npm run build -w telemedicine-backend --if-present",
    "start": "concurrently -n web,api -c cyan,magenta \"npm run start:frontend\" \"npm run start:backend\"",
    "start:frontend": "npm run start -w telemedicine-frontend",
    "start:backend": "npm run start -w telemedicine-backend",
    "lint": "npm run lint --workspaces --if-present",
    "lint:fix": "npm run lint:fix --workspaces --if-present",
    "format": "npm run format --workspaces --if-present",
    "format:check": "npm run format:check --workspaces --if-present"
  },
  "devDependencies": {
    "concurrently": "^10.0.5"
  }
}
```

`build:backend` uses `--if-present` because a plain Express app may only need `start`, with no compile step.

---

## 4. Frontend change in Phase 1

`frontend/next.config.js` is ESM. After the lockfile moves to `telemedicine/`, Next 16 (Turbopack in dev) needs that directory as the workspace root. Set `turbopack.root` and `outputFileTracingRoot` to the same path. In current Next 16, if only one is set, the other is copied from it. Setting both to the parent folder avoids a mismatch warning.

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const nextConfig = {
  // existing keys stay
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot
  }
};
```

Leave `frontend/package.json` scripts as they are. The root scripts call them.

---

## 5. Backend, when that work starts

Phase 2 creates `backend/package.json` only. Server files, database, and routes are a separate task.

```json
{
  "name": "telemedicine-backend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  }
}
```

- `"type": "module"` matches the frontend.
- JavaScript, same language decision as `ui_plan/FRONTEND_SETUP_PLAN.md`.
- Express listens on port **4000**. Next stays on port **3000**.
- The frontend already reads `NEXT_PUBLIC_API_BASE_URL`. Point that at `http://localhost:4000` when the API is real.
- Dependencies such as `express` go in `backend/package.json`, installed from the product root with `npm install express -w telemedicine-backend`.

---

## 6. Phase 1 steps

1. Add the Phase 1 root `package.json` from section 3.
2. Delete `frontend/node_modules` and `frontend/package-lock.json` **before** the root install. One lockfile will live at `telemedicine/package-lock.json`.
3. From `telemedicine/`, run `npm install`.
4. Add the monorepo root keys to `frontend/next.config.js` (section 4).
5. From `telemedicine/`, confirm:
   - `npm run dev` starts the current Next app
   - `npm run dev:backend` prints the Phase 2 message and exits
   - `npm run lint` and `npm run build` still pass
6. Confirm `cd frontend && npm run dev` still starts Next. npm finds the workspace root by walking upward.
7. Update `frontend/README.md` so install and dev commands are run from `telemedicine/`.

Leave `nexacore/` untouched. Leave `backend/` empty. Skip Turborepo.

---

## 7. Phase 2 steps

Run these only when backend work is requested.

1. Add `backend/package.json` from section 5, plus the first `src/server.js` when the API task itself is in scope.
2. Replace the root `package.json` with the Phase 2 file in section 3.
3. From `telemedicine/`, run `npm install`.
4. Confirm `npm run dev:frontend`, `npm run dev:backend`, and `npm run dev`.

---

## 8. Commands

From `telemedicine/` after Phase 1:

| Command | Result |
|---|---|
| `npm install` | Installs the frontend workspace |
| `npm run dev` | Next.js |
| `npm run dev:frontend` | Next.js |
| `npm run dev:backend` | Tells you the API package is not created yet |
| `npm run build` | Next.js production build |
| `npm install <pkg> -w telemedicine-frontend` | Adds a frontend dependency |

After Phase 2, `npm run dev` starts Next.js and Express together. `dev:frontend` and `dev:backend` still start one app.

Install only from `telemedicine/`. An install inside `frontend/` creates a second lockfile.

---

## 9. Git (out of scope for the package.json work)

Git currently lives in `frontend/` (one local commit, no remote). The new root `package.json` sits **above** that repo, so `frontend/.git` will not track it.

That is acceptable for Phase 1. Moving git to `telemedicine/` is a separate decision because `nexacore/` has its own GitHub remote. If that move happens later:

- Ignore `nexacore/` in the root `.gitignore`, or keep it out of the new repo. The frontend plan uses it as a read-only reference at `nexacore/`.
- Ignore `node_modules/`, `frontend/.next/`, and `.env*`.
- The frontend history is one unpublished commit, so a new repo at the parent can replace `frontend/.git` without a force-push.

---

## 10. Risks

| Risk | What to do |
|---|---|
| Nested `frontend/package-lock.json` left in place | Delete it and `frontend/node_modules` before the first root `npm install`. |
| Next 16 looks for the app root in the wrong folder | Set `turbopack.root` and `outputFileTracingRoot` to `telemedicine/` in `frontend/next.config.js`. |
| `"backend"` listed in `workspaces` while the folder is empty | Add that entry in Phase 2, together with `backend/package.json`. |
| `npm run dev` stops working before the API exists | Phase 1 `dev` calls `dev:frontend` only. |
| Root `package.json` is outside `frontend/.git` | Expected until section 9 is done on purpose. |
| `nexacore/` gets committed into this product | Keep it out of `workspaces` and out of a future root git history. |
