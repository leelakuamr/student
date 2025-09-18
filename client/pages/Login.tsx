import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (e) {
      setErr("Login failed");
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-md rounded-lg border p-6">
        <h1 className="text-xl font-bold">Login</h1>
        {err && <div className="mt-2 text-sm text-destructive">{err}</div>}
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2" />
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Login</button>
            <a href="/register" className="text-sm text-muted-foreground">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
