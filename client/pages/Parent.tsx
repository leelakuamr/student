export default function Parent() {
  const child = { name: "Anika", grade: "8", progress: 78 };
  const messages = [
    { from: "Ms. Patel", subject: "Great improvement on math quizzes" },
    { from: "Mr. Khan", subject: "Project collaboration update" },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Parent / Guardian</h1>
      <p className="mt-1 text-muted-foreground">Monitor your child's progress and communicate with teachers.</p>

      <section className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 md:col-span-2">
          <h2 className="text-lg font-semibold">{child.name} — Grade {child.grade}</h2>
          <div className="mt-3">
            <div className="mb-1 text-sm text-muted-foreground">Overall Progress</div>
            <div className="h-3 w-full rounded-full bg-muted">
              <div className="h-3 rounded-full bg-primary" style={{ width: `${child.progress}%` }} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{child.progress}% complete</div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-sm font-semibold">Recent Grades</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                <li>Algebra Quiz — 88%</li>
                <li>Science Lab — 92%</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-semibold">Attendance</p>
              <p className="mt-2 text-muted-foreground">Present 18/20 days</p>
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="overflow-hidden rounded-xl border">
            <div className="border-b p-4 text-sm font-semibold">Messages</div>
            <ul className="divide-y text-sm">
              {messages.map((m) => (
                <li key={m.subject} className="p-4">
                  <p className="font-medium">{m.from}</p>
                  <p className="text-muted-foreground">{m.subject}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border p-4">
            <p className="text-sm font-semibold">Contact Teachers</p>
            <button className="mt-3 w-full rounded-md border px-3 py-2 hover:bg-accent">Start a Message</button>
          </div>
        </aside>
      </section>
    </div>
  );
}
