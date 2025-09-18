const upcoming = [
  { title: "Algebra Quiz", date: new Date(Date.now() + 86400000 * 2) },
  { title: "Essay Draft Due", date: new Date(Date.now() + 86400000 * 5) },
  { title: "Group Project Sync", date: new Date(Date.now() + 86400000 * 7) },
];

export function CalendarWidget() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b p-3 text-sm font-semibold">Upcoming</div>
      <ul className="divide-y">
        {upcoming.map((e) => (
          <li key={e.title} className="flex items-center justify-between p-3 text-sm">
            <span className="font-medium">{e.title}</span>
            <time className="text-muted-foreground" dateTime={e.date.toISOString()}>
              {e.date.toLocaleDateString()}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
