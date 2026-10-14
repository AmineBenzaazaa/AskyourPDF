# Ask your PDF

Early-stage Next.js app for a "chat with your PDF" service. The current code has the landing page, Kinde authentication, user syncing to MongoDB through Prisma and tRPC, and an empty "My Files" dashboard. PDF upload and chat are not built yet.

## What is implemented

- **Landing page** (`/`) with the product pitch and preview images.
- **Authentication** through Kinde. The navbar has sign-in and register links, and `/api/auth/[kindeAuth]` handles the auth callbacks.
- **Auth callback** (`/auth-callback`) calls the `authCallback` tRPC procedure. That procedure creates a `User` record in the database the first time a Kinde user signs in, then redirects to the dashboard.
- **Dashboard** (`/dashboard`) is server-rendered and protected. It redirects users who are not signed in or have no database record, and right now it only shows a "My Files" heading.

The `User` model already has Stripe subscription fields, and the UI links to `/pricing`, but no Stripe integration or pricing page exists in the code yet.

## Tech stack

- [Next.js](https://nextjs.org/) 13 (App Router) with React 18 and TypeScript
- [tRPC](https://trpc.io/) v10 with [TanStack Query](https://tanstack.com/query) v4
- [Prisma](https://www.prisma.io/) 5 with MongoDB
- [Kinde](https://kinde.com/) auth (`@kinde-oss/kinde-auth-nextjs`)
- Tailwind CSS, `class-variance-authority`, `tailwind-merge` and `lucide-react` icons (shadcn/ui-style `Button`)
- Zod

## Project structure

```
prisma/schema.prisma            # MongoDB datasource and User model
src/
  app/
    page.tsx                    # Landing page
    layout.tsx                  # Root layout (Navbar + Providers)
    dashboard/page.tsx          # Protected dashboard
    auth-callback/page.tsx      # Syncs Kinde user to DB, then redirects
    api/auth/[kindeAuth]/       # Kinde auth route handler
    api/trpc/[trpc]/            # tRPC fetch adapter
    _trpc/client.ts             # tRPC React client
  components/                   # Navbar, Dashboard, Providers, MaxWidthWrapper, ui/button
  db/index.ts                   # Prisma client singleton
  trpc/                         # tRPC init and app router
  lib/utils.ts                  # cn() helper
```

## Getting started

Requirements: Node.js 18 or later, a MongoDB database (Prisma needs a replica set for MongoDB), and a Kinde application.

```bash
npm install
npx prisma generate
npx prisma db push      # sync the schema to your MongoDB database
npm run dev             # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Environment variables

Put these in a `.env` file. `.env` is in `.gitignore`.

| Variable | Used by |
| --- | --- |
| `DATABASE_URL` | Prisma (MongoDB connection string) |
| `KINDE_CLIENT_ID` | Kinde SDK |
| `KINDE_CLIENT_SECRET` | Kinde SDK |
| `KINDE_ISSUER_URL` | Kinde SDK |
| `KINDE_SITE_URL` | Kinde SDK |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | Kinde SDK |
| `KINDE_POST_LOGIN_REDIRECT_URL` | Kinde SDK (for example `http://localhost:3000/auth-callback`) |

## Notes

- The tRPC client URL is hardcoded to `http://localhost:3000/api/trpc` in `src/components/Providers.tsx`.
- The component file is named `src/components/maxWidthWrapper.tsx`, but the code imports it as `MaxWidthWrapper`. That works on case-insensitive file systems such as macOS, but the build can fail on Linux.
