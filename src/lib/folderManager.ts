// Folder Management System for Venom
// Users must create/select a folder before accessing services

export interface Folder {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  icon: string;
  items: FolderItem[];
}

export interface FolderItem {
  id: string;
  type: "music" | "code" | "chat" | "game" | "publish" | "studio" | "browser";
  name: string;
  createdAt: string;
  data: Record<string, unknown>;
}

const FOLDERS_KEY = "venom-folders";
const ACTIVE_FOLDER_KEY = "venom-active-folder";

const defaultColors = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-yellow-500 to-amber-500",
  "from-indigo-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-teal-500 to-green-500"
];

const defaultIcons = ["🎵", "💻", "💬", "🎮", "📁", "🎨", "🔥", "⚡"];

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getFolders(): Folder[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(FOLDERS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load folders:", error);
  }
  return [];
}

export function saveFolders(folders: Folder[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.error("Failed to save folders:", error);
  }
}

export function createFolder(name: string, description: string = ""): Folder {
  const now = new Date().toISOString();
  const folders = getFolders();
  
  const newFolder: Folder = {
    id: generateId(),
    name: name.trim(),
    description: description.trim(),
    createdAt: now,
    updatedAt: now,
    color: defaultColors[folders.length % defaultColors.length],
    icon: defaultIcons[folders.length % defaultIcons.length],
    items: []
  };
  
  folders.push(newFolder);
  saveFolders(folders);
  
  // If this is the first folder, set it as active
  if (folders.length === 1) {
    setActiveFolder(newFolder.id);
  }
  
  return newFolder;
}

export function updateFolder(id: string, updates: Partial<Pick<Folder, "name" | "description" | "color" | "icon">>): Folder | null {
  const folders = getFolders();
  const index = folders.findIndex((f) => f.id === id);
  
  if (index === -1) return null;
  
  folders[index] = {
    ...folders[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveFolders(folders);
  return folders[index];
}

export function deleteFolder(id: string): boolean {
  const folders = getFolders();
  const filtered = folders.filter((f) => f.id !== id);
  
  if (filtered.length === folders.length) return false;
  
  saveFolders(filtered);
  
  // If the deleted folder was active, clear it
  const activeId = getActiveFolderId();
  if (activeId === id) {
    localStorage.removeItem(ACTIVE_FOLDER_KEY);
    // Set the first remaining folder as active if any
    if (filtered.length > 0) {
      setActiveFolder(filtered[0].id);
    }
  }
  
  return true;
}

export function getActiveFolderId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_FOLDER_KEY);
}

export function getActiveFolder(): Folder | null {
  const activeId = getActiveFolderId();
  if (!activeId) return null;
  
  const folders = getFolders();
  return folders.find((f) => f.id === activeId) || null;
}

export function setActiveFolder(id: string): boolean {
  const folders = getFolders();
  const folder = folders.find((f) => f.id === id);
  
  if (!folder) return false;
  
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_FOLDER_KEY, id);
  }
  return true;
}

export function addItemToActiveFolder(item: Omit<FolderItem, "id" | "createdAt">): FolderItem | null {
  const activeFolder = getActiveFolder();
  if (!activeFolder) return null;
  
  const newItem: FolderItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  const folders = getFolders();
  const index = folders.findIndex((f) => f.id === activeFolder.id);
  
  if (index === -1) return null;
  
  folders[index].items.push(newItem);
  folders[index].updatedAt = new Date().toISOString();
  
  saveFolders(folders);
  return newItem;
}

export function removeItemFromFolder(folderId: string, itemId: string): boolean {
  const folders = getFolders();
  const index = folders.findIndex((f) => f.id === folderId);
  
  if (index === -1) return false;
  
  const originalLength = folders[index].items.length;
  folders[index].items = folders[index].items.filter((item) => item.id !== itemId);
  
  if (folders[index].items.length === originalLength) return false;
  
  folders[index].updatedAt = new Date().toISOString();
  saveFolders(folders);
  return true;
}

export function hasFolders(): boolean {
  return getFolders().length > 0;
}

export function requireFolder(): boolean {
  return hasFolders() && getActiveFolderId() !== null;
}

// Event system for folder changes
type FolderChangeCallback = () => void;
const listeners: FolderChangeCallback[] = [];

export function subscribeToFolders(callback: FolderChangeCallback): () => void {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

export function notifyFolderChange(): void {
  listeners.forEach((callback) => callback());
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Get folder statistics
export function getFolderStats(folder: Folder): {
  totalItems: number;
  musicCount: number;
  codeCount: number;
  chatCount: number;
  gameCount: number;
  publishCount: number;
  studioCount: number;
} {
  return {
    totalItems: folder.items.length,
    musicCount: folder.items.filter((i) => i.type === "music").length,
    codeCount: folder.items.filter((i) => i.type === "code").length,
    chatCount: folder.items.filter((i) => i.type === "chat").length,
    gameCount: folder.items.filter((i) => i.type === "game").length,
    publishCount: folder.items.filter((i) => i.type === "publish").length,
    studioCount: folder.items.filter((i) => i.type === "studio").length
  };
}
