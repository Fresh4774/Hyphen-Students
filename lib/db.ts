import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ClassSession {
  id: string;
  startTime: number;
  endTime?: number;
  audioBlob?: Blob;
  videoBlob?: Blob;
  transcript?: string;
  summary?: string;
  homework?: string[];
  photos?: Photo[];
  location?: { lat: number; lng: number };
}

interface Photo {
  id: string;
  sessionId: string;
  blob: Blob;
  timestamp: number;
  analysis?: string;
}

interface SigmaDB extends DBSchema {
  sessions: {
    key: string;
    value: ClassSession;
  };
  photos: {
    key: string;
    value: Photo;
    indexes: { 'by-session': string };
  };
}

export async function getDB(): Promise<IDBPDatabase<SigmaDB>> {
  return openDB<SigmaDB>('sigmaskibidi-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('sessions')) {
        db.createObjectStore('sessions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('photos')) {
        const photoStore = db.createObjectStore('photos', { keyPath: 'id' });
        photoStore.createIndex('by-session', 'sessionId');
      }
    },
  });
}