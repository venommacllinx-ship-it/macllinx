"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import VenomAI from "@/components/VenomAI";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Image as ImageIcon, 
  Film, 
  Send,
  Paperclip,
  X,
  Maximize2,
  Users,
  MoreVertical,
  Smile,
  Phone,
  Menu,
  ChevronLeft,
  Monitor,
  Share2
} from "lucide-react";

type MessageType = "text" | "image" | "video";

interface Message {
  id: string;
  user: string;
  avatar: string;
  country: string;
  content: string;
  timestamp: Date;
  genre: string;
  type: MessageType;
  mediaUrl?: string;
  mediaThumbnail?: string;
}

interface VideoParticipant {
  id: string;
  name: string;
  avatar: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    user: "Luna",
    avatar: "L",
    country: "Brazil",
    content: "Just dropped a new trap beat! Anyone want to check it out? 🔥",
    timestamp: new Date(Date.now() - 300000),
    genre: "Trap",
    type: "text",
  },
  {
    id: "2",
    user: "Kai",
    avatar: "K",
    country: "Japan",
    content: "Yo that sounds sick! I'm working on some lo-fi stuff. Where are you from?",
    timestamp: new Date(Date.now() - 240000),
    genre: "Lo-fi",
    type: "text",
  },
  {
    id: "3",
    user: "Zara",
    avatar: "Z",
    country: "Nigeria",
    content: "New Afrobeats track cover art",
    timestamp: new Date(Date.now() - 180000),
    genre: "Afrobeats",
    type: "image",
    mediaUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    user: "Mateo",
    avatar: "M",
    country: "Spain",
    content: "Check out my latest reggaeton visualizer",
    timestamp: new Date(Date.now() - 120000),
    genre: "Reggaeton",
    type: "video",
    mediaUrl: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=400&h=300&fit=crop",
    mediaThumbnail: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=400&h=300&fit=crop",
  },
];

const roomCategories = [
  { name: "Trap Room", count: 127, active: true },
  { name: "Hip-Hop Hub", count: 89, active: false },
  { name: "Afrobeats Lounge", count: 64, active: false },
  { name: "R&B Vibes", count: 52, active: false },
  { name: "Electronic Lab", count: 43, active: false },
  { name: "Video Collab", count: 38, active: false, hasVideo: true },
];

const onlineUsers = [
  { name: "Luna", country: "Brazil", genre: "Trap", isInVideo: true },
  { name: "Kai", country: "Japan", genre: "Lo-fi", isInVideo: false },
  { name: "Zara", country: "Nigeria", genre: "Afrobeats", isInVideo: true },
  { name: "Mateo", country: "Spain", genre: "Reggaeton", isInVideo: false },
  { name: "Aisha", country: "Morocco", genre: "R&B", isInVideo: false },
  { name: "Leo", country: "France", genre: "Electronic", isInVideo: true },
];

const videoParticipants: VideoParticipant[] = [
  { id: "1", name: "Luna", avatar: "L", isVideoOn: true, isAudioOn: true, isScreenSharing: false },
  { id: "2", name: "Zara", avatar: "Z", isVideoOn: true, isAudioOn: false, isScreenSharing: true },
  { id: "3", name: "Leo", avatar: "Le", isVideoOn: false, isAudioOn: true, isScreenSharing: false },
];

