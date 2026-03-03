"use client";

import { useState, useEffect, useRef } from "react";
import { FolderGate } from "@/components/FolderGate";
import {
  Gamepad2,
  Code2,
  MessageSquare,
  Upload,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Download,
  Mic2,
  Wand2,
  Bot,
  Terminal,
  Sparkles,
  Zap,
  Disc,
  Radio,
  Users,
  Trophy,
  Settings,
  Maximize2,
  Minimize2,
  X,
  Plus,
  Send,
  Image as ImageIcon,
  Smile,
  Paperclip,
  MoreHorizontal,
  ChevronRight,
  Headphones,
  MonitorPlay,
  Puzzle,
  Search,
  Filter,
  Clock,
  Star,
  Hash,
  FileText,
  Folder,
  Music2,
  Mic
} from "lucide-react";

// Feature tabs configuration
const featureTabs = [
  { id: "search", label: "Search", icon: Search, color: "from-pink-500 to-rose-500" },
  { id: "music", label: "Music", icon: Disc, color: "from-purple-500 to-pink-500" },
  { id: "games", label: "Games", icon: Gamepad2, color: "from-green-500 to-emerald-500" },
  { id: "code", label: "Code Studio", icon: Code2, color: "from-blue-500 to-cyan-500" },
  { id: "chat", label: "Venomous Chat", icon: MessageSquare, color: "from-orange-500 to-red-500" },
  { id: "publish", label: "Publish", icon: Upload, color: "from-yellow-500 to-amber-500" },
  { id: "studio", label: "DJ Studio", icon: Headphones, color: "from-indigo-500 to-purple-500" }
];

// Mock data for music player
const sampleTracks = [
  { id: 1, title: "Midnight Dreams", artist: "Venom Beats", duration: "3:45", cover: "🌙" },
  { id: 2, title: "Urban Flow", artist: "Macllinx", duration: "4:12", cover: "🏙️" },
  { id: 3, title: "Neon Nights", artist: "Cyber Punk", duration: "3:28", cover: "⚡" },
  { id: 4, title: "Soul Searcher", artist: "Deep Vibes", duration: "5:01", cover: "🎭" },
  { id: 5, title: "Golden Hour", artist: "Sunset Crew", duration: "3:55", cover: "🌅" }
];

// Mock chat messages
const initialChatMessages = [
  { id: 1, user: "VenomBot", message: "Welcome to Venomous Chat! How can I help you today?", isBot: true, time: "10:00 AM" },
  { id: 2, user: "You", message: "Hey! What's new in music generation?", isBot: false, time: "10:01 AM" },
  { id: 3, user: "VenomBot", message: "We just added new AI-powered beat patterns and vocal synthesis! Try the 'Neural Beats' feature in the music generator.", isBot: true, time: "10:02 AM" }
];

// Simple games
const gamesList = [
  { id: "snake", name: "Snake", icon: "🐍", description: "Classic arcade game" },
  { id: "tetris", name: "Beat Blocks", icon: "🎵", description: "Music-themed Tetris" },
  { id: "rhythm", name: "Rhythm Master", icon: "🥁", description: "Tap to the beat" },
  { id: "memory", name: "Sound Memory", icon: "🧠", description: "Match the sounds" }
];

// Music generation presets
const musicPresets = [
  { id: "trap", name: "Trap", description: "Hard-hitting 808s and hi-hats", icon: "🔥" },
  { id: "lofi", name: "Lo-Fi", description: "Chill beats to study to", icon: "☕" },
  { id: "edm", name: "EDM", description: "Electronic dance music", icon: "🎆" },
  { id: "hiphop", name: "Hip Hop", description: "Classic boom bap", icon: "🎤" },
  { id: "ambient", name: "Ambient", description: "Atmospheric soundscapes", icon: "🌊" },
  { id: "rock", name: "Rock", description: "Guitar-driven energy", icon: "🎸" }
];

