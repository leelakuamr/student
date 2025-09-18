import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Msg = { id: string; from: "user" | "bot"; text: string };

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      // load history if available
      if (token) {
        try {
          const res = await fetch('/api/ai/history', { headers: { Authorization: `Bearer ${token}` } });
          if (res.ok) {
            const j = await res.json();
            const items: Msg[] = (j.items || []).map((it: any, idx: number) => ({ id: `h_${idx}_${it.time || Date.now()}`, from: it.role === 'user' ? 'user' : 'bot', text: it.content }));
            if (items.length) {
              setMessages(items);
              return;
            }
          }
        } catch (e) {
          console.error('history load error', e);
        }
      }
      // greet if no history
      if (messages.length === 0) {
        setMessages([{ id: "m1", from: "bot", text: "Hi! I'm AdeptBot. Ask me about courses, assignments, or personalized learning tips." }]);
      }
    })();
  }, [open]);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { id: `u_${Date.now()}`, from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: [{ role: "user", content: userMsg.text }] }),
      });
      const j = await res.json();
      const botText = j.reply ?? "(no response)";
      setMessages((m) => [...m, { id: `b_${Date.now()}`, from: "bot", text: botText }]);
    } catch (e) {
      setMessages((m) => [...m, { id: `b_err_${Date.now()}`, from: "bot", text: "Error contacting AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="fixed right-6 bottom-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg"
      >
        Chat
      </button>

      {open && (
        <div className="fixed right-6 bottom-20 z-50 w-96 max-w-full rounded-lg border bg-white shadow-lg dark:bg-background">
          <div className="flex items-center justify-between border-b p-3">
            <div className="text-sm font-semibold">AdeptBot</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Close</button>
            </div>
          </div>
          <div ref={boxRef} className="max-h-72 overflow-auto p-3">
            {messages.map((m) => (
              <div key={m.id} className={`mb-3 flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-md p-2 ${m.from === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-muted-foreground">AdeptBot is typing...</div>}
          </div>
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-md border px-3 py-2" placeholder="Ask me about assignments or your learning path..." />
              <button onClick={send} className="rounded-md bg-primary px-3 py-2 text-primary-foreground" disabled={loading}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
