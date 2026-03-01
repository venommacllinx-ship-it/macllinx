"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Play,
  Square,
  Trash2,
  Copy,
  Download,
  FileCode,
  Terminal,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  RefreshCw,
  Code2,
} from "lucide-react";

type Language = "javascript" | "typescript" | "python" | "html" | "css" | "json";

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

// Array operations
const beats = ["Trap", "Hip-Hop", "R&B", "Electronic"];
console.log("Available genres:", beats);

// Object example
const producer = {
  name: "Venom",
  style: "Dark",
  bpm: 140
};

console.log("Producer:", producer);`,
  },
];

const languageOptions: { value: Language; label: string; extension: string }[] = [
  { value: "javascript", label: "JavaScript", extension: "js" },
  { value: "typescript", label: "TypeScript", extension: "ts" },
  { value: "python", label: "Python", extension: "py" },
  { value: "html", label: "HTML", extension: "html" },
  { value: "css", label: "CSS", extension: "css" },
  { value: "json", label: "JSON", extension: "json" },
];

export default function CodePage() {
  const [files, setFiles] = useState<FileTab[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState("1");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const editorRef = useRef<any>(null);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: value } : f))
    );
  };

  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput((prev) => [...prev, `> Running ${activeFile.name}...`]);

    const code = activeFile.content;
    const newOutput: string[] = [];

    // Capture console.log output
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      newOutput.push(args.map((arg) => String(arg)).join(" "));
    };
    console.error = (...args) => {
      newOutput.push(`Error: ${args.map((arg) => String(arg)).join(" ")}`);
    };

    try {
      if (activeFile.language === "javascript" || activeFile.language === "typescript") {
        // eslint-disable-next-line no-eval
        eval(code);
      } else if (activeFile.language === "python") {
        newOutput.push("Python execution requires a backend server.");
        newOutput.push("For now, try JavaScript or TypeScript!");
      } else if (activeFile.language === "html") {
        newOutput.push("HTML preview would open in a new window.");
        newOutput.push("Feature coming soon!");
      } else if (activeFile.language === "css") {
        newOutput.push("CSS is styling - apply it to HTML to see results.");
      } else if (activeFile.language === "json") {
        try {
          const parsed = JSON.parse(code);
          newOutput.push("Valid JSON:");
          newOutput.push(JSON.stringify(parsed, null, 2));
        } catch (e) {
          newOutput.push(`JSON Error: ${e}`);
        }
      }
    } catch (error) {
      newOutput.push(`Runtime Error: ${error}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }

    setTimeout(() => {
      setOutput((prev) => [...prev, ...newOutput, "> Done"]);
      setIsRunning(false);
    }, 500);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setOutput((prev) => [...prev, "> Code copied to clipboard!"]);
  };

  const downloadCode = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
    setOutput((prev) => [...prev, `> Downloaded ${activeFile.name}`]);
  };

  const createNewFile = () => {
    const newId = String(files.length + 1);
    const newFile: FileTab = {
      id: newId,
      name: `script${newId}.js`,
      language: "javascript",
      content: "// New file\n",
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
  };

  const changeLanguage = (lang: Language) => {
    const extension = languageOptions.find((l) => l.value === lang)?.extension || "js";
    const baseName = activeFile.name.split(".")[0];
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFileId
          ? { ...f, language: lang, name: `${baseName}.${extension}` }
          : f
      )
    );
    setShowLanguageMenu(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <Header />

      {/* Toolbar */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: File tabs */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-neutral-950 rounded-lg p-1">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeFileId === file.id
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    }`}
                  >
                    <FileCode className="w-4 h-4" />
                    {file.name}
                  </button>
                ))}
                <button
                  onClick={createNewFile}
                  className="px-3 py-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Center: Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-950 rounded-lg text-sm font-medium text-neutral-300 hover:text-white transition-all"
              >
                <Code2 className="w-4 h-4" />
                {languageOptions.find((l) => l.value === activeFile.language)?.label}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showLanguageMenu && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => changeLanguage(lang.value)}
                      className={`w-full text-left px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        activeFile.language === lang.value
                          ? "bg-green-500/20 text-green-400"
                          : "text-neutral-300 hover:bg-neutral-800"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                className="p-2 rounded-lg bg-neutral-950 text-neutral-400 hover:text-white transition-all"
                title="Toggle theme"
              >
                {theme === "vs-dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={copyCode}
                className="p-2 rounded-lg bg-neutral-950 text-neutral-400 hover:text-white transition-all"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={downloadCode}
                className="p-2 rounded-lg bg-neutral-950 text-neutral-400 hover:text-white transition-all"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 text-black font-bold rounded-lg transition-all"
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 bg-neutral-950">
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            theme={theme}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              padding: { top: 16 },
              fontFamily: "JetBrains Mono, Fira Code, monospace",
              fontLigatures: true,
            }}
          />
        </div>

        {/* Console */}
        <div className="w-96 bg-neutral-900 border-l border-neutral-800 flex flex-col">
          {/* Console header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-300">
              <Terminal className="w-4 h-4" />
              <span className="font-medium">Console</span>
            </div>
            <button
              onClick={clearOutput}
              className="p-1.5 rounded-md text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Clear console"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Console output */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            {output.length === 0 ? (
              <div className="text-neutral-500 italic">
                Click Run to see output...
              </div>
            ) : (
              output.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${
                    line.startsWith(">")
                      ? "text-green-400"
                      : line.startsWith("Error")
                      ? "text-red-400"
                      : "text-neutral-300"
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>

          {/* Console input hint */}
          <div className="px-4 py-2 border-t border-neutral-800 text-xs text-neutral-500">
            JavaScript & TypeScript run in browser. Python requires backend.
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-green-500 px-4 py-1.5 text-black text-xs font-medium">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Venom Code Studio</span>
            <span className="text-green-700">|</span>
            <span>{activeFile.language.toUpperCase()}</span>
            <span className="text-green-700">|</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln {activeFile.content.split("\n").length}</span>
            <span>Col 1</span>
            <span className="text-green-700">|</span>
            <span>Ready</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
