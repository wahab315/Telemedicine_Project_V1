# Telemedicine frontend

Next.js App Router application (JavaScript + SCSS) for the telemedicine product.

## Setup

Install and run from the product root (`telemedicine/`), not from this folder. The root `package.json` is an npm workspace and controls this app.

```bash
cd telemedicine
cp frontend/.env.example frontend/.env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` when the backend is available. For local auth stubs, set `NEXT_PUBLIC_USE_MOCK_API=true`.

## Scripts

Run these from the product root:

- `npm run dev` — Next.js development server (`dev:backend` is reserved until the API package exists)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` / `lint:fix` — ESLint
- `npm run format` / `format:check` — Prettier

`cd frontend && npm run dev` still starts this app. Add frontend dependencies from the product root with `npm install <pkg> -w telemedicine-frontend`.

## Architecture

See `../ui_plan/FRONTEND_SETUP_PLAN.md` for the full spec. Code lives under `src/` with `@core`, `module`, `shared`, and `app` route groups.
