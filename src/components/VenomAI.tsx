"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: "🎵", label: "Generate Music", prompt: "Help me generate a new track. What styles do you offer?" },
  { icon: "📤", label: "Publish Track", prompt: "How do I publish my music on Venom?" },
  { icon: "🎮", label: "Play Games", prompt: "What music games are available?" },
  { icon: "💬", label: "Join Chat", prompt: "Tell me about Venomous Chat" },
];

const initialGreeting = `Yo! I'm **Venom**, your AI assistant for all things music. 🎧

I can help you:
• Generate original tracks with AI
• Publish your music to streaming platforms
• Connect with producers in Venomous Chat
• Learn music production tips
• Navigate the platform

What can I help you with today?`;

const responses: Record<string, string> = {
  "generate": "To generate music, head to the **Generate** section on the homepage. You can create beats in Trap, Hip-Hop, Afrobeats, R&B, and more styles. Just describe what you want and our AI will craft it! 🎹",
  "publish": "Publishing is easy! Go to **Publish** and upload your track. We distribute to Spotify, Apple Music, SoundCloud, and 50+ platforms. Keep 100% of your royalties! 📈",
  "chat": "**Venomous Chat** is our global community! Chat with music lovers from 150+ countries, get feedback on your tracks, find collaborators, and share advice. Join now - it's free! 🌍",
  "games": "We have music games! Check out the **Games** section for rhythm challenges, beat-making games, and more. Perfect for sharpening your ear and having fun! 🎮",
  "builder": "The **Web Builder** lets you create a professional artist website in minutes. Choose from templates, add your music, bio, and photos. No coding needed! 🌐",
  "help": "I'm here to help! You can ask me about: generating music, publishing tracks, the chat community, games, web builder, or general music production advice. What do you need?",
  "hi": "Yo! What's good? Ready to make some fire music today? 🔥",
  "hello": "Hey there! I'm Venom, your music AI assistant. How can I help you create something amazing?",
};

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  if (lowerInput.includes("mix") || lowerInput.includes("master")) {
    return "For mixing and mastering tips, check out our **Generate** section - the AI can help optimize your track's sound. You can also ask for advice in **Venomous Chat** where pros hang out! 🎚️";
  }
  
  if (lowerInput.includes("collab") || lowerInput.includes("collaborate")) {
    return "Looking for collaborators? **Venomous Chat** is perfect for that! Connect with vocalists, producers, and musicians worldwide. Real-time chat to find your next creative partner! 🤝";
  }
  
  if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("free")) {
    return "Good news - joining Venom and using basic features is **FREE**! Premium features like advanced AI generation and priority distribution have affordable plans. Check the pricing when you sign up! 💚";
  }
  
  if (lowerInput.includes("account") || lowerInput.includes("sign up") || lowerInput.includes("login")) {
    return "Click **Get Started** in the header to create your account. Just need an email and you're in! Once signed up, you can generate, publish, and chat right away. 🚀";
  }
  
  return "I hear you! I'm constantly learning. For now, try asking about: generating music, publishing, the chat community, games, or the web builder. Or ask a specific music question and I'll do my best! 🎧";
}

export default function VenomAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: initialGreeting,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = getAIResponse(content);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-20" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6e] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#2a2a2a]">
              Ask Venom
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] shadow-2xl overflow-hidden flex flex-col max-h-[600px]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#00ff88]/20 to-[#00ff88]/10 border-b border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6e] flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold">Venom</h3>
                  <p className="text-[#00ff88] text-xs">AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "assistant"
                        ? "bg-gradient-to-br from-[#00ff88] to-[#00cc6e]"
                        : "bg-gradient-to-br from-[#ff0066] to-[#ff3366]"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <span className="text-white text-xs font-bold">You</span>
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "assistant"
                        ? "bg-[#0f0f0f] text-gray-300 rounded-tl-none"
                        : "bg-gradient-to-r from-[#ff0066] to-[#ff3366] text-white rounded-tr-none"
                    }`}
                  >
                    {message.content.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <span key={i} className="font-bold text-[#00ff88]">
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00cc6e] flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="bg-[#0f0f0f] p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-gray-500 text-xs mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#0f0f0f] hover:bg-[#2a2a2a] text-gray-300 text-xs transition-colors border border-[#2a2a2a] hover:border-[#00ff88]/30"
                    >
                      <span>{action.icon}</span>
                      <span className="truncate">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#2a2a2a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Venom anything..."
                  className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff88]/50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00cc6e] text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
