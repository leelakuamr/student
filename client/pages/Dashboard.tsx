import { ProgressBar } from "@/components/app/ProgressBar";
import { VideoPlayer } from "@/components/app/VideoPlayer";
import { DiscussionBoard } from "@/components/app/DiscussionBoard";
import { AssignmentForm } from "@/components/app/AssignmentForm";
import { Leaderboard } from "@/components/app/Leaderboard";
import { CalendarWidget } from "@/components/app/CalendarWidget";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("Student");
  const [progress, setProgress] = useState<{ course: string; value: number }[]>([]);
  const [recommendations, setRecommendations] = useState<{ id: string; title: string; reason: string }[]>([]);

  useEffect(() => {
    (async () => {
      const u = await fetch("/api/users/me");
      if (u.ok) {
        const data = await u.json();
        setName(data.name ?? "Student");
      }
      const pg = await fetch("/api/progress");
      if (pg.ok) setProgress(((await pg.json()) as { progress: { course: string; value: number }[] }).progress);
      const rec = await fetch("/api/recommendations");
      if (rec.ok) setRecommendations(((await rec.json()) as { items: { id: string; title: string; reason: string }[] }).items);
    })();
  }, []);

  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <section className="rounded-xl border bg-white/60 p-6 shadow-sm dark:bg-background">
          <h1 className="text-2xl font-bold">Welcome back, {name} 👋</h1>
          <p className="mt-1 text-muted-foreground">Here's your learning snapshot and personalized recommendations.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {progress.map((p) => (
              <div key={p.course} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{p.course}</span>
                  <span className="text-sm text-muted-foreground">{p.value}%</span>
                </div>
                <ProgressBar value={p.value} />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Interactive Module</h2>
            <VideoPlayer
              src="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              title="Introduction to Quadratic Equations"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Assignments</h2>
            <AssignmentForm />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Discussion Forum</h2>
          <DiscussionBoard />
        </section>
      </div>

      <aside className="space-y-6">
        <section className="overflow-hidden rounded-xl border">
          <div className="border-b p-4 text-sm font-semibold">AI Recommendations</div>
          <ul className="divide-y">
            {recommendations.map((r) => (
              <li key={r.id} className="p-4 text-sm">
                <p className="font-medium">{r.title}</p>
                <p className="text-muted-foreground">{r.reason}</p>
              </li>
            ))}
          </ul>
        </section>
        <Leaderboard />
        <CalendarWidget />
      </aside>
    </div>
  );
}