// Detect mobile/touch device
const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Detect OS
const detectOS = () => {
  if (typeof window === "undefined") return "unknown";
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("linux")) return "linux";
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("mac")) return "mac";
  if (userAgent.includes("android")) return "android";
  if (userAgent.includes("iphone") || userAgent.includes("ipad")) return "ios";
  return "unknown";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("Trap Room");
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{type: MessageType; url: string} | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setTouchDevice(isTouchDevice());
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      user: "You",
      avatar: "Y",
      country: "Local",
      content: newMessage,
      timestamp: new Date(),
      genre: "Producer",
      type: "text",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: MessageType) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      const message: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "Y",
        country: "Local",
        content: type === "image" ? "Shared an image" : "Shared a video",
        timestamp: new Date(),
        genre: "Producer",
        type,
        mediaUrl: url,
        mediaThumbnail: type === "video" ? url : undefined,
      };
      setMessages([...messages, message]);
      setIsUploading(false);
    }, 1000);
  };

  const startVideoCall = () => {
    setIsInVideoCall(true);
    setIsVideoOn(true);
    setIsAudioOn(true);
  };

  const endVideoCall = () => {
    setIsInVideoCall(false);
    setIsVideoOn(false);
    setIsAudioOn(false);
    setIsScreenSharing(false);
  };

  // Handle keyboard shortcuts (cross-platform) - placed after function declarations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to exit video call
      if (e.key === "Escape" && isInVideoCall) {
        setIsInVideoCall(false);
        setIsVideoOn(false);
        setIsAudioOn(false);
        setIsScreenSharing(false);
      }
      // Ctrl/Cmd + Enter to send (Windows/Linux/Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && newMessage.trim()) {
        const message: Message = {
          id: Date.now().toString(),
          user: "You",
          avatar: "Y",
          country: "Local",
          content: newMessage,
          timestamp: new Date(),
          genre: "Producer",
          type: "text",
        };
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInVideoCall, newMessage]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "image":
        return (
          <div className="mt-2">
            <button
              onClick={() => setSelectedMedia({ type: "image", url: message.mediaUrl! })}
              className="relative group overflow-hidden rounded-xl touch-manipulation"
            >
              <img
                src={message.mediaUrl}
                alt="Shared image"
                className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] max-h-[150px] sm:max-h-[180px] md:max-h-[200px] object-cover rounded-xl transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
        );
      case "video":
        return (
          <div className="mt-2">
            <button
              onClick={() => setSelectedMedia({ type: "video", url: message.mediaUrl! })}
              className="relative group overflow-hidden rounded-xl touch-manipulation"
            >
              <img
                src={message.mediaThumbnail || message.mediaUrl}
                alt="Video thumbnail"
                className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] max-h-[150px] sm:max-h-[180px] md:max-h-[200px] object-cover rounded-xl transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff0066] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Film className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                0:45
              </div>
            </button>
          </div>
        );
      default:
        return <p className="text-gray-300 text-sm leading-relaxed break-words">{message.content}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] safe-area-inset">
      {/* Mobile Sidebar */}
      {/* Backdrop */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] z-50 transform transition-transform duration-300 lg:hidden ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">Menu</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-4 mb-4">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🏠</span> Rooms
            </h3>
            <div className="space-y-2">
              {roomCategories.map((room) => (
                <button
                  key={room.name}
                  onClick={() => {
                    setSelectedRoom(room.name);
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    selectedRoom === room.name
                      ? "bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white"
                      : "bg-[#0f0f0f] text-gray-400 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <span className="font-medium flex items-center gap-2 text-sm">
                    {room.name}
                    {room.hasVideo && <Video className="w-3 h-3" />}
                  </span>
                  <span className="text-xs opacity-70">{room.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-4">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Online
            </h3>
            <div className="space-y-3">
              {onlineUsers.map((user) => (
                <div key={user.name} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white text-xs font-bold">
                      {user.name[0]}
                    </div>
                    {user.isInVideo && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                        <Video className="w-2.5 h-2.5 text-[#ff0066]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.country}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a] sticky top-0 z-30 safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M4 4 L14 22 L24 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-black text-white hidden sm:block">VENOM</span>
              </Link>
              <div className="h-5 sm:h-6 w-px bg-[#2a2a2a] hidden sm:block" />
              <span className="text-gray-400 text-xs sm:text-sm truncate">Venomous Chat</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {!isInVideoCall && (
                <button
                  onClick={startVideoCall}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity active:scale-95"
                >
                  <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Join Video</span>
                  <span className="sm:hidden">Video</span>
                </button>
              )}
              <span className="text-green-500 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden sm:inline">412 online</span>
                <span className="sm:hidden">412</span>
              </span>
              <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors active:scale-95">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Video Call Overlay */}
      {isInVideoCall && (
        <div className="fixed inset-0 z-40 bg-black">
          {/* Video Grid */}
          <div className="h-full flex flex-col">
            <div className="flex-1 p-2 sm:p-4 grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {/* Local Video */}
              <div className="relative bg-[#1a1a1a] rounded-xl sm:rounded-2xl overflow-hidden min-h-[120px]">
                {isVideoOn ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a3a] to-[#1a1a2a] flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Y</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                    <VideoOff className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-center gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-black/70 rounded-full text-white text-xs">You</span>
                  {!isAudioOn && <MicOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
                </div>
                {isScreenSharing && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-green-500/80 rounded-full text-white text-xs flex items-center gap-1">
                    <Monitor className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">Sharing</span>
                  </div>
                )}
              </div>

              {/* Remote Participants */}
              {videoParticipants.map((participant) => (
                <div key={participant.id} className="relative bg-[#1a1a1a] rounded-xl sm:rounded-2xl overflow-hidden min-h-[120px]">
                  {participant.isVideoOn ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3a1a2a] to-[#2a1a1a] flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-white">{participant.avatar}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                      <VideoOff className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-black/70 rounded-full text-white text-xs">{participant.name}</span>
                    {!participant.isAudioOn && <MicOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
                  </div>
                  {participant.isScreenSharing && (
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-green-500/80 rounded-full text-white text-xs flex items-center gap-1">
                      <Monitor className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Sharing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Video Controls */}
            <div className="p-3 sm:p-4 bg-[#0a0a0a] border-t border-[#1a1a1a] safe-bottom">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 sm:p-4 rounded-full transition-colors active:scale-95 ${
                    isAudioOn ? "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]" : "bg-red-500 text-white"
                  }`}
                >
                  {isAudioOn ? <Mic className="w-5 h-5 sm:w-6 sm:h-6" /> : <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 sm:p-4 rounded-full transition-colors active:scale-95 ${
                    isVideoOn ? "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]" : "bg-red-500 text-white"
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5 sm:w-6 sm:h-6" /> : <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 sm:p-4 rounded-full transition-colors active:scale-95 ${
                    isScreenSharing ? "bg-green-500 text-white" : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                  }`}
                >
                  <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={endVideoCall}
                  className="p-3 sm:p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors active:scale-95"
                >
                  <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3">
                Tap controls or press ESC to leave call
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="flex gap-3 sm:gap-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)]">
          {/* Sidebar - Desktop Only */}
          <div className="w-64 hidden lg:block flex-shrink-0">
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-4 mb-4">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">🏠</span> Rooms
              </h3>
              <div className="space-y-2">
                {roomCategories.map((room) => (
                  <button
                    key={room.name}
                    onClick={() => setSelectedRoom(room.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedRoom === room.name
                        ? "bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white"
                        : "bg-[#0f0f0f] text-gray-400 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <span className="font-medium flex items-center gap-2">
                      {room.name}
                      {room.hasVideo && <Video className="w-3 h-3" />}
                    </span>
                    <span className="text-xs opacity-70">{room.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Online
              </h3>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white text-xs font-bold">
                        {user.name[0]}
                      </div>
                      {user.isInVideo && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                          <Video className="w-2.5 h-2.5 text-[#ff0066]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.country}</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-[#1a1a1a] rounded-xl sm:rounded-2xl border border-[#2a2a2a] overflow-hidden min-w-0">
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xl sm:text-2xl">🔥</span>
                <div className="min-w-0">
                  <h2 className="text-white font-bold text-sm sm:text-base truncate">{selectedRoom}</h2>
                  <p className="text-gray-500 text-xs">
                    {roomCategories.find(r => r.name === selectedRoom)?.count} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {!isInVideoCall && (
                  <button
                    onClick={startVideoCall}
                    className="p-2 rounded-lg bg-[#0f0f0f] text-gray-400 hover:text-[#ff0066] hover:bg-[#ff0066]/10 transition-colors active:scale-95"
                    title="Start Video Call"
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
                <button className="p-2 rounded-lg bg-[#0f0f0f] text-gray-400 hover:text-white transition-colors active:scale-95">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 touch-pan-y">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-2 sm:gap-3 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className="text-white font-semibold text-sm">{message.user}</span>
                      <span className="text-gray-500 text-xs hidden sm:inline">{message.country}</span>
                      <span className="bg-[#ff0066]/20 text-[#ff0066] text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                        {message.genre}
                      </span>
                      <span className="text-gray-600 text-xs">{formatTime(message.timestamp)}</span>
                      {message.type !== "text" && (
                        <span className="text-gray-500">
                          {message.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                        </span>
                      )}
                    </div>
                    {renderMessageContent(message)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-[#2a2a2a] safe-bottom">
              <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 sm:p-3 rounded-xl bg-[#0f0f0f] text-gray-400 hover:text-[#ff0066] transition-colors active:scale-95"
                    disabled={isUploading}
                  >
                    <Paperclip className={`w-4 h-4 sm:w-5 sm:h-5 ${isUploading ? "animate-spin" : ""}`} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const type = file.type.startsWith("image/") ? "image" : "video";
                        handleFileUpload(e, type);
                      }
                    }}
                    className="hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#0f0f0f] text-gray-400 hover:text-[#ff0066] transition-colors active:scale-95 hidden sm:block"
                >
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0066]/50 text-sm"
                    enterKeyHint="send"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors hidden sm:block"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
              <p className="text-gray-600 text-xs mt-2 text-center hidden sm:block">
                Supports text, images, and videos up to 50MB • Be respectful • Share music advice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors active:scale-95 z-10"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="max-w-full max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.url}
                alt="Preview"
                className="max-w-full max-h-[85vh] rounded-xl mx-auto"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                className="max-w-full max-h-[85vh] rounded-xl mx-auto"
                autoPlay
                playsInline
              />
            )}
          </div>
        </div>
      )}

      {/* Video Participants Overlay (when not in fullscreen) */}
      {isInVideoCall && !isMobile && (
        <div className="fixed bottom-24 right-6 z-30 flex flex-col gap-2 hidden lg:flex">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-3">
            <p className="text-white text-sm font-medium mb-2 flex items-center gap-2">
              <Video className="w-4 h-4 text-[#ff0066]" />
              Video Call Active
            </p>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white text-xs font-bold border-2 border-[#1a1a1a]">
                Y
              </div>
              {videoParticipants.map((p) => (
                <div
                  key={p.id}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff3366] to-[#ff6666] flex items-center justify-center text-white text-xs font-bold border-2 border-[#1a1a1a]"
                >
                  {p.avatar}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsInVideoCall(true)}
              className="mt-3 w-full py-2 rounded-lg bg-[#ff0066] text-white text-sm font-medium hover:bg-[#ff3366] transition-colors"
            >
              Expand View
            </button>
          </div>
        </div>
      )}

      <VenomAI />
    </div>
  );
}
