// Utility to store and retrieve large background and logo images permanently using IndexedDB
const DB_NAME = 'SukhothaiCardDB';
const STORE_NAME = 'settings';
const KEY_CARD_BG = 'permanent_card_bg';
const KEY_WEBSITE_BG = 'permanent_website_bg';
const KEY_CUSTOM_LOGO = 'permanent_custom_logo';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 2);
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

// ------------------------------------------------------------
// Card Background Storage
// ------------------------------------------------------------
export async function savePermanentCardBg(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_CARD_BG);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
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
      const req = store.get(KEY_CARD_BG);
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

export async function removePermanentCardBg(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_CARD_BG);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem('sukhothai_permanent_card_bg');
  } catch {
    // ignore
  }
}

// ------------------------------------------------------------
// Website Background Storage
// ------------------------------------------------------------
export async function saveWebsiteBg(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_WEBSITE_BG);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    try {
      if (dataUrl.length < 2000000) {
        localStorage.setItem('sukhothai_custom_bg', dataUrl);
      }
    } catch {
      // ignore
    }
  } catch (err) {
    console.warn('Failed to save website bg to IndexedDB, fallback to localStorage', err);
    try {
      localStorage.setItem('sukhothai_custom_bg', dataUrl);
    } catch (e) {
      console.error('Storage full:', e);
    }
  }
}

export async function loadWebsiteBg(): Promise<string | null> {
  try {
    const db = await openDB();
    const data = await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_WEBSITE_BG);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (data) return data;
  } catch (err) {
    console.warn('IndexedDB load error for website bg, trying localStorage', err);
  }

  try {
    const local = localStorage.getItem('sukhothai_custom_bg');
    if (local) return local;
  } catch {
    // ignore
  }

  return null;
}

export async function removeWebsiteBg(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_WEBSITE_BG);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem('sukhothai_custom_bg');
  } catch {
    // ignore
  }
}

// ------------------------------------------------------------
// Custom Logo Storage
// ------------------------------------------------------------
export async function saveCustomLogo(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, KEY_CUSTOM_LOGO);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    try {
      if (dataUrl.length < 2000000) {
        localStorage.setItem('sukhothai_custom_logo', dataUrl);
      }
    } catch {
      // ignore
    }
  } catch {
    try {
      localStorage.setItem('sukhothai_custom_logo', dataUrl);
    } catch {
      // ignore
    }
  }
}

export async function loadCustomLogo(): Promise<string | null> {
  try {
    const db = await openDB();
    const data = await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_CUSTOM_LOGO);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (data) return data;
  } catch {
    // ignore
  }
  try {
    const local = localStorage.getItem('sukhothai_custom_logo');
    if (local) return local;
  } catch {
    // ignore
  }
  return null;
}

export async function removeCustomLogo(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_CUSTOM_LOGO);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem('sukhothai_custom_logo');
  } catch {
    // ignore
  }
}

// ------------------------------------------------------------
// Detect static image files located in public directory
// ------------------------------------------------------------
export function detectFirstAvailableImage(candidates: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    let index = 0;
    const tryNext = () => {
      if (index >= candidates.length) {
        resolve(null);
        return;
      }
      const candidateUrl = candidates[index++];
      const img = new Image();
      img.onload = () => resolve(candidateUrl);
      img.onerror = () => tryNext();
      img.src = candidateUrl;
    };
    tryNext();
  });
}

