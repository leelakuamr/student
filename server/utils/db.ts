import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(__dirname, "../data");

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

export async function readJSON<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const p = path.join(dataDir, filename);
  try {
    const raw = await fs.readFile(p, "utf-8");
    return JSON.parse(raw) as T;
  } catch (e) {
    await writeJSON(filename, fallback);
    return fallback;
  }
}

export async function writeJSON<T>(filename: string, data: T) {
  await ensureDataDir();
  const p = path.join(dataDir, filename);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf-8");
}
