"use client";

import { MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export default function DiscordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full">
      <div className="max-w-2xl text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2] mb-8 shadow-[0_0_30px_rgba(88,101,242,0.3)]">
          <MessageSquare className="w-10 h-10" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
          Join the <span className="text-gradient-primary">SwyHub</span> Community
        </h1>
        
        <p className="text-xl text-white/60 mb-10 max-w-lg">
          Connect with thousands of developers and users. Get 24/7 support, exclusive scripts, and early updates!
        </p>

        <a 
          href="https://discord.gg/your-invite-code" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-10 py-5 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 bg-[#5865F2] shadow-[0_0_40px_rgba(88,101,242,0.4)] flex items-center gap-3 text-lg"
        >
          <span className="flex items-center gap-2">
            Join the Discord Server
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        <div className="mt-16 grid grid-cols-2 gap-4 text-left max-w-lg w-full">
          <div className="flex items-center gap-3 p-4 glass-card">
            <ShieldCheck className="w-5 h-5 text-brand-purple-light" />
            <span className="font-medium">Direct Support</span>
          </div>
          <div className="flex items-center gap-3 p-4 glass-card">
            <span className="font-bold text-xl text-brand-orange">500+</span>
            <span className="font-medium">Free Scripts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
