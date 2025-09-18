# Hackathon Demo Script — AdeptLearn

Goal: Give a 7–10 minute demo showing the core MVP, highlight AI personalization, and explain next steps.

Audience: Judges and devs unfamiliar with the codebase.

Setup before demo
- Start the dev server: `pnpm install && pnpm dev` (or use the provided preview URL).
- Ensure OPENAI_API_KEY is set in the environment if you want live AI replies. If not set, the bot uses a mock responder.
- Create two accounts: one student, one instructor (via /register).

Demo timeline (7–10 minutes)

1) 0:00–0:30 — Quick intro (30s)
- One-line pitch: "AdeptLearn: adaptive learning with personalized AI recommendations and an integrated chatbot for student support."

2) 0:30–2:00 — Landing & value props (90s)
- Show landing page features (dashboard, modules, discussions, gamification).
- Emphasize responsive design and modern UI.

3) 2:00–3:30 — Student Dashboard (90s)
- Login as student. Show course progress, progress bars, AI Recommendations panel.
- Open Interactive Module (YouTube embed) and demonstrate playback.

4) 3:30–4:30 — Assignments & Discussions (60s)
- Submit a sample assignment (small file or note). Show the submission appears in "Your submissions".
- Open Discussions page, post a quick question and show it appears.

5) 4:30–5:30 — Instructor view (60s)
- Login as instructor. Show courses table and recent submissions.
- Mention how grading APIs would integrate.

6) 5:30–6:30 — AI Chatbot (60s)
- Open Chat (bottom-right), ask "What should I practice next?" and show reply.
- If OPENAI key connected, highlight real AI responses; otherwise, show mock reply and mention how OpenAI improves personalization.
- Show that chat history persists per-user (explain chats.json or DB migration for production).

7) 6:30–7:00 — Architecture & APIs (30s)
- Quick slide of system components (React + Express, JSON persistence, AI proxy, future DB choice: Supabase/Neon/Prisma).

8) 7:00–8:00 — Roadmap & stretch goals (60s)
- Migrate to Postgres + Prisma
- Add file storage (S3/Cloudinary), streaming, plagiarism, and ML models for adaptive paths
- Integrate analytics and parent portal

9) 8:00–8:30 — Closing & Q/A (30s)
- Invite judges to ask questions and demo any flows they want.

Talking points & rebuttals
- Security: prototype uses JSON files; production migration plan involves DB + secrets. (Mention Neon/Supabase)
- Scalability: API design is modular; metadata and uploads can be moved to object storage.
- ML: Chatbot can be extended with contextual embeddings and personalized prompts.

Demo checklist (before going on stage)
- [ ] Dev server runs and preview link working
- [ ] OPENAI_API_KEY set (if you want live AI)
- [ ] Test login / register for student & instructor
- [ ] Prepare a short script for the first chatbot question

Quick cheat-sheet commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Tests: `pnpm test`

Slide structure (one-sentence notes per slide)
1. Title — AdeptLearn: Personalized EdTech platform (1 sentence)
2. Problem — Students need adaptive content and better support (1–2 bullets)
3. Solution — AI-driven recommendations + integrated tools (3 bullets)
4. Demo roadmap — what you'll show (dashboard, chat, assignments)
5. Live demo — switch to app
6. Architecture — stack & APIs
7. Metrics & impact — retention, progress improvement (expected)
8. Roadmap — next features & production steps
9. Ask & team info

Contact
- Creator: 246M1A0515 BEZAWADA RIKITHADEVI
- Repo: (this workspace)

Good luck! If you want, I can also generate a printable slide PDF or a short pitch deck (Google Slides / PowerPoint compatible) from these notes.
