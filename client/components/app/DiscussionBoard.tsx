import { useEffect, useState } from "react";

type Post = { id: string; author: string; content: string; createdAt: string };

export function DiscussionBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/discussions");
      if (res.ok) {
        const data = (await res.json()) as { posts: Post[] };
        setPosts(data.posts);
      }
    })();
  }, []);

  const submit = async () => {
    const res = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const data = (await res.json()) as { post: Post };
      setPosts((prev) => [data.post, ...prev]);
      setContent("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <label className="mb-2 block text-sm font-medium">Share with your peers</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-24 w-full resize-none rounded-md border bg-background p-2 outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ask a question, share insights..."
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{content.length}/500</span>
          <button
            className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            onClick={submit}
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="rounded-lg border p-4">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{p.author}</span>
              <time dateTime={p.createdAt}>{new Date(p.createdAt).toLocaleString()}</time>
            </div>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
