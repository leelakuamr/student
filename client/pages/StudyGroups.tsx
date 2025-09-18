import { useEffect, useState } from "react";

type Group = { id: string; name: string; description?: string; members: string[] };

function genId() {
  return `g_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`;
}

export default function StudyGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/groups');
      if (res.ok) {
        const j = await res.json();
        setGroups(j.groups || []);
      }
    })();
  }, []);

  async function create() {
    if (!name.trim()) return;
    const res = await fetch('/api/groups', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, description: desc }) });
    if (res.ok) {
      const j = await res.json();
      setGroups((g) => [j.group, ...g]);
      setName(''); setDesc('');
    }
  }

  async function join(id: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/groups/${id}/join`, { method: 'POST', headers: { Authorization: token ? `Bearer ${token}` : '' } });
    if (res.ok) {
      // refresh
      const r2 = await fetch('/api/groups');
      if (r2.ok) setGroups((await r2.json()).groups || []);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Study Groups</h1>
      <p className="text-muted-foreground mt-1">Create or join collaborative study groups.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Create a group</h3>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Group name" className="mt-3 w-full rounded-md border px-3 py-2" />
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="mt-2 w-full rounded-md border px-3 py-2" />
          <div className="mt-3 text-right">
            <button onClick={create} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Create</button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold">Available groups</h3>
          <ul className="mt-3 space-y-3">
            {groups.map((g) => (
              <li key={g.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{g.name}</div>
                    <div className="text-sm text-muted-foreground">{g.description}</div>
                    <div className="mt-2 text-xs text-muted-foreground">Members: {g.members.length}</div>
                  </div>
                  <div>
                    <button onClick={() => join(g.id)} className="rounded-md bg-secondary px-3 py-1 text-secondary-foreground">Join</button>
                  </div>
                </div>
              </li>
            ))}
            {groups.length === 0 && <li className="text-sm text-muted-foreground">No groups yet — create one!</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
