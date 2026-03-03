"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Clock,
  ChevronRight,
  Verified,
  Disc,
  Music,
  Users,
  TrendingUp,
  Calendar,
  Share2,
  Filter,
  Grid3X3,
  List,
  Shuffle,
  Repeat,
  Volume2,
  SkipBack,
  SkipForward,
  Mic2,
  Radio,
  Plus
} from "lucide-react";

// Animated Live Wallpaper Component
function LiveWallpaper({ artistId }: { artistId: string }) {
  const getWallpaper = () => {
    switch (artistId) {
      case "1": // The Weeknd - Neon/Cyberpunk theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-red-900 to-black" />
            <div className="absolute inset-0 opacity-40">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-gradient-to-b from-red-500 to-transparent animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,100,0.2),transparent_70%)] animate-pulse" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
          </>
        );
      case "2": // Drake - OVO/Ocean theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-teal-900 to-black" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-32 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-wave"
                  style={{
                    top: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "4s"
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,150,200,0.3),transparent_60%)]" />
          </>
        );
      case "3": // Taylor Swift - Sparkle/Magic theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,200,255,0.3),transparent_50%)] animate-pulse" />
          </>
        );
      case "4": // Kendrick Lamar - Gritty/Street theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-950 to-black" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-slide"
                  style={{
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,100,0,0.3),transparent_60%)]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          </>
        );
      case "5": // Billie Eilish - Dark/Spider theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-950" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-40 h-40 border border-green-500/20 rounded-full animate-ripple"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 40}%`,
                    top: `${50 + (Math.random() - 0.5) * 40}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: "4s"
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,255,100,0.1),transparent_50%)] animate-pulse" />
          </>
        );
      case "6": // Bad Bunny - Latin/Beach theme
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-orange-600 to-pink-700" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300/50 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,200,100,0.4),transparent_60%)]" />
          </>
        );
      default:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(100,50,200,0.3),transparent_70%)]" />
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {getWallpaper()}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        .animate-wave {
          animation: wave linear infinite;
        }
        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }
        .animate-slide {
          animation: slide linear infinite;
        }
        .animate-ripple {
          animation: ripple ease-out infinite;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Mock artist data
const mockArtists = [
  {
    id: "1",
    name: "The Weeknd",
    verified: true,
    image: "🎭",
    followers: "85.4M",
    monthlyListeners: "98.2M",
    bio: "Canadian singer-songwriter and record producer known for his dark lyricism and genre-bending music.",
    genres: ["R&B", "Pop", "Alternative"],
    popular: [
      { id: "t1", title: "Blinding Lights", plays: "3.2B", duration: "3:20", explicit: false },
      { id: "t2", title: "Starboy", plays: "2.1B", duration: "3:50", explicit: true },
      { id: "t3", title: "Die For You", plays: "1.8B", duration: "4:20", explicit: false },
      { id: "t4", title: "Save Your Tears", plays: "1.9B", duration: "3:35", explicit: false },
      { id: "t5", title: "The Hills", plays: "1.6B", duration: "4:02", explicit: true }
    ],
    albums: [
      { id: "a1", title: "After Hours", year: "2020", type: "Album", tracks: 14 },
      { id: "a2", title: "Starboy", year: "2016", type: "Album", tracks: 18 },
      { id: "a3", title: "Dawn FM", year: "2022", type: "Album", tracks: 16 },
      { id: "a4", title: "My Dear Melancholy", year: "2018", type: "EP", tracks: 6 }
    ],
    similar: ["Drake", "Bruno Mars", "Post Malone", "Dua Lipa"]
  },
  {
    id: "2",
    name: "Drake",
    verified: true,
    image: "🦉",
    followers: "72.1M",
    monthlyListeners: "76.8M",
    bio: "Canadian rapper, singer, and actor who has been credited for popularizing the Toronto sound.",
    genres: ["Hip Hop", "R&B", "Pop"],
    popular: [
      { id: "d1", title: "God's Plan", plays: "2.8B", duration: "3:19", explicit: true },
      { id: "d2", title: "One Dance", plays: "2.6B", duration: "2:53", explicit: false },
      { id: "d3", title: "Hotline Bling", plays: "2.1B", duration: "4:27", explicit: false },
      { id: "d4", title: "Passionfruit", plays: "1.5B", duration: "4:58", explicit: true },
      { id: "d5", title: "Nice For What", plays: "1.3B", duration: "3:30", explicit: true }
    ],
    albums: [
      { id: "da1", title: "Certified Lover Boy", year: "2021", type: "Album", tracks: 21 },
      { id: "da2", title: "Scorpion", year: "2018", type: "Album", tracks: 25 },
      { id: "da3", title: "Views", year: "2016", type: "Album", tracks: 20 },
      { id: "da4", title: "Her Loss", year: "2022", type: "Album", tracks: 16 }
    ],
    similar: ["The Weeknd", "Kendrick Lamar", "J. Cole", "Travis Scott"]
  },
  {
    id: "3",
    name: "Taylor Swift",
    verified: true,
    image: "💫",
    followers: "91.2M",
    monthlyListeners: "82.5M",
    bio: "American singer-songwriter known for her narrative songwriting and artistic reinventions.",
    genres: ["Pop", "Country", "Folk"],
    popular: [
      { id: "ts1", title: "Cruel Summer", plays: "1.9B", duration: "2:58", explicit: false },
      { id: "ts2", title: "Anti-Hero", plays: "1.6B", duration: "3:20", explicit: false },
      { id: "ts3", title: "Blank Space", plays: "2.4B", duration: "3:51", explicit: false },
      { id: "ts4", title: "Shake It Off", plays: "2.2B", duration: "3:39", explicit: false },
      { id: "ts5", title: "Love Story", plays: "1.8B", duration: "3:55", explicit: false }
    ],
    albums: [
      { id: "tsa1", title: "Midnights", year: "2022", type: "Album", tracks: 13 },
      { id: "tsa2", title: "1989", year: "2014", type: "Album", tracks: 13 },
      { id: "tsa3", title: "Reputation", year: "2017", type: "Album", tracks: 15 },
      { id: "tsa4", title: "Folklore", year: "2020", type: "Album", tracks: 16 }
    ],
    similar: ["Olivia Rodrigo", "Selena Gomez", "Katy Perry", "Adele"]
  },
  {
    id: "4",
    name: "Kendrick Lamar",
    verified: true,
    image: "👑",
    followers: "34.8M",
    monthlyListeners: "42.3M",
    bio: "American rapper and songwriter known for his progressive musical styles and socially conscious lyrics.",
    genres: ["Hip Hop", "Rap", "Jazz Rap"],
    popular: [
      { id: "kl1", title: "HUMBLE.", plays: "1.9B", duration: "2:57", explicit: true },
      { id: "kl2", title: "DNA.", plays: "1.3B", duration: "3:05", explicit: true },
      { id: "kl3", title: "Alright", plays: "980M", duration: "3:39", explicit: true },
      { id: "kl4", title: "Money Trees", plays: "890M", duration: "6:26", explicit: true },
      { id: "kl5", title: "Not Like Us", plays: "750M", duration: "4:34", explicit: true }
    ],
    albums: [
      { id: "kla1", title: "good kid, m.A.A.d city", year: "2012", type: "Album", tracks: 12 },
      { id: "kla2", title: "To Pimp a Butterfly", year: "2015", type: "Album", tracks: 16 },
      { id: "kla3", title: "DAMN.", year: "2017", type: "Album", tracks: 14 },
      { id: "kla4", title: "Mr. Morale", year: "2022", type: "Album", tracks: 18 }
    ],
    similar: ["J. Cole", "Drake", "Travis Scott", "Tyler, The Creator"]
  },
  {
    id: "5",
    name: "Billie Eilish",
    verified: true,
    image: "🕷️",
    followers: "46.7M",
    monthlyListeners: "58.9M",
    bio: "American singer-songwriter known for her whispery vocals and unique alternative pop sound.",
    genres: ["Pop", "Alternative", "Electropop"],
    popular: [
      { id: "be1", title: "bad guy", plays: "2.1B", duration: "3:14", explicit: false },
      { id: "be2", title: "Happier Than Ever", plays: "1.2B", duration: "4:58", explicit: true },
      { id: "be3", title: "Ocean Eyes", plays: "1.4B", duration: "3:20", explicit: false },
      { id: "be4", title: "Therefore I Am", plays: "980M", duration: "2:54", explicit: false },
      { id: "be5", title: "What Was I Made For?", plays: "890M", duration: "3:42", explicit: false }
    ],
    albums: [
      { id: "bea1", title: "When We All Fall Asleep", year: "2019", type: "Album", tracks: 14 },
      { id: "bea2", title: "Happier Than Ever", year: "2021", type: "Album", tracks: 16 },
      { id: "bea3", title: "Hit Me Hard and Soft", year: "2024", type: "Album", tracks: 10 }
    ],
    similar: ["Olivia Rodrigo", "Lorde", "Melanie Martinez", "Conan Gray"]
  },
  {
    id: "6",
    name: "Bad Bunny",
    verified: true,
    image: "🐰",
    followers: "58.3M",
    monthlyListeners: "64.7M",
    bio: "Puerto Rican rapper and singer known as the 'King of Latin Trap' and a global phenomenon.",
    genres: ["Latin Trap", "Reggaeton", "Latin Pop"],
    popular: [
      { id: "bb1", title: "Me Porto Bonito", plays: "1.7B", duration: "2:58", explicit: true },
      { id: "bb2", title: "Tití Me Preguntó", plays: "1.5B", duration: "4:03", explicit: true },
      { id: "bb3", title: "DÁKITI", plays: "1.8B", duration: "3:31", explicit: true },
      { id: "bb4", title: "Moscow Mule", plays: "1.1B", duration: "4:05", explicit: true },
      { id: "bb5", title: "WHERE SHE GOES", plays: "890M", duration: "3:24", explicit: true }
    ],
    albums: [
      { id: "bba1", title: "Un Verano Sin Ti", year: "2022", type: "Album", tracks: 23 },
      { id: "bba2", title: "YHLQMDLG", year: "2020", type: "Album", tracks: 20 },
      { id: "bba3", title: "El Último Tour", year: "2019", type: "Album", tracks: 14 },
      { id: "bba4", title: "Nadie Sabe", year: "2023", type: "Album", tracks: 22 }
    ],
    similar: ["Feid", "Karol G", "Anuel AA", "J Balvin"]
  }
];

const categories = ["All", "Artists", "Albums", "Tracks", "Playlists"];

export default function ArtistSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState<typeof mockArtists[0] | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const filteredArtists = mockArtists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const togglePlay = (trackId: string) => {
    if (playingTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingTrack(trackId);
      setIsPlaying(true);
    }
  };

  if (selectedArtist) {
    return (
      <div className="min-h-screen bg-black relative">
        {/* Live Wallpaper - Artist Only */}
        <LiveWallpaper artistId={selectedArtist.id} />
        
        <div className="relative z-10">
          <Header />
          
          {/* Artist Header */}
          <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          
          <div className="relative max-w-7xl mx-auto">
            <button
              onClick={() => setSelectedArtist(null)}
              className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              ← Back to Search
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Artist Image */}
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-8xl shadow-2xl shadow-purple-500/20">
                {selectedArtist.image}
              </div>

              {/* Artist Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {selectedArtist.verified && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Verified className="w-3 h-3" />
                      Verified Artist
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{selectedArtist.name}</h1>
                <p className="text-gray-400 mb-4 max-w-2xl">{selectedArtist.bio}</p>
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {selectedArtist.followers} followers
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {selectedArtist.monthlyListeners} monthly listeners
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full transition-colors flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Play
                  </button>
                  <button className="p-3 border border-gray-600 hover:border-white text-gray-400 hover:text-white rounded-full transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 border border-gray-600 hover:border-white text-gray-400 hover:text-white rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 border border-gray-600 hover:border-white text-gray-400 hover:text-white rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tracks */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
            <div className="space-y-2">
              {selectedArtist.popular.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <span className="w-6 text-center text-gray-500 group-hover:text-white">
                    {playingTrack === track.id && isPlaying ? (
                      <span className="text-green-500">♪</span>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {playingTrack === track.id && isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${playingTrack === track.id ? "text-green-500" : "text-white"}`}>
                      {track.title}
                      {track.explicit && (
                        <span className="ml-2 text-xs text-gray-500 border border-gray-600 px-1 rounded">E</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{track.plays}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity">
                    <Heart className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-500 w-12 text-right">{track.duration}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Discography */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Discography</h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Show all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {selectedArtist.albums.map((album) => (
                <button key={album.id} className="group text-left">
                  <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg mb-3 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                    <Disc className="w-16 h-16 text-gray-600" />
                  </div>
                  <h3 className="text-white font-medium group-hover:underline">{album.title}</h3>
                  <p className="text-sm text-gray-400">
                    {album.year} • {album.type}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fans also like */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Fans also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {selectedArtist.similar.map((name) => (
                <button key={name} className="group text-left">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-3 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                    {mockArtists.find((a) => a.name === name)?.image || "🎵"}
                  </div>
                  <h3 className="text-white font-medium group-hover:underline">{name}</h3>
                  <p className="text-sm text-gray-400">Artist</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Search</h1>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to listen to?"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Browse All / Genres */}
          {!searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: "Pop", color: "from-pink-500 to-rose-500", icon: "🎵" },
                  { name: "Hip Hop", color: "from-orange-500 to-red-500", icon: "🎤" },
                  { name: "Rock", color: "from-red-600 to-red-800", icon: "🎸" },
                  { name: "R&B", color: "from-purple-500 to-indigo-500", icon: "💜" },
                  { name: "Electronic", color: "from-cyan-500 to-blue-500", icon: "⚡" },
                  { name: "Latin", color: "from-yellow-500 to-orange-500", icon: "🌶️" },
                  { name: "Jazz", color: "from-amber-600 to-yellow-700", icon: "🎷" },
                  { name: "Classical", color: "from-slate-500 to-slate-700", icon: "🎻" }
                ].map((genre) => (
                  <button
                    key={genre.name}
                    className={`aspect-square bg-gradient-to-br ${genre.color} rounded-xl p-4 flex flex-col justify-between hover:scale-105 transition-transform`}
                  >
                    <span className="text-2xl">{genre.icon}</span>
                    <span className="text-white font-bold text-lg">{genre.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searchQuery && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {filteredArtists.length > 0 ? "Artists" : "No results found"}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {filteredArtists.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => setSelectedArtist(artist)}
                      className="group text-left"
                    >
                      <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform shadow-lg">
                        {artist.image}
                      </div>
                      <h3 className="text-white font-semibold group-hover:underline mb-1">{artist.name}</h3>
                      <p className="text-sm text-gray-400">Artist</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredArtists.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => setSelectedArtist(artist)}
                      className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-3xl">
                        {artist.image}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-white font-semibold">{artist.name}</h3>
                        <p className="text-sm text-gray-400">{artist.genres.join(" • ")}</p>
                      </div>
                      <span className="text-sm text-gray-500">{artist.monthlyListeners} monthly listeners</span>
                      <button className="p-2 text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Trending Artists */}
          {!searchQuery && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Trending Artists</h2>
                <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                  Show all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {mockArtists.slice(0, 6).map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => setSelectedArtist(artist)}
                    className="group text-left"
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-full mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                      {artist.image}
                    </div>
                    <h3 className="text-white font-semibold group-hover:underline mb-1">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
