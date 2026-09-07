# Kakamega Empowerment CBO 🌱

A community-based organization website for environmental conservation, land rights, and community empowerment in Kakamega, Kenya.

## 🌟 Features

- **Contact Form** — Internal submission with admin dashboard and Gmail notifications
- **Volunteer Registration** — Multi-step form with admin notifications
- **Donations** — Stripe (international) + M-Pesa (local Kenyan) payment integration
- **Tree Planting Tracker** — Log and track environmental impact
- **Events Management** — Community events and training sessions
- **Stories & Projects** — Community impact stories
- **Admin Dashboard** — Full management interface with authentication
- **Resource Library** — Educational materials and toolkits

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Database:** Prisma with SQLite (PostgreSQL-ready)
- **Payments:** Stripe + M-Pesa (Safaricom Daraja API)
- **Email:** Nodemailer (Gmail SMTP)
- **Authentication:** Custom session-based admin auth
- **TypeScript:** Full type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/kakamega-empowerment.git
cd kakamega-empowerment

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Initialize the database
npm run db:push
npm run db:seed  # optional: seed sample data

# Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database

The project uses **PostgreSQL** (via Prisma) for both local and production environments.

**Free PostgreSQL options:**
- [Neon](https://neon.tech) — 0.5 GB free, recommended
- [Vercel Postgres](https://vercel.com/storage/postgres) — built-in if hosting on Vercel
- [Supabase](https://supabase.com) — 500 MB free with dashboard UI
- [Railway](https://railway.app) — $5 free trial

For local development you can also use SQLite by changing the `provider` in `prisma/schema.prisma` to `sqlite` and the `DATABASE_URL` to `file:./dev.db`.

## 📜 Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run db:push` — Push schema changes to database
- `npm run db:seed` — Seed sample data
- `npm run db:studio` — Open Prisma Studio
- `npm run db:reset` — Reset database (DESTRUCTIVE)

## 🔐 Admin Access

Navigate to `/admin` and sign in with your configured admin credentials.

## 💳 Payment Setup

### Stripe (International)
1. Get keys at [stripe.com](https://stripe.com)
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`

### M-Pesa (Kenya)
1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Get Consumer Key, Consumer Secret, and Passkey
3. Add to `.env`:
   - `MPESA_CONSUMER_KEY`
   - `MPESA_CONSUMER_SECRET`
   - `MPESA_PASSKEY`
4. Set `MPESA_ENV="production"` for live mode

## 📧 Email Setup (Gmail)

1. Enable 2-Step Verification on your Gmail
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add to `.env`:
   - `EMAIL_USER` — your Gmail address
   - `EMAIL_APP_PASSWORD` — 16-character app password

## 🌐 Deployment

This project is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway** (for full-stack with database)
- **Render**

For SQLite, use a platform with persistent disk. For production, migrate to PostgreSQL.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication
│   │   ├── contact/       # Contact form
│   │   ├── donations/     # Stripe & M-Pesa
│   │   ├── volunteers/    # Volunteer applications
│   │   └── ...
│   ├── admin/             # Admin dashboard
│   ├── (pages)/           # Public pages
│   └── layout.tsx
├── components/            # React components
│   └── ui/                # Shared UI library
├── lib/                   # Utilities & config
└── types/                 # TypeScript types
```

## 📝 License

Private — © 2026 Kakamega Empowerment CBO
