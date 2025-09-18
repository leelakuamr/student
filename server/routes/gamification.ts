import { RequestHandler } from 'express';
import prisma from '../db/prisma';

export const getGroups: RequestHandler = async (req, res) => {
  const groups = await prisma.group.findMany({ include: { members: { include: { user: true } } } });
  res.json({ groups });
};

export const createGroup: RequestHandler = async (req, res) => {
  const { name, description } = req.body as { name: string; description?: string };
  if (!name) return res.status(400).json({ error: 'Missing name' });
  const g = await prisma.group.create({ data: { name, description } });
  res.status(201).json({ group: g });
};

export const joinGroup: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };
  const auth = (req.headers.authorization || '').replace('Bearer ', '') || undefined;
  const user = auth ? await prisma.user.findUnique({ where: { token: auth } }) : null;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const membership = await prisma.groupMember.create({ data: { groupId: id, userId: user.id } });
  res.json({ membership });
};

export const getBadges: RequestHandler = async (req, res) => {
  const badges = await prisma.badge.findMany({ include: { user: true } });
  res.json({ badges });
};

export const awardBadge: RequestHandler = async (req, res) => {
  const { userId, title } = req.body as { userId: string; title: string };
  if (!userId || !title) return res.status(400).json({ error: 'Missing fields' });
  const b = await prisma.badge.create({ data: { userId, title } });
  res.status(201).json({ badge: b });
};

export const getEvents: RequestHandler = async (req, res) => {
  const events = await prisma.event.findMany({ orderBy: { startsAt: 'asc' } });
  res.json({ events });
};

export const createEvent: RequestHandler = async (req, res) => {
  const { title, startsAt } = req.body as { title: string; startsAt: string };
  if (!title || !startsAt) return res.status(400).json({ error: 'Missing fields' });
  const e = await prisma.event.create({ data: { title, startsAt: new Date(startsAt) } });
  res.status(201).json({ event: e });
};
