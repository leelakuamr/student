import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import * as edu from "./routes/education";
import * as auth from "./routes/auth";
import * as ai from "./routes/ai";
import * as gm from "./routes/gamification";
import { errorHandler } from "./middleware/error";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // serve uploaded files
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Education APIs
  app.get("/api/users/me", edu.handleGetUser);
  app.get("/api/progress", edu.handleGetProgress);
  app.get("/api/recommendations", edu.handleGetRecommendations);
  app.all("/api/discussions", edu.handleDiscussions);
  app.all("/api/assignments", edu.handleAssignments);

  // Auth
  app.post("/api/auth/register", auth.handleRegister);
  app.post("/api/auth/login", auth.handleLogin);
  app.post("/api/auth/logout", auth.handleLogout);
  app.get("/api/auth/me", auth.handleMe);

  // AI
  app.post("/api/ai/chat", ai.handleChat);
  app.get("/api/ai/history", ai.handleGetHistory);

  // Gamification / Groups / Calendar
  app.get('/api/groups', gm.getGroups);
  app.post('/api/groups', gm.createGroup);
  app.post('/api/groups/:id/join', gm.joinGroup);
  app.get('/api/badges', gm.getBadges);
  app.post('/api/badges', gm.awardBadge);
  app.get('/api/events', gm.getEvents);
  app.post('/api/events', gm.createEvent);

  // error handler
  app.use(errorHandler);

  return app;
}
