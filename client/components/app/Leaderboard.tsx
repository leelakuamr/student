type Entry = { name: string; points: number; badge: string };

const data: Entry[] = [
  { name: "Rohan", points: 980, badge: "🏆" },
  { name: "Aisha", points: 920, badge: "🥇" },
  { name: "Mei", points: 880, badge: "🥈" },
  { name: "Luis", points: 860, badge: "🥉" },
];

export function Leaderboard() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b p-3 text-sm font-semibold">Leaderboard</div>
      <ul className="divide-y">
        {data.map((e, i) => (
          <li key={e.name} className="flex items-center justify-between p-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 text-center text-muted-foreground">{i + 1}</span>
              <span className="font-medium">{e.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs">{e.points} pts</span>
              <span>{e.badge}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
