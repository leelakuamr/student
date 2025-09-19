import { RequestHandler } from 'express';
import { readJSON, writeJSON } from '../utils/db';

function genId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const getGroups: RequestHandler = async (req, res) => {
  const groups = await readJSON('groups.json', [
    { id: 'g1', name: 'Math Study Group', description: 'Algebra and Calculus help' },
    { id: 'g2', name: 'Science Club', description: 'Chemistry and Physics discussions' }
  ]);
  res.json({ groups });
};

export const createGroup: RequestHandler = async (req, res) => {
  const { name, description } = req.body as { name: string; description?: string };
  if (!name) return res.status(400).json({ error: 'Missing name' });
  const groups = await readJSON('groups.json', [] as any[]);
  const group = { id: genId('g'), name, description };
  groups.push(group);
  await writeJSON('groups.json', groups);
  res.status(201).json({ group });
};

export const joinGroup: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };
  const auth = (req.headers.authorization || '').replace('Bearer ', '') || undefined;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  
  const memberships = await readJSON('groupMembers.json', [] as any[]);
  const membership = { id: genId('m'), groupId: id, userId: 'current_user' };
  memberships.push(membership);
  await writeJSON('groupMembers.json', memberships);
  res.json({ membership });
};

export const getBadges: RequestHandler = async (req, res) => {
  const badges = await readJSON('badges.json', [
    { id: 'b1', title: 'First Assignment', userId: 'u1', awardedAt: new Date().toISOString() },
    { id: 'b2', title: 'Perfect Score', userId: 'u1', awardedAt: new Date().toISOString() }
  ]);
  res.json({ badges });
};

export const awardBadge: RequestHandler = async (req, res) => {
  const { userId, title } = req.body as { userId: string; title: string };
  if (!userId || !title) return res.status(400).json({ error: 'Missing fields' });
  const badges = await readJSON('badges.json', [] as any[]);
  const badge = { id: genId('b'), userId, title, awardedAt: new Date().toISOString() };
  badges.push(badge);
  await writeJSON('badges.json', badges);
  res.status(201).json({ badge });
};

export const getEvents: RequestHandler = async (req, res) => {
  const events = await readJSON('events.json', [
    { id: 'e1', title: 'Math Quiz', startsAt: new Date(Date.now() + 86400000).toISOString() },
    { id: 'e2', title: 'Science Project Due', startsAt: new Date(Date.now() + 172800000).toISOString() }
  ]);
  res.json({ events });
};

export const createEvent: RequestHandler = async (req, res) => {
  const { title, startsAt } = req.body as { title: string; startsAt: string };
  if (!title || !startsAt) return res.status(400).json({ error: 'Missing fields' });
  const events = await readJSON('events.json', [] as any[]);
  const event = { id: genId('e'), title, startsAt, createdAt: new Date().toISOString() };
  events.push(event);
  await writeJSON('events.json', events);
  res.status(201).json({ event });
};
