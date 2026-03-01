"use client";

import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Search,
  Plus,
  X,
  Star,
  MoreVertical,
  Shield,
  Lock,
  Globe,
  Bookmark,
  History,
  Download,
  Settings,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isLoading?: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon: string;
}

const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "Venom", url: "https://venom.com", icon: "🎵" },
  { id: "2", title: "YouTube", url: "https://youtube.com", icon: "📺" },
  { id: "3", title: "Spotify", url: "https://spotify.com", icon: "🎧" },
  { id: "4", title: "SoundCloud", url: "https://soundcloud.com", icon: "☁️" },
  { id: "5", title: "Google", url: "https://google.com", icon: "🔍" },
];

const HOMEPAGE_URL = "about:blank";

export default function VenomBrowserPage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", title: "New Tab", url: HOMEPAGE_URL },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [urlInput, setUrlInput] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(INITIAL_BOOKMARKS);
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  const addTab = useCallback(() => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: HOMEPAGE_URL,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setUrlInput("");
  }, []);

  const closeTab = useCallback((tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs((prev) => {
      if (prev.length === 1) {
        return [{ id: Date.now().toString(), title: "New Tab", url: HOMEPAGE_URL }];
      }
      const newTabs = prev.filter((t) => t.id !== tabId);
      if (activeTabId === tabId) {
        const index = prev.findIndex((t) => t.id === tabId);
        const newActive = prev[index - 1] || prev[index + 1];
        setActiveTabId(newActive.id);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const navigateToUrl = useCallback((url: string) => {
    let processedUrl = url.trim();
    if (!processedUrl) return;

    // Handle search queries
    if (!processedUrl.includes(".") || processedUrl.includes(" ")) {
      processedUrl = `https://www.google.com/search?q=${encodeURIComponent(processedUrl)}`;
    } else if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
      processedUrl = `https://${processedUrl}`;
    }

    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId
          ? { ...t, url: processedUrl, isLoading: true }
          : t
      )
    );
    setUrlInput(processedUrl);

    // Update history
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(processedUrl);
      return newHistory;
    });
    setHistoryIndex((prev) => prev + 1);
  }, [activeTabId, historyIndex]);

  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    navigateToUrl(urlInput);
  }, [urlInput, navigateToUrl]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId ? { ...t, url, isLoading: true } : t
        )
      );
      setUrlInput(url);
    }
  }, [history, historyIndex, activeTabId]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId ? { ...t, url, isLoading: true } : t
        )
      );
      setUrlInput(url);
    }
  }, [history, historyIndex, activeTabId]);

  const reload = useCallback(() => {
    if (activeTab) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId ? { ...t, isLoading: true } : t
        )
      );
      // Force iframe reload by temporarily clearing and restoring URL
      const currentUrl = activeTab.url;
      setTabs((prev) =>
        prev.map((t) =>
          t.id === activeTabId ? { ...t, url: "about:blank" } : t
        )
      );
      setTimeout(() => {
        setTabs((prev) =>
          prev.map((t) =>
            t.id === activeTabId ? { ...t, url: currentUrl, isLoading: false } : t
          )
        );
      }, 100);
    }
  }, [activeTab, activeTabId]);

  const goHome = useCallback(() => {
    navigateToUrl(HOMEPAGE_URL);
  }, [navigateToUrl]);

  const addBookmark = useCallback(() => {
    if (activeTab && activeTab.url !== HOMEPAGE_URL) {
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        title: activeTab.title || "Bookmark",
        url: activeTab.url,
        icon: "⭐",
      };
      setBookmarks((prev) => [...prev, newBookmark]);
    }
  }, [activeTab]);

  const removeBookmark = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isSecure = activeTab?.url.startsWith("https://");
  const isBookmarked = bookmarks.some((b) => b.url === activeTab?.url);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-[#111118] border-b border-white/10">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#1a1a24] to-[#111118]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
              V
            </div>
            <span className="text-sm font-medium text-white/90">Venom Browser</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-end gap-1 px-2 pt-2 bg-[#0d0d12] overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setUrlInput(tab.url === HOMEPAGE_URL ? "" : tab.url);
              }}
              className={`
                group flex items-center gap-2 px-4 py-2 min-w-[140px] max-w-[200px] rounded-t-lg cursor-pointer
                transition-all duration-200 relative
                ${
                  activeTabId === tab.id
                    ? "bg-[#1a1a24] text-white"
                    : "bg-[#16161d] text-white/60 hover:bg-[#1e1e28] hover:text-white/80"
                }
              `}
            >
              {tab.isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              ) : (
                <Globe className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="flex-1 text-sm truncate">
                {tab.title}
              </span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button
            onClick={addTab}
            className="p-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors mb-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a24]">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={reload}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={goHome}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Address Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-[#0d0d12] border border-white/10 rounded-xl focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
              {isSecure ? (
                <Lock className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Shield className="w-4 h-4 text-white/40 flex-shrink-0" />
              )}
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Search or enter address"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button
                type="submit"
                className="p-1 text-white/40 hover:text-white/80 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={addBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Star className="w-4 h-4" />
            </button>
            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <History className="w-4 h-4" />
            </button>
            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bookmarks Bar */}
        {showBookmarks && (
          <div className="flex items-center gap-1 px-4 py-2 bg-[#15151c] border-t border-white/5 overflow-x-auto">
            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                onClick={() => navigateToUrl(bookmark.url)}
                className="group flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span>{bookmark.icon}</span>
                <span className="truncate max-w-[120px]">{bookmark.title}</span>
                <X
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:text-red-400"
                  onClick={(e) => removeBookmark(bookmark.id, e)}
                />
              </button>
            ))}
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="ml-auto p-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white">
        {activeTab?.url === HOMEPAGE_URL ? (
          <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#1a1a24] p-8">
            {/* Venom Logo */}
            <div className="mb-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                <span className="text-4xl font-black text-white">V</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Venom
                </span>{" "}
                Browser
              </h1>
              <p className="text-white/50">Fast. Secure. Private.</p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleUrlSubmit} className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search the web or type a URL"
                  className="w-full px-6 py-4 pl-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-lg"
                  autoFocus
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </form>

            {/* Quick Links */}
            <div className="mt-12 grid grid-cols-4 gap-4">
              {bookmarks.slice(0, 4).map((bookmark) => (
                <button
                  key={bookmark.id}
                  onClick={() => navigateToUrl(bookmark.url)}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-2xl transition-colors">
                    {bookmark.icon}
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white/90">{bookmark.title}</span>
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="mt-12 flex items-center gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Private Browsing</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Built-in Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-pink-400" />
                <span>Full Screen</span>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={activeTab?.url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            onLoad={() => {
              setTabs((prev) =>
                prev.map((t) =>
                  t.id === activeTabId ? { ...t, isLoading: false } : t
                )
              );
            }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0d0d12] border-t border-white/5 text-xs text-white/40">
        <div className="flex items-center gap-4">
          {activeTab?.isLoading ? (
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              Loading...
            </span>
          ) : (
            <span>Done</span>
          )}
          {activeTab && activeTab.url !== HOMEPAGE_URL && (
            <span className="truncate max-w-md">{activeTab.url}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>{tabs.length} tab{tabs.length !== 1 ? "s" : ""}</span>
          <span>100%</span>
          <Minimize2 className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
