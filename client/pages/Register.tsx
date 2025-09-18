import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      nav("/dashboard");
    } catch (e) {
      setErr("Registration failed");
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-md rounded-lg border p-6">
        <h1 className="text-xl font-bold">Create account</h1>
        {err && <div className="mt-2 text-sm text-destructive">{err}</div>}
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border px-3 py-2" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2" />
          <div>
            <label className="text-sm">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="ml-2 rounded-md border px-2 py-1">
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="parent">Parent</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Create account</button>
            <a href="/login" className="text-sm text-muted-foreground">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
