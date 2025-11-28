import type { ConversationItem } from '../../../types/conversation';

export interface PlaygroundConversationFile {
  id: string;
  title: string;
  content: ConversationItem[];
  updated_at?: number;
}

const STORAGE_INDEX_KEY = 'hippo_pg_conversations_index';
const STORAGE_KEY_PREFIX = 'hippo_pg_conversation_';

const readIndex = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_INDEX_KEY);
    if (!raw) { return []; }
    const ids = JSON.parse(raw);
    if (Array.isArray(ids)) { return ids as string[]; }
    return [];
  } catch {
    return [];
  }
};

const writeIndex = (ids: string[]) => {
  try { localStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(ids)); } catch {}
};

const storageKeyFor = (id: string) => `${STORAGE_KEY_PREFIX}${id}`;

export const listConversations = (): PlaygroundConversationFile[] => {
  const ids = readIndex();
  const files: PlaygroundConversationFile[] = [];
  for (const id of ids) {
    const file = getConversation(id);
    if (file) { files.push(file); }
  }
  return files;
};

export const getConversation = (id: string): PlaygroundConversationFile | null => {
  try {
    const raw = localStorage.getItem(storageKeyFor(id));
    if (!raw) { return null; }
    const parsed = JSON.parse(raw) as PlaygroundConversationFile;
    if (!parsed?.id || !Array.isArray(parsed?.content)) { return null; }
    return parsed;
  } catch {
    return null;
  }
};

export const upsertConversation = (file: PlaygroundConversationFile): PlaygroundConversationFile => {
  const ids = readIndex().filter(x => x !== file.id);
  ids.unshift(file.id);
  writeIndex(ids);
  const toSave: PlaygroundConversationFile = { ...file, updated_at: Date.now() };
  try { localStorage.setItem(storageKeyFor(file.id), JSON.stringify(toSave)); } catch {}
  return toSave;
};

export const deleteConversation = (id: string): void => {
  const ids = readIndex().filter(x => x !== id);
  writeIndex(ids);
  try { localStorage.removeItem(storageKeyFor(id)); } catch {}
};

export const generateConversationId = (): string => {
  const random = Math.random().toString(36).slice(2, 10);
  const ts = Date.now().toString(36);
  return `${ts}${random}`;
};

export const createNewConversationFromItems = (items: ConversationItem[]): PlaygroundConversationFile => {
  const id = generateConversationId();
  const title = items[0]?.content?.text?.slice(0, 100) || 'Untitled';
  const file: PlaygroundConversationFile = { id, title, content: items, updated_at: Date.now() };
  return upsertConversation(file);
};

export const renameConversation = (id: string, nextTitle: string): PlaygroundConversationFile | null => {
  const existing = getConversation(id);
  if (!existing) { return null; }
  return upsertConversation({ ...existing, title: nextTitle });
};


