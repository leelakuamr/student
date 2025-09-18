import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; role?: string } | null;

type AuthContext = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const ctx = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setUser({ id: data.id, name: data.name, role: data.role });
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch (e) {
        setToken(null);
        localStorage.removeItem("token");
      }
    })();
  }, [token]);

  async function login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser({ id: data.id, name: data.name, role: data.role });
  }

  async function register(name: string, email: string, password: string, role?: string) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) throw new Error("Register failed");
    // auto-login
    await login(email, password);
  }

  async function logout() {
    if (token) await fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  return <ctx.Provider value={{ user, token, login, register, logout }}>{children}</ctx.Provider>;
}

export function useAuth() {
  const v = useContext(ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
