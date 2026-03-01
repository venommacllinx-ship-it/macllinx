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
  Zap,
  Eye,
  Cpu,
  Terminal,
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
    <div className="min-h-screen bg-black flex flex-col overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Browser Chrome */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-white/[0.08]">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-black via-zinc-950 to-black border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center overflow-hidden shadow-lg shadow-purple-500/30">
              <span className="relative z-10 text-sm font-black text-white">K</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full animate-shine" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-wide">
                K-Browser
              </span>
              <span className="text-[10px] text-white/30 tracking-widest uppercase">Secure • Fast • Private</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20" />
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-end gap-1 px-3 pt-2 bg-zinc-950/50 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setUrlInput(tab.url === HOMEPAGE_URL ? "" : tab.url);
              }}
              className={`
                group flex items-center gap-2 px-4 py-2.5 min-w-[160px] max-w-[220px] rounded-t-xl cursor-pointer
                transition-all duration-300 relative overflow-hidden
                ${
                  activeTabId === tab.id
                    ? "bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 text-white border-t border-l border-r border-white/10"
                    : "bg-zinc-900/30 text-white/40 hover:bg-zinc-800/50 hover:text-white/70"
                }
              `}
            >
              {/* Active tab glow */}
              {activeTabId === tab.id && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              )}
              
              {tab.isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
              ) : (
                <Globe className={`w-4 h-4 flex-shrink-0 ${activeTabId === tab.id ? 'text-purple-400' : 'text-white/40'}`} />
              )}
              <span className="flex-1 text-sm font-medium truncate">
                {tab.title}
              </span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={addTab}
            className="p-2.5 text-white/30 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all mb-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-zinc-900/80 to-black/80">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-white/[0.05]">
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={reload}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={goHome}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Address Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 border border-white/[0.08] rounded-xl focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/10 focus-within:shadow-lg focus-within:shadow-purple-500/10 transition-all group">
              <div className={`p-1.5 rounded-lg ${isSecure ? 'bg-green-500/10' : 'bg-white/5'}`}>
                {isSecure ? (
                  <Lock className="w-4 h-4 text-green-400" />
                ) : (
                  <Shield className="w-4 h-4 text-white/30" />
                )}
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Search or enter address"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none font-mono"
              />
              <button
                type="submit"
                className="p-2 text-white/30 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900/50 rounded-xl p-1 border border-white/[0.05]">
            <button
              onClick={addBookmark}
              className={`p-2.5 rounded-lg transition-all ${
                isBookmarked
                  ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                  : "text-white/40 hover:text-white hover:bg-white/10"
              }`}
            >
              <Star className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <History className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bookmarks Bar */}
        {showBookmarks && (
          <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-zinc-950/80 via-zinc-900/50 to-zinc-950/80 border-t border-white/[0.03] overflow-x-auto">
            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                onClick={() => navigateToUrl(bookmark.url)}
                className="group flex items-center gap-2 px-3 py-1.5 text-sm text-white/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] rounded-lg transition-all"
              >
                <span className="text-base">{bookmark.icon}</span>
                <span className="truncate max-w-[120px] font-medium">{bookmark.title}</span>
                <X
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                  onClick={(e) => removeBookmark(bookmark.id, e)}
                />
              </button>
            ))}
            <button
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="ml-auto p-2 text-white/30 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {activeTab?.url === HOMEPAGE_URL ? (
          <div className="h-full flex flex-col items-center justify-center bg-black p-8 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                />
              ))}
            </div>

            {/* K-Browser Logo */}
            <div className="relative mb-10 text-center z-10">
              {/* Glow ring */}
              <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-500/20 blur-xl animate-pulse" />
              
              <div className="relative w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 overflow-hidden group">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                
                <span className="text-5xl font-black text-white drop-shadow-lg">K</span>
                
                {/* Corner accents */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/30 rounded-full" />
              </div>
              
              <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  K
                </span>
                <span className="text-white/90">-Browser</span>
              </h1>
              <p className="text-white/40 text-lg tracking-widest uppercase font-light">
                The Future of Browsing
              </p>
            </div>

            {/* Search Box */}
            <form onSubmit={handleUrlSubmit} className="w-full max-w-2xl relative z-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-amber-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Search the web or type a URL"
                    className="w-full px-6 py-4 pl-14 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-lg shadow-xl"
                    autoFocus
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:opacity-90 transition-opacity"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Links */}
            <div className="mt-10 grid grid-cols-5 gap-4 relative z-10">
              {bookmarks.slice(0, 5).map((bookmark, index) => (
                <button
                  key={bookmark.id}
                  onClick={() => navigateToUrl(bookmark.url)}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] border border-transparent hover:border-white/[0.1] transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 group-hover:from-purple-600/20 group-hover:to-pink-600/20 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 border border-white/5 group-hover:border-purple-500/30">
                    {bookmark.icon}
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/90 font-medium">{bookmark.title}</span>
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="mt-12 flex items-center gap-8 text-sm relative z-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5 hover:border-purple-500/30 transition-colors group">
                <Eye className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <span className="text-white/40 group-hover:text-white/70">Private Mode</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5 hover:border-green-500/30 transition-colors group">
                <Zap className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                <span className="text-white/40 group-hover:text-white/70">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5 hover:border-amber-500/30 transition-colors group">
                <Cpu className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                <span className="text-white/40 group-hover:text-white/70">AI Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] rounded-full border border-white/5 hover:border-pink-500/30 transition-colors group">
                <Terminal className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                <span className="text-white/40 group-hover:text-white/70">Developer Tools</span>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={activeTab?.url}
            className="w-full h-full border-0 bg-white"
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
      <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-zinc-950/90 backdrop-blur-sm border-t border-white/[0.05] text-xs">
        <div className="flex items-center gap-4">
          {activeTab?.isLoading ? (
            <span className="flex items-center gap-2 text-purple-400">
              <div className="w-3 h-3 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
              Loading...
            </span>
          ) : (
            <span className="text-green-400 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Ready
            </span>
          )}
          {activeTab && activeTab.url !== HOMEPAGE_URL && (
            <span className="text-white/30 truncate max-w-md font-mono">{activeTab.url}</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-white/30">
          <span>{tabs.length} tab{tabs.length !== 1 ? "s" : ""}</span>
          <span className="px-2 py-0.5 bg-white/5 rounded">100%</span>
          <Minimize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
