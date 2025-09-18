import { RequestHandler } from "express";

function genId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// Persistent JSON storage via utils
import { readJSON, writeJSON } from "../utils/db";

export const handleGetUser: RequestHandler = async (req, res) => {
  const users = await readJSON("users.json", [{ id: "u1", name: "Student" }]);
  res.json(users[0]);
};

export const handleGetProgress: RequestHandler = async (req, res) => {
  const progress = await readJSON("progress.json", [
    { course: "Algebra I", value: 72 },
    { course: "Chemistry", value: 64 },
  ]);
  res.json({ progress });
};

export const handleGetRecommendations: RequestHandler = async (req, res) => {
  // Very simple rule-based recommendations for MVP
  const items = [
    { id: "r1", title: "Practice Linear Equations", reason: "Struggling with recent quiz" },
    { id: "r2", title: "Watch Atoms & Bonds", reason: "Low engagement in science module" },
  ];
  res.json({ items });
};

export const handleDiscussions: RequestHandler = async (req, res) => {
  if (req.method === "GET") {
    const discussions = await readJSON("discussions.json", [
      { id: "d1", author: "Rohan", content: "How do I solve eqn #3?", createdAt: new Date().toISOString() },
    ]);
    return res.json({ posts: discussions });
  }
  if (req.method === "POST") {
    const { content } = req.body as { content: string };
    const discussions = await readJSON("discussions.json", [] as any[]);
    const post = { id: genId("post"), author: "You", content, createdAt: new Date().toISOString() };
    discussions.unshift(post);
    await writeJSON("discussions.json", discussions);
    return res.status(201).json({ post });
  }
  res.status(405).end();
};

export const handleAssignments: RequestHandler = async (req, res) => {
  if (req.method === "GET") {
    const submissions = await readJSON("submissions.json", [] as any[]);
    return res.json({ submissions });
  }
  if (req.method === "POST") {
    const { filename, contentBase64 } = req.body as { filename: string; contentBase64?: string };
    const submissions = await readJSON("submissions.json", [] as any[]);
    const s = { id: genId("sub"), filename, submittedAt: new Date().toISOString(), status: "submitted" } as any;
    // save file if provided
    if (contentBase64) {
      try {
        const buffer = Buffer.from(contentBase64, "base64");
        const fs = await import("fs/promises");
        const path = await import("path");
        const uploadsDir = path.resolve(__dirname, "../uploads");
        await fs.mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, `${s.id}_${filename}`);
        await fs.writeFile(filePath, buffer);
        s.path = `/uploads/${s.id}_${filename}`;
      } catch (e) {
        console.error("file save error", e);
      }
    }
    submissions.unshift(s);
    await writeJSON("submissions.json", submissions);
    return res.status(201).json({ submission: s });
  }
  res.status(405).end();
};
