"use client";

import { useState } from "react";
import {
  Folder,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronRight,
  Music,
  Code2,
  MessageSquare,
  Gamepad2,
  Upload,
  Headphones,
  Globe,
  AlertCircle
} from "lucide-react";
import { useFolders, useFolderRequired } from "@/hooks/useFolders";

interface FolderGateProps {
  children: React.ReactNode;
}

const folderIcons = [
  { icon: "🎵", label: "Music" },
  { icon: "💻", label: "Code" },
  { icon: "💬", label: "Chat" },
  { icon: "🎮", label: "Games" },
  { icon: "📁", label: "General" },
  { icon: "🎨", label: "Creative" },
  { icon: "🔥", label: "Hot" },
  { icon: "⚡", label: "Power" }
];

const folderColors = [
  { gradient: "from-purple-500 to-pink-500", label: "Purple" },
  { gradient: "from-blue-500 to-cyan-500", label: "Blue" },
  { gradient: "from-green-500 to-emerald-500", label: "Green" },
  { gradient: "from-orange-500 to-red-500", label: "Orange" },
  { gradient: "from-yellow-500 to-amber-500", label: "Yellow" },
  { gradient: "from-indigo-500 to-purple-500", label: "Indigo" },
  { gradient: "from-rose-500 to-pink-500", label: "Rose" },
  { gradient: "from-teal-500 to-green-500", label: "Teal" }
];

export function FolderGate({ children }: FolderGateProps) {
  const {
    folders,
    activeFolder,
    hasFolders,
    createFolder,
    deleteFolder,
    selectFolder,
    updateFolder,
    getFolderStats,
    formatDate
  } = useFolders();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDesc, setNewFolderDesc] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(folderIcons[0].icon);
  const [selectedColor, setSelectedColor] = useState(folderColors[0].gradient);
  const [editName, setEditName] = useState("");

  // If no folders exist or no active folder, show the gate
  if (!hasFolders || !activeFolder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
              <Folder className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Welcome to Venom
            </h1>
            <p className="text-gray-400">
              Create a folder to organize your music, code, chats, and more
            </p>
          </div>

          {/* Alert */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-200 font-medium">Folder Required</p>
              <p className="text-yellow-200/70 text-sm">
                You need to create at least one folder to access Venom services. 
                All your activities will be organized within folders.
              </p>
            </div>
          </div>

          {/* Create First Folder */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Create Your First Folder</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Folder Name *</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g., My Music Project"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Description (optional)</label>
                <input
                  type="text"
                  value={newFolderDesc}
                  onChange={(e) => setNewFolderDesc(e.target.value)}
                  placeholder="What's this folder for?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {folderIcons.map(({ icon, label }) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        selectedIcon === icon
                          ? "bg-purple-500 ring-2 ring-purple-400"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                      title={label}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {folderColors.map(({ gradient, label }) => (
                    <button
                      key={gradient}
                      onClick={() => setSelectedColor(gradient)}
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                        selectedColor === gradient
                          ? "ring-2 ring-white scale-110"
                          : "hover:scale-105"
                      }`}
                      title={label}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (newFolderName.trim()) {
                    createFolder(newFolderName, newFolderDesc);
                    setNewFolderName("");
                    setNewFolderDesc("");
                  }
                }}
                disabled={!newFolderName.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If folders exist, show folder selector sidebar with content
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Folder Sidebar */}
      <div className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Folders</h2>
              <p className="text-xs text-gray-400">{folders.length} total</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Folder
          </button>
        </div>

        {/* Folder List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {folders.map((folder) => {
            const stats = getFolderStats(folder);
            const isActive = activeFolder?.id === folder.id;
            
            return (
              <button
                key={folder.id}
                onClick={() => selectFolder(folder.id)}
                className={`w-full p-3 rounded-xl transition-all text-left group ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    : "hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${folder.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {folder.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isActive ? "text-purple-300" : "text-white"}`}>
                      {folder.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stats.totalItems} items • {formatDate(folder.updatedAt)}
                    </p>
                    {stats.totalItems > 0 && (
                      <div className="flex gap-1 mt-1">
                        {stats.musicCount > 0 && <Music className="w-3 h-3 text-purple-400" />}
                        {stats.codeCount > 0 && <Code2 className="w-3 h-3 text-blue-400" />}
                        {stats.chatCount > 0 && <MessageSquare className="w-3 h-3 text-orange-400" />}
                        {stats.gameCount > 0 && <Gamepad2 className="w-3 h-3 text-green-400" />}
                        {stats.publishCount > 0 && <Upload className="w-3 h-3 text-yellow-400" />}
                        {stats.studioCount > 0 && <Headphones className="w-3 h-3 text-indigo-400" />}
                      </div>
                    )}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-purple-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={() => setShowManageModal(true)}
            className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            Manage Folders
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Active Folder Header */}
        <div className="h-16 bg-slate-900/30 border-b border-slate-700/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeFolder.color} flex items-center justify-center text-xl`}>
              {activeFolder.icon}
            </div>
            <div>
              <h1 className="text-white font-semibold">{activeFolder.name}</h1>
              {activeFolder.description && (
                <p className="text-xs text-gray-400">{activeFolder.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {getFolderStats(activeFolder).totalItems} items
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Folder</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Folder Name *</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g., My Project"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Description</label>
                <input
                  type="text"
                  value={newFolderDesc}
                  onChange={(e) => setNewFolderDesc(e.target.value)}
                  placeholder="What's this folder for?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {folderIcons.map(({ icon }) => (
                    <button
                      key={icon}
                      onClick={() => setSelectedIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        selectedIcon === icon
                          ? "bg-purple-500 ring-2 ring-purple-400"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {folderColors.map(({ gradient }) => (
                    <button
                      key={gradient}
                      onClick={() => setSelectedColor(gradient)}
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                        selectedColor === gradient ? "ring-2 ring-white scale-110" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewFolderName("");
                    setNewFolderDesc("");
                  }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newFolderName.trim()) {
                      createFolder(newFolderName, newFolderDesc);
                      setShowCreateModal(false);
                      setNewFolderName("");
                      setNewFolderDesc("");
                    }
                  }}
                  disabled={!newFolderName.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Folders Modal */}
      {showManageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Manage Folders</h3>
              <button
                onClick={() => setShowManageModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${folder.color} flex items-center justify-center text-xl`}>
                    {folder.icon}
                  </div>
                  {editingFolder === folder.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          updateFolder(folder.id, { name: editName });
                          setEditingFolder(null);
                        }}
                        className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingFolder(null)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-white font-medium">{folder.name}</p>
                        <p className="text-xs text-gray-500">
                          {getFolderStats(folder).totalItems} items
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingFolder(folder.id);
                          setEditName(folder.name);
                        }}
                        className="p-2 hover:bg-slate-700 text-gray-400 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {folders.length > 1 && (
                        <button
                          onClick={() => deleteFolder(folder.id)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
