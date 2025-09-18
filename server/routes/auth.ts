import { RequestHandler } from "express";
import crypto from "crypto";
import { readJSON, writeJSON } from "../utils/db";

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "student" | "instructor" | "admin" | "parent";
  token?: string | null;
};

function hashPassword(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha512").toString("hex");
}

function genId(prefix = "u") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const handleRegister: RequestHandler = async (req, res) => {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role?: string;
  };
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const users = await readJSON<User[]>("users.json", []);
  if (users.find((u) => u.email === email)) return res.status(409).json({ error: "Email exists" });
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);
  const user: User = {
    id: genId("u"),
    name,
    email,
    passwordHash,
    salt,
    role: (role as any) ?? "student",
    token: null,
  };
  users.push(user);
  await writeJSON("users.json", users);
  res.status(201).json({ id: user.id, name: user.name, role: user.role });
};

export const handleLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  const users = await readJSON<User[]>("users.json", []);
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const hash = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) return res.status(401).json({ error: "Invalid credentials" });
  const token = crypto.randomBytes(32).toString("hex");
  user.token = token;
  await writeJSON("users.json", users);
  res.json({ token, id: user.id, name: user.name, role: user.role });
};

export const handleMe: RequestHandler = async (req, res) => {
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  if (!auth) return res.status(401).json({ error: "Unauthorized" });
  const users = await readJSON<User[]>("users.json", []);
  const user = users.find((u) => u.token === auth);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};

export const handleLogout: RequestHandler = async (req, res) => {
  const auth = (req.headers.authorization || "").replace("Bearer ", "");
  if (!auth) return res.status(200).json({ ok: true });
  const users = await readJSON<User[]>("users.json", []);
  const idx = users.findIndex((u) => u.token === auth);
  if (idx >= 0) {
    users[idx].token = null;
    await writeJSON("users.json", users);
  }
  res.json({ ok: true });
};
