import { openDB } from 'idb';
import type { DBSchema } from 'idb';
import type { Group } from '../types';

interface WalmartSplitterDB extends DBSchema {
  groups: {
    key: number;
    value: Group;
  };
}

const DB_NAME = 'WalmartSplitterDB';
const DB_VERSION = 1;

export async function initDB() {
  return openDB<WalmartSplitterDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('groups', { keyPath: 'id' });
    },
  });
}

export async function getAllGroups() {
  const db = await initDB();
  return db.getAll('groups');
}

export async function addGroup(group: Group) {
  const db = await initDB();
  return db.put('groups', group);
}

export async function updateGroup(group: Group) {
  const db = await initDB();
  return db.put('groups', group);
}

export async function deleteGroup(id: number) {
  const db = await initDB();
  return db.delete('groups', id);
}

export async function clearAllGroups() {
  const db = await initDB();
  return db.clear('groups');
}