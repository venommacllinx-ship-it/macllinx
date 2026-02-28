"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import VenomAI from "@/components/VenomAI";

interface Message {
  id: string;
  user: string;
  avatar: string;
  country: string;
  content: string;
  timestamp: Date;
  genre: string;
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
  },
  {
    id: "2",
    user: "Kai",
    avatar: "K",
    country: "Japan",
    content: "Yo that sounds sick! I'm working on some lo-fi stuff. Where are you from?",
    timestamp: new Date(Date.now() - 240000),
    genre: "Lo-fi",
  },
  {
    id: "3",
    user: "Zara",
    avatar: "Z",
    country: "Nigeria",
    content: "Need advice on mixing vocals. Anyone here good with compression?",
    timestamp: new Date(Date.now() - 180000),
    genre: "Afrobeats",
  },
  {
    id: "4",
    user: "Mateo",
    avatar: "M",
    country: "Spain",
    content: "I can help! What DAW are you using? I use FL Studio mostly.",
    timestamp: new Date(Date.now() - 120000),
    genre: "Reggaeton",
  },
];

const roomCategories = [
  { name: "Trap Room", count: 127, active: true },
  { name: "Hip-Hop Hub", count: 89, active: false },
  { name: "Afrobeats Lounge", count: 64, active: false },
  { name: "R&B Vibes", count: 52, active: false },
  { name: "Electronic Lab", count: 43, active: false },
  { name: "Collaboration Zone", count: 38, active: false },
];

const onlineUsers = [
  { name: "Luna", country: "Brazil", genre: "Trap" },
  { name: "Kai", country: "Japan", genre: "Lo-fi" },
  { name: "Zara", country: "Nigeria", genre: "Afrobeats" },
  { name: "Mateo", country: "Spain", genre: "Reggaeton" },
  { name: "Aisha", country: "Morocco", genre: "R&B" },
  { name: "Leo", country: "France", genre: "Electronic" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("Trap Room");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <path d="M4 4 L14 22 L24 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-black text-white">VENOM</span>
              </Link>
              <div className="h-6 w-px bg-[#2a2a2a]" />
              <span className="text-gray-400 text-sm">Venomous Chat</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                412 online
              </span>
              <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 hidden lg:block">
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
                    <span className="font-medium">{room.name}</span>
                    <span className="text-xs opacity-70">{room.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">👥</span> Online
              </h3>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white text-xs font-bold">
                      {user.name[0]}
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
          <div className="flex-1 flex flex-col bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h2 className="text-white font-bold">{selectedRoom}</h2>
                  <p className="text-gray-500 text-xs">{roomCategories.find(r => r.name === selectedRoom)?.count} members online</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-[#0f0f0f] text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff0066] to-[#ff3366] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{message.user}</span>
                      <span className="text-gray-500 text-xs">{message.country}</span>
                      <span className="bg-[#ff0066]/20 text-[#ff0066] text-xs px-2 py-0.5 rounded-full">
                        {message.genre}
                      </span>
                      <span className="text-gray-600 text-xs">{formatTime(message.timestamp)}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#2a2a2a]">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <button type="button" className="p-3 rounded-xl bg-[#0f0f0f] text-gray-400 hover:text-[#ff0066] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your music or ask for advice..."
                  className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff0066]/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </form>
              <p className="text-gray-600 text-xs mt-2 text-center">
                Be respectful. Share music advice. No spam.
              </p>
            </div>
          </div>
        </div>
      </div>
      <VenomAI />
    </div>
  );
}
