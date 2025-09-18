import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              EdTech Personalized Learning Platform
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Adaptive learning that tailors content to each student using progress tracking and AI-driven recommendations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="rounded-md bg-primary px-5 py-3 text-primary-foreground shadow hover:bg-primary/90"
              >
                Explore Student Dashboard
              </Link>
              <Link
                to="/instructor"
                className="rounded-md border px-5 py-3 hover:bg-accent hover:text-accent-foreground"
              >
                For Instructors
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">Gamification</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">Study Groups</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">Calendar</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">Accessibility</span>
            </div>
          </div>
          <div className="rounded-2xl border bg-white/70 p-6 shadow-xl backdrop-blur dark:bg-background">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold">Course Progress</p>
                <p className="mt-1 text-3xl font-extrabold">72%</p>
                <p className="text-xs text-muted-foreground">Across 5 active courses</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold">AI Suggestions</p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>Practice linear equations</li>
                  <li>Watch atoms & bonds intro</li>
                </ul>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold">Assignments</p>
                <p className="mt-1 text-3xl font-extrabold">3</p>
                <p className="text-xs text-muted-foreground">Due this week</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold">Streak</p>
                <p className="mt-1 text-3xl font-extrabold">12 days 🔥</p>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Everything learners and educators need</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          Built for students, instructors, admins, and parents with powerful tools and a delightful experience.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Student dashboard",
              desc: "Track course progress, assignments, and recommendations.",
            },
            {
              title: "Interactive modules",
              desc: "Video lessons, quizzes, and adaptive difficulty.",
            },
            {
              title: "Assignments & grading",
              desc: "Submit work and view feedback in one place.",
            },
            {
              title: "Discussion forums",
              desc: "Peer-to-peer help and moderated Q&A.",
            },
            {
              title: "Gamification",
              desc: "Badges, leaderboards, and streaks to motivate learners.",
            },
            {
              title: "Study Groups",
              desc: "Collaborate with peers, create or join study groups.",
            },
            {
              title: "Calendar",
              desc: "Keep track of assignments, quizzes, and events with exportable calendars.",
            },
            {
              title: "Accessibility",
              desc: "High contrast, larger text, and keyboard-first navigation.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border p-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { role: "Platform Admin", items: ["System management", "User oversight", "Content moderation", "Analytics"] },
            { role: "Instructor / Teacher", items: ["Course creation", "Student management", "Grading"] },
            { role: "Student", items: ["Course access", "Assignments", "Progress", "Peer interaction"] },
            { role: "Parent / Guardian", items: ["Child progress", "Teacher communication"] },
          ].map((r) => (
            <div key={r.role} className="rounded-xl border bg-white/70 p-6 shadow-sm backdrop-blur dark:bg-background">
              <h3 className="text-lg font-semibold">{r.role}</h3>
              <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
                {r.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-between rounded-2xl border bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:flex">
            <div>
              <h3 className="text-2xl font-bold">Ready to personalize learning?</h3>
              <p className="mt-1 text-muted-foreground">Start with a sample student dashboard and explore real features.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/dashboard"
                className="rounded-md bg-primary px-5 py-3 text-primary-foreground shadow hover:bg-primary/90"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
