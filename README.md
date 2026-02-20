# ACTORSTOCK.AI (MVP)

MVP web app for cataloging and licensing AI actors.

## What is included

- Actor catalog with filters and sorting (`/actors`)
- Actor detail page with media preview (`/actors/[id]`)
- Mock licensing checkout (`/license`) with success flow
- User account page with order history (`/account`)
- Admin dashboard with actor CRUD, publish/unpublish, local media upload, and order status audit (`/admin`)
- Session auth (credentials) with route guards (middleware + server guards)
- Prisma + PostgreSQL schema, migration, and seed with 12 demo actors
- Local PostgreSQL via Docker Compose

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI components
- PostgreSQL + Prisma ORM
- Custom credentials auth (MVP-friendly, Stripe-ready architecture)
- Mock payments (orders table) + placeholder Stripe webhook route

## Quick start

### 1) Requirements

- Node.js 18+ (recommended 20+)
- Docker + Docker Compose

### 2) Environment

```bash
cp .env.example .env
```

Edit `.env` if needed.

### 3) Start PostgreSQL

```bash
npm run db:up
```

### 4) Install dependencies

```bash
npm install
```

### 5) Prisma migrate + seed

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 6) Run app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Seed credentials

- Admin: `admin@actorstock.ai` / `admin1234`
- Demo user: `demo@actorstock.ai` / `demo1234`

You can override admin seed credentials with:

- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`

## Main routes

### Pages

- `/` landing
- `/actors` browse + filters
- `/actors/[id]` actor detail
- `/license` create license order
- `/license/success` order success
- `/account` user orders (guarded)
- `/admin` admin dashboard (guarded, admin only)
- `/login` credentials login

### API

- `GET /api/actors`
- `GET /api/actors/[id]`
- `POST /api/orders`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/upload` (admin only, local filesystem)
- `POST /api/admin/actors`
- `PUT /api/admin/actors/[id]`
- `DELETE /api/admin/actors/[id]`
- `PATCH /api/admin/orders/[id]`
- `POST /api/stripe/webhook` (placeholder)

## Storage

MVP uses local filesystem uploads:

- `public/uploads/images`
- `public/uploads/audio`
- `public/uploads/video`

Can be swapped for S3/R2 with presigned uploads later.

## Project tree

```text
.
├── .env.example
├── .eslintrc.json
├── .gitignore
├── README.md
├── docker-compose.yml
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── prisma
│   ├── migrations
│   │   └── 202602170001_init
│   │       └── migration.sql
│   ├── schema.prisma
│   └── seed.ts
├── public
│   └── uploads
│       ├── audio
│       ├── images
│       └── video
├── src
│   ├── app
│   │   ├── account
│   │   │   └── page.tsx
│   │   ├── actors
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── admin
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── actors
│   │   │   │   ├── [id]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── admin
│   │   │   │   ├── actors
│   │   │   │   │   ├── [id]
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── orders
│   │   │   │       └── [id]
│   │   │   │           └── route.ts
│   │   │   ├── auth
│   │   │   │   ├── login
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout
│   │   │   │   │   └── route.ts
│   │   │   │   └── me
│   │   │   │       └── route.ts
│   │   │   ├── orders
│   │   │   │   └── route.ts
│   │   │   ├── stripe
│   │   │   │   └── webhook
│   │   │   │       └── route.ts
│   │   │   └── upload
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── license
│   │   │   ├── success
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── actor-card.tsx
│   │   ├── actor-filters.tsx
│   │   ├── admin-dashboard.tsx
│   │   ├── license-order-form.tsx
│   │   ├── login-form.tsx
│   │   ├── logout-button.tsx
│   │   ├── site-header.tsx
│   │   ├── toast-provider.tsx
│   │   └── ui
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   ├── lib
│   │   ├── actors.ts
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── logger.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Notes

- `Stripe` is intentionally mocked in MVP (`/api/stripe/webhook` placeholder + mock order statuses).
- Actor detail page increments view analytics (`ActorView` + `Actor.viewCount`).
- Validation is done with `zod` in API routes.
