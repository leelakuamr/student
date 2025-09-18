# AdeptLearn — EdTech Personalized Learning Platform (Hackathon MVP)

AdeptLearn is an adaptive learning platform built as a hackathon MVP. It includes a student dashboard, interactive video modules (YouTube embeds), assignment submission, discussion forums, an AI chatbot (OpenAI) with per-user history, basic RBAC, and a simple JSON-backed persistence layer.

This repository is a modified Fusion Starter template with the following high-level pieces implemented:

- Frontend: React + Vite + TypeScript + TailwindCSS
- Backend: Express integrated with Vite dev server
- Persistence (MVP): JSON files in server/data (chats.json, users.json, progress.json, discussions.json, submissions.json)
- Auth: Email/password + token stored in users.json (simple token-based session)
- AI Chat: /api/ai/chat proxy to OpenAI (gpt-3.5-turbo) when OPENAI_API_KEY is set; mock fallback otherwise
- Video modules: YouTube embeds handled by VideoPlayer component

Key pages
- / — Landing & overview
- /dashboard — Student dashboard (progress, modules, assignments, chat, recommendations)
- /instructor — Instructor console (courses, submissions)
- /admin — Admin overview
- /parent — Parent portal
- /discussions — Discussion forums

API Endpoints (server)
- POST /api/auth/register — register { name, email, password, role }
- POST /api/auth/login — login { email, password } => { token }
- GET /api/auth/me — get authenticated user
- GET /api/progress — course progress
- GET /api/recommendations — AI recommendations (rule-based)
- GET/POST /api/discussions — community posts
- GET/POST /api/assignments — list/submit assignments (file base64 accepted)
- POST /api/ai/chat — chat endpoint (proxies to OpenAI if OPENAI_API_KEY set)
- GET /api/ai/history — fetch saved chat history (authenticated)

Environment & secrets
- OPENAI_API_KEY — (optional) enables OpenAI for the chatbot. Set via DevServerControl or environment.

How to run (local dev)
1. Install: `pnpm install`
2. Start dev server (client + server): `pnpm dev`
3. Open `http://localhost:8080` (or the preview link provided by the platform)
4. Register a user, login, then visit `/dashboard` to try features

Files added/important
- client/components/app/ (Header, Footer, Layout, ChatBot, VideoPlayer, ProgressBar, DiscussionBoard, AssignmentForm, Leaderboard, CalendarWidget)
- client/pages/ (Index, Dashboard, Instructor, Admin, Parent, Discussions, Login, Register)
- client/hooks/useAuth.tsx — simple auth hook/provider
- server/routes/ (auth.ts, education.ts, ai.ts) — server API handlers
- server/utils/db.ts — JSON persistence helpers

Security note
- This MVP uses plaintext JSON files for persistence and a simple token in users.json. For production, migrate to a proper database (Postgres/Neon/Supabase) and secure secrets with environment variables.

Licensing & credit
This project is a hackathon prototype derived from the Fusion Starter template.

---

See HACKATHON_DEMO.md for a step-by-step demo script, slide notes, and talking points for the presentation.
