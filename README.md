# GadgetsByTJ

Your premier destination for mobile electronics and accessories. Built with Next.js 15 App Router.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: Drizzle ORM + Neon PostgreSQL
- **Auth**: NextAuth v5 beta (Credentials provider)
- **File Storage**: Vercel Blob
- **Validation**: Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file at the project root:

```env
# Neon PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# NextAuth secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-secret-here

# Vercel Blob token (from Vercel dashboard)
BLOB_READ_WRITE_TOKEN=your-blob-token-here
```

### 3. Run database migrations

```bash
npx drizzle-kit push
```

### 4. Seed the database (sample data + first admin)

Set the admin credentials in env vars and run the seed script:

```bash
SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=yourpassword npx tsx src/lib/db/seed.ts
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public site.

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages (home, products, devices, about, contact)
│   ├── admin/             # Admin panel (dashboard, products, categories, devices, gallery, settings)
│   └── api/               # API route handlers
├── components/
│   ├── admin/             # Admin UI components
│   ├── animations/        # Framer Motion wrappers
│   └── public/            # Public UI components
└── lib/
    ├── auth/              # NextAuth config
    ├── blob/              # Vercel Blob helpers
    ├── db/                # Drizzle ORM schema and client
    └── validations/       # Zod schemas
```

## Admin Panel Features

- **Dashboard**: Stats overview (products, devices, categories)
- **Products**: Full CRUD with image upload, specifications editor
- **Categories**: Full CRUD with image upload
- **Devices**: Full CRUD with type filter and specifications editor
- **Gallery**: Image gallery with upload and delete
- **Settings**: Site-wide settings (general, hero, contact, social, appearance) with live preview

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Set the environment variables listed above in your Vercel project settings before deploying.
