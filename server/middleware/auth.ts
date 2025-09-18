import { RequestHandler } from "express";
import { readJSON } from "../utils/db";

export function requireAuth(role?: string): RequestHandler {
  return async (req, res, next) => {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    if (!auth) return res.status(401).json({ error: "Unauthorized" });
    const users = await readJSON<any[]>("users.json", []);
    const user = users.find((u) => u.token === auth);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (role && user.role !== role && user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
    // attach
    (req as any).user = { id: user.id, name: user.name, role: user.role };
    next();
  };
}