function AppHub() {
  const [activeTab, setActiveTab] = useState("search");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatInput, setChatInput] = useState("");
  const [codeInput, setCodeInput] = useState('// Write your code here\nconsole.log("Hello Venom!");');
  const [codeOutput, setCodeOutput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Music player controls
  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % sampleTracks.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + sampleTracks.length) % sampleTracks.length);

  // Chat functionality
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      user: "You",
      message: chatInput,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        user: "VenomBot",
        message: "Thanks for your message! I'm here to help with music generation, coding, or anything else you need.",
        isBot: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Code execution (simple mock)
  const runCode = () => {
    try {
      // Capture console.log output
      const logs: string[] = [];
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(" "))
      };
      
      // Safe eval with mock console
      const func = new Function("console", codeInput);
      func(mockConsole);
      
      setCodeOutput(logs.join("\n") || "Code executed successfully!");
    } catch (error) {
      setCodeOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Music generation
  const generateMusic = (presetId: string) => {
    setSelectedPreset(presetId);
    setIsGenerating(true);
    
    setTimeout(() => {
      const preset = musicPresets.find((p) => p.id === presetId);
      const newTrack = `${preset?.name} Beat #${generatedTracks.length + 1}`;
      setGeneratedTracks([...generatedTracks, newTrack]);
      setIsGenerating(false);
    }, 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return (
          <div className="h-full flex flex-col">
            {/* Search Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for music, code, chats, games..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="all">All</option>
                  <option value="music">Music</option>
                  <option value="code">Code</option>
                  <option value="chat">Chat</option>
                  <option value="games">Games</option>
                </select>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-auto">
              {searchQuery ? (
                <div className="space-y-4">
                  {/* Music Results */}
                  {(searchFilter === "all" || searchFilter === "music") && (
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Music2 className="w-5 h-5 text-purple-400" />
                        Music Tracks
                      </h4>
                      <div className="space-y-2">
                        {sampleTracks
                          .filter((track) =>
                            track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            track.artist.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((track) => (
                            <button
                              key={track.id}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-left"
                            >
                              <span className="text-2xl">{track.cover}</span>
                              <div className="flex-1">
                                <p className="text-white font-medium">{track.title}</p>
                                <p className="text-sm text-gray-500">{track.artist}</p>
                              </div>
                              <span className="text-xs text-gray-500">{track.duration}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Code Results */}
                  {(searchFilter === "all" || searchFilter === "code") && (
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-blue-400" />
                        Code Files
                      </h4>
                      <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-left">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">main.js</p>
                            <p className="text-sm text-gray-500">JavaScript • 2 KB</p>
                          </div>
                          <Clock className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-left">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">styles.css</p>
                            <p className="text-sm text-gray-500">CSS • 1.5 KB</p>
                          </div>
                          <Clock className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Chat Results */}
                  {(searchFilter === "all" || searchFilter === "chat") && (
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-orange-400" />
                        Chat Messages
                      </h4>
                      <div className="space-y-2">
                        {chatMessages
                          .filter((msg) =>
                            msg.message.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((msg) => (
                            <div
                              key={msg.id}
                              className="p-3 rounded-xl bg-slate-800/30"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-medium ${msg.isBot ? "text-orange-400" : "text-white"}`}>
                                  {msg.user}
                                </span>
                                <span className="text-xs text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Recent Searches & Suggestions */
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      Recent Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["trap beats", "lofi chill", "python tutorial", "multiplayer games"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-full text-sm transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Trending Now
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: "🔥", label: "Hot Tracks", color: "from-red-500 to-orange-500" },
                        { icon: "🎵", label: "New Releases", color: "from-purple-500 to-pink-500" },
                        { icon: "🎮", label: "Top Games", color: "from-green-500 to-emerald-500" },
                        { icon: "💻", label: "Code Snippets", color: "from-blue-500 to-cyan-500" }
                      ].map((item) => (
                        <button
                          key={item.label}
                          className={`p-4 bg-gradient-to-br ${item.color} rounded-xl text-white text-center hover:opacity-90 transition-opacity`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Hash className="w-5 h-5 text-blue-400" />
                      Popular Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["#hiphop", "#electronic", "#coding", "#ai", "#beats", "#remix", "#collab", "#tutorial"].map((tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg text-sm transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "music":
        return (
          <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Now Playing */}
            <div className="flex-1 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl">
                  {sampleTracks[currentTrack].cover}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{sampleTracks[currentTrack].title}</h3>
                  <p className="text-gray-400">{sampleTracks[currentTrack].artist}</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mb-6">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1:23</span>
                  <span>{sampleTracks[currentTrack].duration}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button onClick={prevTrack} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                  <SkipBack className="w-6 h-6 text-white" />
                </button>
                <button onClick={togglePlay} className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform">
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </button>
                <button onClick={nextTrack} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                  <SkipForward className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Volume */}
              <div className="flex items-center gap-3 mt-6">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-gray-400 text-sm w-10">{volume}%</span>
              </div>
            </div>
            
            {/* Playlist */}
            <div className="lg:w-80 bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Disc className="w-5 h-5 text-purple-400" />
                Playlist
              </h4>
              <div className="space-y-2">
                {sampleTracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrack(index)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      currentTrack === index
                        ? "bg-purple-500/20 border border-purple-500/30"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="text-2xl">{track.cover}</span>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${currentTrack === index ? "text-purple-300" : "text-white"}`}>
                        {track.title}
                      </p>
                      <p className="text-sm text-gray-500">{track.artist}</p>
                    </div>
                    <span className="text-xs text-gray-500">{track.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "games":
        return (
          <div className="h-full overflow-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gamesList.map((game) => (
                <button
                  key={game.id}
                  className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 rounded-2xl p-6 transition-all group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.icon}</div>
                  <h4 className="text-white font-semibold mb-1">{game.name}</h4>
                  <p className="text-sm text-gray-400">{game.description}</p>
                </button>
              ))}
            </div>
            
            {/* Featured Game */}
            <div className="mt-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">Featured: Rhythm Master</h4>
                  <p className="text-gray-400">Test your timing and compete on the global leaderboard!</p>
                </div>
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Code Studio</span>
              </div>
              <button
                onClick={runCode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Run Code
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor */}
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-gray-400 ml-2">main.js</span>
                </div>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="w-full h-full bg-slate-900 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>
              
              {/* Console Output */}
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-800 px-4 py-2">
                  <span className="text-sm text-gray-400">Console Output</span>
                </div>
                <pre className="p-4 text-sm text-green-400 font-mono h-full overflow-auto">
                  {codeOutput || "// Output will appear here..."}
                </pre>
              </div>
            </div>
          </div>
        );

      case "chat":
        return (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Venomous Chat</h4>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    1,247 online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-auto space-y-4 mb-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isBot ? "" : "flex-row-reverse"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    msg.isBot ? "bg-gradient-to-br from-orange-500 to-red-500" : "bg-slate-700"
                  }`}>
                    {msg.isBot ? <Bot className="w-4 h-4 text-white" /> : <span className="text-white">Y</span>}
                  </div>
                  <div className={`max-w-[70%] ${msg.isBot ? "" : "text-right"}`}>
                    <div className={`inline-block px-4 py-2 rounded-2xl ${
                      msg.isBot
                        ? "bg-slate-800 text-gray-200 rounded-tl-sm"
                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-tr-sm"
                    }`}>
                      <p>{msg.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            {/* Input */}
            <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none px-2"
              />
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={sendMessage}
                className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        );

      case "publish":
        return (
          <div className="h-full overflow-auto">
            <div className="max-w-2xl mx-auto">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-600 hover:border-yellow-500/50 rounded-2xl p-12 text-center transition-colors mb-6">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Upload Your Track</h4>
                <p className="text-gray-400 mb-4">Drag and drop your audio files here, or click to browse</p>
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-xl transition-colors">
                  Select Files
                </button>
              </div>
              
              {/* Track Info Form */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <Music className="w-5 h-5 text-yellow-400" />
                  Track Details
                </h4>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Track Title</label>
                  <input
                    type="text"
                    placeholder="Enter track name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Genre</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                    <option>Select a genre</option>
                    <option>Hip Hop</option>
                    <option>Trap</option>
                    <option>EDM</option>
                    <option>R&B</option>
                    <option>Pop</option>
                    <option>Rock</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your track..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 resize-none"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                    Save as Draft
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90 text-black font-medium rounded-xl transition-opacity">
                    Publish Track
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "studio":
        return (
          <div className="h-full flex flex-col">
            {/* DJ Decks */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Deck A */}
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-indigo-400 font-medium">Deck A</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="aspect-square bg-slate-800 rounded-xl mb-4 flex items-center justify-center">
                  <Disc className="w-20 h-20 text-slate-600 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>2:14</span>
                    <span>Track A</span>
                  </div>
                </div>
              </div>
              
              {/* Deck B */}
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-medium">Deck B</span>
                  <div className="w-3 h-3 bg-gray-500 rounded-full" />
                </div>
                <div className="aspect-square bg-slate-800 rounded-xl mb-4 flex items-center justify-center">
                  <Disc className="w-20 h-20 text-slate-600" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-purple-500 rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0:00</span>
                    <span>Track B</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mixer */}
            <div className="flex-1 bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between h-full gap-6">
                {/* Deck A Controls */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <span className="text-xs text-gray-500">Volume A</span>
                  <div className="flex-1 w-2 bg-slate-700 rounded-full relative">
                    <div className="absolute bottom-0 w-full h-3/4 bg-indigo-500 rounded-full" />
                  </div>
                </div>
                
                {/* Crossfader */}
                <div className="flex-[2] flex flex-col items-center gap-4">
                  <span className="text-xs text-gray-500">Crossfader</span>
                  <div className="w-full h-2 bg-slate-700 rounded-full relative">
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full -mt-2 shadow-lg" />
                  </div>
                  <div className="flex justify-between w-full text-xs text-gray-500 px-2">
                    <span>A</span>
                    <span>B</span>
                  </div>
                </div>
                
                {/* Deck B Controls */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <span className="text-xs text-gray-500">Volume B</span>
                  <div className="flex-1 w-2 bg-slate-700 rounded-full relative">
                    <div className="absolute bottom-0 w-full h-1/2 bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* App Hub Container */}
          <div className="h-full bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold">Venom Hub</h1>
                  <p className="text-xs text-gray-400">Everything in one place</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>
                <div className="h-6 w-px bg-slate-700 mx-2" />
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-1 p-2 bg-slate-900/30 border-b border-slate-700/50 overflow-x-auto">
              {featureTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : "text-gray-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Content Area */}
            <div className="flex-1 p-6 overflow-hidden">
              {renderContent()}
            </div>
          </div>
    </div>
  );
}

// Wrap the page with FolderGate
export default function AppPage() {
  return (
    <FolderGate>
      <AppHub />
    </FolderGate>
  );
}
