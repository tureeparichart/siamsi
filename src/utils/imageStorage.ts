// Utility to store and retrieve large background image permanently using IndexedDB
const DB_NAME = 'SukhothaiCardDB';
const STORE_NAME = 'settings';
const KEY_NAME = 'permanent_card_bg';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePermanentCardBg(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    // Fallback sync to localStorage if size allows
    try {
      if (dataUrl.length < 2000000) {
        localStorage.setItem('sukhothai_permanent_card_bg', dataUrl);
      }
    } catch {
      // ignore
    }
  } catch (err) {
    console.warn('Failed to save to IndexedDB, fallback to localStorage', err);
    try {
      localStorage.setItem('sukhothai_permanent_card_bg', dataUrl);
    } catch (e) {
      console.error('Storage full:', e);
    }
  }
}

export async function loadPermanentCardBg(): Promise<string | null> {
  try {
    const db = await openDB();
    const data = await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (data) return data;
  } catch (err) {
    console.warn('IndexedDB load error, trying localStorage', err);
  }

  try {
    const local = localStorage.getItem('sukhothai_permanent_card_bg');
    if (local) return local;
  } catch {
    // ignore
  }

  return null;
}
