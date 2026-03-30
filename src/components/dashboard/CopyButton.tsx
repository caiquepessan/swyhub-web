"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`p-2 rounded-lg ml-4 shrink-0 transition-all ${
        copied 
          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
          : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/5"
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
