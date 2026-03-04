"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Play,
  Trash2,
  Copy,
  Download,
  FileCode,
  Terminal,
  Moon,
  Sun,
  Code2,
} from "lucide-react";

type Language = "javascript" | "html" | "css" | "json";

interface FileTab {
  id: string;
  name: string;
  language: Language;
  content: string;
}

const defaultFiles: FileTab[] = [
  {
    id: "1",
    name: "script.js",
    language: "javascript",
    content: `// Welcome to Venom Code Studio 🐍
// Write your code here and hit Run!

console.log("Hello, World!");

// Try some JavaScript
const name = "Venom";
const version = "1.0";

function greet(user) {
  return \`Welcome to \${name} Code Studio v\${version}, \${user}!\`;
}

console.log(greet("Developer"));

// Math example
const sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0);
console.log("Sum:", sum);`,
  },
  {
    id: "2",
    name: "style.css",
    language: "css",
    content: `/* Venom Styles */
:root {
  --primary: #00ff88;
  --bg: #0a0a0a;
}

body {
  background: var(--bg);
  color: white;
  font-family: system-ui, sans-serif;
}

.glow {
  box-shadow: 0 0 20px var(--primary);
}`,
  },
  {
    id: "3",
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Venom App</title>
</head>
<body>
  <h1>Hello Venom!</h1>
  <p>Welcome to the music platform.</p>
</body>
</html>`,
  },
  {
    id: "4",
    name: "data.json",
    language: "json",
    content: `{
  "name": "Venom",
  "version": "1.0.0",
  "type": "music-platform",
  "features": [
    "AI Music Generation",
    "Global Publishing",
    "Code Studio"
  ]
}`,
  },
];

const languageExtensions: Record<Language, string> = {
  javascript: "js",
  html: "html",
  css: "css",
  json: "json",
};

export default function CodePage() {
  const [files, setFiles] = useState<FileTab[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState("1");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const updateFileContent = (content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content } : f))
    );
  };

  const runCode = () => {
    if (activeFile.language !== "javascript") {
      setOutput([
        "⚠️  Only JavaScript files can be executed",
        `Current file type: ${activeFile.language}`,
      ]);
      return;
    }

    setIsRunning(true);
    setOutput([]);
    const logs: string[] = [];

    // Capture console.log output
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map((a) => String(a)).join(" "));
    };

    try {
      // eslint-disable-next-line no-eval
      eval(activeFile.content);
      setOutput(logs.length > 0 ? logs : ["✅ Code executed successfully (no output)"]);
    } catch (error) {
      setOutput([
        "❌ Error:",
        error instanceof Error ? error.message : String(error),
      ]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const clearOutput = () => setOutput([]);

  const copyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setOutput(["📋 Code copied to clipboard!"]);
  };

  const downloadFile = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOutput([`💾 Downloaded ${activeFile.name}`]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Code Studio</h1>
                <p className="text-neutral-400">Write, run, and experiment with code</p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Editor */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2 space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111] border border-[#222] rounded-xl p-4">
                {/* File Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        activeFileId === file.id
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "text-neutral-400 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      <FileCode className="w-4 h-4" />
                      {file.name}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
                    title="Toggle theme"
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={copyCode}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadFile}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div
                className={`border border-[#222] rounded-xl overflow-hidden ${
                  isDark ? "bg-[#0d0d0d]" : "bg-white"
                }`}
              >
                <textarea
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(e.target.value)}
                  className={`w-full h-96 p-4 font-mono text-sm resize-none focus:outline-none ${
                    isDark
                      ? "bg-[#0d0d0d] text-neutral-300"
                      : "bg-white text-neutral-800"
                  }`}
                  spellCheck={false}
                />
              </div>

              {/* Run Button */}
              <button
                onClick={runCode}
                disabled={isRunning}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </button>
            </div>

            {/* Output Console */}
            <div className="space-y-4">
              <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
                {/* Console Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#222]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-white">Console Output</span>
                  </div>
                  <button
                    onClick={clearOutput}
                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Clear console"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Console Output */}
                <div className="h-96 overflow-auto p-4 font-mono text-sm space-y-1">
                  {output.length === 0 ? (
                    <div className="text-neutral-600 italic">
                      Click "Run Code" to see output...
                    </div>
                  ) : (
                    output.map((line, i) => (
                      <div
                        key={i}
                        className={`${
                          line.startsWith("❌")
                            ? "text-red-400"
                            : line.startsWith("⚠️")
                            ? "text-yellow-400"
                            : line.startsWith("✅") || line.startsWith("📋") || line.startsWith("💾")
                            ? "text-green-400"
                            : "text-neutral-300"
                        }`}
                      >
                        <span className="text-neutral-600 mr-2">{`>`}</span>
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-4">
                <h3 className="text-sm font-medium text-white mb-2">💡 Quick Tips</h3>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Switch between files using tabs</li>
                  <li>• Only JavaScript files can be executed</li>
                  <li>• Use console.log() to see output</li>
                  <li>• Download your code anytime</li>
                </ul>
              </div>

              {/* File Info */}
              <div className="bg-[#111] border border-[#222] rounded-xl p-4">
                <h3 className="text-sm font-medium text-white mb-2">📄 Current File</h3>
                <div className="text-sm text-neutral-400 space-y-1">
                  <p>
                    <span className="text-neutral-600">Name:</span> {activeFile.name}
                  </p>
                  <p>
                    <span className="text-neutral-600">Type:</span> {activeFile.language}
                  </p>
                  <p>
                    <span className="text-neutral-600">Size:</span> {activeFile.content.length} chars
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
