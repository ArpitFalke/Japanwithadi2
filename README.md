# 🎌 Japan With Adi — Production Platform

> **The World's #1 AI-Powered Japan Scholarship Discovery Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com)
[![Claude AI](https://img.shields.io/badge/Claude-AI-orange)](https://anthropic.com)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/yourname/japan-with-adi
cd japan-with-adi
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Fill in your keys (see below)
```

### 3. Set Up Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste contents of `supabase/migrations/001_schema.sql` → Run
3. Enable Google OAuth in **Authentication → Providers**
4. Copy your project URL and anon key to `.env.local`

### 4. Seed Database
```bash
npm run db:seed
```

### 5. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 🔑 Required Environment Variables

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# AI (required for Adi Sensei)
ANTHROPIC_API_KEY=sk-ant-xxx...
OPENAI_API_KEY=sk-xxx...      # for PDF description generation

# App
NEXT_PUBLIC_APP_URL=https://japanwithadi.com  # or http://localhost:3000
```

---

## 📁 Project Structure

```
japan-with-adi/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── scholarships/       # Scholarship listing + detail
│   │   ├── ai/                 # Adi Sensei AI chat
│   │   ├── dashboard/          # Student dashboard
│   │   ├── admin/              # Admin panel
│   │   ├── blog/               # SEO blog
│   │   ├── webinars/           # Webinar listings
│   │   ├── community/          # Student community
│   │   └── api/                # API routes
│   │       ├── ai-chat/        # Claude AI streaming
│   │       ├── scholarships/   # CRUD + search
│   │       ├── upload-pdf/     # AI PDF extraction
│   │       ├── blog/           # Blog API
│   │       ├── webinars/       # Webinars API
│   │       └── notifications/  # Notifications API
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── hero/               # Landing sections
│   │   ├── scholarship/        # Cards, detail, search
│   │   ├── ai/                 # Adi Sensei chat UI
│   │   ├── dashboard/          # Student dashboard
│   │   ├── admin/              # Admin panel + PDF parser
│   │   ├── auth/               # Login/register forms
│   │   ├── blog/               # Blog components
│   │   ├── webinar/            # Webinar components
│   │   └── community/          # Community components
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   ├── ai.ts               # Claude + OpenAI integration
│   │   ├── scholarships.ts     # Data access layer
│   │   └── utils.ts            # Utilities
│   ├── types/index.ts          # TypeScript types
│   ├── styles/globals.css      # Design system
│   └── middleware.ts           # Auth protection
├── supabase/
│   └── migrations/001_schema.sql  # Full DB schema
├── scripts/
│   └── seed.ts                 # Database seed data
├── public/                     # Static assets
└── .env.example                # Environment template
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| 🔍 Scholarship Search Engine (500+) | ✅ Live |
| 🤖 Adi Sensei AI (Claude-powered) | ✅ Live |
| 📋 Scholarship Detail Pages | ✅ Live |
| 📊 Student Dashboard | ✅ Live |
| 🔐 Auth (Email + Google OAuth) | ✅ Live |
| 📄 Admin PDF AI Parser | ✅ Live |
| 📝 SEO Blog System | ✅ Live |
| 🎥 Webinars Section | ✅ Live |
| 👥 Community Forum | ✅ Live |
| 🔔 Notifications | ✅ Live |
| 📱 PWA / Mobile App Feel | ✅ Live |
| 🗺️ Application Roadmaps | ✅ Live |
| ❤️ Save & Compare Scholarships | ✅ Live |
| 📊 Admin Analytics | ✅ Live |

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in Vercel dashboard under **Settings → Environment Variables**.

### Vercel Settings
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Brand Black | `#050505` |
| Neon Crimson | `#ff002f` |
| White Glow | `#f5f5f5` |
| Dark Gray | `#111111` |
| Glass | `rgba(255,255,255,0.04)` |

**Fonts**: Syne (display) · Space Mono (code) · Noto Sans JP (Japanese)

---

## 🤖 AI Architecture

**Adi Sensei** is powered by **Claude claude-opus-4-5** via streaming API:

- Real-time streaming responses
- User profile context injection
- Scholarship database RAG context
- Conversation memory (last 20 messages)

**PDF Parser** uses Claude's document understanding to extract:
- Scholarship name, provider, category
- Stipend, deadline, eligibility
- Required documents, benefits
- Auto-generates slugs and saves as draft

---

## 📊 Database Schema

9 tables: `users` · `scholarships` · `saved_scholarships` · `applications` · `ai_chat_sessions` · `blog_posts` · `comments` · `webinars` · `notifications`

Full RLS (Row Level Security) enabled. Auth via Supabase Auth with Google OAuth.

---

## 📞 Support

Built with ❤️ for international students dreaming of Japan.

- 🌐 Website: [japanwithadi.com](https://japanwithadi.com)
- 📧 Email: hello@japanwithadi.com
- 🐦 Twitter: [@JapanWithAdi](https://twitter.com/japanwithadi)

