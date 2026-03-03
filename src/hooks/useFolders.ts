"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Folder,
  FolderItem,
  getFolders,
  getActiveFolder,
  getActiveFolderId,
  createFolder,
  updateFolder,
  deleteFolder,
  setActiveFolder,
  addItemToActiveFolder,
  removeItemFromFolder,
  hasFolders,
  requireFolder,
  subscribeToFolders,
  notifyFolderChange,
  getFolderStats,
  formatDate
} from "@/lib/folderManager";

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>(() => getFolders());
  const [activeFolder, setActiveFolderState] = useState<Folder | null>(() => getActiveFolder());

  useEffect(() => {
    // Subscribe to changes
    const unsubscribe = subscribeToFolders(() => {
      setFolders(getFolders());
      setActiveFolderState(getActiveFolder());
    });

    return unsubscribe;
  }, []);

  const refreshFolders = useCallback(() => {
    setFolders(getFolders());
    setActiveFolderState(getActiveFolder());
  }, []);

  const createNewFolder = useCallback((name: string, description: string = "") => {
    const folder = createFolder(name, description);
    refreshFolders();
    notifyFolderChange();
    return folder;
  }, [refreshFolders]);

  const updateExistingFolder = useCallback((id: string, updates: Parameters<typeof updateFolder>[1]) => {
    const folder = updateFolder(id, updates);
    refreshFolders();
    notifyFolderChange();
    return folder;
  }, [refreshFolders]);

  const deleteExistingFolder = useCallback((id: string) => {
    const success = deleteFolder(id);
    if (success) {
      refreshFolders();
      notifyFolderChange();
    }
    return success;
  }, [refreshFolders]);

  const selectFolder = useCallback((id: string) => {
    const success = setActiveFolder(id);
    if (success) {
      refreshFolders();
      notifyFolderChange();
    }
    return success;
  }, [refreshFolders]);

  const addItem = useCallback((item: Omit<FolderItem, "id" | "createdAt">) => {
    const newItem = addItemToActiveFolder(item);
    if (newItem) {
      refreshFolders();
      notifyFolderChange();
    }
    return newItem;
  }, [refreshFolders]);

  const removeItem = useCallback((folderId: string, itemId: string) => {
    const success = removeItemFromFolder(folderId, itemId);
    if (success) {
      refreshFolders();
      notifyFolderChange();
    }
    return success;
  }, [refreshFolders]);

  return {
    folders,
    activeFolder,
    activeFolderId: getActiveFolderId(),
    hasFolders: hasFolders(),
    requireFolder: requireFolder(),
    createFolder: createNewFolder,
    updateFolder: updateExistingFolder,
    deleteFolder: deleteExistingFolder,
    selectFolder,
    addItem,
    removeItem,
    refreshFolders,
    getFolderStats: (folder: Folder) => getFolderStats(folder),
    formatDate
  };
}

export function useActiveFolder() {
  const { activeFolder, activeFolderId, selectFolder, updateFolder } = useFolders();

  return {
    folder: activeFolder,
    folderId: activeFolderId,
    selectFolder,
    updateFolder,
    stats: activeFolder ? getFolderStats(activeFolder) : null
  };
}

export function useFolderRequired() {
  const { hasFolders, requireFolder, activeFolder } = useFolders();

  return {
    hasFolders,
    requireFolder,
    canAccessServices: requireFolder,
    activeFolder
  };
}
