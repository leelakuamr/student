export default function Admin() {
  const metrics = [
    { label: "Active Users", value: 1240 },
    { label: "Courses", value: 86 },
    { label: "Assignments Submitted", value: 5320 },
    { label: "Discussions", value: 1740 },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Platform Admin</h1>
      <p className="mt-1 text-muted-foreground">System management, user oversight, content moderation, and analytics.</p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{m.value.toLocaleString()}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border">
        <div className="border-b p-4 text-sm font-semibold">Moderation Queue</div>
        <ul className="divide-y">
          {["Flagged post in Chemistry", "Reported comment in Algebra"].map((i) => (
            <li key={i} className="flex items-center justify-between p-4 text-sm">
              <span>{i}</span>
              <div className="space-x-2">
                <button className="rounded-md border px-3 py-1 hover:bg-accent">Review</button>
                <button className="rounded-md bg-destructive px-3 py-1 text-destructive-foreground hover:bg-destructive/90">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
