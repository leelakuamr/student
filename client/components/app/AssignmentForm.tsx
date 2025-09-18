import { useState } from "react";

type Submission = { id: string; filename: string; submittedAt: string; status: "submitted" | "graded"; grade?: number };

export function AssignmentForm() {
  const [file, setFile] = useState<File | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [note, setNote] = useState("");

  async function submit() {
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file?.name ?? "notes.txt", note }),
    });
    if (res.ok) {
      const data = (await res.json()) as { submission: Submission };
      setSubmissions((prev) => [data.submission, ...prev]);
      setFile(null);
      setNote("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <label className="mb-2 block text-sm font-medium">Submit assignment</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-secondary-foreground file:hover:bg-secondary/90"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Notes for instructor (optional)"
          className="mt-3 h-20 w-full resize-none rounded-md border bg-background p-2 outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-2 flex justify-end">
          <button
            className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            onClick={submit}
            disabled={!file && !note}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="rounded-lg border">
        <div className="border-b p-3 text-sm font-semibold">Your submissions</div>
        <ul className="divide-y">
          {submissions.map((s) => (
            <li key={s.id} className="p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{s.filename}</p>
                  <p className="text-muted-foreground">{new Date(s.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{s.status}</span>
                  {s.grade != null && (
                    <span className="ml-2 text-xs">Grade: {s.grade}%</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
